import './globals.css'

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=Inter:wght@300;400;500;600&display=swap');
:root{--black:#111111;--ink:#1a1a1a;--charcoal:#333333;--mid:#666666;--muted:#999999;--border:#d0cfc8;--border-light:#e8e7e0;--bg:#faf9f5;--white:#ffffff;--accent:#004590;--red:#be1a1a;--serif:'Playfair Display',Georgia,serif;--body-serif:'Source Serif 4',Georgia,serif;--sans:'Inter',system-ui,sans-serif}
*,*::before,*::after{box-sizing:border-box}
body{font-family:var(--sans);background:var(--bg);color:var(--ink);font-size:14px;line-height:1.5;margin:0;padding:0}
a{text-decoration:none;color:inherit}
.site-header{background:var(--black);border-bottom:3px solid var(--accent)}
.header-top{display:flex;align-items:center;justify-content:space-between;padding:14px 24px 10px;border-bottom:1px solid #333;max-width:1200px;margin:0 auto}
.header-meta{font-size:11px;color:#888;letter-spacing:0.03em}
.masthead{text-align:center;flex:1}
.masthead-title{font-family:var(--serif);font-size:36px;font-weight:700;color:#fff;letter-spacing:-0.5px;line-height:1;margin:0}
.masthead-title span{color:var(--accent);font-style:italic}
.masthead-tagline{font-size:10px;color:#666;letter-spacing:0.15em;text-transform:uppercase;margin-top:3px;margin-bottom:0}
.header-search input{background:#222;border:1px solid #444;color:#ccc;padding:5px 10px;font-size:12px;width:150px;font-family:var(--sans);outline:none}
.header-search input::placeholder{color:#666}
.site-nav{display:flex;align-items:center;justify-content:center;padding:0 24px;overflow-x:auto;max-width:1200px;margin:0 auto}
.site-nav a{display:block;padding:10px 13px;font-size:11px;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;color:#ccc;border-bottom:3px solid transparent;white-space:nowrap;transition:color 0.15s}
.site-nav a:hover{color:#fff}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.section-label{font-family:var(--sans);font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent)}
.section-label.red{color:var(--red)}
hr.divider{border:none;border-top:1px solid var(--border);margin:0}
hr.divider-bold{border:none;border-top:2px solid var(--black);margin:0}
.portada-grid{display:grid;grid-template-columns:1fr 300px;gap:0;border-top:2px solid var(--black)}
.portada-main{padding:20px 24px 20px 0;border-right:1px solid var(--border)}
.portada-sidebar{padding:20px 0 20px 24px}
.hero-article{padding-bottom:20px;margin-bottom:20px;border-bottom:1px solid var(--border)}
.hero-img-placeholder{width:100%;height:340px;background:#c8c4b8}
.hero-kicker{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.hero-title{font-family:var(--serif);font-size:30px;font-weight:700;line-height:1.18;color:var(--black);margin-bottom:10px;margin-top:0;letter-spacing:-0.3px}
.hero-title:hover{color:var(--accent);cursor:pointer}
.hero-subtitle{font-family:var(--body-serif);font-size:15px;color:var(--charcoal);line-height:1.5;margin-bottom:10px;font-weight:300}
.article-meta{font-size:11px;color:var(--muted);font-family:var(--sans)}
.secondary-grid{display:grid;grid-template-columns:repeat(3,1fr)}
.secondary-article{padding:16px;border-right:1px solid var(--border)}
.secondary-article:last-child{border-right:none}
.sec-img-placeholder{width:100%;height:130px;background:#c8c4b8;margin-bottom:10px}
.sec-title{font-family:var(--serif);font-size:15px;font-weight:600;line-height:1.3;color:var(--black);margin:8px 0 6px;cursor:pointer}
.sec-title:hover{color:var(--accent)}
.sec-sub{font-family:var(--body-serif);font-size:12px;color:var(--mid);line-height:1.4;font-weight:300}
.sidebar-block{margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid var(--border)}
.sidebar-block:last-child{border-bottom:none}
.sidebar-title{font-family:var(--sans);font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:var(--black);margin-bottom:12px;margin-top:0;padding-bottom:6px;border-bottom:2px solid var(--black)}
.sidebar-item{padding:9px 0;border-bottom:1px solid var(--border-light)}
.sidebar-item:last-child{border-bottom:none}
.sidebar-item-title{font-family:var(--serif);font-size:13px;font-weight:600;line-height:1.3;color:var(--black);margin:0 0 3px;cursor:pointer}
.sidebar-item-title:hover{color:var(--accent)}
.sidebar-item-meta{font-size:11px;color:var(--muted)}
.ultimo-bar{background:var(--white);border-top:2px solid var(--black);border-bottom:1px solid var(--border)}
.ultimo-inner{display:flex;align-items:stretch;max-width:1200px;margin:0 auto}
.ultimo-label{background:var(--black);color:#fff;padding:12px 18px;font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;display:flex;align-items:center;white-space:nowrap}
.ultimo-items{display:flex;overflow-x:auto;flex:1}
.ultimo-item{padding:12px 18px;border-right:1px solid var(--border-light);min-width:220px;flex-shrink:0}
.ultimo-seccion{font-size:10px;color:var(--red);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:3px}
.ultimo-titular{font-family:var(--body-serif);font-size:12px;line-height:1.35;color:var(--black);font-weight:400}
.ultimo-hora{font-size:10px;color:var(--muted);margin-top:3px}
.breaking-bar{background:var(--red);color:#fff;padding:6px 24px;font-size:12px;display:flex;align-items:center;gap:12px}
.breaking-label{font-weight:600;letter-spacing:0.08em;text-transform:uppercase;font-size:10px;background:rgba(0,0,0,0.25);padding:2px 8px;white-space:nowrap}
.articulo-layout{display:grid;grid-template-columns:1fr 280px;gap:0;padding-top:24px}
.articulo-main{padding-right:32px;border-right:1px solid var(--border)}
.articulo-aside{padding-left:28px}
.articulo-breadcrumb{display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:11px;color:var(--mid)}
.articulo-headline{font-family:var(--serif);font-size:32px;font-weight:700;line-height:1.15;color:var(--black);margin:0 0 12px;letter-spacing:-0.5px}
.articulo-deck{font-family:var(--body-serif);font-size:17px;font-weight:300;color:var(--charcoal);line-height:1.5;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--border)}
.articulo-byline{font-size:11px;color:var(--muted);margin-bottom:20px}
.articulo-img-placeholder{width:100%;height:360px;background:#c8c4b8;margin-bottom:8px}
.articulo-credit{font-size:10px;color:var(--muted);margin-bottom:20px;text-align:right}
.articulo-credit a{color:var(--accent)}
.articulo-body p{font-family:var(--body-serif);font-size:16px;line-height:1.8;color:var(--charcoal);margin-bottom:18px;font-weight:300}
.articulo-body p:first-child::first-letter{font-family:var(--serif);font-size:58px;font-weight:700;float:left;line-height:0.82;margin:6px 8px -4px 0;color:var(--black)}
.articulo-tags{margin-top:24px;padding-top:16px;border-top:1px solid var(--border);display:flex;gap:6px;flex-wrap:wrap}
.tag{font-size:10px;font-weight:500;letter-spacing:0.06em;padding:3px 10px;border:1px solid var(--border);color:var(--charcoal);text-transform:uppercase;cursor:pointer;transition:all 0.15s}
.tag:hover{background:var(--black);color:#fff;border-color:var(--black)}
.fuente-link{font-size:11px;color:var(--accent);margin-top:12px;display:block}
.ai-disclaimer{margin-top:24px;padding:12px 16px;border-left:3px solid var(--border);background:var(--white);font-size:12px;color:var(--muted);font-style:italic}
.related-item{padding:10px 0;border-bottom:1px solid var(--border-light)}
.related-item:last-child{border-bottom:none}
.related-seccion{font-size:10px;color:var(--accent);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:3px}
.related-title{font-family:var(--serif);font-size:13px;line-height:1.3;color:var(--black);cursor:pointer}
.related-title:hover{color:var(--accent)}
.seccion-header{padding:20px 0 14px;border-bottom:3px solid var(--black);margin-bottom:0}
.seccion-name{font-family:var(--serif);font-size:26px;font-weight:700;color:var(--black);margin:6px 0 4px}
.seccion-desc{font-size:13px;color:var(--mid);font-family:var(--body-serif);font-weight:300;margin:0}
.seccion-grid{display:grid;grid-template-columns:repeat(3,1fr)}
.seccion-card{padding:18px;border-right:1px solid var(--border);border-bottom:1px solid var(--border)}
.seccion-card:nth-child(3n){border-right:none}
.seccion-card-placeholder{width:100%;height:150px;background:#c8c4b8;margin-bottom:10px}
.seccion-card-title{font-family:var(--serif);font-size:16px;font-weight:600;line-height:1.3;color:var(--black);margin:8px 0 6px;cursor:pointer}
.seccion-card-title:hover{color:var(--accent)}
.seccion-card-sub{font-family:var(--body-serif);font-size:12px;color:var(--mid);line-height:1.4;font-weight:300;margin-bottom:6px}
.notfound{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:60px 24px}
.notfound-number{font-family:var(--serif);font-size:110px;font-weight:700;color:var(--border);line-height:1;letter-spacing:-8px}
.notfound-rule{width:60px;height:3px;background:var(--accent);margin:16px auto}
.notfound-title{font-family:var(--serif);font-size:22px;font-weight:600;color:var(--black);margin-bottom:10px;font-style:italic}
.notfound-sub{font-size:14px;color:var(--mid);max-width:380px;line-height:1.6;margin-bottom:28px;font-family:var(--body-serif);font-weight:300}
.busqueda-header{padding:24px 0 20px;border-bottom:3px solid var(--black)}
.busqueda-form{display:flex;max-width:620px}
.busqueda-input{flex:1;padding:11px 14px;font-size:16px;font-family:var(--body-serif);border:2px solid var(--black);border-right:none;background:var(--white);color:var(--black);outline:none;font-weight:300}
.busqueda-btn{padding:0 24px;background:var(--black);color:#fff;border:2px solid var(--black);font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer}
.busqueda-meta{font-size:12px;color:var(--mid);margin-top:10px}
.busqueda-meta strong{color:var(--black)}
.result-item{padding:16px 0;border-bottom:1px solid var(--border);display:grid;grid-template-columns:1fr 110px;gap:16px}
.result-title{font-family:var(--serif);font-size:17px;font-weight:600;line-height:1.3;color:var(--black);margin:5px 0 6px;cursor:pointer}
.result-title:hover{color:var(--accent)}
.result-sub{font-family:var(--body-serif);font-size:13px;color:var(--mid);line-height:1.4;font-weight:300;margin-bottom:5px}
.result-thumb{width:110px;height:74px;object-fit:cover;display:block;background:#c8c4b8}
.btn-primary{display:inline-block;padding:10px 28px;background:var(--black);color:#fff;font-family:var(--sans);font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;border:2px solid var(--black);cursor:pointer}
.btn-secondary{display:inline-block;padding:10px 24px;background:transparent;color:var(--charcoal);font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;border:1px solid var(--border);cursor:pointer;margin-left:10px}
.load-more{display:block;width:100%;padding:12px;background:transparent;border:1px solid var(--border);font-family:var(--sans);font-size:11px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--charcoal);cursor:pointer}
.site-footer{background:var(--black);color:#888;padding:32px 0 20px;margin-top:40px;border-top:3px solid var(--accent)}
.footer-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;padding-bottom:24px;border-bottom:1px solid #333;margin-bottom:16px}
.footer-col-title{font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#fff;margin-bottom:10px}
.footer-col a{display:block;font-size:12px;color:#888;padding:2px 0}
.footer-col a:hover{color:#ccc}
.footer-bottom{display:flex;justify-content:space-between;align-items:center}
.footer-logo{font-family:var(--serif);font-size:18px;color:#fff;font-weight:700}
.footer-logo span{color:var(--accent);font-style:italic}
.footer-legal{font-size:11px;color:#555}
.footer-ai{font-size:10px;color:#444;margin-top:3px}
@media(max-width:900px){.portada-grid{grid-template-columns:1fr}.portada-sidebar{padding:0;border-top:2px solid var(--black)}.secondary-grid{grid-template-columns:1fr 1fr}.articulo-layout{grid-template-columns:1fr}.articulo-main{padding-right:0;border-right:none}.articulo-aside{padding-left:0;border-top:2px solid var(--black);padding-top:20px;margin-top:20px}.footer-grid{grid-template-columns:repeat(2,1fr)}.seccion-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:600px){.masthead-title{font-size:26px}.secondary-grid{grid-template-columns:1fr}.seccion-grid{grid-template-columns:1fr}.header-top{flex-direction:column;gap:8px}.hero-title{font-size:22px}.articulo-headline{font-size:24px}.footer-grid{grid-template-columns:repeat(2,1fr)}.footer-bottom{flex-direction:column;gap:12px;text-align:center}.footer-logo{font-size:22px}}
`

export const metadata = {
  title: 'noticia24x7.com — Información continua',
  description: 'Medio de noticias generado con inteligencia artificial. Cobertura continua de Perú y el mundo.',
  metadataBase: new URL('https://noticia24x7.com'),
}

const SECCIONES = [
  { slug: 'el_pais', label: 'El País' },
  { slug: 'internacional', label: 'Internacional' },
  { slug: 'economia', label: 'Economía' },
  { slug: 'sociedad', label: 'Sociedad' },
  { slug: 'tecnologia', label: 'Tecnología' },
  { slug: 'ciencia', label: 'Ciencia' },
  { slug: 'salud', label: 'Salud' },
  { slug: 'cultura', label: 'Cultura' },
  { slug: 'deportes', label: 'Deportes' },
  { slug: 'opinion', label: 'Opinión' },
]

function Header() {
  const fecha = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <header className="site-header">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="header-top">
          <span className="header-meta">{fecha}</span>
          <div className="masthead">
            <a href="/">
              <h1 className="masthead-title">noticia<span>24x7</span>.com</h1>
            </a>
            <p className="masthead-tagline">Información continua · Generado con Inteligencia Artificial</p>
          </div>
          <div className="header-search">
            <form action="/busqueda" method="get">
              <input name="q" type="text" placeholder="Buscar noticias..." />
            </form>
          </div>
        </div>
        <nav className="site-nav"><a href="/">Inicio</a>
          {SECCIONES.map(s => (
            <a key={s.slug} href={`/seccion/${s.slug}/`}>{s.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-col-title">Secciones</div>
            <a href="/seccion/el_pais/">El País</a>
            <a href="/seccion/internacional/">Internacional</a>
            <a href="/seccion/economia/">Economía</a>
            <a href="/seccion/sociedad/">Sociedad</a>
            <a href="/seccion/tecnologia/">Tecnología</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Más Secciones</div>
            <a href="/seccion/ciencia/">Ciencia</a>
            <a href="/seccion/salud/">Salud</a>
            <a href="/seccion/cultura/">Cultura</a>
            <a href="/seccion/deportes/">Deportes</a>
            <a href="/seccion/opinion/">Opinión</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">El Medio</div>
            <a href="/">Portada</a>
            <a href="/busqueda/">Buscar</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Legal</div>
            <a href="https://unsplash.com" target="_blank" rel="noopener">Créditos de imágenes</a>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="/" className="footer-logo">noticia<span>24x7</span>.com</a>
          <div>
            <div className="footer-legal">© {new Date().getFullYear()} noticia24x7.com · Lima, Perú</div>
            <div className="footer-ai">Contenido generado con inteligencia artificial · Imágenes: Unsplash</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}