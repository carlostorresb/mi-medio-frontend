import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Share2, Bookmark, ChevronRight } from 'lucide-react'
import { getArticulos, getArticuloPorSlug, SECCIONES_LABELS, tiempoRelativo } from '../../../lib/articulos'
import { optimizeImage } from '../../../lib/utils'

const BASE = 'https://noticia24x7.com'

export async function generateStaticParams() {
  try {
    const articulos = await getArticulos(500)
    return articulos.map(a => ({ slug: a.slug }))
  } catch(e) {
    return []
  }
}


export async function generateMetadata({ params }) {
  const art = await getArticuloPorSlug(params.slug)
  if (!art) return { title: 'Artículo no encontrado' }

  const url = `${BASE}/articulo/${params.slug}/`
  const imagen = art.imagen_url || `${BASE}/og-default.jpg`
  const seccionLabel = SECCIONES_LABELS[art.seccion] || art.seccion

  return {
    title: art.titular,
    description: art.resumen_seo || art.subtitulo || art.titular,
    keywords: art.tags?.join(', '),
    authors: [{ name: 'noticia24x7.com' }],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: art.titular,
      description: art.resumen_seo || art.subtitulo || art.titular,
      images: [{ url: imagen, width: 1200, height: 630, alt: art.titular }],
      publishedTime: art.fecha_generacion,
      section: seccionLabel,
      tags: art.tags,
      locale: 'es_PE',
      siteName: 'noticia24x7.com',
    },
    twitter: {
      card: 'summary_large_image',
      title: art.titular,
      description: art.resumen_seo || art.subtitulo || art.titular,
      images: [imagen],
    },
  }
}

export default async function ArticuloPage({ params }) {
  const art = await getArticuloPorSlug(params.slug)
  if (!art) notFound()

  const seccionLabel = SECCIONES_LABELS[art.seccion] || art.seccion
  const url = `${BASE}/articulo/${params.slug}/`

  const todos = await getArticulos(50)
  const relacionados = todos.filter(a => a.seccion === art.seccion && a.slug !== art.slug).slice(0, 3)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: art.titular,
    description: art.resumen_seo || art.subtitulo,
    image: art.imagen_url ? [art.imagen_url] : [],
    datePublished: art.fecha_generacion,
    dateModified: art.fecha_generacion,
    author: [{ '@type': 'Organization', name: 'noticia24x7.com', url: BASE }],
    publisher: {
      '@type': 'Organization',
      name: 'noticia24x7.com',
      url: BASE,
      logo: { '@type': 'ImageObject', url: `${BASE}/og-default.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    articleSection: seccionLabel,
    keywords: art.tags?.join(', '),
    inLanguage: 'es-PE',
  }

  return (
    <main className="min-h-screen bg-background pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article>
        {/* Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="flex items-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <Link href={`/seccion/${art.seccion}/`} className="text-destructive hover:text-destructive/80 transition-colors">
              {seccionLabel}
            </Link>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            {art.titular}
          </h1>

          {art.subtitulo && (
            <p className="text-xl md:text-2xl text-muted-foreground font-serif italic mb-8 leading-relaxed">
              {art.subtitulo}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y border-border gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-muted-foreground">N</span>
              </div>
              <div>
                <div className="font-bold text-foreground text-sm">noticia24x7.com</div>
                <div className="text-sm text-muted-foreground">
                  <time dateTime={art.fecha_generacion}>
                    {new Date(art.fecha_generacion).toLocaleDateString('es-PE', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(art.titular)}&url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="Compartir en Twitter"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <button
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="Guardar"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Featured image */}
        {art.imagen_url && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <figure>
              <div className="aspect-[21/9] w-full overflow-hidden rounded-lg bg-muted">
                <img src={optimizeImage(art.imagen_url, 1200)} alt={art.titular} className="w-full h-full object-cover" />
              </div>
              {art.fuente_nombre && (
                <figcaption className="text-sm text-muted-foreground mt-3 text-right">
                  Fotografía: {art.fuente_nombre} · noticia24x7.com
                </figcaption>
              )}
            </figure>
          </div>
        )}

        {/* Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="article-drop-cap
              [&_p]:font-sans [&_p]:text-base [&_p]:leading-[1.85] [&_p]:mb-5 [&_p]:text-foreground/85
              [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:text-foreground
              [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-foreground
              [&_blockquote]:border-l-4 [&_blockquote]:border-destructive [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:my-8 [&_blockquote]:font-serif [&_blockquote]:text-2xl [&_blockquote]:italic [&_blockquote]:text-foreground/80
              [&_a]:text-destructive [&_a:hover]:underline [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: art.cuerpo || '' }}
          />

          {art.tags?.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-2">
              {art.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-muted text-sm font-medium rounded-full text-foreground hover:bg-destructive hover:text-white transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {art.url_fuente && (
            <a href={art.url_fuente} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-sm text-destructive hover:underline">
              Ver fuente original ({art.fuente_nombre || 'Fuente'}) →
            </a>
          )}

          <div className="mt-10 p-4 border-l-4 border-border bg-muted/30 text-sm text-muted-foreground italic rounded-r-md">
            Este artículo fue redactado automáticamente por inteligencia artificial basándose en fuentes periodísticas verificadas.
          </div>
        </div>
      </article>

      {/* Related articles */}
      {relacionados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-border">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-8">Artículos Relacionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relacionados.map(rel => (
              <Link href={`/articulo/${rel.slug}/`} key={rel.slug} className="group cursor-pointer flex flex-col block">
                <div className="relative overflow-hidden rounded-md mb-4" style={{ aspectRatio: '16/9' }}>
                  {rel.imagen_url
                    ? <img src={optimizeImage(rel.imagen_url, 600)} alt={rel.titular} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    : <div className="w-full h-full bg-muted" />
                  }
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-destructive mb-2">
                  {SECCIONES_LABELS[rel.seccion] || rel.seccion}
                </div>
                <h4 className="font-serif text-xl font-bold text-foreground leading-snug group-hover:text-title-hover transition-colors duration-200">
                  {rel.titular}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{tiempoRelativo(rel.fecha_generacion)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
