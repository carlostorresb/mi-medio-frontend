import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { LanguageProvider } from '../lib/i18n'

const BASE = 'https://noticia247x.com'

export const metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'noticia247x.com — Información continua',
    template: '%s · noticia247x.com',
  },
  description: 'Medio de noticias generado con inteligencia artificial. Cobertura continua de Perú y el mundo.',
  keywords: ['noticias peru', 'noticias hoy', 'noticia247', 'periodismo digital', 'inteligencia artificial'],
  authors: [{ name: 'noticia247x.com' }],
  creator: 'noticia247x.com',
  publisher: 'noticia247x.com',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: BASE,
    siteName: 'noticia247x.com',
    title: 'noticia247x.com — Información continua',
    description: 'Medio de noticias generado con inteligencia artificial. Cobertura continua de Perú y el mundo.',
    images: [{ url: `${BASE}/og-default.jpg`, width: 1200, height: 630, alt: 'noticia247x.com' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'noticia247x.com — Información continua',
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
          <LanguageProvider>
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
