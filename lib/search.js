/**
 * Utilidades de búsqueda client-side sobre el índice estático.
 */

/** Normaliza texto: minúsculas + sin tildes. Acepta string, array o null/undefined */
export function normalizar(str = '') {
  if (!str) return ''
  if (Array.isArray(str)) str = str.join(' ')
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Puntúa un artículo contra los términos de búsqueda.
 * Retorna un número ≥ 0. Si es 0, no coincide.
 */
function puntuar(art, terminos) {
  const titular   = normalizar(art.titular)
  const subtitulo = normalizar(art.subtitulo)
  const snippet   = normalizar(art.snippet || '')
  const tags      = (art.tags || []).map(t => normalizar(t))
  const seccion   = normalizar(art.seccion)

  let score = 0

  for (const t of terminos) {
    // Titular — mayor peso
    if (titular.includes(t)) {
      // Coincidencia exacta de frase completa puntúa más
      score += titular === t ? 20 : 5
    }
    // Subtítulo
    if (subtitulo.includes(t)) score += 2
    // Snippet (cuerpo parcial)
    if (snippet.includes(t)) score += 1
    // Tags
    if (tags.some(tag => tag.includes(t))) score += 3
    // Sección
    if (seccion.includes(t)) score += 2
  }

  return score
}

/**
 * Busca en el índice. Retorna artículos ordenados por relevancia.
 * @param {string} query — texto libre
 * @param {Array}  indice — array del search-index.json
 * @param {number} limit
 */
export function buscar(query, indice, limit = 30) {
  if (!query || !indice?.length) return []

  const terminos = normalizar(query)
    .split(/\s+/)
    .filter(t => t.length > 1)  // ignora palabras de 1 char

  if (!terminos.length) return []

  return indice
    .map(art => ({ art, score: puntuar(art, terminos) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ art }) => art)
}

/** Carga el índice desde /search-index.json (solo en cliente) */
let _cache = null
export async function cargarIndice() {
  if (_cache) return _cache
  try {
    const r = await fetch('/search-index.json')
    _cache = await r.json()
    return _cache
  } catch {
    return []
  }
}
