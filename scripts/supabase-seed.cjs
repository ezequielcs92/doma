// Replaces placeholder doctors, blog posts and before/after rows in Supabase
// with the real content that lives in the codebase as fallback data.
// Leads are never touched. Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.
//
// Usage (from the project root): node scripts/supabase-seed.cjs
const fs = require('fs')
const path = require('path')
const { stripTypeScriptTypes } = require('module')
const { createClient } = require('@supabase/supabase-js')

const root = path.join(__dirname, '..')

function extract(file, start, end, name) {
  const src = fs.readFileSync(path.join(root, file), 'utf8')
  const block = src.slice(src.indexOf(start), src.indexOf(end))
  const types = 'type BlogPost = any; type Medico = any; type TeamDoctor = any;\n'
  const js = stripTypeScriptTypes(`${types}${block}\nmodule.exports = ${name}`)
  const mod = { exports: {} }
  new Function('module', 'exports', js)(mod, mod.exports)
  return mod.exports
}

const posts = extract('src/lib/blog.ts', 'const fallbackBlogPosts', 'function normalizeBlogPost', 'fallbackBlogPosts')
const medicos = extract('src/app/medico/[slug]/page.tsx', 'const fallbackMedicos', 'export const revalidate', 'fallbackMedicos')
const cards = extract('src/components/sections/TeamSection.tsx', 'const fallbackDoctors', 'async function getDoctors', 'fallbackDoctors')

const env = Object.fromEntries(
  fs
    .readFileSync(path.join(root, '.env.local'), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.includes('=') && !line.startsWith('#'))
    .map((line) => [line.slice(0, line.indexOf('=')).trim(), line.slice(line.indexOf('=') + 1).trim()])
)

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

function check(label, result) {
  if (result.error) throw new Error(`${label}: ${result.error.message}`)
  console.log(`ok ${label} (${result.data ? result.data.length : 0} rows)`)
}

async function main() {
  const backupDir = path.join(root, 'supabase', 'backups')
  fs.mkdirSync(backupDir, { recursive: true })
  const backup = {}
  for (const table of ['medicos', 'blog_posts', 'antes_despues']) {
    const result = await supabase.from(table).select('*')
    if (result.error) throw new Error(`backup ${table}: ${result.error.message}`)
    backup[table] = result.data
  }
  const backupFile = path.join(backupDir, `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`)
  fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2))
  console.log(`backup written to ${path.relative(root, backupFile)}`)

  const medicoRows = Object.keys(medicos).map((slug) => {
    const medico = medicos[slug]
    const card = cards.find((doctor) => doctor.slug === slug)
    return {
      nombre: medico.nombre,
      especialidad: medico.especialidad,
      matricula: medico.matricula,
      foto_url: medico.foto_url,
      video_url: null,
      curriculum: card ? card.credentials : medico.curriculum,
      trayectoria: medico.trayectoria,
      slug,
    }
  })
  const blogRows = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    cover: post.cover,
    date: post.date,
    author: post.author,
    category: post.category,
    content: post.content.join('\n'),
  }))

  check('delete antes_despues', await supabase.from('antes_despues').delete().not('id', 'is', null).select('id'))
  check(
    'delete medicos',
    await supabase.from('medicos').delete().in('slug', ['doctor-1', 'doctor-2', ...Object.keys(medicos)]).select('id')
  )
  check('insert medicos', await supabase.from('medicos').insert(medicoRows).select('id'))
  check(
    'delete blog_posts',
    await supabase
      .from('blog_posts')
      .delete()
      .in('slug', ['recuperacion-liposuccion-hd', 'tendencias-medicina-estetica-natural', ...posts.map((post) => post.slug)])
      .select('id')
  )
  check('insert blog_posts', await supabase.from('blog_posts').insert(blogRows).select('id'))
}

main().catch((error) => {
  console.error('FAILED', error.message)
  process.exit(1)
})
