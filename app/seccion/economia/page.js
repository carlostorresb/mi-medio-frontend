import { getArticulosPorSeccion, tiempoRelativo } from '../../../lib/articulos'
import { optimizeImage } from '../../../lib/utils'
import MercadosWidget from '../../components/MercadosWidget'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: 'Economía — noticia24x7.com' }

function ArticleImg({ art, fill = false, width = 600, className = '' }) {
  if (!art.imagen_url) {
    return (
      <div className={`bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center ${className}`}>
        <span className="text-[9px] uppercase tracking-widest text-neutral-400">Sin imagen</span>
      </div>
    )
  }
  return (
    <img
      src={optimizeImage(art.imagen_url, width)}
      alt={art.titular}
      loading="lazy"
      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${className}`}
    />
  )
}

function TagBadge({ tag }) {
  return (
    <span className="inline-block text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 rounded-sm">
      {tag}
    </span>
  )
}

function readTime(text = '') {
  const words = text.split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min lectura`
}

/* ── Hero article ───────────────────────────────────────── */
function HeroArticle({ art }) {
  const tiempo = tiempoRelativo(art.fecha_generacion)
  const tag = art.tags?.[0]
  return (
    <Link href={`/articulo/${art.slug}/`} className="group block">
      <article>
        <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
          <ArticleImg art={art} width={1200} className="rounded-sm" />
          {tag && (
            <div className="absolute bottom-3 left-3">
              <TagBadge tag={tag} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">Economía</span>
          <span className="text-border text-xs">·</span>
          <span className="text-[10px] text-muted-foreground">{tiempo}</span>
          {art.cuerpo && (
            <>
              <span className="text-border text-xs">·</span>
              <span className="text-[10px] text-muted-foreground">{readTime(art.cuerpo)}</span>
            </>
          )}
        </div>
        <h2 className="font-serif text-3xl font-bold leading-tight text-foreground group-hover:text-destructive transition-colors duration-200 mb-3">
          {art.titular}
        </h2>
        {art.subtitulo && (
          <p className="text-[15px] text-muted-foreground leading-relaxed line-clamp-3">
            {art.subtitulo}
          </p>
        )}
        {art.fuente_nombre && (
          <div className="mt-4 flex items-center gap-2">
            <span className="w-5 h-px bg-border inline-block" />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{art.fuente_nombre}</span>
          </div>
        )}
      </article>
    </Link>
  )
}

/* ── Compact list article ───────────────────────────────── */
function ListArticle({ art, showBorder = true }) {
  const tiempo = tiempoRelativo(art.fecha_generacion)
  return (
    <Link href={`/articulo/${art.slug}/`} className="group flex gap-3 py-4 first:pt-0">
      <article className={`flex gap-3 w-full ${showBorder ? 'border-b border-border pb-4' : ''}`}>
        {art.imagen_url && (
          <div className="shrink-0 w-20 h-16 overflow-hidden rounded-sm">
            <img
              src={optimizeImage(art.imagen_url, 300)}
              alt={art.titular}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-[15px] font-bold leading-snug text-foreground group-hover:text-destructive transition-colors line-clamp-2 mb-1">
            {art.titular}
          </h3>
          <span className="text-[10px] text-muted-foreground">{tiempo}</span>
        </div>
      </article>
    </Link>
  )
}

/* ── Grid article card ──────────────────────────────────── */
function GridCard({ art }) {
  const tiempo = tiempoRelativo(art.fecha_generacion)
  const tag = art.tags?.[0]
  return (
    <Link href={`/articulo/${art.slug}/`} className="group block">
      <article className="border-t border-border pt-4">
        {art.imagen_url && (
          <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '3/2' }}>
            <img
              src={optimizeImage(art.imagen_url, 600)}
              alt={art.titular}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 rounded-sm"
            />
            {tag && (
              <div className="absolute bottom-2 left-2">
                <TagBadge tag={tag} />
              </div>
            )}
          </div>
        )}
        <h3 className="font-serif text-[17px] font-bold leading-snug text-foreground group-hover:text-destructive transition-colors mb-2 line-clamp-3">
          {art.titular}
        </h3>
        {art.subtitulo && (
          <p className="text-[13px] text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
            {art.subtitulo}
          </p>
        )}
        <span className="text-[10px] text-muted-foreground">{tiempo}</span>
      </article>
    </Link>
  )
}

/* ── Highlighted large card ─────────────────────────────── */
function FeaturedSideCard({ art }) {
  const tiempo = tiempoRelativo(art.fecha_generacion)
  return (
    <Link href={`/articulo/${art.slug}/`} className="group block bg-neutral-50 dark:bg-neutral-900 border border-border rounded-sm overflow-hidden">
      <article>
        {art.imagen_url && (
          <div className="overflow-hidden" style={{ aspectRatio: '16/7' }}>
            <img
              src={optimizeImage(art.imagen_url, 600)}
              alt={art.titular}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-destructive">Destacado</span>
            <span className="text-border text-xs">·</span>
            <span className="text-[10px] text-muted-foreground">{tiempo}</span>
          </div>
          <h3 className="font-serif text-[18px] font-bold leading-snug text-foreground group-hover:text-destructive transition-colors mb-2">
            {art.titular}
          </h3>
          {art.subtitulo && (
            <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">
              {art.subtitulo}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}

/* ── Main page ──────────────────────────────────────────── */
export default async function EconomiaPage() {
  const articulos = await getArticulosPorSeccion('economia', 20)
  const hero       = articulos[0]
  const sidebar    = articulos.slice(1, 5)   // up to 4 en sidebar
  const grid       = articulos.slice(5, 14)  // hasta 9 en grid
  const destacado  = articulos[14]           // card grande al lado del grid
  const extras     = articulos.slice(15)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Section header ── */}
        <div className="flex items-baseline justify-between border-b-[3px] border-foreground mb-0 pb-3">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-5 bg-destructive rounded-sm" />
            <h1 className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">Economía</h1>
          </div>
          {articulos.length > 0 && (
            <span className="text-[10px] text-muted-foreground">{articulos.length} artículos</span>
          )}
        </div>

        {/* ── Mercados widget ── */}
        <div className="mb-8">
          <MercadosWidget />
        </div>

        {articulos.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground text-sm">No hay artículos de economía disponibles en este momento.</p>
          </div>
        ) : (
          <>
            {/* ── Hero + sidebar ── */}
            {hero && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 pb-10 border-b border-border">
                {/* Hero */}
                <div className="lg:col-span-2">
                  <HeroArticle art={hero} />
                </div>

                {/* Sidebar */}
                {sidebar.length > 0 && (
                  <div className="lg:border-l lg:border-border lg:pl-8">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3 pb-2 border-b border-border">
                      También en economía
                    </div>
                    <div className="divide-y divide-border">
                      {sidebar.map(art => (
                        <ListArticle key={art.slug} art={art} showBorder={false} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Article grid ── */}
            {grid.length > 0 && (
              <div className={`grid gap-6 mb-10 ${destacado ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {/* Grid principal */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${destacado ? 'lg:col-span-3' : ''}`}>
                  {grid.map(art => (
                    <GridCard key={art.slug} art={art} />
                  ))}
                </div>

                {/* Card destacada al costado */}
                {destacado && (
                  <div className="lg:border-l lg:border-border lg:pl-6">
                    <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-3 pb-2 border-b border-border">
                      En profundidad
                    </div>
                    <FeaturedSideCard art={destacado} />
                    {extras.length > 0 && (
                      <div className="mt-4 divide-y divide-border">
                        {extras.slice(0, 3).map(art => (
                          <ListArticle key={art.slug} art={art} showBorder={false} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ── Si solo hay 1 artículo y nada más ── */}
            {articulos.length === 1 && (
              <p className="text-center text-sm text-muted-foreground py-12">
                Más artículos de economía próximamente.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
