import { NextResponse } from 'next/server'

import { isSupabaseConfigured, supabase } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Called daily by Vercel Cron (see vercel.json). The query keeps the Supabase
// free-tier project active so it is not paused for inactivity.
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET
  if (cronSecret && request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

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
