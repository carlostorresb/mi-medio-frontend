'use client'
import { useEffect, useState } from 'react'

const DATOS_BASE = [
  { cat: 'Divisa',        name: 'Dólar / Sol peruano', val: 3.72,   chg: -0.004, pct: -0.11, hist: [3.75,3.74,3.73,3.73,3.72,3.71,3.72],              up: false, fmt: 'sol' },
  { cat: 'Bolsa de Lima', name: 'Índice General BVL',  val: 23847,  chg:  142,   pct:  0.60, hist: [23200,23350,23500,23620,23700,23780,23847],          up: true,  fmt: 'int' },
  { cat: 'Bolsa EE.UU.',  name: 'S&P 500',             val: 5204,   chg:  -88,   pct: -1.67, hist: [5420,5380,5340,5290,5260,5230,5204],                 up: false, fmt: 'int' },
  { cat: 'Bolsa EE.UU.',  name: 'Nasdaq Composite',    val: 16142,  chg: -315,   pct: -1.91, hist: [17100,16900,16700,16550,16400,16280,16142],           up: false, fmt: 'int' },
  { cat: 'Energía',       name: 'Petróleo WTI',        val: 61.42,  chg:  -2.18, pct: -3.43, hist: [67,66,65,64,63,62,61.42],                            up: false, fmt: 'usd' },
  { cat: 'Metales',       name: 'Oro (troy oz)',        val: 3118,   chg:   34,   pct:  1.10, hist: [3020,3050,3070,3085,3095,3108,3118],                 up: true,  fmt: 'usd' },
]

function formatVal(val, fmt) {
  if (fmt === 'sol') return 'S/ ' + val.toFixed(2)
  if (fmt === 'usd') return 'US$ ' + val.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return val.toLocaleString('en')
}

function Sparkline({ hist, up }) {
  const w = 80, h = 28
  const min = Math.min(...hist), max = Math.max(...hist), range = max - min || 1
  const pts = hist.map((v, i) => {
    const x = (i / (hist.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 6) - 3
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  const lv = hist[hist.length - 1]
  const ly = h - ((lv - min) / range) * (h - 6) - 3

  // Fill gradient area under line
  const firstPt = hist.map((v, i) => {
    const x = (i / (hist.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 6) - 3
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const fillPts = `0,${h} ` + firstPt.join(' ') + ` ${w},${h}`

  const strokeCol = up ? '#16a34a' : '#dc2626'
  const fillCol   = up ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.08)'

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', marginTop: 8 }}>
      <polygon points={fillPts} fill={fillCol} />
      <polyline points={pts} fill="none" stroke={strokeCol} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={w} cy={ly.toFixed(1)} r="2.5" fill={strokeCol} />
    </svg>
  )
}

function TickerItem({ d }) {
  const col = d.up ? '#16a34a' : '#dc2626'
  return (
    <div className="flex items-center gap-2 px-5 border-r border-neutral-200 dark:border-neutral-700 h-9 shrink-0">
      <span className="text-[10px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400 uppercase whitespace-nowrap">
        {d.name}
      </span>
      <span className="text-[12px] font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
        {formatVal(d.val, d.fmt)}
      </span>
      <span className="text-[11px] font-semibold whitespace-nowrap" style={{ color: col }}>
        {d.up ? '▲' : '▼'} {Math.abs(d.pct).toFixed(2)}%
      </span>
    </div>
  )
}

export default function MercadosWidget() {
  const [datos, setDatos]     = useState(DATOS_BASE)
  const [hora, setHora]       = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      try {
        const r = await fetch('/api/mercados')
        const json = await r.json()
        if (json.datos && json.datos.length > 0) {
          setDatos(json.datos)
          if (json.hora) setHora(new Date(json.hora))
        }
      } catch (e) {
        // usa datos base si falla
      } finally {
        setCargando(false)
      }
    }
    cargar()
    const t = setInterval(cargar, 15 * 60 * 1000)
    return () => clearInterval(t)
  }, [])

  const horaStr = hora
    ? hora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }) + ' ET'
    : ''

  return (
    <div className="border-t-[3px] border-foreground">
      {/* ── Ticker scrolling ── */}
      <style>{`
        @keyframes mktscroll { 0% { transform:translateX(0) } 100% { transform:translateX(-50%) } }
        .mkt-track { display:flex; white-space:nowrap; animation:mktscroll 36s linear infinite; will-change:transform; }
        .mkt-track:hover { animation-play-state:paused; }
      `}</style>
      <div className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 overflow-hidden h-9 flex items-center">
        <div className="mkt-track">
          {[...datos, ...datos].map((d, i) => <TickerItem key={i} d={d} />)}
        </div>
      </div>

      {/* ── Widget header ── */}
      <div className="flex items-baseline justify-between px-5 py-3 border-b-2 border-foreground bg-background">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-foreground">
            Mercados al cierre
          </span>
          {cargando && (
            <span className="text-[9px] text-muted-foreground animate-pulse">· actualizando…</span>
          )}
        </div>
        {horaStr && (
          <span className="text-[10px] text-muted-foreground tabular-nums">{horaStr}</span>
        )}
      </div>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 divide-x divide-y divide-neutral-200 dark:divide-neutral-700 bg-neutral-50 dark:bg-neutral-900/60">
        {datos.map((d, i) => {
          const up    = d.up
          const col   = up ? '#16a34a' : '#dc2626'
          const bgBadge = up
            ? 'rgba(22,163,74,0.10)'
            : 'rgba(220,38,38,0.10)'

          return (
            <div key={i} className="px-5 py-4">
              <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-0.5">
                {d.cat}
              </div>
              <div className="text-[13px] text-foreground font-medium mb-3 leading-tight">
                {d.name}
              </div>

              <div className="text-[22px] font-light text-foreground leading-none mb-2 tabular-nums tracking-tight">
                {formatVal(d.val, d.fmt)}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-bold px-1.5 py-0.5 rounded-sm"
                  style={{ color: col, background: bgBadge }}
                >
                  {up ? '▲' : '▼'} {Math.abs(d.pct).toFixed(2)}%
                </span>
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  {d.chg >= 0 ? '+' : ''}{typeof d.chg === 'number' && !Number.isInteger(d.chg) ? d.chg.toFixed(2) : d.chg} hoy
                </span>
              </div>

              <Sparkline hist={d.hist.length > 1 ? d.hist : [d.val, d.val]} up={up} />
            </div>
          )
        })}
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between px-5 py-2 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/60">
        <span className="text-[10px] text-muted-foreground">Datos con retraso de 15 min</span>
        <span className="text-[10px] text-muted-foreground">Fuente: Yahoo Finance</span>
      </div>
    </div>
  )
}
