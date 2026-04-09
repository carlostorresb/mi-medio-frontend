import { getArticulosPorSeccion, tiempoRelativo } from '../../../lib/articulos'
import MercadosWidget from '../../components/MercadosWidget'
import Link from 'next/link'


export const metadata = { title: 'Economía — noticia24x7.com' }

function Img({ art, height = 160 }) {
  if (art.imagen_url) return <img src={art.imagen_url} alt={art.titular} style={{ width: '100%', height, objectFit: 'cover', display: 'block' }} />
  return <div style={{ width: '100%', height, background: '#c8c4b8' }} />
}

export default async function EconomiaPage() {
  const articulos = await getArticulosPorSeccion('economia', 20)
  const hero = articulos[0]
  const resto = articulos.slice(1)

  return (
    <div style={{ background: "#FDF0E6", minHeight: "100vh" }}>
      <div className="container" style={{ background: "#FDF0E6" }}>

        <div style={{ borderBottom: '3px solid #111', marginBottom: 0, paddingBottom: 12, paddingTop: 24 }}>
          <h1 style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111', margin: 0 }}>Economía</h1>
        </div>

        <MercadosWidget />

        <div style={{ marginTop: 32 }}>
          {hero && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginBottom: 32, paddingBottom: 32, borderBottom: '2px solid #d0cfc8' }}>
              <div style={{ borderRight: '1px solid #d0cfc8', paddingRight: 32 }}>
                <Link href={`/articulo/${hero.slug}/`}><Img art={hero} height={260} /></Link>
                <Link href={`/articulo/${hero.slug}/`}>
                  <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 700, lineHeight: 1.2, color: '#111', margin: '12px 0 8px' }}>{hero.titular}</h2>
                </Link>
                <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 15, color: '#444', lineHeight: 1.5 }}>{hero.subtitulo}</p>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999', marginTop: 6 }}>{tiempoRelativo(hero.fecha_generacion)}</div>
              </div>
              <div>
                {articulos.slice(1, 4).map((art, i) => (
                  <div key={art.slug} style={{ paddingBottom: 14, marginBottom: 14, borderBottom: i < 2 ? '1px solid #d0cfc8' : 'none' }}>
                    <Link href={`/articulo/${art.slug}/`}>
                      <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 17, fontWeight: 700, lineHeight: 1.25, color: '#111', margin: '0 0 4px' }}>{art.titular}</h3>
                    </Link>
                    <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 13, color: '#555', margin: '0 0 4px' }}>{art.subtitulo}</p>
                    <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999' }}>{tiempoRelativo(art.fecha_generacion)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resto.length > 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
              {resto.slice(3).map(art => (
                <div key={art.slug} style={{ paddingBottom: 16, borderBottom: '1px solid #d0cfc8' }}>
                  <Link href={`/articulo/${art.slug}/`}><Img art={art} height={140} /></Link>
                  <Link href={`/articulo/${art.slug}/`}>
                    <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 16, fontWeight: 700, lineHeight: 1.25, color: '#111', margin: '8px 0 4px' }}>{art.titular}</h3>
                  </Link>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999' }}>{tiempoRelativo(art.fecha_generacion)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
