'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Link from 'next/link'

const QUICK_LINKS = [
  { name: 'El País',       href: '/seccion/el_pais/' },
  { name: 'Internacional', href: '/seccion/internacional/' },
  { name: 'Economía',      href: '/seccion/economia/' },
  { name: 'Tecnología',    href: '/seccion/tecnologia/' },
  { name: 'Ciencia',       href: '/seccion/ciencia/' },
  { name: 'Deportes',      href: '/seccion/deportes/' },
]

export function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col"
        >
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 flex-grow flex flex-col">
            <form onSubmit={handleSubmit} className="relative flex items-center border-b-2 border-foreground pb-4">
              <Search className="w-8 h-8 text-muted-foreground mr-4 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar noticias, temas..."
                className="w-full bg-transparent text-3xl sm:text-5xl font-serif font-bold text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-0 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Cerrar búsqueda"
              >
                <X className="w-8 h-8" />
              </button>
            </form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mt-12"
            >
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">
                Secciones
              </h3>
              <div className="flex flex-wrap gap-3">
                {QUICK_LINKS.map(cat => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={onClose}
                    className="px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="py-6 text-center text-sm text-muted-foreground border-t border-border mt-auto">
            Presiona ESC para cerrar
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
