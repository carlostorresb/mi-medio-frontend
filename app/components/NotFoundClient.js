'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, ArrowRight } from 'lucide-react'

function DisconnectedPlug() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M-10 180 C 40 180, 70 140, 110 145 C 130 147, 145 155, 160 155" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M-10 180 C 40 180, 70 140, 110 145 C 130 147, 145 155, 160 155" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      <path d="M155 135 L195 135 C198 135 200 137 200 140 L200 170 C200 173 198 175 195 175 L155 175 C152 175 150 173 150 170 L150 140 C150 137 152 135 155 135 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.05" />
      <path d="M160 135 L160 175" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M165 135 L165 175" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M155 140 L195 140" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M155 145 L195 145" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M155 150 L195 150" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M155 155 L195 155" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M155 160 L195 160" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M155 165 L195 165" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M155 170 L195 170" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M200 145 L215 145" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M200 165 L215 165" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M210 143 L210 147" stroke="currentColor" strokeWidth="1" />
      <path d="M210 163 L210 167" stroke="currentColor" strokeWidth="1" />
      <path d="M245 130 L285 130 C288 130 290 132 290 135 L290 175 C290 178 288 180 285 180 L245 180 C242 180 240 178 240 175 L240 135 C240 132 242 130 245 130 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.05" />
      <path d="M280 130 L280 180" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M275 130 L275 180" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M245 135 L285 135" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M245 140 L285 140" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M245 145 L285 145" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M245 150 L285 150" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M245 155 L285 155" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M245 160 L285 160" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M245 165 L285 165" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M245 170 L285 170" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M245 175 L285 175" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <rect x="240" y="142" width="8" height="6" rx="1" fill="currentColor" />
      <rect x="240" y="162" width="8" height="6" rx="1" fill="currentColor" />
      <path d="M290 155 C 310 155, 330 140, 360 145 C 390 150, 400 180, 410 180" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M290 155 C 310 155, 330 140, 360 145 C 390 150, 400 180, 410 180" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
      <path d="M220 135 L225 145 L220 155 L230 160 L225 170" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M235 130 L230 140 L235 150 L225 165" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="228" cy="125" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="218" cy="128" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="232" cy="175" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="222" cy="180" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="225" cy="150" r="2" fill="currentColor" opacity="0.9" />
    </svg>
  )
}

function BrokenMagnifier() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M220 180 L280 240" stroke="currentColor" strokeWidth="24" strokeLinecap="round" opacity="0.1" />
      <path d="M220 180 L280 240" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
      <g opacity="0.4">
        <line x1="225" y1="185" x2="235" y2="175" stroke="currentColor" strokeWidth="1" />
        <line x1="235" y1="195" x2="245" y2="185" stroke="currentColor" strokeWidth="1" />
        <line x1="245" y1="205" x2="255" y2="195" stroke="currentColor" strokeWidth="1" />
        <line x1="255" y1="215" x2="265" y2="205" stroke="currentColor" strokeWidth="1" />
        <line x1="265" y1="225" x2="275" y2="215" stroke="currentColor" strokeWidth="1" />
        <line x1="275" y1="235" x2="285" y2="225" stroke="currentColor" strokeWidth="1" />
        <line x1="215" y1="185" x2="225" y2="195" stroke="currentColor" strokeWidth="1" />
        <line x1="225" y1="195" x2="235" y2="205" stroke="currentColor" strokeWidth="1" />
        <line x1="235" y1="205" x2="245" y2="215" stroke="currentColor" strokeWidth="1" />
        <line x1="245" y1="215" x2="255" y2="225" stroke="currentColor" strokeWidth="1" />
        <line x1="255" y1="225" x2="265" y2="235" stroke="currentColor" strokeWidth="1" />
      </g>
      <path d="M205 165 L225 185" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      <path d="M210 160 L230 180" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="150" cy="110" r="75" stroke="currentColor" strokeWidth="8" />
      <circle cx="150" cy="110" r="80" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="150" cy="110" r="70" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <text x="135" y="135" fontSize="70" fontFamily="serif" fontWeight="bold" fill="currentColor" opacity="0.05">?</text>
      <path d="M95 75 C 110 60, 130 55, 150 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
      <path d="M105 85 C 115 75, 125 70, 140 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
      <path d="M150 110 L90 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M150 110 L190 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M150 110 L210 150" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M150 110 L110 170" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M150 110 L80 130" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M120 85 L140 70" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M170 80 L190 90" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M180 130 L160 150" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M130 140 L100 150" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M110 100 L90 110" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <path d="M150 110 L160 130 L180 135" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M140 190 L150 205 L135 210 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M165 215 L170 225 L160 220 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
      <path d="M120 225 L125 235 L115 230 Z" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
      <path d="M185 180 L195 190 L180 195 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <line x1="145" y1="180" x2="145" y2="185" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="165" y1="205" x2="165" y2="210" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="120" y1="215" x2="120" y2="220" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  )
}

function TornNewspaper() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <g transform="translate(40, 30) rotate(-2)">
        <path d="M0 0 L140 0 L145 20 L135 40 L148 60 L138 80 L145 100 L135 120 L148 140 L138 160 L145 180 L135 200 L148 220 L140 240 L0 240 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.03" />
        <rect x="15" y="15" width="110" height="25" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
        <path d="M20 25 L120 25" stroke="currentColor" strokeWidth="4" />
        <path d="M20 32 L100 32" stroke="currentColor" strokeWidth="2" />
        <line x1="15" y1="48" x2="125" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="15" y1="52" x2="125" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="15" y1="70" x2="110" y2="70" stroke="currentColor" strokeWidth="6" />
        <line x1="15" y1="82" x2="90" y2="82" stroke="currentColor" strokeWidth="6" />
        <rect x="15" y="100" width="60" height="50" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
        <line x1="15" y1="100" x2="75" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="75" y1="100" x2="15" y2="150" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <line x1="15" y1="165" x2="70" y2="165" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="15" y1="175" x2="65" y2="175" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="15" y1="185" x2="70" y2="185" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="15" y1="195" x2="50" y2="195" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="15" y1="205" x2="70" y2="205" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="15" y1="215" x2="60" y2="215" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="100" x2="130" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="110" x2="125" y2="110" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="120" x2="135" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="130" x2="120" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="140" x2="130" y2="140" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="150" x2="125" y2="150" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="160" x2="135" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="170" x2="120" y2="170" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="180" x2="130" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="85" y1="190" x2="125" y2="190" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="70" y1="0" x2="70" y2="240" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
      </g>
      <g transform="translate(190, 40) rotate(4)">
        <path d="M20 0 L160 0 L160 240 L15 240 L25 220 L12 200 L25 180 L15 160 L28 140 L15 120 L25 100 L12 80 L25 60 L15 40 L28 20 Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.03" />
        <rect x="35" y="15" width="110" height="25" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
        <path d="M40 25 L130 25" stroke="currentColor" strokeWidth="4" />
        <path d="M40 32 L110 32" stroke="currentColor" strokeWidth="2" />
        <line x1="30" y1="48" x2="145" y2="48" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="52" x2="145" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="35" y1="70" x2="140" y2="70" stroke="currentColor" strokeWidth="6" />
        <line x1="30" y1="82" x2="120" y2="82" stroke="currentColor" strokeWidth="6" />
        <line x1="28" y1="100" x2="80" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="22" y1="110" x2="75" y2="110" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="25" y1="120" x2="80" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="32" y1="130" x2="75" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="25" y1="140" x2="80" y2="140" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="22" y1="150" x2="70" y2="150" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="28" y1="160" x2="80" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="35" y1="170" x2="75" y2="170" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="22" y1="180" x2="80" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="28" y1="190" x2="60" y2="190" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="25" y1="200" x2="80" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="32" y1="210" x2="75" y2="210" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="28" y1="220" x2="80" y2="220" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="100" x2="145" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="110" x2="140" y2="110" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="120" x2="145" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="130" x2="135" y2="130" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="140" x2="145" y2="140" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="150" x2="140" y2="150" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="160" x2="145" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="170" x2="135" y2="170" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="180" x2="145" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="95" y1="190" x2="140" y2="190" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <line x1="90" y1="0" x2="90" y2="240" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" opacity="0.1" />
      </g>
      <path d="M175 120 L180 125 L172 128 Z" fill="currentColor" opacity="0.2" />
      <path d="M185 160 L190 155 L188 165 Z" fill="currentColor" opacity="0.2" />
      <path d="M168 190 L172 185 L175 192 Z" fill="currentColor" opacity="0.2" />
    </svg>
  )
}

const variants = [
  { illustration: DisconnectedPlug, title: 'Conexión perdida',  subtitle: 'La página que buscas no está conectada a nuestro servidor.', detail: 'Parece que el cable se desconectó entre tú y esta historia.' },
  { illustration: BrokenMagnifier, title: 'Sin resultados',    subtitle: 'Nuestra lupa de investigación no encontró esta página.',      detail: 'Ni el mejor periodista de investigación pudo rastrearla.' },
  { illustration: TornNewspaper,   title: 'Edición agotada',   subtitle: 'Esta página fue arrancada de nuestra edición.',               detail: 'El contenido que buscas ya no está disponible en este ejemplar.' },
]

export default function NotFoundClient() {
  // Se elige al azar en el cliente al montar — cada visita muestra uno distinto
  const [current] = useState(() => variants[Math.floor(Math.random() * variants.length)])
  const Illustration = current.illustration

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-16">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="text-foreground/80 w-full max-w-[320px] mx-auto md:max-w-none">
            <Illustration />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <div className="font-serif text-8xl md:text-9xl font-black text-destructive leading-none mb-6">404</div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3 uppercase tracking-tight">{current.title}</h1>
            <p className="text-lg text-foreground/80 font-medium mb-2">{current.subtitle}</p>
            <p className="text-sm text-muted-foreground font-serif italic mb-10">{current.detail}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-destructive transition-colors">
                <Home className="w-4 h-4" /> Ir al inicio
              </Link>
              <Link href="/busqueda" className="inline-flex items-center justify-center gap-2 border-2 border-border text-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-sm hover:border-foreground transition-colors">
                Buscar noticias <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-20 pt-6 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Error 404 — Página no encontrada</span>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
            <span>Noticias 24/7 sigue transmitiendo</span>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
