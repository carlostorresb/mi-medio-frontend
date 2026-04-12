'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { buscar, cargarIndice } from '../../lib/search'
import { SECCIONES_LABELS, tiempoRelativo, optimizeImage } from '../../lib/utils'

const QUICK_LINKS = [
  { name: 'El País',       href: '/seccion/el_pais/' },
  { name: 'Internacional', href: '/seccion/internacional/' },
  { name: 'Economía',      href: '/seccion/economia/' },
  { name: 'Tecnología',    href: '/seccion/tecnologia/' },
  { name: 'Ciencia',       href: '/seccion/ciencia/' },
  { name: 'Deportes',      href: '/seccion/deportes/' },
]

function LiveResult({ art, onClose }) {
  const label = SECCIONES_LABELS[art.seccion] || art.seccion
  return (
    <Link
      href={`/articulo/${art.slug}/`}
      onClick={onClose}
      className="group flex items-start gap-3 py-3 border-b border-border last:border-0 hover:bg-muted/30 rounded-sm -mx-2 px-2 transition-colors"
    >
      {art.imagen_url && (
        <div className="shrink-0 w-14 overflow-hidden rounded-sm" style={{ height: 42 }}>
          <img src={optimizeImage(art.imagen_url, 300)} alt={art.titular} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[9px] font-bold uppercase tracking-wider text-destructive">{label}</span>
          <span className="text-border text-xs">·</span>
          <span className="text-[9px] text-muted-foreground">{tiempoRelativo(art.fecha_generacion)}</span>
        </div>
        <p className="text-[13px] font-serif font-semibold text-foreground group-hover:text-destructive transition-colors line-clamp-2 leading-snug">
          {art.titular}
        </p>
      </div>
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
    </Link>
  )
}

export function SearchOverlay({ isOpen, onClose }) {
  const [query,   setQuery]   = useState('')
  const [indice,  setIndice]  = useState(null)
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const debounceRef = useRef(null)

  // Carga el índice cuando se abre por primera vez
  useEffect(() => {
    if (isOpen && !indice) {
      cargarIndice().then(setIndice)
    }
  }, [isOpen, indice])

  // Busca con debounce mientras se escribe
  useEffect(() => {
    clearTimeout(debounceRef.current)
    if (!query.trim() || !indice) {
      setResults([])
      return
    }
    debounceRef.current = setTimeout(() => {
      setResults(buscar(query, indice, 6))
    }, 200)
    return () => clearTimeout(debounceRef.current)
  }, [query, indice])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/busqueda?q=${encodeURIComponent(query.trim())}`
    }
  }

  const showResults = query.trim().length > 1 && results.length > 0
  const showEmpty   = query.trim().length > 1 && indice && results.length === 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — clic para cerrar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99]"
            style={{ background: 'rgba(0,0,0,0.45)' }}
            onClick={onClose}
          />

          {/* Panel superior */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-[100] border-b border-border shadow-xl"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-5">

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-border pb-4 mb-4">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar noticias, temas…"
                  className="flex-1 bg-transparent text-base sm:text-lg font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <div className="flex items-center gap-1">
                  {query && (
                    <button
                      type="button"
                      onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus() }}
                      className="text-muted-foreground hover:text-foreground text-xl leading-none transition-colors px-1"
                      aria-label="Limpiar"
                    >
                      ×
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors ml-1"
                    aria-label="Cerrar búsqueda"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <AnimatePresence mode="wait">
                {/* Resultados en vivo */}
                {showResults && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.12 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {results.length} resultado{results.length !== 1 ? 's' : ''}
                      </span>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="text-[10px] font-semibold text-destructive hover:underline flex items-center gap-1"
                      >
                        Ver todos <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="divide-y divide-border">
                      {results.map(art => (
                        <LiveResult key={art.slug} art={art} onClose={onClose} />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="mt-3 w-full py-2 border border-border rounded-sm text-[11px] font-semibold text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
                    >
                      Ver todos los resultados para "{query}" →
                    </button>
                  </motion.div>
                )}

                {/* Sin resultados */}
                {showEmpty && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-4 text-center"
                  >
                    <p className="text-muted-foreground text-sm">Sin resultados para "<span className="italic">{query}</span>"</p>
                  </motion.div>
                )}

                {/* Estado inicial — secciones rápidas */}
                {!query && (
                  <motion.div
                    key="initial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-3 flex-wrap"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">
                      Secciones:
                    </span>
                    {QUICK_LINKS.map(cat => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={onClose}
                        className="text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hint ESC */}
              <div className="mt-3 text-[9px] text-muted-foreground/60">
                <kbd className="px-1 py-0.5 rounded bg-muted font-mono mr-1">ESC</kbd> cerrar
                {query && <> · <kbd className="px-1 py-0.5 rounded bg-muted font-mono mx-1">Enter</kbd> ver todos</>}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
