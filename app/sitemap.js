import { getArticulos } from '../lib/articulos'

export default async function sitemap() {
  const articulos = await getArticulos(1000)
  const BASE = 'https://noticia24x7.com'

  const secciones = [
    'el_pais','internacional','economia','sociedad',
    'tecnologia','ciencia','salud','cultura','deportes','opinion'
  ]

  const rutas = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'hourly', priority: 1 },
    { url: `${BASE}/busqueda/`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.5 },
    ...secciones.map(s => ({
      url: `${BASE}/seccion/${s}/`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    })),
    ...articulos.map(art => ({
      url: `${BASE}/articulo/${art.slug}/`,
      lastModified: new Date(art.fecha_generacion),
      changeFrequency: 'never',
      priority: art.puntuacion >= 9 ? 0.9 : art.puntuacion >= 7 ? 0.7 : 0.5,
    })),
  ]

  return rutas
}
