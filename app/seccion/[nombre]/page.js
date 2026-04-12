import { getArticulosPorSeccion, SECCIONES_LABELS, tiempoRelativo } from '../../../lib/articulos'
import { optimizeImage } from '../../../lib/utils'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArticleCard } from '../../components/ArticleCard'

const BASE = 'https://noticia24x7.com'

export async function generateStaticParams() {
  return Object.keys(SECCIONES_LABELS).map(nombre => ({ nombre }))
}

export async function generateMetadata({ params }) {
  const { nombre } = await params
  const label = SECCIONES_LABELS[nombre]
  if (!label) return { title: 'Sección no encontrada' }

  const url = `${BASE}/seccion/${nombre}/`
  return {
    title: `${label} — noticia24x7.com`,
    description: `Últimas noticias de ${label} en noticia24x7.com. Cobertura continua con inteligencia artificial.`,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: `${label} — noticia24x7.com`,
      description: `Últimas noticias de ${label}`,
      locale: 'es_PE',
      siteName: 'noticia24x7.com',
    },
  }
}

function SectionHero({ art }) {
  if (!art) return null
  const label = SECCIONES_LABELS[art.seccion] || art.seccion
  return (
    <Link href={`/articulo/${art.slug}/`} className="group block">
      <div className="relative aspect-[21/9] overflow-hidden rounded-lg mb-6 bg-muted">
        {art.imagen_url
          ? <img src={optimizeImage(art.imagen_url, 800)} alt={art.titular} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          : <div className="w-full h-full bg-muted" />
        }
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm font-bold uppercase tracking-widest text-destructive">{label}</span>
        <span className="text-border">•</span>
        <span className="text-sm text-muted-foreground">{tiempoRelativo(art.fecha_generacion)}</span>
      </div>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3 group-hover:text-title-hover transition-colors duration-200">
        {art.titular}
      </h2>
      {art.subtitulo && (
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">{art.subtitulo}</p>
      )}
    </Link>
  )
}

export default async function SeccionPage({ params }) {
  const { nombre } = await params
  const label = SECCIONES_LABELS[nombre]
  if (!label) notFound()

  const articulos = await getArticulosPorSeccion(nombre, 40)
  const hero = articulos[0]
  const resto = articulos.slice(1)

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Section header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-destructive mb-2">Sección</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{label}</h1>
              <p className="text-muted-foreground mt-3 font-sans">
                Cobertura continua de {label} · noticia24x7.com
              </p>
            </div>
            <span className="text-sm text-muted-foreground hidden md:block">
              {articulos.length} {articulos.length === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>
        </div>
      </div>

      {articulos.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="font-serif text-2xl text-muted-foreground mb-4">
            No hay artículos disponibles en esta sección
          </p>
          <p className="text-muted-foreground mb-8">El agente publicará noticias pronto.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-foreground text-background font-bold text-sm rounded-md hover:bg-destructive hover:text-white transition-colors">
            ← Volver a la portada
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero article */}
          {hero && (
            <section className="py-12 border-b border-border">
              <SectionHero art={hero} />
            </section>
          )}

          {/* Article grid */}
          {resto.length > 0 && (
            <section className="py-12">
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-serif text-2xl font-bold text-foreground relative inline-block">
                  Más artículos
                  <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-destructive" />
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resto.map(art => (
                  <ArticleCard key={art.slug} art={art} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  )
}
