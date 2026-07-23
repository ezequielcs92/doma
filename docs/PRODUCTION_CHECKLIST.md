# Production Checklist

Complete these steps before publishing the site. Do not commit real credentials or patient consent documents to this repository.

## Supabase

- Rotate the existing `service_role` key in the Supabase dashboard.
- Store the new key only as `SUPABASE_SERVICE_ROLE_KEY` in the deployment secret manager.
- Configure the public URL and anon key from `.env.example`.
- Apply `supabase/migrations/202607230001_secure_leads_and_admin_rls.sql` after reviewing current policies and taking a database backup.
- Verify with an anonymous client that `leads` and `page_views` cannot be read or written directly.
- Verify with a non-admin authenticated account that CMS tables remain inaccessible.
- Verify with `admin@doma.com` that CMS reads and mutations work.
- Confirm that `track_page_view(text, text)` exists and is executable only by `service_role`.

## Anti-Spam

- Create a Cloudflare Turnstile widget for the production domain.
- Configure both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
- Test successful, expired and rejected challenges from both contact forms.
- Replace the in-memory rate limiter with a shared store such as Upstash Redis if the application runs on multiple serverless instances.

## Legal And Clinical Review

- Obtain legal approval for `/privacidad` and `/terminos`.
- Add the confirmed legal name, CUIT, controller details, hosting region and final retention periods.
- Keep a signed, auditable publication consent for every clinical image and testimonial.
- Confirm the before/after order, procedure label and lack of identifying metadata for every image.
- Do not publish the ambiguous breast-surgery pair until a clinician identifies the chronology.
- Retain evidence for professional registrations and any regulatory or performance claim before adding it to the site.

## Release

- Run `npm test`, `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build` and `npm audit`.
- Test keyboard navigation, mobile layout, forms, consent controls and CMS updates in a production preview.
- Confirm security headers and Content Security Policy in the deployed response.
- Confirm that CMS changes become public within the configured 60-second revalidation window.
