import fs from 'fs'
import path from 'path'
export { SECCIONES_LABELS, tiempoRelativo } from './utils'

export async function getArticulos(limit = 200) {
  const carpeta = path.join(process.cwd(), 'contenido')
  if (!fs.existsSync(carpeta)) return []
  const ahora = new Date()
  return fs
    .readdirSync(carpeta)
    .filter(f => f.endsWith('.json'))
    .map(archivo => {
      try {
        const texto = fs.readFileSync(path.join(carpeta, archivo), 'utf8')
        const data = JSON.parse(texto)
        return { ...data, slug: archivo.replace('.json', '') }
      } catch {
        return null
      }
    })
    .filter(Boolean)
    .filter(art => {
      const fecha = new Date(art.fecha_generacion)
      const horas = (ahora - fecha) / (1000 * 60 * 60)
      const puntaje = art.puntuacion || art.puntuacion_editor || 0
      if (puntaje >= 9) return horas < 48
      if (puntaje >= 7) return horas < 24
      return horas < 24
    })
    .sort((a, b) => {
      const pa = b.puntuacion || b.puntuacion_editor || 0
      const pb = a.puntuacion || a.puntuacion_editor || 0
      if (pa !== pb) return pa - pb
      return new Date(b.fecha_generacion) - new Date(a.fecha_generacion)
    })
    .slice(0, limit)
}

export async function getArticulosPorSeccion(seccion, limit = 20) {
  const todos = await getArticulos(200)
  return todos.filter(a => a.seccion === seccion).slice(0, limit)
}
