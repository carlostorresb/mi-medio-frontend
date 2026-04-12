import Link from 'next/link'
import { SECCIONES_LABELS, tiempoRelativo } from '../../lib/utils'

function HeroImage({ art, height = '100%' }) {
  if (art.imagen_url) {
    return (
      <img
        src={art.imagen_url}
        alt={art.titular}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    )
  }
  return (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Sin imagen</span>
    </div>
  )
}

export function HeroSection({ mainArticle, secondaryArticles }) {
  if (!mainArticle) return null

  const mainLabel = SECCIONES_LABELS[mainArticle.seccion] || mainArticle.seccion

  return (
    <section className="py-8 lg:py-12 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Main Featured Article */}
          <Link
            href={`/articulo/${mainArticle.slug}/`}
            className="lg:col-span-8 group cursor-pointer block"
          >
            <div className="relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden rounded-lg mb-6">
              <HeroImage art={mainArticle} />
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <span className="text-sm font-bold uppercase tracking-widest text-destructive">
                {mainLabel}
              </span>
              <span className="text-border">•</span>
              <span className="text-sm text-muted-foreground">
                {tiempoRelativo(mainArticle.fecha_generacion)}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4 group-hover:text-title-hover transition-colors duration-200">
              {mainArticle.titular}
            </h1>

            {mainArticle.subtitulo && (
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {mainArticle.subtitulo}
              </p>
            )}
          </Link>

          {/* Secondary Articles Sidebar */}
          <div className="lg:col-span-4 flex flex-col space-y-8 lg:border-l lg:border-border lg:pl-8">
            {secondaryArticles.map((art, index) => (
              <Link
                href={`/articulo/${art.slug}/`}
                key={art.slug}
                className="group cursor-pointer flex flex-col block"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-destructive">
                    {SECCIONES_LABELS[art.seccion] || art.seccion}
                  </span>
                </div>

                <h2 className="font-serif text-xl font-bold text-foreground leading-snug mb-2 group-hover:text-title-hover transition-colors duration-200">
                  {art.titular}
                </h2>

                {art.subtitulo && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                    {art.subtitulo}
                  </p>
                )}

                <div className="flex items-center space-x-2 mt-auto">
                  <span className="text-xs text-muted-foreground">
                    {tiempoRelativo(art.fecha_generacion)}
                  </span>
                </div>

                {index < secondaryArticles.length - 1 && (
                  <div className="w-full h-px bg-muted mt-8" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
