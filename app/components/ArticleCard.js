import Link from 'next/link'
import { SECCIONES_LABELS, tiempoRelativo } from '../../lib/utils'
import { SmartImg } from './SmartImg'

export function ArticleCard({ art, featured = false }) {
  const seccionLabel = SECCIONES_LABELS[art.seccion] || art.seccion

  return (
    <Link
      href={`/articulo/${art.slug}/`}
      className="group cursor-pointer flex flex-col h-full bg-background rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-transparent hover:border-border block"
    >
      <article className="flex flex-col h-full">
        <div className="relative aspect-[16/9] overflow-hidden">
          <SmartImg src={art.imagen_url} alt={art.titular} width={600} className="transition-transform duration-500 group-hover:scale-105" />
        </div>

        <div className="flex flex-col flex-grow p-5">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-destructive">
              {seccionLabel}
            </span>
            <span className="text-border text-xs">•</span>
            <span className="text-xs text-muted-foreground">
              {tiempoRelativo(art.fecha_generacion)}
            </span>
          </div>

          <h3 className={`font-serif font-bold text-foreground mb-3 group-hover:text-title-hover transition-colors duration-200 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {art.titular}
          </h3>

          {art.subtitulo && (
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
              {art.subtitulo}
            </p>
          )}

          <div className="mt-auto pt-4 border-t border-muted">
            <span className="text-xs font-medium text-muted-foreground">
              noticia24x7.com
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
