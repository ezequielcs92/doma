export const ANALYTICS_CONSENT_KEY = 'doma_analytics_consent'
export const ANALYTICS_CONSENT_EVENT = 'doma:analytics-consent-change'

export type AnalyticsConsent = 'accepted' | 'rejected'

export function getAnalyticsConsent(): AnalyticsConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch {
    return null
  }
}

export function setAnalyticsConsent(value: AnalyticsConsent) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value)
  } catch {
    // The current page can still honor the choice when storage is unavailable.
  }

  window.dispatchEvent(
    new CustomEvent<AnalyticsConsent>(ANALYTICS_CONSENT_EVENT, {
      detail: value,
    })
  )
}

export function subscribeToAnalyticsConsent(onChange: () => void) {
  const handleConsentChange = () => onChange()
  const handleStorage = (event: StorageEvent) => {
    if (event.key === ANALYTICS_CONSENT_KEY) onChange()
  }

  window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange)
  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange)
    window.removeEventListener('storage', handleStorage)
  }
}

export function getServerAnalyticsConsent() {
  return null
}
