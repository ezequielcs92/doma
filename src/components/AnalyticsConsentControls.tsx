'use client'

import { useSyncExternalStore } from 'react'
import {
  getAnalyticsConsent,
  getServerAnalyticsConsent,
  setAnalyticsConsent,
  subscribeToAnalyticsConsent,
} from '@/components/analytics-consent'

const consentLabels = {
  accepted: 'Analytics aceptado',
  rejected: 'Analytics rechazado',
}

export default function AnalyticsConsentControls() {
  const consent = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getAnalyticsConsent,
    getServerAnalyticsConsent
  )

  return (
    <div className="mt-5 rounded-2xl border border-doma-light/60 bg-surface p-5">
      <p className="text-sm font-bold text-doma-dark" role="status">
        Preferencia actual:{' '}
        {consent ? consentLabels[consent] : 'sin preferencia guardada'}
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          aria-pressed={consent === 'rejected'}
          onClick={() => setAnalyticsConsent('rejected')}
          className="rounded-full border-2 border-doma-violet px-5 py-2.5 text-sm font-bold text-doma-violet transition-colors hover:bg-doma-violet/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-doma-violet"
        >
          Rechazar o retirar consentimiento
        </button>
        <button
          type="button"
          aria-pressed={consent === 'accepted'}
          onClick={() => setAnalyticsConsent('accepted')}
          className="rounded-full bg-doma-accent px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-doma-violet focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-doma-violet"
        >
          Aceptar analytics
        </button>
      </div>
    </div>
  )
}
