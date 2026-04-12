import { Suspense } from 'react'
import BusquedaCliente from './BusquedaCliente'

export const metadata = { title: 'Búsqueda — noticia24x7.com' }

export default function BusquedaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="text-muted-foreground text-sm animate-pulse">Buscando…</span>
      </div>
    }>
      <BusquedaCliente />
    </Suspense>
  )
}
