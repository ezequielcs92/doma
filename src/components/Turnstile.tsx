'use client'

import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      callback: (token: string) => void
      'expired-callback': () => void
      'error-callback': () => void
      'response-field': boolean
    }
  ) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

export default function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptReady, setScriptReady] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || !window.turnstile) return

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      callback: setToken,
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
      'response-field': false,
    })

    return () => window.turnstile?.remove(widgetId)
  }, [scriptReady, siteKey])

  if (!siteKey) return null

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="flex justify-center" />
      <input type="hidden" name="cf-turnstile-response" value={token} />
    </>
  )
}
