export { SECCIONES_LABELS, tiempoRelativo } from './utils'

const EMDASH_URL = 'https://noticia24x7-cms.carlostorresb.workers.dev'
const EMDASH_TOKEN = process.env.EMDASH_TOKEN

// Mapa de categorías EmDash slug → seccion del agente
const CATEGORIA_SLUG_MAP = {
  'el-pais':       'el_pais',
  'internacional': 'internacional',
  'economia':      'economia',
  'sociedad':      'sociedad',
  'tecnologia':    'tecnologia',
  'ciencia':       'ciencia',
  'salud':         'salud',
  'cultura':       'cultura',
  'deportes':      'deportes',
}

// Mapa inverso: seccion → slug de EmDash
const SECCION_TO_SLUG = Object.fromEntries(
  Object.entries(CATEGORIA_SLUG_MAP).map(([slug, sec]) => [sec, slug])
)

function buildImageUrl(featuredImage) {
  if (!featuredImage) return null
  if (typeof featuredImage === 'string') return featuredImage
  if (featuredImage.src) {
    if (featuredImage.src.startsWith('http')) return featuredImage.src
    return `${EMDASH_URL}/_emdash/api/media/file/${featuredImage.src}`
  }
  return null
}

function emdashPostToArticulo(post, seccion = 'general') {
  const data = post.data || {}
  return {
    titular:          data.title || '',
    subtitulo:        data.subtitulo || data.excerpt || '',
    cuerpo:           Array.isArray(data.content)
        ? data.content.map(b => `<p>${b.children?.map(c => c.text).join('') || ''}</p>`).join('')
                        : data.content || '',
    seccion,
    tags:             [],
    resumen_seo:      data.resumen_seo || '',
    puntuacion:       parseFloat(data.puntuacion) || 7,
    url_fuente:       data.url_fuente || '',
    fuente_nombre:    data.fuente_nombre || '',
    imagen_url:       buildImageUrl(data.featured_image),
    slug:             post.slug || post.id,
    fecha_generacion: post.publishedAt || post.createdAt || new Date().toISOString(),
  }
}

async function fetchEmdash(endpoint) {
  const headers = {
    'X-EmDash-Request': '1',
    'Accept': 'application/json',
  }
  if (EMDASH_TOKEN) {
    headers['Authorization'] = `Bearer ${EMDASH_TOKEN}`
  }

  const res = await fetch(`${EMDASH_URL}/_emdash/api${endpoint}`, { headers })
  console.log('>>> fetchEmdash status:', res.status, endpoint)
  if (!res.ok) return null
  const json = await res.json()
  return json.data
}

// ── Debug: loguear estructura de un post para saber qué devuelve EmDash ──
let _debugDone = false
function debugPost(post) {
  if (_debugDone) return
  _debugDone = true
  const data = post.data || {}
  console.log('=== DEBUG POST STRUCTURE ===')
  console.log('post keys:', Object.keys(post).join(', '))
  console.log('data keys:', Object.keys(data).join(', '))
  console.log('data.seccion:', data.seccion)
  console.log('data.categoria:', data.categoria)
  console.log('post.terms:', JSON.stringify(post.terms))
  console.log('post.taxonomies:', JSON.stringify(post.taxonomies))
  console.log('============================')
}

function getSectionFromPost(post) {
  const data = post.data || {}
  debugPost(post)

  // 1. Campo guardado por el agente en data
  if (data.seccion)   return data.seccion
  if (data.categoria) return data.categoria

  // 2. Terms devueltos por EmDash (formato 1)
  if (post.terms?.category?.length > 0) {
    const slug = post.terms.category[0].slug
    return CATEGORIA_SLUG_MAP[slug] || slug
  }

  // 3. Taxonomies (formato alternativo)
  if (post.taxonomies?.category?.length > 0) {
    const slug = post.taxonomies.category[0].slug
    return CATEGORIA_SLUG_MAP[slug] || slug
  }

  return 'general'
}

// ── Paginación completa de posts ──────────────────────────────────────────
export async function getArticulos(limit = 200) {
  try {
    let allItems = []
    let cursor = null
    let pages = 0

    while (pages < 10) {
      const endpoint = cursor
        ? `/content/posts?status=published&limit=20&cursor=${cursor}`
        : `/content/posts?status=published&limit=20`

      const data = await fetchEmdash(endpoint)
      if (!data?.items) break

      allItems = allItems.concat(data.items)
      cursor = data.nextCursor
      pages++

      if (!cursor || allItems.length >= limit) break
    }

    const articulos = allItems.map(post => {
      const seccion = getSectionFromPost(post)
      return emdashPostToArticulo(post, seccion)
    })

    return articulos
      .filter(Boolean)
      .sort((a, b) => new Date(b.fecha_generacion) - new Date(a.fecha_generacion))
      .slice(0, limit)

  } catch (e) {
    console.error('Error fetching from EmDash:', e)
    return []
  }
}

// ── Posts por sección: intenta filtrar en EmDash, fallback a todos ────────
export async function getArticulosPorSeccion(seccion, limit = 20) {
  const categoriaSlug = SECCION_TO_SLUG[seccion] || seccion.replace('_', '-')

  // Intento 1: endpoint de taxonomía por término (si EmDash lo soporta)
  try {
    const data = await fetchEmdash(
      `/taxonomies/category/terms/${categoriaSlug}/content/posts?status=published&limit=${limit}`
    )
    if (data?.items?.length > 0) {
      console.log(`>>> Taxonomía OK para ${seccion}: ${data.items.length} posts`)
      return data.items
        .map(post => emdashPostToArticulo(post, seccion))
        .sort((a, b) => new Date(b.fecha_generacion) - new Date(a.fecha_generacion))
    }
  } catch {}

  // Intento 2: query param de categoría
  try {
    const data = await fetchEmdash(
      `/content/posts?status=published&limit=${limit}&category=${categoriaSlug}`
    )
    if (data?.items?.length > 0) {
      console.log(`>>> Filtro category OK para ${seccion}: ${data.items.length} posts`)
      return data.items
        .map(post => emdashPostToArticulo(post, seccion))
        .sort((a, b) => new Date(b.fecha_generacion) - new Date(a.fecha_generacion))
    }
  } catch {}

  // Fallback: descargar todos y filtrar por data.seccion
  console.log(`>>> Fallback: filtrando todos los posts para sección "${seccion}"`)
  const todos = await getArticulos(200)
  const filtrados = todos.filter(a => a.seccion === seccion)
  console.log(`>>> "${seccion}": ${filtrados.length} de ${todos.length} posts coinciden`)
  return filtrados.slice(0, limit)
}

export async function getArticuloPorSlug(slug) {
  try {
    const data = await fetchEmdash(`/content/posts/${slug}`)
    if (!data?.item) return null
    const seccion = getSectionFromPost(data.item)
    return emdashPostToArticulo(data.item, seccion)
  } catch {
    return null
  }
}
