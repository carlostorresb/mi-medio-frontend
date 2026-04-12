import { Suspense } from 'react'
import NotFoundClient from './components/NotFoundClient'

export const metadata = { title: '404 — Página no encontrada · noticia24x7.com' }

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] bg-background" />}>
      <NotFoundClient />
    </Suspense>
  )
}
