import { getArticulos, SECCIONES_LABELS, tiempoRelativo } from '../lib/articulos'
import { optimizeImage } from '../lib/utils'
import { TrendingBar } from './components/TrendingBar'
import { HeroSection } from './components/HeroSection'
import { ArticleGrid } from './components/ArticleGrid'
import Link from 'next/link'

// Category preview: 2 articles side by side with image + title
function CategoryPreview({ seccion, articles }) {
  const label = SECCIONES_LABELS[seccion] || seccion
  if (!articles || articles.length === 0) return null

  return (
    <div>
      <div className="flex items-center justify-between mb-6 border-b border-border pb-2">
        <h3 className="font-serif text-2xl font-bold text-foreground">{label}</h3>
        <Link href={`/seccion/${seccion}/`} className="text-sm font-bold text-destructive hover:text-destructive/80 transition-colors">
          Ver todo →
        </Link>
      </div>
      <div className="space-y-6">
        {articles.map(art => (
          <Link href={`/articulo/${art.slug}/`} key={art.slug} className="group flex gap-4 block">
            <div className="w-1/3 relative overflow-hidden rounded-md flex-shrink-0" style={{ aspectRatio: '4/3' }}>
              {art.imagen_url ? (
                <img
                  src={optimizeImage(art.imagen_url, 600)}
                  alt={art.titular}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
            </div>
            <div className="w-2/3 flex flex-col justify-center">
              <h4 className="font-serif text-lg font-bold text-foreground leading-snug group-hover:text-title-hover transition-colors duration-200 line-clamp-2 mb-2">
                {art.titular}
              </h4>
              {art.subtitulo && (
                <p className="text-sm text-muted-foreground line-clamp-2">{art.subtitulo}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Newsletter section
function Newsletter() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
          Mantente informado
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Suscríbete a nuestro boletín diario para recibir las noticias más importantes directamente en tu bandeja de entrada.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" action="#" method="post">
          <input
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            required
            className="flex-grow px-4 py-3 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-destructive focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-destructive text-white px-6 py-3 font-bold rounded-md hover:bg-destructive/90 transition-colors whitespace-nowrap"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </section>
  )
}

export default async function Portada() {
  const todos = await getArticulos(200)

  if (todos.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="font-serif text-2xl text-muted-foreground mb-4">No hay artículos disponibles</p>
        <p className="text-sm text-muted-foreground">El agente publicará noticias pronto.</p>
      </div>
    )
  }

  const mainArticle      = todos[0]
  const secondaryArticles = todos.slice(1, 4)
  const latestArticles   = todos.slice(0, 9)
  const trendingArticles = todos.slice(0, 12)

  const bySection = (sec, n = 2) => todos.filter(a => a.seccion === sec).slice(0, n)

  const categoryPreviews = [
    { seccion: 'el_pais',      articles: bySection('el_pais') },
    { seccion: 'internacional', articles: bySection('internacional') },
    { seccion: 'economia',     articles: bySection('economia') },
    { seccion: 'tecnologia',   articles: bySection('tecnologia') },
  ].filter(c => c.articles.length > 0)

  return (
    <>
      <TrendingBar articles={trendingArticles} />

      <HeroSection mainArticle={mainArticle} secondaryArticles={secondaryArticles} />

      <ArticleGrid title="Últimas Noticias" articles={latestArticles} />

      {/* Category previews */}
      {categoryPreviews.length > 0 && (
        <section className="py-16 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {categoryPreviews.map(c => (
                <CategoryPreview key={c.seccion} seccion={c.seccion} articles={c.articles} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  )
}
