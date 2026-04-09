import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

const BASE = 'https://noticia24x7.com'

const SECCIONES = {
  el_pais:       { label: "El País",       color: "bg-red-100 text-red-800" },
  internacional: { label: "Internacional", color: "bg-blue-100 text-blue-800" },
  economia:      { label: "Economía",      color: "bg-green-100 text-green-800" },
  sociedad:      { label: "Sociedad",      color: "bg-orange-100 text-orange-800" },
  tecnologia:    { label: "Tecnología",    color: "bg-cyan-100 text-cyan-800" },
  ciencia:       { label: "Ciencia",       color: "bg-indigo-100 text-indigo-800" },
  salud:         { label: "Salud",         color: "bg-pink-100 text-pink-800" },
  cultura:       { label: "Cultura",       color: "bg-purple-100 text-purple-800" },
  deportes:      { label: "Deportes",      color: "bg-yellow-100 text-yellow-800" },
  opinion:       { label: "Opinión",       color: "bg-gray-100 text-gray-800" },
};

function cargarArticulo(slug) {
  const ruta = path.join(process.cwd(), "contenido", `${slug}.json`);
  if (!fs.existsSync(ruta)) return null;
  return JSON.parse(fs.readFileSync(ruta, "utf8"));
}

export async function generateStaticParams() {
  const carpeta = path.join(process.cwd(), "contenido");
  if (!fs.existsSync(carpeta)) return [];
  return fs.readdirSync(carpeta)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ slug: f.replace(".json", "") }));
}

export async function generateMetadata({ params }) {
  const art = cargarArticulo(params.slug);
  if (!art) return { title: "Artículo no encontrado" };

  const url = `${BASE}/articulo/${params.slug}/`
  const imagen = art.imagen_url || `${BASE}/og-default.jpg`
  const seccionLabel = SECCIONES[art.seccion]?.label || art.seccion

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

export default function Articulo({ params }) {
  const art = cargarArticulo(params.slug);
  if (!art) notFound();

  const seccion = SECCIONES[art.seccion] ?? { label: art.seccion, color: "bg-gray-100 text-gray-700" };
  const url = `${BASE}/articulo/${params.slug}/`

  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": art.titular,
    "description": art.resumen_seo || art.subtitulo,
    "image": art.imagen_url ? [art.imagen_url] : [],
    "datePublished": art.fecha_generacion,
    "dateModified": art.fecha_generacion,
    "author": [{ "@type": "Organization", "name": "noticia24x7.com", "url": BASE }],
    "publisher": {
      "@type": "Organization",
      "name": "noticia24x7.com",
      "url": BASE,
      "logo": { "@type": "ImageObject", "url": `${BASE}/og-default.jpg` }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "articleSection": seccion.label,
    "keywords": art.tags?.join(', '),
    "inLanguage": "es-PE",
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="container">
        <div className="articulo-layout">
          <div className="articulo-main">
            <div className="articulo-breadcrumb">
              <a href="/">Inicio</a>
              <span>›</span>
              <a href={`/seccion/${art.seccion}/`}>{seccion.label}</a>
            </div>

            <h1 className="articulo-headline">{art.titular}</h1>
            {art.subtitulo && <p className="articulo-deck">{art.subtitulo}</p>}

            <div className="articulo-byline">
              <time dateTime={art.fecha_generacion}>
                {new Date(art.fecha_generacion).toLocaleDateString('es-PE', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </time>
              {art.puntuacion && <span> · Relevancia: {art.puntuacion}/10</span>}
            </div>

            {art.imagen_url && (
              <div>
                <img
                  src={art.imagen_url}
                  alt={art.titular}
                  className="articulo-img-placeholder"
                  style={{ objectFit: 'cover' }}
                />
                {art.url_fuente && (
                  <p className="articulo-credit">
                    Imagen: <a href={art.url_fuente} target="_blank" rel="noopener noreferrer">
                      {new URL(art.url_fuente).hostname}
                    </a>
                  </p>
                )}
              </div>
            )}

            <div
              className="articulo-body"
              dangerouslySetInnerHTML={{ __html: art.cuerpo || "" }}
            />

            {art.tags?.length > 0 && (
              <div className="articulo-tags">
                {art.tags.map((tag) => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            )}

            {art.url_fuente && (
              <a href={art.url_fuente} target="_blank" rel="noopener noreferrer" className="fuente-link">
                Ver fuente original →
              </a>
            )}

            <div className="ai-disclaimer">
              Este artículo fue redactado automáticamente por inteligencia artificial basándose en fuentes periodísticas verificadas.
            </div>
          </div>

          <aside className="articulo-aside">
            <div className="sidebar-block">
              <div className="sidebar-title">Sección</div>
              <a href={`/seccion/${art.seccion}/`} style={{ color: 'var(--accent)', fontWeight: 600 }}>
                Ver más de {seccion.label} →
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
