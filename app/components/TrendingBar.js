import Link from 'next/link'

// Server component — CSS marquee, no client state needed
// Acepta `articles` (array con slug+titular) o el legacy `headlines` (array de strings)
export function TrendingBar({ articles, headlines }) {
  // Normaliza: si recibe articles usa eso, si no usa headlines como fallback sin link
  const items = articles?.length
    ? articles.map(a => ({ titular: a.titular, slug: a.slug }))
    : (headlines || []).map(h => ({ titular: h, slug: null }))

  if (items.length === 0) return null

  const doubled = [...items, ...items]

  return (
    <div className="w-full bg-background border-b border-border overflow-hidden flex items-center h-10">
      <div className="flex items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Label */}
        <div className="flex items-center gap-2 pr-4 border-r border-border bg-background z-10 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-destructive uppercase">
            TENDENCIA
          </span>
        </div>

        {/* Marquee — duplicate for seamless loop */}
        <div className="flex-grow overflow-hidden relative ml-4">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {doubled.map((item, i) => (
              <span key={i} className="inline-flex items-center">
                {item.slug ? (
                  <Link
                    href={`/articulo/${item.slug}/`}
                    className="text-sm font-medium text-foreground hover:text-destructive transition-colors"
                  >
                    {item.titular}
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-foreground">
                    {item.titular}
                  </span>
                )}
                <span className="mx-4 text-muted-foreground/50">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
