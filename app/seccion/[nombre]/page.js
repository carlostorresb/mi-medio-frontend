import { getArticulosPorSeccion, tiempoRelativo, SECCIONES_LABELS } from '../../../lib/articulos'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { nombre } = await params
  const label = SECCIONES_LABELS[nombre] || nombre
  return {
    title: `${label} — noticia24x7.com`,
    description: `Últimas noticias de ${label} en noticia24x7.com`,
  }
}

function Img({ art, height = 200 }) {
  if (art.imagen_url) return <img src={art.imagen_url} alt={art.titular} style={{ width: '100%', height, objectFit: 'cover', display: 'block' }} />
  return <div style={{ width: '100%', height, background: '#c8c4b8' }} />
}

export default async function SeccionPage({ params }) {
  const { nombre } = await params
  const label = SECCIONES_LABELS[nombre]
  if (!label) notFound()

  const articulos = await getArticulosPorSeccion(nombre, 40)
  const hero = articulos[0]
  const secundarios = articulos.slice(1, 4)
  const resto = articulos.slice(4)

  return (
    <div className="container">
      <div style={{ borderBottom: '3px solid #111', marginBottom: 24, paddingBottom: 12, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#111', margin: 0 }}>{label}</h1>
        <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999' }}>{articulos.length} artículos</span>
      </div>

      {articulos.length === 0 ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--body-serif)', fontSize: 16, color: 'var(--mid)' }}>No hay artículos en esta sección por el momento.</p>
          <Link href="/" style={{ marginTop: 16, display: 'inline-block', fontFamily: 'Inter,sans-serif', fontSize: 12 }}>← Volver a la portada</Link>
        </div>
      ) : (
        <>
          {/* HERO + 3 SECUNDARIOS */}
          {hero && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginBottom: 32, paddingBottom: 32, borderBottom: '2px solid #e0dfd8' }}>
              <div style={{ borderRight: '1px solid #e0dfd8', paddingRight: 32 }}>
                <Link href={`/articulo/${hero.slug}/`}><Img art={hero} height={300} /></Link>
                <Link href={`/articulo/${hero.slug}/`}>
                  <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 700, lineHeight: 1.2, color: '#111', margin: '12px 0 8px' }}>{hero.titular}</h2>
                </Link>
                <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 15, color: '#444', lineHeight: 1.6, margin: '0 0 8px' }}>{hero.subtitulo}</p>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999' }}>{tiempoRelativo(hero.fecha_generacion)}</div>
              </div>
              <div>
                {secundarios.map((art, i) => (
                  <div key={art.slug} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < secundarios.length - 1 ? '1px solid #e0dfd8' : 'none' }}>
                    {art.imagen_url && <Link href={`/articulo/${art.slug}/`}><Img art={art} height={120} /></Link>}
                    <Link href={`/articulo/${art.slug}/`}>
                      <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 17, fontWeight: 700, lineHeight: 1.25, color: '#111', margin: '8px 0 4px' }}>{art.titular}</h3>
                    </Link>
                    <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 13, color: '#555', lineHeight: 1.4, margin: '0 0 4px' }}>{art.subtitulo}</p>
                    <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999' }}>{tiempoRelativo(art.fecha_generacion)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GRID RESTO */}
          {resto.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
              {resto.map(art => (
                <div key={art.slug} style={{ paddingBottom: 20, borderBottom: '1px solid #e0dfd8' }}>
                  {art.imagen_url && <Link href={`/articulo/${art.slug}/`}><Img art={art} height={160} /></Link>}
                  <Link href={`/articulo/${art.slug}/`}>
                    <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 17, fontWeight: 700, lineHeight: 1.25, color: '#111', margin: '10px 0 6px' }}>{art.titular}</h3>
                  </Link>
                  <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 13, color: '#555', lineHeight: 1.4, margin: '0 0 6px' }}>{art.subtitulo}</p>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#999' }}>{tiempoRelativo(art.fecha_generacion)}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
