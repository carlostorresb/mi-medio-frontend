'use client'
import { useState, useEffect, useRef } from 'react'

const LIGAS = [
  { id: 'premier',      nombre: 'Premier',      flag: '🏴', thesportsdb: '4328' },
  { id: 'laliga',       nombre: 'La Liga',       flag: '🇪🇸', thesportsdb: '4335' },
  { id: 'seriea',       nombre: 'Serie A',       flag: '🇮🇹', thesportsdb: '4332' },
  { id: 'bundesliga',   nombre: 'Bundesliga',    flag: '🇩🇪', thesportsdb: '4331' },
  { id: 'champions',    nombre: 'Champions',     flag: '🏆', thesportsdb: '4480' },
  { id: 'libertadores', nombre: 'Libertadores',  flag: '🌎', thesportsdb: '4424' },
  { id: 'liga1',        nombre: 'Liga 1 Perú',   flag: '🇵🇪', thesportsdb: '4461' },
]

function initials(name) {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()
}

function stringColor(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
  const colors = ['#D62128','#034694','#C8102E','#6CABDD','#DA291C','#132257','#274488','#EF0107','#1B458F','#7A263A','#003399','#E0191B','#000000','#004D98','#F9A01B']
  return colors[Math.abs(hash) % colors.length]
}

function PartidoCard({ p }) {
  const hs = p.intHomeScore !== null && p.intHomeScore !== '' ? parseInt(p.intHomeScore) : null
  const as_ = p.intAwayScore !== null && p.intAwayScore !== '' ? parseInt(p.intAwayScore) : null
  const jugado = hs !== null && as_ !== null
  const homeWin = jugado && hs > as_
  const awayWin = jugado && as_ > hs
  const fecha = p.dateEvent ? new Date(p.dateEvent).toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }) : ''

  const statusColor = jugado ? '#999' : '#004590'
  const statusText = jugado ? `Final · ${fecha}` : (p.strTime ? `${fecha} ${p.strTime.slice(0,5)}` : fecha)

  return (
    <div style={{ flex: '0 0 160px', scrollSnapAlign: 'start', background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: '10px 12px' }}>
      <div style={{ fontSize: 9, fontWeight: 500, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{statusText}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: stringColor(p.strHomeTeam), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{initials(p.strHomeTeam)}</div>
          <span style={{ fontSize: 12, fontWeight: homeWin ? 600 : 400, color: awayWin ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 90 }}>{p.strHomeTeam}</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: awayWin ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', minWidth: 18, textAlign: 'right' }}>{jugado ? hs : '-'}</span>
      </div>
      <div style={{ height: '0.5px', background: 'var(--color-border-tertiary)', margin: '3px 0' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: stringColor(p.strAwayTeam), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{initials(p.strAwayTeam)}</div>
          <span style={{ fontSize: 12, fontWeight: awayWin ? 600 : 400, color: homeWin ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 90 }}>{p.strAwayTeam}</span>
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: homeWin ? 'var(--color-text-secondary)' : 'var(--color-text-primary)', minWidth: 18, textAlign: 'right' }}>{jugado ? as_ : '-'}</span>
      </div>
    </div>
  )
}

export default function DeportesWidget() {
  const [liga, setLiga] = useState(LIGAS[0])
  const [partidos, setPartidos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [cache, setCache] = useState({})
  const scrollRef = useRef(null)

  useEffect(() => {
    if (cache[liga.id]) {
      setPartidos(cache[liga.id])
      setCargando(false)
      return
    }
    setCargando(true)

    // Llamar directo a TheSportsDB — últimos partidos de la liga
    fetch(`https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${liga.thesportsdb}`)
      .then(r => r.json())
      .then(data => {
        const ev = (data.events || [])
          .filter(e => e.strHomeTeam && e.strAwayTeam)
          .slice(-15)
          .reverse()
        setCache(p => ({ ...p, [liga.id]: ev }))
        setPartidos(ev)
        setCargando(false)
      })
      .catch(() => {
        setPartidos([])
        setCargando(false)
      })
  }, [liga])

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 180, behavior: 'smooth' })
  }

  const tickerItems = partidos
    .filter(p => p.intHomeScore !== null && p.intHomeScore !== '')
    .map(p => `${p.strHomeTeam} ${p.intHomeScore}-${p.intAwayScore} ${p.strAwayTeam}`)

  return (
    <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, overflow: 'hidden', marginBottom: 24 }}>
      <style>{`
        .dep-tabs::-webkit-scrollbar{display:none}
        .dep-scroll::-webkit-scrollbar{display:none}
        @keyframes dep-ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .dep-track{display:flex;white-space:nowrap;animation:dep-ticker 40s linear infinite}
        .dep-track:hover{animation-play-state:paused}
      `}</style>

      <div style={{ background: '#111', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Resultados</span>
        <span style={{ fontSize: 10, color: '#4ade80' }}>● En vivo</span>
      </div>

      {tickerItems.length > 0 && (
        <div style={{ background: '#f8f7f3', borderBottom: '0.5px solid var(--color-border-tertiary)', overflow: 'hidden', height: 28, display: 'flex', alignItems: 'center' }}>
          <div className="dep-track">
            {[...tickerItems, ...tickerItems].map((t, i) => (
              <span key={i} style={{ padding: '0 20px', borderRight: '1px solid #d0cfc8', fontSize: 10, color: '#555' }}>{t}</span>
            ))}
          </div>
        </div>
      )}

      <div className="dep-tabs" style={{ display: 'flex', borderBottom: '0.5px solid var(--color-border-tertiary)', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {LIGAS.map(l => (
          <button key={l.id} onClick={() => setLiga(l)} style={{ padding: '8px 12px', fontSize: 10, fontWeight: 500, background: 'transparent', border: 'none', borderBottom: liga.id === l.id ? '2px solid #111' : '2px solid transparent', color: liga.id === l.id ? '#111' : 'var(--color-text-secondary)', cursor: 'pointer', whiteSpace: 'nowrap', marginBottom: -1 }}>
            {l.flag} {l.nombre}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative' }}>
        <button onClick={() => scroll(-1)} style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>

        <div ref={scrollRef} className="dep-scroll" style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', padding: '12px 36px', gap: 10 }}>
          {cargando ? (
            <div style={{ flex: '0 0 100%', textAlign: 'center', padding: 24, color: 'var(--color-text-secondary)', fontSize: 12 }}>Cargando...</div>
          ) : partidos.length === 0 ? (
            <div style={{ flex: '0 0 100%', textAlign: 'center', padding: 24, color: 'var(--color-text-secondary)', fontSize: 12 }}>Sin partidos disponibles</div>
          ) : partidos.map((p, i) => <PartidoCard key={i} p={p} />)}
        </div>

        <button onClick={() => scroll(1)} style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', width: 28, height: 28, borderRadius: '50%', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
      </div>

      <div style={{ padding: '4px 16px 8px', borderTop: '0.5px solid var(--color-border-tertiary)' }}>
        <span style={{ fontSize: 10, color: 'var(--color-text-secondary)' }}>Fuente: TheSportsDB · Datos con retraso</span>
      </div>
    </div>
  )
}
