// Google Ads conversion tracking. Configure in Vercel and .env.local:
//   NEXT_PUBLIC_GOOGLE_ADS_ID             e.g. "AW-123456789"
//   NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL     label of the "Formulario" conversion (primary)
//   NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL label of the "Clic WhatsApp" conversion (secondary)
// Until they are set, every call here is a no-op. The tag itself only loads
// after the visitor accepts the consent banner (see GoogleAdsTag).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL
const WHATSAPP_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL

const PENDING_LEAD_KEY = 'doma_pending_lead'

export type LeadUserData = { email?: string; phone?: string }

// Enhanced conversions expect E.164 phone numbers. Argentine mobiles typed
// locally ("11 3025-3305") are assumed to be Buenos Aires mobiles.
export function toE164(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (phone.trim().startsWith('+')) return `+${digits}`
  if (digits.startsWith('54')) return `+${digits}`
  if (digits.startsWith('0')) return `+549${digits.slice(1)}`
  return `+549${digits}`
}

// Called right after the API accepted the lead, before navigating to /gracias.
export function storePendingLead(userData: LeadUserData) {
  try {
    window.sessionStorage.setItem(PENDING_LEAD_KEY, JSON.stringify(userData))
  } catch {
    // Without storage /gracias redirects home; the lead itself is already saved.
  }
}

// /gracias consumes the flag once, so reloading the page never double-counts.
export function consumePendingLead(): LeadUserData | null {
  try {
    const raw = window.sessionStorage.getItem(PENDING_LEAD_KEY)
    if (raw === null) return null
    window.sessionStorage.removeItem(PENDING_LEAD_KEY)
    const parsed: unknown = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null ? (parsed as LeadUserData) : {}
  } catch {
    return null
  }
}

export function trackLeadConversion(userData: LeadUserData) {
  if (!GOOGLE_ADS_ID || !LEAD_LABEL || typeof window === 'undefined' || !window.gtag) return

  const enhanced: Record<string, string> = {}
  if (userData.email) enhanced.email = userData.email.trim().toLowerCase()
  if (userData.phone) enhanced.phone_number = toE164(userData.phone)
  if (Object.keys(enhanced).length > 0) window.gtag('set', 'user_data', enhanced)

  window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${LEAD_LABEL}` })
}

export function trackWhatsAppClick() {
  if (!GOOGLE_ADS_ID || !WHATSAPP_LABEL || typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${WHATSAPP_LABEL}` })
}
