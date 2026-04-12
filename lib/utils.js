// Pure utilities — safe for client components (no fs/path imports)

/**
 * Optimiza cualquier URL de imagen externa pasándola por wsrv.nl
 * Convierte a WebP, redimensiona y mejora calidad.
 * Servicio gratuito, sin cuenta: https://wsrv.nl
 *
 * @param {string} url    - URL original de la imagen
 * @param {number} width  - ancho deseado en px (default 800)
 * @param {number} quality - calidad 1-100 (default 82)
 */
// Dominios con hotlink protection — no proxiar, usar URL directa
const SKIP_PROXY = [
  'investing.com',
  'i-invdn-com',
  'reuters.com',
  'ap.org',
  'apnews.com',
  'afp.com',
  'gettyimages.com',
  'istock',
]

export function optimizeImage(url, width = 800, quality = 82) {
  if (!url) return ''
  // No procesar SVGs ni data URIs
  if (url.startsWith('data:') || url.endsWith('.svg')) return url
  // Evitar doble-proxy si ya pasa por wsrv
  if (url.includes('wsrv.nl')) return url
  // Dominios que bloquean hotlinking — devolver URL original
  if (SKIP_PROXY.some(d => url.includes(d))) return url
  const encoded = encodeURIComponent(url)
  return `https://wsrv.nl/?url=${encoded}&w=${width}&q=${quality}&output=webp&fit=cover`
}

export const SECCIONES_LABELS = {
  el_pais:       'El País',
  internacional: 'Internacional',
  economia:      'Economía',
  sociedad:      'Sociedad',
  tecnologia:    'Tecnología',
  ciencia:       'Ciencia',
  salud:         'Salud',
  cultura:       'Cultura',
  deportes:      'Deportes',
  opinion:       'Opinión',
}

export function tiempoRelativo(fechaStr) {
  if (!fechaStr) return ''
  const diff = Math.floor((new Date() - new Date(fechaStr)) / 1000)
  if (diff < 60)    return 'Hace un momento'
  if (diff < 3600)  return `Hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`
  return `Hace ${Math.floor(diff / 86400)} días`
}
