'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings2, X, RotateCcw, Type, Minus, Plus } from 'lucide-react'

const INTEREST_GROUPS = [
  { label: 'Noticias',           items: ['Internacional', 'Política', 'Economía', 'Opinión'] },
  { label: 'Innovación',         items: ['Tecnología', 'Inteligencia Artificial', 'Ciencia', 'Startups', 'Cripto'] },
  { label: 'Entretenimiento',    items: ['Videojuegos', 'Cine y series', 'Música', 'Cultura pop', 'Streaming'] },
  { label: 'Lifestyle',          items: ['Salud', 'Bienestar', 'Viajes', 'Moda', 'Educación'] },
  { label: 'Intereses especiales', items: ['Paranormal', 'Tendencias', 'Redes sociales', 'Medio ambiente'] },
  { label: 'Negocios & Deportes', items: ['Negocios', 'Mercados', 'Deportes', 'Fútbol', 'Motor'] },
]

const DEFAULT_INTERESTS = ['Tecnología', 'Ciencia', 'Inteligencia Artificial']
const FONT_SIZES = [
  { label: 'Pequeña', value: 14 },
  { label: 'Normal',  value: 16 },
  { label: 'Grande',  value: 18 },
  { label: 'Muy grande', value: 20 },
]

export function PersonalizationMenu({ selectedInterests, onChangeInterests }) {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSizeIndex, setFontSizeIndex] = useState(1)
  const menuRef = useRef(null)
  const triggerRef = useRef(null)

  // Close on outside click (desktop)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) setIsOpen(false)
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Lock scroll on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  // Apply font size
  useEffect(() => {
    document.documentElement.style.fontSize = `${FONT_SIZES[fontSizeIndex].value}px`
    return () => { document.documentElement.style.fontSize = '' }
  }, [fontSizeIndex])

  const toggleInterest = (interest) => {
    onChangeInterests(
      selectedInterests.includes(interest)
        ? selectedInterests.filter(i => i !== interest)
        : [...selectedInterests, interest]
    )
  }

  const resetAll = () => {
    onChangeInterests([...DEFAULT_INTERESTS])
    setFontSizeIndex(1)
  }

  const panelContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/30">
        <div>
          <h2 className="font-serif font-bold text-foreground text-base">Personaliza tu experiencia</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Selecciona los temas que más te interesan</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-muted"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Font size */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Type className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Accesibilidad — Tamaño de texto
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFontSizeIndex(Math.max(0, fontSizeIndex - 1))}
            disabled={fontSizeIndex === 0}
            className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="flex-grow">
            <div className="flex justify-between mb-1">
              {FONT_SIZES.map((size, i) => (
                <button
                  key={size.value}
                  onClick={() => setFontSizeIndex(i)}
                  className={`text-[10px] font-medium px-2 py-1 rounded transition-colors ${i === fontSizeIndex ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {size.label}
                </button>
              ))}
            </div>
            <div className="h-1 bg-border rounded-full relative">
              <div
                className="absolute top-0 left-0 h-full bg-foreground rounded-full transition-all duration-200"
                style={{ width: `${(fontSizeIndex / (FONT_SIZES.length - 1)) * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setFontSizeIndex(Math.min(FONT_SIZES.length - 1, fontSizeIndex + 1))}
            disabled={fontSizeIndex === FONT_SIZES.length - 1}
            className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interest Groups */}
      <div className="px-5 py-4 flex-grow overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {INTEREST_GROUPS.map(group => (
            <fieldset key={group.label} className="min-w-0">
              <legend className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                {group.label}
              </legend>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map(interest => {
                  const isSelected = selectedInterests.includes(interest)
                  return (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${isSelected ? 'bg-destructive border-destructive text-white' : 'bg-transparent border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground'}`}
                    >
                      {interest}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border bg-muted/30 flex items-center justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">{selectedInterests.length} temas</span>
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Restablecer
          </button>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="bg-foreground text-background px-5 py-2 text-xs font-bold rounded-md hover:bg-destructive hover:text-white transition-colors"
        >
          Aplicar
        </button>
      </div>
    </>
  )

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 text-xs font-medium transition-colors px-3 py-1.5 rounded-full border ${isOpen ? 'border-destructive text-destructive bg-destructive/5' : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground'}`}
        aria-expanded={isOpen}
      >
        <Settings2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Personalizar</span>
        {selectedInterests.length > 0 && (
          <span className="bg-destructive text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ml-0.5">
            {selectedInterests.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop dropdown */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="hidden md:flex fixed right-4 top-14 w-[680px] max-w-[calc(100vw-2rem)] bg-background border border-border shadow-2xl rounded-lg overflow-hidden flex-col max-h-[80vh] z-[999]"
              role="dialog"
              aria-modal="true"
            >
              {panelContent}
            </motion.div>

            {/* Mobile full-screen */}
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              className="md:hidden fixed inset-0 bg-background flex flex-col z-[999]"
              role="dialog"
              aria-modal="true"
            >
              {panelContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
