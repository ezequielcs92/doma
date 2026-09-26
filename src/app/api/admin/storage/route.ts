import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

import { createSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

// Before/after photos live in the public "resultados" bucket. The browser
// compresses each photo and uploads it straight to Storage with a signed URL
// issued here, so files never pass through Vercel (4.5 MB body limit) and the
// bucket needs no write policies. Only the admin account can ask for URLs.
const BUCKET = 'resultados'
const ADMIN_EMAIL = 'admin@doma.com'
const PATH_PATTERN = /^[a-z0-9-]+\/[a-z0-9-]+\.webp$/

async function isAdmin(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!token || !url || !anonKey) return false

  const { data, error } = await createClient(url, anonKey).auth.getUser(token)
  return !error && data.user?.email?.toLowerCase() === ADMIN_EMAIL
}

// POST { count } -> signed upload targets for `count` new photos.
export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  const body: unknown = await request.json().catch(() => null)
  const count =
    typeof body === 'object' && body !== null && 'count' in body && typeof body.count === 'number'
      ? Math.floor(body.count)
      : 0
  if (count < 1 || count > 4) {
    return NextResponse.json({ error: 'Cantidad de fotos no valida.' }, { status: 400 })
  }

  const storage = createSupabaseAdminClient().storage.from(BUCKET)
  const folder = new Date().toISOString().slice(0, 7)
  const targets = []
  for (let index = 0; index < count; index += 1) {
    const path = `${folder}/${crypto.randomUUID()}.webp`
    const { data, error } = await storage.createSignedUploadUrl(path)
    if (error || !data) {
      return NextResponse.json({ error: 'No se pudo preparar la subida.' }, { status: 500 })
    }
    targets.push({ path, token: data.token, publicUrl: storage.getPublicUrl(path).data.publicUrl })
  }

  return NextResponse.json({ bucket: BUCKET, targets })
}

// DELETE { urls } -> removes photos of this bucket (other URLs are ignored).
export async function DELETE(request: Request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  const body: unknown = await request.json().catch(() => null)
  const urls =
    typeof body === 'object' && body !== null && 'urls' in body && Array.isArray(body.urls)
      ? body.urls.filter((url): url is string => typeof url === 'string')
      : []

  const marker = `/storage/v1/object/public/${BUCKET}/`
  const paths = urls
    .map((url) => (url.includes(marker) ? url.slice(url.indexOf(marker) + marker.length) : ''))
    .filter((path) => PATH_PATTERN.test(path))

  if (paths.length > 0) {
    const { error } = await createSupabaseAdminClient().storage.from(BUCKET).remove(paths)
    if (error) return NextResponse.json({ error: 'No se pudieron borrar las fotos.' }, { status: 500 })
  }

  return NextResponse.json({ removed: paths.length })
}
