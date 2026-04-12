import { getArticulosPorSeccion, tiempoRelativo } from '../../../lib/articulos'
import { optimizeImage } from '../../../lib/utils'
import DeportesWidget from '../../components/DeportesWidget'
import Link from 'next/link'

export const metadata = { title: 'Deportes — noticia24x7.com' }

function Img({ art, width = 600 }) {
  if (art.imagen_url) return (
    <img
      src={optimizeImage(art.imagen_url, width)}
      alt={art.titular}
      loading="lazy"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
    />
  )
  return <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
}

export default async function DeportesPage() {
  const articulos = await getArticulosPorSeccion('deportes', 20)
  const hero = articulos[0]
  const resto = articulos.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-baseline gap-3 border-b-[3px] border-foreground mb-6 pb-3">
        <span className="inline-block w-1.5 h-5 bg-destructive rounded-sm" />
        <h1 className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">Deportes</h1>
      </div>

      {/* LAYOUT: NOTICIAS IZQUIERDA + WIDGET DERECHA */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

        {/* COLUMNA NOTICIAS */}
        <div>
          {hero && (
            <div className="mb-7 pb-7 border-b border-border">
              <Link href={`/articulo/${hero.slug}/`} className="group block relative overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
                <Img art={hero} width={1200} />
              </Link>
              <Link href={`/articulo/${hero.slug}/`} className="group">
                <h2 className="font-serif text-2xl font-bold leading-snug text-foreground group-hover:text-destructive transition-colors mb-2">{hero.titular}</h2>
              </Link>
              {hero.subtitulo && <p className="text-sm text-muted-foreground leading-relaxed">{hero.subtitulo}</p>}
              <div className="text-[10px] text-muted-foreground mt-2">{tiempoRelativo(hero.fecha_generacion)}</div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {resto.map(art => (
              <div key={art.slug} className="group pb-4 border-b border-border">
                <Link href={`/articulo/${art.slug}/`} className="block relative overflow-hidden mb-3 rounded-sm" style={{ aspectRatio: '3/2' }}>
                  <Img art={art} width={600} />
                </Link>
                <Link href={`/articulo/${art.slug}/`}>
                  <h3 className="font-serif text-[16px] font-bold leading-snug text-foreground group-hover:text-destructive transition-colors mb-1">{art.titular}</h3>
                </Link>
                <div className="text-[10px] text-muted-foreground">{tiempoRelativo(art.fecha_generacion)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* WIDGET SIDEBAR */}
        <div className="sticky top-20">
          <DeportesWidget />
        </div>
      </div>
      </div>
    </div>
  )
}
