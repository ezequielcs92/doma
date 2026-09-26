declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

// Google Ads conversion target, e.g. "AW-123456789/AbCdEfGhIjk".
// Until the Ads account exists this stays unset and tracking is a no-op.
// Loading gtag.js also requires allowing googletagmanager.com in the CSP
// (next.config.ts) and gating it behind the analytics consent banner.
const ADS_CONVERSION_TARGET = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION

export function trackLeadConversion() {
  if (!ADS_CONVERSION_TARGET || typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'conversion', { send_to: ADS_CONVERSION_TARGET })
}
