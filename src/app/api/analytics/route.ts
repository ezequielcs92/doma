import { NextResponse } from 'next/server'

import { createSupabaseAdminClient } from '@/lib/supabase-admin'

export const runtime = 'nodejs'

const MAX_PATH_LENGTH = 300
const MAX_REQUESTS_PER_MINUTE = 120

type RateLimitEntry = { count: number; resetAt: number }

const globalRateLimit = globalThis as typeof globalThis & {
  analyticsRateLimit?: Map<string, RateLimitEntry>
}

const rateLimit = globalRateLimit.analyticsRateLimit ?? new Map<string, RateLimitEntry>()
globalRateLimit.analyticsRateLimit = rateLimit

function getClientIp(request: Request) {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = rateLimit.get(ip)

  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }

  current.count += 1
  return current.count > MAX_REQUESTS_PER_MINUTE
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

  let input: unknown
  try {
    input = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { path, visitorKey } = input as Record<string, unknown>
  if (
    typeof path !== 'string' ||
    !path.startsWith('/') ||
    path.length > MAX_PATH_LENGTH ||
    typeof visitorKey !== 'string' ||
    !/^[0-9a-f-]{36}$/i.test(visitorKey)
  ) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  try {
    const { error } = await createSupabaseAdminClient().rpc('track_page_view', {
      p_path: path,
      p_visitor_key: visitorKey,
    })

    if (error) throw error
    return new NextResponse(null, { status: 204 })
  } catch {
    return NextResponse.json({ error: 'Analytics unavailable' }, { status: 503 })
  }
}
