// Google Ads click identifiers. They arrive in the landing URL
// (?gclid=..., or gbraid/wbraid on iOS) and are kept for 90 days so a lead
// sent later can still be matched to the ad click, e.g. for offline imports.
const CLICK_ID_KEY = 'doma_ads_click'
const CLICK_ID_TTL_MS = 90 * 24 * 60 * 60 * 1000
const CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid'] as const

export type ClickIdType = (typeof CLICK_ID_PARAMS)[number]
export type ClickId = { type: ClickIdType; value: string }

const CLICK_ID_PATTERN = /^[A-Za-z0-9_-]{1,200}$/

export function isValidClickId(value: string) {
  return CLICK_ID_PATTERN.test(value)
}

export function captureClickId() {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  for (const type of CLICK_ID_PARAMS) {
    const value = params.get(type)
    if (value && isValidClickId(value)) {
      try {
        window.localStorage.setItem(
          CLICK_ID_KEY,
          JSON.stringify({ type, value, expiresAt: Date.now() + CLICK_ID_TTL_MS })
        )
      } catch {
        // Storage unavailable: the lead is still sent, just without attribution.
      }
      return
    }
  }
}

export function getClickId(): ClickId | null {
  if (typeof window === 'undefined') return null

  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(CLICK_ID_KEY) ?? 'null')
    if (
      typeof stored === 'object' &&
      stored !== null &&
      'type' in stored &&
      'value' in stored &&
      'expiresAt' in stored &&
      CLICK_ID_PARAMS.includes(stored.type as ClickIdType) &&
      typeof stored.value === 'string' &&
      isValidClickId(stored.value) &&
      typeof stored.expiresAt === 'number' &&
      stored.expiresAt > Date.now()
    ) {
      return { type: stored.type as ClickIdType, value: stored.value }
    }
  } catch {
    // Ignore malformed or unavailable storage.
  }

  return null
}
