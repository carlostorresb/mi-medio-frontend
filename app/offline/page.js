'use client'

export default function OfflinePage() {
  return (
    <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center px-4 py-20">

      {/* Icono de desconexión */}
      <div className="mb-8">
        <svg
          className="w-20 h-20 text-muted-foreground/30"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 3l18 18M8.111 8.111A5.97 5.97 0 006 12a6 6 0 006 6 5.97 5.97 0 003.889-1.445M15.9 9.9A5.97 5.97 0 0012 6a5.97 5.97 0 00-2.1.382M9.172 9.172A4 4 0 005 12a4 4 0 004 4 3.993 3.993 0 002.828-1.172M17 12a5 5 0 00-7.072-4.55M3 3l18 18" />
        </svg>
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-destructive mb-3">
        Sin conexión
      </span>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center mb-4 leading-snug">
        No hay conexión a internet
      </h1>

      <p className="text-muted-foreground text-sm sm:text-base text-center max-w-md mb-10 leading-relaxed">
        Parece que estás desconectado. Revisa tu red Wi-Fi o datos móviles
        y vuelve a intentarlo.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2.5 bg-foreground text-background text-sm font-semibold rounded-sm hover:opacity-80 transition-opacity"
      >
        Reintentar conexión
      </button>

    </div>
  )
}
