import { getCloudflareContext } from '@opennextjs/cloudflare'

export const SECCIONES = [
  'el_pais', 'internacional', 'economia', 'sociedad',
  'tecnologia', 'ciencia', 'salud', 'cultura', 'deportes'
]

export const SECCIONES_LABELS = {
  el_pais:'El País', internacional:'Internacional', economia:'Economía',
  sociedad:'Sociedad', tecnologia:'Tecnología', ciencia:'Ciencia',
  salud:'Salud', cultura:'Cultura', deportes:'Deportes', opinion:'Opinión',
}

function parsearArticulo(row) {
  return { ...row, tags: (() => { try { return JSON.parse(row.tags||'[]') } catch { return [] } })() }
}

async function getDB() {
  const { env } = await getCloudflareContext({ async: true })
  return env.DB
}

export async function getArticulos(limit=100) {
  try {
    const db = await getDB()
    const { results } = await db.prepare('SELECT * FROM articulos ORDER BY fecha_generacion DESC LIMIT ?').bind(limit).all()
    return results.map(parsearArticulo)
  } catch(e) { console.error('getArticulos:',e); return [] }
}

export async function getArticuloBySlug(slug) {
  try {
    const db = await getDB()
    const result = await db.prepare('SELECT * FROM articulos WHERE slug = ?').bind(slug).first()
    return result ? parsearArticulo(result) : null
  } catch(e) { console.error('getArticuloBySlug:',e); return null }
}

export async function getArticulosPorSeccion(seccion, limit=30) {
  try {
    const db = await getDB()
    const { results } = await db.prepare('SELECT * FROM articulos WHERE seccion = ? ORDER BY fecha_generacion DESC LIMIT ?').bind(seccion, limit).all()
    return results.map(parsearArticulo)
  } catch(e) { console.error('getArticulosPorSeccion:',e); return [] }
}

export function tiempoRelativo(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff/60000)
  if (min < 60) return `Hace ${min} min`
  const h = Math.floor(min/60)
  if (h < 24) return `Hace ${h} h`
  const d = Math.floor(h/24)
  if (d === 1) return 'Ayer'
  return `Hace ${d} días`
}

export function formatFecha(iso) {
  try {
    return new Date(iso).toLocaleDateString('es-PE', {
      weekday:'long', year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'
    })
  } catch { return iso }
}
