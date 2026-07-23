-- service_role bypasses RLS and is used only by server-side Route Handlers.
-- Never expose SUPABASE_SERVICE_ROLE_KEY to browser code.

do $$
declare
  target_table text;
  existing_policy record;
begin
  foreach target_table in array array['leads', 'blog_posts', 'medicos', 'antes_despues', 'page_views']
  loop
    if to_regclass(format('public.%I', target_table)) is null then
      raise notice 'Skipping missing table public.%', target_table;
      continue;
    end if;

    execute format('alter table public.%I enable row level security', target_table);

    -- Permissive policies are additive, so remove old policies before installing
    -- the complete policy set below.
    for existing_policy in
      select policyname
      from pg_policies
      where schemaname = 'public' and tablename = target_table
    loop
      execute format(
        'drop policy %I on public.%I',
        existing_policy.policyname,
        target_table
      );
    end loop;
  end loop;
end
$$;

revoke all privileges on table public.leads from anon, authenticated;
revoke all privileges on table public.blog_posts from anon, authenticated;
revoke all privileges on table public.medicos from anon, authenticated;

grant select, insert, update, delete on table public.leads to authenticated;
grant select on table public.blog_posts, public.medicos to anon, authenticated;
grant insert, update, delete on table public.blog_posts, public.medicos to authenticated;

create policy "Public can read blog posts"
on public.blog_posts
for select
to anon, authenticated
using (true);

create policy "Public can read medicos"
on public.medicos
for select
to anon, authenticated
using (true);

create policy "Admin manages leads"
on public.leads
for all
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com');

create policy "Admin manages blog posts"
on public.blog_posts
for all
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com');

create policy "Admin manages medicos"
on public.medicos
for all
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com')
with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com');

do $$
begin
  if to_regclass('public.antes_despues') is not null then
    revoke all privileges on table public.antes_despues from anon, authenticated;
    grant select on table public.antes_despues to anon, authenticated;
    grant insert, update, delete on table public.antes_despues to authenticated;

    create policy "Public can read clinical results"
    on public.antes_despues
    for select
    to anon, authenticated
    using (true);

    create policy "Admin manages clinical results"
    on public.antes_despues
    for all
    to authenticated
    using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com')
    with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com');
  end if;

  if to_regclass('public.page_views') is not null then
    revoke all privileges on table public.page_views from anon, authenticated;
    grant select, insert, update, delete on table public.page_views to authenticated;

    create policy "Admin manages page views"
    on public.page_views
    for all
    to authenticated
    using (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com')
    with check (lower(coalesce(auth.jwt() ->> 'email', '')) = 'admin@doma.com');
  end if;

  if to_regprocedure('public.track_page_view(text,text)') is not null then
    revoke execute on function public.track_page_view(text, text) from public, anon, authenticated;
    grant execute on function public.track_page_view(text, text) to service_role;
  end if;
end
$$;

update public.medicos
set foto_url = case slug
  when 'pablo-vega' then '/images/team/pablo-vega.webp'
  when 'majo-arauz' then '/images/team/majo-arauz.webp'
  else foto_url
end
where
  (slug = 'pablo-vega' and coalesce(foto_url, '') in ('', '/images/team/DOMA_Personal-9.jpg'))
  or
  (slug = 'majo-arauz' and coalesce(foto_url, '') in ('', '/images/team/DOMA_Personal-10.jpg'));
