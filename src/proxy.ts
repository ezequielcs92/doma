import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { MAINTENANCE_MODE } from '@/lib/maintenance'

const MAINTENANCE_PATH = '/mantenimiento'

export function proxy(request: NextRequest) {
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
  // any file with an extension (images, fonts, icons).
  matcher: ['/((?!admin|api|_next/static|_next/image|.*\\..*).*)'],
}
