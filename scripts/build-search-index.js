#!/usr/bin/env node
/**
 * Genera public/search-index.json con todos los artículos de contenido/.
 * Se ejecuta antes de next build, así el cliente puede buscarlo sin servidor.
 */
const fs   = require('fs')
const path = require('path')

const CONTENIDO = path.join(__dirname, '..', 'contenido')
const OUT       = path.join(__dirname, '..', 'public', 'search-index.json')

if (!fs.existsSync(CONTENIDO)) {
  console.log('[search-index] carpeta contenido/ no encontrada — índice vacío')
  fs.writeFileSync(OUT, '[]')
  process.exit(0)
}

const archivos = fs.readdirSync(CONTENIDO).filter(f => f.endsWith('.json'))
const articulos = []

for (const archivo of archivos) {
  try {
    const raw  = fs.readFileSync(path.join(CONTENIDO, archivo), 'utf8')
    const data = JSON.parse(raw)
    // Solo guardamos lo necesario para búsqueda (sin cuerpo completo)
    articulos.push({
      slug:             archivo.replace('.json', ''),
      titular:          data.titular         || '',
      subtitulo:        data.subtitulo        || '',
      seccion:          data.seccion          || '',
      tags:             data.tags             || [],
      fecha_generacion: data.fecha_generacion || '',
      imagen_url:       data.imagen_url       || '',
      fuente_nombre:    data.fuente_nombre    || '',
      puntuacion:       data.puntuacion       || data.puntuacion_editor || 0,
      // Primeras 300 chars del cuerpo para snippet
      snippet:          (data.cuerpo || '').slice(0, 300),
    })
  } catch (e) {
    console.warn(`[search-index] error leyendo ${archivo}:`, e.message)
  }
}

// Ordenar por fecha desc
articulos.sort((a, b) => new Date(b.fecha_generacion) - new Date(a.fecha_generacion))

fs.writeFileSync(OUT, JSON.stringify(articulos))
console.log(`[search-index] ${articulos.length} artículos → public/search-index.json`)
