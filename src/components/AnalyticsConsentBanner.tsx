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
      className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-4xl rounded-2xl border border-doma-light/60 bg-white p-4 shadow-2xl shadow-doma-dark/25 sm:inset-x-4 sm:bottom-4 sm:rounded-3xl sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2
            id="analytics-consent-title"
            className="text-base font-black text-doma-dark sm:text-lg"
          >
            Tu privacidad importa
          </h2>
          <p
            id="analytics-consent-description"
            className="mt-1 text-xs leading-snug text-doma-muted sm:mt-2 sm:text-sm sm:leading-relaxed"
          >
            <span className="sm:hidden">
              Con tu permiso medimos las visitas y las consultas que llegan desde
              nuestros anuncios (Supabase y Google Ads). Si rechazás, no enviamos
              estos datos.{' '}
            </span>
            <span className="hidden sm:inline">
              Con tu permiso, registramos páginas visitadas mediante Supabase para
              mejorar el sitio y usamos la etiqueta de Google Ads para medir las
              consultas que llegan desde nuestros anuncios. Si rechazás, no
              enviamos estos datos.{' '}
            </span>
            <span className="sm:hidden">Ver </span>
            <span className="hidden sm:inline">Consultá la </span>
            <Link
              href="/privacidad"
              className="font-bold text-doma-violet underline underline-offset-2 hover:text-doma-accent"
            >
              política de privacidad
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => chooseConsent('rejected')}
            className="flex-1 rounded-full border-2 border-doma-violet px-4 py-2.5 text-sm font-bold text-doma-violet transition-colors hover:bg-doma-violet/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-doma-violet sm:flex-none sm:px-6 sm:py-3"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => chooseConsent('accepted')}
            className="flex-1 rounded-full bg-doma-accent px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-doma-accent/20 transition-colors hover:bg-doma-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-doma-violet sm:flex-none sm:px-6 sm:py-3"
          >
            Aceptar
          </button>
        </div>
      </div>
    </aside>
  )
}
