import { getArticulos, tiempoRelativo, SECCIONES_LABELS } from '../lib/articulos'
import Link from 'next/link'

function Img({ art, h = 220 }) {
  if (art?.imagen_url) {
    return (
      <img
        src={art.imagen_url}
        alt={art.titular || ''}
        referrerPolicy="no-referrer-when-downgrade"
        style={{ width: '100%', height: h, objectFit: 'cover', display: 'block', background: '#d4d0c8' }}
      />
    )
  }
  return (
    <div style={{ width: '100%', height: h, background: '#d4d0c8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#a0a09a', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Sin imagen</span>
    </div>
  )
}

function SecLabel({ sec, style = {} }) {
  return (
    <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#004590', ...style }}>
      {SECCIONES_LABELS[sec] || sec}
    </span>
  )
}

function SectionHead({ sec }) {
  return (
    <div style={{ borderTop: '3px solid #111', paddingTop: 8, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111' }}>
        {SECCIONES_LABELS[sec] || sec}
      </span>
      <Link href={`/seccion/${sec}/`} style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#004590', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Ver todo →
      </Link>
    </div>
  )
}

function Hero({ art }) {
  if (!art) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 0, borderBottom: '1px solid #d0cfc8', paddingBottom: 24, marginBottom: 24 }}>
      <div style={{ borderRight: '1px solid #d0cfc8', paddingRight: 24 }}>
        <Link href={`/articulo/${art.slug}/`}>
          <Img art={art} h={380} />
        </Link>
      </div>
      <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <SecLabel sec={art.seccion} style={{ marginBottom: 10, display: 'block' }} />
        <Link href={`/articulo/${art.slug}/`}>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 30, fontWeight: 700, lineHeight: 1.15, color: '#111', margin: '0 0 14px', letterSpacing: '-0.3px' }}>
            {art.titular}
          </h2>
        </Link>
        <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 15, color: '#444', lineHeight: 1.6, margin: '0 0 14px', fontWeight: 300, paddingBottom: 8 }}>
          {art.subtitulo}
        </p>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: '#999' }}>
          {tiempoRelativo(art.fecha_generacion)}
        </span>
      </div>
    </div>
  )
}

function CardMedia({ art, showImg = true, imgH = 160 }) {
  if (!art) return null
  return (
    <div style={{ paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid #e8e7e0' }}>
      {showImg && (
        <Link href={`/articulo/${art.slug}/`}>
          <Img art={art} h={imgH} />
        </Link>
      )}
      <SecLabel sec={art.seccion} style={{ marginTop: showImg ? 8 : 0, marginBottom: 5, display: 'block' }} />
      <Link href={`/articulo/${art.slug}/`}>
        <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 17, fontWeight: 700, lineHeight: 1.25, color: '#111', margin: '0 0 5px' }}>
          {art.titular}
        </h3>
      </Link>
      {art.subtitulo && (
        <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 13, color: '#555', lineHeight: 1.4, margin: '0 0 5px', fontWeight: 300 }}>
          {art.subtitulo}
        </p>
      )}
      <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#aaa' }}>
        {tiempoRelativo(art.fecha_generacion)}
      </span>
    </div>
  )
}

function ItemLista({ art, num }) {
  if (!art) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: num ? '28px 1fr' : '1fr', gap: 8, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #e8e7e0' }}>
      {num && <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 700, color: '#d0cfc8', lineHeight: 1 }}>{num}</span>}
      <div>
        <Link href={`/articulo/${art.slug}/`}>
          <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 14, fontWeight: 700, lineHeight: 1.3, color: '#111', margin: '0 0 3px' }}>
            {art.titular}
          </p>
        </Link>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#aaa' }}>
          {tiempoRelativo(art.fecha_generacion)}
        </span>
      </div>
    </div>
  )
}

function ItemHoriz({ art }) {
  if (!art) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: 12, paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid #e8e7e0', alignItems: 'start' }}>
      <div>
        <Link href={`/articulo/${art.slug}/`}>
          <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 14, fontWeight: 700, lineHeight: 1.3, color: '#111', margin: '0 0 4px' }}>
            {art.titular}
          </p>
        </Link>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: '#aaa' }}>
          {tiempoRelativo(art.fecha_generacion)}
        </span>
      </div>
      <Link href={`/articulo/${art.slug}/`}>
        <Img art={art} h={60} />
      </Link>
    </div>
  )
}

export default async function Portada() {
  const todos = await getArticulos(200)
  const s = (sec, n = 6) => todos.filter(a => a.seccion === sec).slice(0, n)
  const hero = todos[0]
  const segundos = todos.slice(1, 4)
  const recientes = todos.slice(0, 10)

  return (
    <>
      {todos.length > 0 && (
        <div style={{ background: '#fff', borderBottom: '1px solid #d0cfc8', borderTop: '1px solid #d0cfc8' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'stretch' }}>
            <div style={{ background: '#be1a1a', color: '#fff', padding: '9px 16px', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', fontFamily: "'Inter',sans-serif" }}>
              Última Hora
            </div>
            <div style={{ padding: '9px 20px', fontSize: 12, color: '#333', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontFamily: "'Source Serif 4',Georgia,serif" }}>
              {todos.slice(0, 5).map(a => a.titular).join(' · ')}
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 0 }}>
          {/* COLUMNA PRINCIPAL */}
          <div style={{ paddingRight: 28, borderRight: '1px solid #d0cfc8' }}>
            {hero && <Hero art={hero} />}

            {segundos.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, borderBottom: '1px solid #d0cfc8', paddingBottom: 24, marginBottom: 24 }}>
                {segundos.map((art, i) => (
                  <div key={art.slug} style={{ padding: '0 20px', borderRight: i < 2 ? '1px solid #d0cfc8' : 'none' }}>
                    <CardMedia art={art} imgH={140} />
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, borderBottom: '1px solid #d0cfc8', paddingBottom: 24, marginBottom: 24 }}>
              {['el_pais', 'internacional', 'economia'].map((sec, i) => (
                <div key={sec} style={{ padding: '0 20px', borderRight: i < 2 ? '1px solid #d0cfc8' : 'none' }}>
                  <SectionHead sec={sec} />
                  {s(sec)[0] && <CardMedia art={s(sec)[0]} imgH={150} />}
                  {s(sec).slice(1, 4).map(art => <ItemLista key={art.slug} art={art} />)}
                </div>
              ))}
            </div>

            {s('sociedad').length > 0 && (
              <div style={{ borderBottom: '1px solid #d0cfc8', paddingBottom: 24, marginBottom: 24 }}>
                <SectionHead sec="sociedad" />
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 0 }}>
                  <div style={{ paddingRight: 20, borderRight: '1px solid #d0cfc8' }}>
                    {s('sociedad')[0] && <CardMedia art={s('sociedad')[0]} imgH={200} />}
                  </div>
                  <div style={{ padding: '0 20px', borderRight: '1px solid #d0cfc8' }}>
                    {s('sociedad')[1] && <CardMedia art={s('sociedad')[1]} imgH={130} />}
                    {s('sociedad')[2] && <ItemLista art={s('sociedad')[2]} />}
                  </div>
                  <div style={{ paddingLeft: 20 }}>
                    {s('sociedad')[3] && <CardMedia art={s('sociedad')[3]} imgH={130} />}
                    {s('sociedad')[4] && <ItemLista art={s('sociedad')[4]} />}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderBottom: '1px solid #d0cfc8', paddingBottom: 24, marginBottom: 24 }}>
              {['tecnologia', 'ciencia'].map((sec, i) => (
                <div key={sec} style={{ padding: '0 20px', borderRight: i === 0 ? '1px solid #d0cfc8' : 'none' }}>
                  <SectionHead sec={sec} />
                  {s(sec)[0] && <CardMedia art={s(sec)[0]} imgH={160} />}
                  {s(sec).slice(1, 4).map(art => <ItemLista key={art.slug} art={art} />)}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderBottom: '1px solid #d0cfc8', paddingBottom: 24, marginBottom: 24 }}>
              {['salud', 'cultura'].map((sec, i) => (
                <div key={sec} style={{ padding: '0 20px', borderRight: i === 0 ? '1px solid #d0cfc8' : 'none' }}>
                  <SectionHead sec={sec} />
                  {s(sec)[0] && <CardMedia art={s(sec)[0]} imgH={150} />}
                  {s(sec).slice(1, 3).map(art => <ItemLista key={art.slug} art={art} />)}
                </div>
              ))}
            </div>

            {s('deportes').length > 0 && (
              <div style={{ borderBottom: '1px solid #d0cfc8', paddingBottom: 24, marginBottom: 24 }}>
                <SectionHead sec="deportes" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
                  {s('deportes', 4).map((art, i) => (
                    <div key={art.slug} style={{ padding: '0 16px', borderRight: i < 3 ? '1px solid #d0cfc8' : 'none' }}>
                      <CardMedia art={art} imgH={120} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {s('opinion').length > 0 && (
              <div style={{ paddingBottom: 24, marginBottom: 24 }}>
                <SectionHead sec="opinion" />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0 }}>
                  {s('opinion', 3).map((art, i) => (
                    <div key={art.slug} style={{ padding: '0 20px', borderRight: i < 2 ? '1px solid #d0cfc8' : 'none' }}>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#d0cfc8', marginBottom: 10 }} />
                      <Link href={`/articulo/${art.slug}/`}>
                        <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontSize: 15, fontWeight: 600, lineHeight: 1.3, color: '#111', margin: '0 0 5px' }}>
                          {art.titular}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{ paddingLeft: 24 }}>
            <div style={{ borderTop: '3px solid #111', paddingTop: 8, marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111', margin: '0 0 16px' }}>
                Más Leídas
              </h3>
              {recientes.map((art, i) => (
                <ItemLista key={art.slug} art={art} num={i + 1} />
              ))}
            </div>
            <div style={{ borderTop: '3px solid #111', paddingTop: 8, marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111', margin: '0 0 16px' }}>
                Recientes
              </h3>
              {todos.slice(0, 8).map(art => <ItemHoriz key={art.slug} art={art} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
