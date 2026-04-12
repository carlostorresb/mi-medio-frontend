'use client'
import { useState } from 'react'
import { optimizeImage } from '../../lib/utils'

function Placeholder({ className = '' }) {
  return (
    <div className={`w-full h-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center ${className}`}>
      <svg className="w-8 h-8 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

/**
 * Imagen optimizada con fallback automático.
 * 1. Intenta wsrv.nl (redimensiona + WebP)
 * 2. Si falla → URL original
 * 3. Si falla → placeholder
 * 4. Si la imagen es demasiado pequeña (naturalWidth < 200) → placeholder
 */
export function SmartImg({ src, alt, width = 800, className = '' }) {
  const optimized = optimizeImage(src, width)
  const [imgSrc, setImgSrc]   = useState(optimized)
  const [failed, setFailed]   = useState(false)

  if (!src || failed) return <Placeholder className={className} />

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      className={`w-full h-full object-cover ${className}`}
      onLoad={(e) => {
        // Si la imagen original es muy pequeña (thumbnail/placeholder), mostrar placeholder
        const img = e.currentTarget
        if (img.naturalWidth > 0 && img.naturalWidth < 200 && img.naturalHeight < 200) {
          setFailed(true)
        }
      }}
      onError={() => {
        if (imgSrc !== src) {
          setImgSrc(src)   // reintenta con URL original
        } else {
          setFailed(true)  // muestra placeholder
        }
      }}
    />
  )
}
