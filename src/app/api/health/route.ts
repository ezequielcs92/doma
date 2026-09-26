import { NextResponse } from 'next/server'

import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Called daily by GitHub Actions (.github/workflows/supabase-keepalive.yml).
// The query keeps the Supabase free-tier project active so it is not paused
// for inactivity. It exposes no data, so it needs no authentication.
export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ ok: false, database: 'not-configured' }, { status: 503 })
  }

  try {
    const { error } = await supabase.from('medicos').select('id').limit(1)
    if (error) {
      return NextResponse.json({ ok: false, database: 'error' }, { status: 503 })
    }

    return NextResponse.json({ ok: true, database: 'up' })
  } catch {
    return NextResponse.json({ ok: false, database: 'unreachable' }, { status: 503 })
  }
}
