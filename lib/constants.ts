export const WPP_NUMBER = '5521987323958'

export function wppLink(msg: string, utmMedium: string) {
  const text = encodeURIComponent(msg)
  return `https://wa.me/${WPP_NUMBER}?text=${text}&utm_source=site&utm_medium=${utmMedium}&utm_campaign=landing-page`
}

export const BRANDS = [
  'Moura', 'Heliar', 'Bosch', 'Zetta', 'Pioneiro',
  'Maxfor', 'Baterax', 'DelcoFreedom', 'Júpiter',
]

export const GOOGLE_REVIEW_URL = 'https://g.page/r/CXyP6qlbfW_jEA0/review'
export const INSTAGRAM_URL     = 'https://instagram.com/tiagobaterias'
export const FACEBOOK_URL      = 'https://facebook.com/share/18saCzrpKQ'
