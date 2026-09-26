export const SITE_ADDRESS = 'Ciudad de La Paz 1965, Belgrano'
export const SITE_ADDRESS_FULL = `${SITE_ADDRESS}, Ciudad de Buenos Aires, Argentina`
export const SITE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE_ADDRESS}, Buenos Aires`
)}`

// TODO: domasculpt.com does not exist, so this address bounces. Replace it
// with the real inbox as soon as the client confirms it.
export const SITE_EMAIL = 'info@domasculpt.com'

export const WHATSAPP_URL = 'https://wa.me/5491130253305'

export function whatsappUrl(message?: string) {
  return message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL
}
