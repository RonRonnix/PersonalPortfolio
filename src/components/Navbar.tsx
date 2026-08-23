import { useState, useEffect } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#works', label: 'Works' }
]

function LinkedInIcon({ className = 'w-5 h-5' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.71h.06c.53-.95 1.82-1.95 3.74-1.95 4 0 4.74 2.63 4.74 6.05V21h-4v-5.18c0-1.24-.02-2.85-1.74-2.85-1.74 0-2.01 1.36-2.01 2.76V21H9z" />
    </svg>
  )
}

function GithubIcon({ className = 'w-5 h-5' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function XIcon({ className = 'w-5 h-5' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    const sectionIds = links.map(l => l.href.replace('#',''))
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id)
        }
      })
    }, {
      // When the middle portion of a section is within viewport
      root: null,
      threshold: 0.45,
      // Push trigger lines inward so switching feels natural
      rootMargin: '-10% 0px -40% 0px'
    })

    sections.forEach(sec => observer.observe(sec))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav className="backdrop-blur supports-[backdrop-filter]:bg-brand-900/70 bg-brand-900/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 grid grid-cols-3 items-center">
          <a href="#home" className="font-semibold tracking-wide text-white text-sm sm:text-base">Ronald Gelicame</a>
            <ul className="hidden md:flex gap-10 text-sm font-medium justify-self-center">
              {links.map(l => {
                const id = l.href.substring(1)
                const isActive = active === id
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={
                        `relative transition-colors after:absolute after:left-0 after:right-0 after:-bottom-2 after:h-[2px] after:rounded-full after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ` +
                        (isActive
                          ? 'text-white after:scale-x-100 after:bg-emerald-400'
                          : 'text-brand-50/70 hover:text-white after:bg-emerald-300/70 hover:after:scale-x-100')
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          
          <div className="flex items-center gap-5 justify-self-end">
            <div className="hidden md:flex items-center gap-4">
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/ronald-gelicame-0958003a7/" target="_blank" rel="noreferrer" className="text-brand-50/70 hover:text-white transition-colors">
                <LinkedInIcon />
              </a>
              <a aria-label="Github" href="https://github.com/RonRonnix" target="_blank" rel="noreferrer" className="text-brand-50/70 hover:text-white transition-colors">
                <GithubIcon />
              </a>
              <a aria-label="X" href="" target="_blank" rel="noreferrer" className="text-brand-50/70 hover:text-white transition-colors">
                <XIcon />
              </a>
            </div>

            <button aria-label="Toggle navigation" className="md:hidden text-brand-50 hover:text-white focus-ring" onClick={() => setOpen(o => !o)}>
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {open && (
          <div className="md:hidden border-t border-white/10 bg-brand-800/95 backdrop-blur">
            <div className="px-6 py-4 space-y-4">
              {links.map(l => {
                const id = l.href.substring(1)
                const isActive = active === id
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block font-medium transition-colors ${isActive ? 'text-white' : 'text-brand-50/80 hover:text-white'}`}
                  >
                    {l.label}
                  </a>
                )
              })}
              <div className="flex gap-4 pt-2">
                <a aria-label="LinkedIn" href="https://www.linkedin.com/in/ronald-gelicame-0958003a7/" target="_blank" rel="noreferrer" className="text-brand-50/70 hover:text-white transition-colors">
                  <LinkedInIcon />
                </a>
                <a aria-label="Github" href="https://github.com/RonRonnix" target="_blank" rel="noreferrer" className="text-brand-50/70 hover:text-white transition-colors">
                  <GithubIcon />
                </a>
                <a aria-label="X" href="" target="_blank" rel="noreferrer" className="text-brand-50/70 hover:text-white transition-colors">
                  <XIcon />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
