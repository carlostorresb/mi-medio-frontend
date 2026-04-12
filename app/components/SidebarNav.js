'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Home, Landmark, TrendingUp, Cpu, Palette, Microscope, MessageSquare, Globe, Heart, Dumbbell } from 'lucide-react'
import Link from 'next/link'

const NAV_ITEMS = [
  { name: 'Inicio',        href: '/',                     icon: Home },
  { name: 'El País',       href: '/seccion/el_pais/',     icon: Landmark },
  { name: 'Internacional', href: '/seccion/internacional/', icon: Globe },
  { name: 'Economía',      href: '/seccion/economia/',    icon: TrendingUp },
  { name: 'Tecnología',    href: '/seccion/tecnologia/',  icon: Cpu },
  { name: 'Cultura',       href: '/seccion/cultura/',     icon: Palette },
  { name: 'Ciencia',       href: '/seccion/ciencia/',     icon: Microscope },
  { name: 'Salud',         href: '/seccion/salud/',       icon: Heart },
  { name: 'Deportes',      href: '/seccion/deportes/',    icon: Dumbbell },
  { name: 'Opinión',       href: '/seccion/opinion/',     icon: MessageSquare },
]

export function SidebarNav({ isOpen, onClose }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-[101] w-full max-w-sm flex shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navegación principal"
          >
            {/* Icon strip */}
            <div className="w-16 bg-background border-r border-border flex flex-col items-center py-4 flex-shrink-0">
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors mb-8"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col gap-4 w-full px-2">
                {NAV_ITEMS.map(item => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-[#727272] hover:text-foreground hover:bg-muted transition-all duration-200 group"
                      aria-label={item.name}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Expanded panel */}
            <div className="flex-grow bg-background border-r border-border overflow-y-auto">
              <div className="p-8">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
                  Secciones
                </h2>
                <nav className="flex flex-col space-y-6">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="font-serif text-2xl md:text-3xl font-bold text-foreground hover:text-destructive transition-colors block"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-16 pt-8 border-t border-border"
                >
                  <div className="space-y-4 mb-8">
                    <Link href="/" onClick={onClose} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors block">
                      Sobre nosotros
                    </Link>
                    <Link href="/" onClick={onClose} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors block">
                      Contacto
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
