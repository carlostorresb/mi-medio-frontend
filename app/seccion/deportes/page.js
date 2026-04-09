import { getArticulosPorSeccion, tiempoRelativo } from '../../../lib/articulos'
import DeportesWidget from '../../components/DeportesWidget'
import Link from 'next/link'


export const metadata = { title: 'Deportes — noticia24x7.com' }

function Img({ art, height = 160 }) {
  if (art.imagen_url) return <img src={art.imagen_url} alt={art.titular} style={{ width: '100%', height, objectFit: 'cover', display: 'block' }} />
  return <div style={{ width: '100%', height, background: '#c8c4b8' }} />
}

export default async function DeportesPage() {
  const articulos = await getArticulosPorSeccion('deportes', 20)
  const hero = articulos[0]
  const resto = articulos.slice(1)

  return (
    <div className="container">
      <div style={{ borderBottom: '3px solid #111', marginBottom: 24, paddingBottom: 12 }}>
        <h1 style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111', margin: 0 }}>Deportes</h1>
      </div>

      {/* LAYOUT: NOTICIAS IZQUIERDA + WIDGET DERECHA */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>

        {/* COLUMNA NOTICIAS */}
        <div>
          {hero && (
            <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '2px solid #e0dfd8' }}>
              <Link href={`/articulo/${hero.slug}/`}><Img art={hero} height={280} /></Link>
              <Link href={`/articulo/${hero.slug}/`}>
                <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 700, lineHeight: 1.2, color: '#111', margin: '12px 0 8px' }}>{hero.titular}</h2>
              </Link>
              <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 15, color: '#444', lineHeight: 1.5 }}>{hero.subtitulo}</p>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999', marginTop: 6 }}>{tiempoRelativo(hero.fecha_generacion)}</div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {resto.map(art => (
              <div key={art.slug} style={{ paddingBottom: 16, borderBottom: '1px solid #e0dfd8' }}>
                <Link href={`/articulo/${art.slug}/`}><Img art={art} height={130} /></Link>
                <Link href={`/articulo/${art.slug}/`}>
                  <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 16, fontWeight: 700, lineHeight: 1.25, color: '#111', margin: '8px 0 4px' }}>{art.titular}</h3>
                </Link>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999' }}>{tiempoRelativo(art.fecha_generacion)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WIDGET SIDEBAR */}
        <div style={{ position: 'sticky', top: 20 }}>
          <DeportesWidget />
        </div>
      </div>
    </div>
  )
}
