'use client'

import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import {
  getAnalyticsConsent,
  getServerAnalyticsConsent,
  setAnalyticsConsent,
  subscribeToAnalyticsConsent,
} from '@/components/analytics-consent'
import type { AnalyticsConsent } from '@/components/analytics-consent'

export default function AnalyticsConsentBanner() {
  const consent = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getAnalyticsConsent,
    getServerAnalyticsConsent
  )

  const chooseConsent = (value: AnalyticsConsent) => {
    setAnalyticsConsent(value)
  }

  if (consent !== null) return null

  return (
    <aside
      aria-labelledby="analytics-consent-title"
      aria-describedby="analytics-consent-description"
      className="fixed inset-x-4 bottom-4 z-[120] mx-auto max-w-4xl rounded-3xl border border-doma-light/60 bg-white p-5 shadow-2xl shadow-doma-dark/25 sm:p-6"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2
            id="analytics-consent-title"
            className="text-lg font-black text-doma-dark"
          >
            Tu privacidad importa
          </h2>
          <p
            id="analytics-consent-description"
            className="mt-2 text-sm leading-relaxed text-doma-muted"
          >
            Con tu permiso, registramos páginas visitadas mediante Supabase para
            mejorar el sitio. Usamos un identificador aleatorio que dura solo
            durante esta sesión. Si rechazás, no enviamos estos datos. Consultá
            la{' '}
            <Link
              href="/privacidad"
              className="font-bold text-doma-violet underline underline-offset-2 hover:text-doma-accent"
            >
              política de privacidad
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => chooseConsent('rejected')}
            className="rounded-full border-2 border-doma-violet px-6 py-3 text-sm font-bold text-doma-violet transition-colors hover:bg-doma-violet/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-doma-violet"
          >
            Rechazar analytics
          </button>
          <button
            type="button"
            onClick={() => chooseConsent('accepted')}
            className="rounded-full bg-doma-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-doma-accent/20 transition-colors hover:bg-doma-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-doma-violet"
          >
            Aceptar analytics
          </button>
        </div>
      </div>
    </aside>
  )
}
