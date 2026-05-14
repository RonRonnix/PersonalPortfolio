import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type ImageMarqueeItem = {
  src?: string
  alt: string
}

interface ImageMarqueeProps {
  items: ImageMarqueeItem[]
  direction?: 'left' | 'right'
  className?: string
  speedSeconds?: number
}

export default function ImageMarquee({ items, direction = 'left', className = '', speedSeconds }: ImageMarqueeProps) {
  const animationClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  const style: React.CSSProperties | undefined = speedSeconds ? { animationDuration: `${speedSeconds}s` } : undefined
  const [activeImage, setActiveImage] = useState<ImageMarqueeItem | null>(null)

  const fallbackItems: ImageMarqueeItem[] = Array.from({ length: 6 }, (_, i) => ({
    alt: `Screenshot placeholder ${i + 1}`
  }))

  const content = (items.length ? items : fallbackItems)
  const looped = [...content, ...content]

  useEffect(() => {
    if (!activeImage) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage])

  useEffect(() => {
    if (!activeImage) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeImage])

  return (
    <div className={`group relative overflow-hidden select-none ${className}`}>
      <div className={`flex w-max gap-6 pr-6 ${animationClass}`} style={style} aria-hidden="true">
        {looped.map((item, index) => (
          <div
            key={`${item.alt}-${index}`}
            className="h-44 w-72 md:h-48 md:w-80 rounded-2xl border border-white/10 bg-brand-800/70 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover cursor-zoom-in"
                loading="lazy"
                onClick={() => setActiveImage(item)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-brand-100/70">
                Add screenshot
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-900 via-brand-900/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-900 via-brand-900/70 to-transparent" />

      {activeImage?.src && createPortal(
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-6 touch-none"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-h-[90vh] max-w-6xl w-full" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 text-sm text-brand-100/80 hover:text-white focus-ring"
            >
              Close
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="h-full w-full rounded-2xl border border-white/10 object-contain shadow-[0_20px_60px_-24px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
