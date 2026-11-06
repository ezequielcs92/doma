import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { MAINTENANCE_MODE } from '@/lib/maintenance'

const MAINTENANCE_PATH = '/mantenimiento'

const ESTADO_URL = 'https://cobros-clientes.vercel.app/api/estado/faf33057c09e79cf6c4f9800283d7442bbf3'

async function sitioEnMantenimiento() {
  try {
    const res = await fetch(ESTADO_URL, { signal: AbortSignal.timeout(1500), cache: 'no-store' })
    if (!res.ok) return null
    const estado = await res.json()
    return estado.mantenimiento ? estado.html : null
  } catch {
    return null // Si la app de cobros no responde, el sitio sigue en línea.
  }
}

function paginaMantenimiento(html: string) {
  return new Response(html, {
    status: 503,
    headers: { 'content-type': 'text/html; charset=utf-8', 'retry-after': '3600', 'cache-control': 'no-store' },
  })
}

export async function proxy(request: NextRequest) {
  const html = await sitioEnMantenimiento()
  if (html) return paginaMantenimiento(html)

  if (!MAINTENANCE_MODE) {
    // The maintenance page has nothing to show once the site is open again.
    if (request.nextUrl.pathname === MAINTENANCE_PATH) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // 503 + Retry-After tells search engines the outage is temporary.
  return NextResponse.rewrite(new URL(MAINTENANCE_PATH, request.url), {
    status: 503,
    headers: { 'Retry-After': '3600' },
  })
}

export const config = {
  // Public pages only: skips the admin panel, API routes, Next internals and
  // any file with an extension (images, fonts, icons, css, js, txt, xml, json...).
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
