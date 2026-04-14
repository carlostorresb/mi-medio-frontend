export { SECCIONES_LABELS, tiempoRelativo } from './utils'

const EMDASH_URL = 'https://noticia24x7-cms.carlostorresb.workers.dev'
const EMDASH_TOKEN = process.env.EMDASH_TOKEN

// Mapa slug EmDash → seccion del agente
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

  const res = await fetch(`${EMDASH_URL}/_emdash/api${endpoint}`, { headers })
  console.log('>>> fetchEmdash status:', res.status, endpoint)
  if (!res.ok) return null
  const json = await res.json()
  return json.data
}

function getSectionFromPost(post) {
  const data = post.data || {}
  if (data.seccion && data.seccion !== 'general') return data.seccion
  if (data.categoria) return data.categoria
  if (post.terms?.category?.length > 0) {
    return CATEGORIA_SLUG_MAP[post.terms.category[0].slug] || post.terms.category[0].slug
  }
  if (post.taxonomies?.category?.length > 0) {
    return CATEGORIA_SLUG_MAP[post.taxonomies.category[0].slug] || post.taxonomies.category[0].slug
  }
  const titulo = data.title || ''
  return inferirSeccion(titulo)
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

// ── Posts por sección: filtra por data.seccion que guarda el agente ──────
function inferirSeccion(titulo = '') {
  const t = titulo.toLowerCase()
  if (['selección peruana','fútbol','alianza','universitario','deportes','clásico','gol','mundialista','copa perú','arbitro'].some(p => t.includes(p))) return 'deportes'
  if (['economía','mef','dólar','tipo de cambio','finanzas','acuña','inflación','banco','mercado'].some(p => t.includes(p))) return 'economia'
  if (['elecciones','keiko','fujimori','onpe','jne','congreso','presidente','senado','sufragio','candidato'].some(p => t.includes(p))) return 'el-pais'
  if (['salud','minsa','médico','medicina','hospital','insulina','cáncer','vacuna','mayo clinic','alzheimer'].some(p => t.includes(p))) return 'salud'
  if (['cultura','cine','música','arte','fil buenos aires','exposición','festival','teatro','patrimonio'].some(p => t.includes(p))) return 'cultura'
  if (['ciencia','científico','descubrimiento','inteligencia artificial','ia ','lenovo','adn','antártida','musgos'].some(p => t.includes(p))) return 'ciencia'
  if (['justicia','educación','trata de personas','autismo','maestros','deuda social','asesinato'].some(p => t.includes(p))) return 'sociedad'
  if (['sam altman','rockstar','tesla','cibernético','hack','código humano'].some(p => t.includes(p))) return 'tecnologia'
  if (['netanyahu','ucrania','gaza','trump','israel','rusia','europa','maryland','grand national',
       'vitol','organon','whitestone','holdings','frp','juventus','atalanta','burgos','pucela','alba ',
       'celebrities','gran bretaña','reino unido','guerra','china','estados unidos','geely','lenovo',
       'amc ','bloomberg','new yorker','sam '].some(p => t.includes(p))) return 'internacional'
  return 'general'
}

export async function getArticulosPorSeccion(seccion, limit = 20) {
  const todos = await getArticulos(200)
  const seccionNorm = seccion === 'el_pais' ? 'el-pais' : seccion
  const filtrados = todos.filter(a => {
    const sec = (a.seccion === 'general' || !a.seccion) ? inferirSeccion(a.titular || a.title || '') : a.seccion
    return sec === seccionNorm
  })
  console.log(`>>> ${seccion}: ${filtrados.length} de ${todos.length} posts`)
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
