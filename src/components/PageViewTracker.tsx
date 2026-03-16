'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const VISITOR_KEY_STORAGE = 'doma_visitor_key'

function createVisitorKey() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function getVisitorKey() {
  const existing = localStorage.getItem(VISITOR_KEY_STORAGE)
  if (existing) return existing

  const created = createVisitorKey()
  localStorage.setItem(VISITOR_KEY_STORAGE, created)
  return created
}

export default function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    const visitorKey = getVisitorKey()

    void supabase.rpc('track_page_view', {
      p_path: pathname,
      p_visitor_key: visitorKey,
    })
  }, [pathname])

  return null
}
