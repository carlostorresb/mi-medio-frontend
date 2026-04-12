'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Sun, Moon, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { SidebarNav } from './SidebarNav'
import { SearchOverlay } from './SearchOverlay'
import { PersonalizationMenu } from './PersonalizationMenu'
import { StockTicker } from './StockTicker'

const CATEGORIES = [
  { label: 'El País',       href: '/seccion/el_pais/' },
  { label: 'Internacional', href: '/seccion/internacional/' },
  { label: 'Economía',      href: '/seccion/economia/' },
  { label: 'Sociedad',      href: '/seccion/sociedad/' },
  { label: 'Tecnología',    href: '/seccion/tecnologia/' },
  { label: 'Ciencia',       href: '/seccion/ciencia/' },
  { label: 'Salud',         href: '/seccion/salud/' },
  { label: 'Cultura',       href: '/seccion/cultura/' },
  { label: 'Deportes',      href: '/seccion/deportes/' },
  { label: 'Opinión',       href: '/seccion/opinion/' },
]

const MAX_VISIBLE = 6

function formatDate() {
  const now = new Date()
  const formatted = now.toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function Navigation() {
  const { isDark, toggleTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showOverflow, setShowOverflow] = useState(false)
  const [selectedInterests, setSelectedInterests] = useState([])
  const overflowRef = useRef(null)
  const overflowTriggerRef = useRef(null)

  const hasPersonalization = selectedInterests.length > 0
  const navItems = hasPersonalization
    ? selectedInterests.map(name => ({ label: name, href: `#` }))
    : CATEGORIES

  const visibleItems = navItems.slice(0, MAX_VISIBLE)
  const overflowItems = navItems.slice(MAX_VISIBLE)

  // Close overflow on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        overflowRef.current && !overflowRef.current.contains(e.target) &&
        overflowTriggerRef.current && !overflowTriggerRef.current.contains(e.target)
      ) setShowOverflow(false)
    }
    if (showOverflow) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showOverflow])

  return (
    <>
      <SidebarNav isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ── Utility Toolbar ── */}
      <div className="w-full bg-muted/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Buscar</span>
          </button>

          {/* Right controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
              aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isDark ? 'Claro' : 'Oscuro'}</span>
            </button>

            <div className="w-px h-4 bg-border hidden sm:block" />

            {/* Personalization */}
            <PersonalizationMenu
              selectedInterests={selectedInterests}
              onChangeInterests={setSelectedInterests}
            />

            <div className="w-px h-4 bg-border hidden sm:block" />

            <button className="bg-destructive text-white px-3 py-1 text-xs font-bold rounded-sm hover:bg-destructive/90 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </div>

      {/* ── Logo Strip ── */}
      <div className="w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Date left */}
            <div className="hidden md:block w-1/3">
              <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                {formatDate()}
              </span>
            </div>

            {/* Logo center */}
            <div className="flex flex-col items-center w-full md:w-1/3 text-center">
              <Link href="/" className="block">
                <img
                  src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
                  alt="noticia24x7"
                  className="h-10 md:h-12 w-auto mb-1"
                />
              </Link>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wide">
                Noticias impulsadas por IA
              </span>
            </div>

            {/* Stock ticker right */}
            <div className="hidden md:flex justify-end w-1/3">
              <StockTicker />
            </div>
          </div>

          {/* Mobile: date + ticker below logo */}
          <div className="md:hidden flex items-center justify-between mt-3 pt-3 border-t border-border/50">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
              {formatDate()}
            </span>
            <StockTicker />
          </div>
        </div>
      </div>

      {/* ── Category Nav Bar (sticky) ── */}
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop */}
          <div className="hidden md:flex items-center h-12">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center justify-center w-8 h-8 mr-6 rounded-md text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center space-x-6 flex-grow">
              {visibleItems.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 relative group py-3 flex-shrink-0"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-destructive scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}

              {overflowItems.length > 0 && (
                <div className="relative flex-shrink-0">
                  <button
                    ref={overflowTriggerRef}
                    onClick={() => setShowOverflow(!showOverflow)}
                    className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-3"
                  >
                    +{overflowItems.length}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showOverflow ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showOverflow && (
                      <motion.div
                        ref={overflowRef}
                        initial={{ opacity: 0, y: 4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full right-0 mt-1 bg-background border border-border rounded-lg shadow-xl py-2 min-w-[180px] z-[999]"
                      >
                        {overflowItems.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setShowOverflow(false)}
                            className="block px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center justify-between h-11">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Secciones</span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {CATEGORIES.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.25, ease: 'easeOut' }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-3 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-colors rounded-md"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
