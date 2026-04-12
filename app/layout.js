import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'

const BASE = 'https://noticia24x7.com'

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'noticia24x7.com — Información continua',
    template: '%s · noticia24x7.com',
  },
  description: 'Medio de noticias generado con inteligencia artificial. Cobertura continua de Perú y el mundo.',
  keywords: ['noticias peru', 'noticias hoy', 'noticia24x7', 'periodismo digital', 'inteligencia artificial'],
  authors: [{ name: 'noticia24x7.com' }],
  creator: 'noticia24x7.com',
  publisher: 'noticia24x7.com',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: BASE,
    siteName: 'noticia24x7.com',
    title: 'noticia24x7.com — Información continua',
    description: 'Medio de noticias generado con inteligencia artificial. Cobertura continua de Perú y el mundo.',
    images: [{ url: `${BASE}/og-default.jpg`, width: 1200, height: 630, alt: 'noticia24x7.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'noticia24x7.com — Información continua',
    description: 'Medio de noticias generado con inteligencia artificial.',
    images: [`${BASE}/og-default.jpg`],
  },
  alternates: { canonical: BASE },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
