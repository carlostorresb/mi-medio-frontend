// Server component — CSS marquee, no client state needed
export function TrendingBar({ headlines }) {
  if (!headlines || headlines.length === 0) return null

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
            {[...headlines, ...headlines].map((headline, i) => (
              <span key={i} className="inline-flex items-center">
                <span className="text-sm font-medium text-foreground hover:text-destructive cursor-pointer transition-colors">
                  {headline}
                </span>
                <span className="mx-4 text-muted-foreground/50">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
