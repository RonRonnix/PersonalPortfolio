import React from 'react'

interface MarqueeProps {
  items: string[]
  direction?: 'left' | 'right'
  className?: string
  speedSeconds?: number // allow override
}

/*
  Accessible, pause-on-hover marquee using duplicated content for seamless loop.
  We rely on CSS animation defined in tailwind.config.js (keyframes marquee).
*/
export default function Marquee({ items, direction = 'left', className = '', speedSeconds }: MarqueeProps) {
  const animationClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  const style: React.CSSProperties | undefined = speedSeconds ? { animationDuration: `${speedSeconds}s` } : undefined

  // Duplicate items to ensure smooth continuous scroll
  const content = [...items, ...items]

  return (
    <div className={`group relative overflow-hidden select-none ${className}`}>      
      <div
        className={`marquee-track flex w-max gap-12 pr-12 ${animationClass}`}
        style={style}
        aria-hidden="true"
      >
        {content.map((txt, i) => (
          <span
            key={i + txt}
            className="text-base md:text-lg font-medium tracking-wide text-emerald-50/80 whitespace-nowrap"
          >
            {txt}
          </span>
        ))}
      </div>

      {/* subtle gradient edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-800 via-brand-800/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-800 via-brand-800/70 to-transparent" />
    </div>
  )
}
