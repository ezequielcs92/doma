export const SITE_ADDRESS = 'Ciudad de La Paz 1965, Belgrano'
export const SITE_ADDRESS_FULL = `${SITE_ADDRESS}, Ciudad de Buenos Aires, Argentina`
export const SITE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${SITE_ADDRESS}, Buenos Aires`
)}`

export const SITE_EMAIL = 'domasculpcenter@gmail.com'

export const SITE_INSTAGRAM_URL = 'https://www.instagram.com/domasculptcenter/'
export const SITE_INSTAGRAM_HANDLE = '@domasculptcenter'

export const WHATSAPP_URL = 'https://wa.me/5491130253305'

export function whatsappUrl(message?: string) {
  return message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL
}
