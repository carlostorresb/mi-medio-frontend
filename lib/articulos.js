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

  const res = await fetch(`${EMDASH_URL}/_emdash/api${endpoint}`, {
    headers,
    next: { revalidate: 60 },
  })

  if (!res.ok) return null
  const json = await res.json()
  return json.data
}

// Cache en memoria para las categorías
let categoriaCache = null
let categoriaCacheTime = 0

async function getCategorias() {
  const ahora = Date.now()
  if (categoriaCache && ahora - categoriaCacheTime < 5 * 60 * 1000) {
    return categoriaCache
  }
  const data = await fetchEmdash('/taxonomies/category/terms')
  categoriaCache = data?.terms || []
  categoriaCacheTime = ahora
  return categoriaCache
}

// Obtener sección de un post usando los datos del campo 'seccion' si existe
// o desde los términos del post en el campo data
function getSectionFromPost(post, allTerms) {
  // Si el agente guardó la sección en el campo data directamente
  const data = post.data || {}
  
  // Intentar obtener desde los términos que vienen en el post
  // EmDash a veces incluye términos en el listado
  if (post.terms?.category?.length > 0) {
    const slug = post.terms.category[0].slug
    return CATEGORIA_SLUG_MAP[slug] || slug
  }
  
  return 'general'
}

export async function getArticulos(limit = 200) {
  try {
    const data = await fetchEmdash(`/content/posts?status=published&limit=100`)
    if (!data?.items) return []

    const articulos = data.items.map(post => {
      const seccion = getSectionFromPost(post, [])
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

export async function getArticulosPorSeccion(seccion, limit = 20) {
  const todos = await getArticulos(200)
  return todos.filter(a => a.seccion === seccion).slice(0, limit)
}

export async function getArticuloPorSlug(slug) {
  try {
    const data = await fetchEmdash(`/content/posts/${slug}`)
    if (!data?.item) return null
    const seccion = getSectionFromPost(data.item, [])
    return emdashPostToArticulo(data.item, seccion)
  } catch {
    return null
  }
}
