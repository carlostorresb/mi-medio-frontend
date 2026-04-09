'use client'
import { useEffect, useState } from 'react'

const DATOS_BASE = [
  {cat:'Divisa',name:'Dólar / Sol peruano',val:3.72,chg:-0.004,pct:-0.11,hist:[3.75,3.74,3.73,3.73,3.72,3.71,3.72],up:false,fmt:'sol'},
  {cat:'Bolsa de Lima',name:'Índice General BVL',val:23847,chg:142,pct:0.60,hist:[23200,23350,23500,23620,23700,23780,23847],up:true,fmt:'int'},
  {cat:'Bolsa EE.UU.',name:'S&P 500',val:5204,chg:-88,pct:-1.67,hist:[5420,5380,5340,5290,5260,5230,5204],up:false,fmt:'int'},
  {cat:'Bolsa EE.UU.',name:'Nasdaq Composite',val:16142,chg:-315,pct:-1.91,hist:[17100,16900,16700,16550,16400,16280,16142],up:false,fmt:'int'},
  {cat:'Energía',name:'Petróleo WTI',val:61.42,chg:-2.18,pct:-3.43,hist:[67,66,65,64,63,62,61.42],up:false,fmt:'usd'},
  {cat:'Metales',name:'Oro (troy oz)',val:3118,chg:34,pct:1.10,hist:[3020,3050,3070,3085,3095,3108,3118],up:true,fmt:'usd'},
]

function formatVal(val, fmt) {
  if (fmt === 'sol') return 'S/ ' + val.toFixed(2)
  if (fmt === 'usd') return 'US$ ' + val.toLocaleString('en', {minimumFractionDigits:2,maximumFractionDigits:2})
  return val.toLocaleString('en')
}

function Sparkline({ hist, up }) {
  const w=90, h=30
  const min=Math.min(...hist), max=Math.max(...hist), range=max-min||1
  const pts=hist.map((v,i)=>{
    const x=(i/(hist.length-1))*w
    const y=h-((v-min)/range)*(h-6)-3
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
  const col=up?'#1a6b3a':'#be1a1a'
  const lv=hist[hist.length-1]
  const ly=h-((lv-min)/range)*(h-6)-3
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:'block',marginTop:8}}>
      <polyline points={pts} fill="none" stroke={col} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" opacity="0.85"/>
      <circle cx={w} cy={ly.toFixed(1)} r="2.5" fill={col}/>
    </svg>
  )
}

export default function MercadosWidget() {
  const [datos, setDatos] = useState(DATOS_BASE)
  const [hora, setHora] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargar() {
      try {
        const r = await fetch('/api/mercados')
        const json = await r.json()
        if (json.datos && json.datos.length > 0) {
          setDatos(json.datos)
          const h = new Date(json.hora)
          setHora(h.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'})+' ET')
        }
      } catch(e) {
        console.error('Error cargando mercados:', e)
      } finally {
        setCargando(false)
      }
    }
    cargar()
    const t = setInterval(cargar, 15 * 60 * 1000) // refresca cada 15 min
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{borderTop:'3px solid #111',marginBottom:24,background:'#f8f7f3'}}>
      <style>{`
        @keyframes mktscroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .mkt-track{display:flex;white-space:nowrap;animation:mktscroll 32s linear infinite}
        .mkt-track:hover{animation-play-state:paused}
      `}</style>

      {/* TICKER */}
      <div style={{background:'#f8f7f3',borderBottom:'1px solid #d0cfc8',borderTop:'1px solid #d0cfc8',overflow:'hidden',height:34,display:'flex',alignItems:'center'}}>
        <div className="mkt-track">
          {[...datos,...datos].map((d,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:8,padding:'0 20px',borderRight:'1px solid #d0cfc8',height:34}}>
              <span style={{fontFamily:'Inter,sans-serif',fontSize:10,fontWeight:600,letterSpacing:'0.06em',color:'#666',textTransform:'uppercase'}}>{d.name}</span>
              <span style={{fontFamily:'Inter,sans-serif',fontSize:12,fontWeight:500,color:'#111'}}>{formatVal(d.val, d.fmt)}</span>
              <span style={{fontFamily:'Inter,sans-serif',fontSize:11,fontWeight:500,color:d.up?'#1a6b3a':'#be1a1a'}}>{d.up?'▲':'▼'} {Math.abs(d.pct).toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* HEADER */}
      <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',padding:'14px 20px 10px',borderBottom:'2px solid #111'}}>
        <span style={{fontFamily:'Inter,sans-serif',fontSize:10,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'#111'}}>
          Mercados al cierre {cargando && <span style={{color:'#999',fontWeight:400}}>· actualizando...</span>}
        </span>
        <span style={{fontFamily:'Inter,sans-serif',fontSize:10,color:'#999'}}>{hora}</span>
      </div>

      {/* GRID */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)'}}>
        {datos.map((d,i)=>{
          const col=d.up?'#1a6b3a':'#be1a1a'
          const borderR=(i+1)%3===0?'none':'1px solid #d0cfc8'
          const borderB=i<3?'1px solid #d0cfc8':'none'
          return (
            <div key={i} style={{padding:'14px 20px',borderRight:borderR,borderBottom:borderB,background:'#f8f7f3'}}>
              <div style={{fontFamily:'Inter,sans-serif',fontSize:9,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'#999',marginBottom:2}}>{d.cat}</div>
              <div style={{fontFamily:'Georgia,serif',fontSize:14,color:'#111',marginBottom:7,lineHeight:1.2}}>{d.name}</div>
              <span style={{fontFamily:'Inter,sans-serif',fontSize:22,fontWeight:400,color:'#111',letterSpacing:'-0.5px',display:'block',marginBottom:3}}>{formatVal(d.val, d.fmt)}</span>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:11,fontWeight:600,color:col}}>{d.up?'▲':'▼'} {Math.abs(d.pct).toFixed(2)}%</span>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:11,color:'#888'}}>{d.chg >= 0 ? '+' : ''}{d.chg} hoy</span>
              </div>
              <Sparkline hist={d.hist.length > 1 ? d.hist : [d.val, d.val]} up={d.up}/>
            </div>
          )
        })}
      </div>

      <div style={{padding:'7px 20px',display:'flex',justifyContent:'space-between',borderTop:'1px solid #d0cfc8',background:'#f8f7f3'}}>
        <span style={{fontFamily:'Inter,sans-serif',fontSize:10,color:'#999'}}>Datos con retraso de 15 min</span>
        <span style={{fontFamily:'Inter,sans-serif',fontSize:10,color:'#999'}}>Fuente: Yahoo Finance</span>
      </div>
    </div>
  )
}
