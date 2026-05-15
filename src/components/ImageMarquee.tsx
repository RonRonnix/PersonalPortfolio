import React, { useEffect, useRef, useState } from 'react'
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const panRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const boundsRef = useRef({ maxX: 0, maxY: 0 })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const imageSizeRef = useRef({ width: 0, height: 0, aspect: 1 })
  const dragRef = useRef({
    isDragging: false,
    didDrag: false,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0
  })
  const zoomScale = 2
  const resistance = 0.35

  const fallbackItems: ImageMarqueeItem[] = Array.from({ length: 6 }, (_, i) => ({
    alt: `Screenshot placeholder ${i + 1}`
  }))

  const content = (items.length ? items : fallbackItems)
  const activeImage = activeIndex !== null ? content[activeIndex] : null
  const hasMultiple = content.length > 1
  const looped = [...content, ...content]

  useEffect(() => {
    if (!activeImage) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
      if (!hasMultiple) return
      if (event.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % content.length))
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + content.length) % content.length))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImage, content.length, hasMultiple])

  useEffect(() => {
    if (!activeImage) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeImage])

  useEffect(() => {
    if (activeImage) {
      setZoomed(false)
      setPan({ x: 0, y: 0 })
      panRef.current = { x: 0, y: 0 }
    }
  }, [activeImage])

  useEffect(() => {
    if (!activeImage) return
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      updateBounds()
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [activeImage, zoomed])

  const updateBounds = () => {
    const container = containerRef.current
    if (!container) return
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
    const { aspect, width: imageWidth, height: imageHeight } = imageSizeRef.current
    if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return

    const renderedWidth = Math.min(containerWidth, containerHeight * aspect)
    const renderedHeight = Math.min(containerHeight, containerWidth / aspect)
    boundsRef.current = {
      maxX: Math.max(0, ((renderedWidth * zoomScale) - containerWidth) / 2),
      maxY: Math.max(0, ((renderedHeight * zoomScale) - containerHeight) / 2)
    }
  }

  const clampPan = (nextPan: { x: number, y: number }) => {
    const { maxX, maxY } = boundsRef.current
    return {
      x: Math.min(maxX, Math.max(-maxX, nextPan.x)),
      y: Math.min(maxY, Math.max(-maxY, nextPan.y))
    }
  }

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  const handleZoomToggle = (event: React.MouseEvent<HTMLImageElement>) => {
    if (dragRef.current.didDrag) {
      dragRef.current.didDrag = false
      return
    }
    if (!zoomed) {
      updateBounds()
      const imgRect = event.currentTarget.getBoundingClientRect()
      const clickX = event.clientX - imgRect.left
      const clickY = event.clientY - imgRect.top
      const centeredPan = {
        x: (imgRect.width / 2 - clickX) * (zoomScale - 1),
        y: (imgRect.height / 2 - clickY) * (zoomScale - 1)
      }
      const clamped = clampPan(centeredPan)
      panRef.current = clamped
      setPan({ ...clamped })
      setZoomed(true)
      return
    }

    setZoomed(false)
    setPan({ x: 0, y: 0 })
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!zoomed) return
    const state = dragRef.current
    updateBounds()
    state.isDragging = true
    state.didDrag = false
    state.startX = event.clientX
    state.startY = event.clientY
    state.startPanX = pan.x
    state.startPanY = pan.y
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!dragRef.current.isDragging) return
    const dx = event.clientX - dragRef.current.startX
    const dy = event.clientY - dragRef.current.startY
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragRef.current.didDrag = true
    }
    const nextX = dragRef.current.startPanX + dx
    const nextY = dragRef.current.startPanY + dy
    const { maxX, maxY } = boundsRef.current
    const resistedX = nextX > maxX
      ? maxX + (nextX - maxX) * resistance
      : nextX < -maxX
        ? -maxX + (nextX + maxX) * resistance
        : nextX
    const resistedY = nextY > maxY
      ? maxY + (nextY - maxY) * resistance
      : nextY < -maxY
        ? -maxY + (nextY + maxY) * resistance
        : nextY
    panRef.current = { x: resistedX, y: resistedY }
    if (rafRef.current === null) {
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null
        setPan({ ...panRef.current })
      })
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
    if (!dragRef.current.isDragging) return
    dragRef.current.isDragging = false
    setIsDragging(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
    const clamped = clampPan(panRef.current)
    panRef.current = clamped
    setPan({ ...clamped })
  }

  const handlePrev = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + content.length) % content.length))
  }

  const handleNext = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation()
    setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % content.length))
  }

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
                className="h-full w-full object-cover cursor-pointer"
                loading="lazy"
                onClick={() => setActiveIndex(index % content.length)}
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
          onClick={() => setActiveIndex(null)}
        >
          {hasMultiple && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-6 top-1/2 z-[1000] -translate-y-1/2 rounded-full border border-white/10 bg-brand-900/80 p-3 text-sm text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-200 hover:scale-110 hover:bg-brand-900 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] active:scale-95 focus-ring cursor-pointer"
              aria-label="Previous image"
            >
              ←
            </button>
          )}
          {hasMultiple && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-6 top-1/2 z-[1000] -translate-y-1/2 rounded-full border border-white/10 bg-brand-900/80 p-3 text-sm text-white shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-all duration-200 hover:scale-110 hover:bg-brand-900 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] active:scale-95 focus-ring cursor-pointer"
              aria-label="Next image"
            >
              →
            </button>
          )}
          <div ref={containerRef} className="relative max-h-[90vh] max-w-6xl w-full" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute -top-12 right-0 text-sm text-brand-100/80 hover:text-white focus-ring"
            >
              Close
            </button>
            <img
              ref={imageRef}
              src={activeImage.src}
              alt={activeImage.alt}
              className={`h-full w-full rounded-2xl border border-white/10 object-contain shadow-[0_20px_60px_-24px_rgba(0,0,0,0.8)] select-none ${isDragging ? 'transition-none' : 'transition-transform duration-200'} ${zoomed ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
              style={{
                transformOrigin: '50% 50%',
                transform: zoomed ? `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})` : 'scale(1)'
              }}
              onLoad={(event) => {
                const img = event.currentTarget
                const aspect = img.naturalWidth && img.naturalHeight
                  ? img.naturalWidth / img.naturalHeight
                  : 1
                imageSizeRef.current = {
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  aspect
                }
                updateBounds()
              }}
              draggable={false}
              onClick={handleZoomToggle}
              onDragStart={(event) => event.preventDefault()}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
