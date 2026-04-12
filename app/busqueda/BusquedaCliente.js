'use client'
import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Clock, Tag } from 'lucide-react'
import { buscar, cargarIndice } from '../../lib/search'
import { SECCIONES_LABELS, tiempoRelativo, optimizeImage } from '../../lib/utils'

function ResultCard({ art, query }) {
  const label = SECCIONES_LABELS[art.seccion] || art.seccion
  const tiempo = tiempoRelativo(art.fecha_generacion)

  // Resalta el texto coincidente
  function Highlight({ text }) {
    if (!query || !text) return <>{text}</>
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part)
            ? <mark key={i} className="bg-yellow-100 dark:bg-yellow-900/50 text-foreground rounded-sm px-0.5">{part}</mark>
            : part
        )}
      </>
    )
  }

  return (
    <Link href={`/articulo/${art.slug}/`} className="group flex gap-4 py-5 border-b border-border last:border-0 hover:bg-muted/30 -mx-4 px-4 transition-colors rounded-sm">
      {art.imagen_url && (
        <div className="shrink-0 w-24 h-18 overflow-hidden rounded-sm" style={{ height: 72 }}>
          <img
            src={optimizeImage(art.imagen_url, 300)}
            alt={art.titular}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-destructive">{label}</span>
          <span className="text-border">·</span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />{tiempo}
          </span>
          {art.tags?.length > 0 && (
            <>
              <span className="text-border">·</span>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Tag className="w-2.5 h-2.5" />{art.tags[0]}
              </span>
            </>
          )}
        </div>
        <h2 className="font-serif font-bold text-[17px] leading-snug text-foreground group-hover:text-destructive transition-colors mb-1">
          <Highlight text={art.titular} />
        </h2>
        {art.subtitulo && (
          <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
            <Highlight text={art.subtitulo} />
          </p>
        )}
      </div>
    </Link>
  )
}

const SECCIONES_ORDEN = ['el_pais','internacional','economia','sociedad','tecnologia','ciencia','salud','cultura','deportes','opinion']

export default function BusquedaCliente() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const inputRef     = useRef(null)

  const qParam = searchParams.get('q') || ''
  const [query,    setQuery]    = useState(qParam)
  const [indice,   setIndice]   = useState(null)
  const [results,  setResults]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [seccion,  setSeccion]  = useState('')  // filtro por sección

  // Carga el índice al montar
  useEffect(() => {
    cargarIndice().then(idx => {
      setIndice(idx)
      setLoading(false)
    })
  }, [])

  // Re-busca cuando cambia query o sección
  useEffect(() => {
    if (indice === null) return
    let res = buscar(qParam, indice, 60)
    if (seccion) res = res.filter(a => a.seccion === seccion)
    setResults(res)
  }, [qParam, indice, seccion])

  // Actualiza URL al enviar
  function handleSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/busqueda?q=${encodeURIComponent(query.trim())}`)
      setSeccion('')
    }
  }

  // Secciones presentes en resultados
  const seccionesPresentes = [...new Set(results.map(a => a.seccion))]
    .sort((a, b) => SECCIONES_ORDEN.indexOf(a) - SECCIONES_ORDEN.indexOf(b))

  const resultadosFiltrados = seccion
    ? results.filter(a => a.seccion === seccion)
    : results

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Buscador */}
        <form onSubmit={handleSubmit} className="relative flex items-center border-b-[3px] border-foreground pb-4 mb-8">
          <Search className="w-6 h-6 text-muted-foreground mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar noticias, temas…"
            autoFocus
            className="w-full bg-transparent text-2xl sm:text-4xl font-serif font-bold text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); router.push('/busqueda'); inputRef.current?.focus() }}
              className="text-muted-foreground hover:text-foreground text-2xl leading-none ml-3"
              aria-label="Limpiar"
            >
              ×
            </button>
          )}
        </form>

        {/* Estado: cargando índice */}
        {loading && (
          <p className="text-sm text-muted-foreground animate-pulse text-center py-16">Cargando índice…</p>
        )}

        {/* Sin query todavía */}
        {!loading && !qParam && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm mb-6">Ingresa un término para buscar en todas las noticias.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SECCIONES_ORDEN.map(s => (
                <Link
                  key={s}
                  href={`/seccion/${s}/`}
                  className="px-4 py-1.5 rounded-full border border-border text-sm text-foreground hover:bg-foreground hover:text-background transition-colors"
                >
                  {SECCIONES_LABELS[s]}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Resultados */}
        {!loading && qParam && (
          <>
            {/* Header de resultados */}
            <div className="flex items-baseline justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {results.length > 0
                  ? <><span className="font-bold text-foreground">{results.length}</span> resultado{results.length !== 1 ? 's' : ''} para "<span className="italic">{qParam}</span>"</>
                  : <>Sin resultados para "<span className="italic">{qParam}</span>"</>
                }
              </p>
              {seccion && (
                <button onClick={() => setSeccion('')} className="text-[11px] text-destructive hover:underline">
                  Quitar filtro
                </button>
              )}
            </div>

            {/* Filtros por sección */}
            {seccionesPresentes.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {seccionesPresentes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSeccion(prev => prev === s ? '' : s)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide border transition-colors ${
                      seccion === s
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                    }`}
                  >
                    {SECCIONES_LABELS[s] || s}
                    <span className="ml-1 opacity-60">
                      ({results.filter(a => a.seccion === s).length})
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Lista */}
            {resultadosFiltrados.length > 0 ? (
              <div>
                {resultadosFiltrados.map(art => (
                  <ResultCard key={art.slug} art={art} query={qParam} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-muted-foreground text-sm">No hay artículos en esta sección para esa búsqueda.</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
