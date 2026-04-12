'use client'
import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('[noticia24x7] error:', error)
  }, [error])

  return (
    <div className="min-h-[80vh] bg-background flex flex-col items-center justify-center px-4 py-20">

      <div className="relative mb-8 select-none">
        <span
          className="font-serif font-bold text-foreground/[0.04] dark:text-foreground/[0.06] leading-none block"
          style={{ fontSize: 'clamp(100px, 18vw, 220px)' }}
          aria-hidden="true"
        >
          500
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-destructive mb-2">
            Error inesperado
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground text-center leading-snug">
            Algo salió mal
          </h1>
        </div>
      </div>

      <p className="text-muted-foreground text-sm sm:text-base text-center max-w-md mb-10 leading-relaxed">
        Ocurrió un error al cargar esta página. Puedes intentar recargarla
        o volver a la portada.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-foreground text-background text-sm font-semibold rounded-sm hover:opacity-80 transition-opacity"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 border border-border text-foreground text-sm font-semibold rounded-sm hover:bg-muted transition-colors"
        >
          Ir a la portada
        </Link>
      </div>

    </div>
  )
}
