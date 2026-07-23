'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import {
  getAnalyticsConsent,
  getServerAnalyticsConsent,
  subscribeToAnalyticsConsent,
} from '@/components/analytics-consent'

const VISITOR_KEY_STORAGE = 'doma_visitor_key'

function createVisitorKey() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function getVisitorKey() {
  try {
    const existing = sessionStorage.getItem(VISITOR_KEY_STORAGE)
    if (existing) return existing

    const created = createVisitorKey()
    sessionStorage.setItem(VISITOR_KEY_STORAGE, created)
    return created
  } catch {
    return createVisitorKey()
  }
}

export default function PageViewTracker() {
  const pathname = usePathname()
  const consent = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getAnalyticsConsent,
    getServerAnalyticsConsent
  )
  const lastTrackedPath = useRef<string | null>(null)

  useEffect(() => {
    try {
      localStorage.removeItem(VISITOR_KEY_STORAGE)
    } catch {
      // Ignore browsers where storage access is unavailable.
    }
  }, [])

  useEffect(() => {
    if (consent !== 'accepted') {
      lastTrackedPath.current = null
      if (consent === 'rejected') {
        try {
          sessionStorage.removeItem(VISITOR_KEY_STORAGE)
        } catch {
          // Ignore browsers where storage access is unavailable.
        }
      }
      return
    }

    if (!pathname || lastTrackedPath.current === pathname) {
      return
    }

    lastTrackedPath.current = pathname
    const visitorKey = getVisitorKey()

    void (async () => {
      try {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            path: pathname,
            visitorKey,
          }),
        })
        if (!response.ok) throw new Error(`Analytics request failed: ${response.status}`)
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('No se pudo registrar page view en Supabase:', error)
        }
      }
    })()
  }, [consent, pathname])

  return null
}
