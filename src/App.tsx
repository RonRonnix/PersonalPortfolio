import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import ImageMarquee from './components/ImageMarquee'
import cyberShot1 from './assets/images/Cyber1.webp'
import cyberShot2 from './assets/images/Cyber2.webp'
import cyberShot3 from './assets/images/Cyber3.webp'
import Whiteboard1 from './assets/images/Whiteboard1.webp'
import Whiteboard2 from './assets/images/Whiteboard2.webp'
import Whiteboard3 from './assets/images/Whiteboard3.webp'
import Notes1 from './assets/images/Notes1.webp'
import Notes2 from './assets/images/Notes2.webp'
import Notes3 from './assets/images/Notes3.webp'
import Rhaven1 from './assets/images/Rhaven1.webp'
import Rhaven2 from './assets/images/Rhaven2.webp'
import Rhaven3 from './assets/images/Rhaven3.webp'
import blendit1 from './assets/images/blendit1.webp'
import blendit2 from './assets/images/blendit2.webp'
import blendit3 from './assets/images/blendit3.webp'
import blendit4 from './assets/images/blendit4.webp'
import blendit5 from './assets/images/blendit5.webp'
import blendit6 from './assets/images/blendit6.webp'
import blendit7 from './assets/images/blendit7.webp'
import blendit8 from './assets/images/blendit8.webp'

const PixelBlast = lazy(() => import('./components/PixelBlast'))
const email = 'gelicamer2working@gmail.com'
const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ronald-gelicame-0958003a7/' },
  { label: 'GitHub', href: 'https://github.com/RonRonnix' },
  { label: 'Facebook', href: 'https://www.facebook.com/RonaldGelicame.RG' }
]

function DecorativePixelBlast() {
  const [showEffect, setShowEffect] = useState(false)

  useEffect(() => {
    const navigatorWithConnection = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
    }
    const connection = navigatorWithConnection.connection
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const slowConnection = connection?.saveData || connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
    if (reduceMotion || slowConnection) return

    const loadEffect = () => setShowEffect(true)
    const idleCallback = window.requestIdleCallback?.(loadEffect, { timeout: 2000 })
    const timeout = idleCallback === undefined ? window.setTimeout(loadEffect, 1500) : undefined

    return () => {
      if (idleCallback !== undefined) window.cancelIdleCallback?.(idleCallback)
      if (timeout !== undefined) window.clearTimeout(timeout)
    }
  }, [])

  if (!showEffect) return null

  return (
    <Suspense fallback={null}>
      <PixelBlast
        className="pointer-events-none fixed z-0 opacity-60"
        color="#94a3b8"
        pixelSize={3}
        patternScale={5}
        patternDensity={0.6}
        speed={5}
        edgeFade={0.35}
      />
    </Suspense>
  )
}

const projects = [
  {
    title: "Rhaven's Garage",
    description: 
      `E-commerce platform for a motorcycle repair shop, featuring product listings, cart, and checkout functionality.
      Laravel backend with REST API, React frontend, and TypeScript for type safety. 
      Includes user authentication, order management, checkout, and admin functionalities with inventory history tracking
      products, services, and categories management with image rendering for managing products and orders.`,
    repoUrl: 'https://github.com/RonRonnix/Rhaven-s-Garage',
    highlights: ['Laravel', 'React', 'PHP', 'PostgreSQL', 'REST', 'TailwindCSS', 'TypeScript'],
    screenshots: [Rhaven1, Rhaven2, Rhaven3]
  },
  {
    title: "Cyber",
    description: 
      `E-commerce storefront with product browsing, cart, and checkout flow.
      Built with React, TypeScript, and Vite for a fast and responsive user experience.
      Features include product listings, shopping cart, and checkout functionality with a focus on performance and user experience.`,
    repoUrl: 'https://github.com/RonRonnix/E-commerce.git',
    highlights: ['React', 'TypeScript', 'Vite'],
    screenshots: [cyberShot1, cyberShot2, cyberShot3]
  },
  {
    title: "Collaborative Whiteboard",
    description: 
      `Real-time drawing canvas with boards, tools, and sharing.
      Built with React, TypeScript, and Vite for a fast and responsive user experience.
      Features include real-time collaboration, drawing tools, sharing capabilities, and real-time messaging.`,
    repoUrl: 'https://github.com/RonRonnix/Whiteboard.git',
    highlights: ['React', 'Sockets', 'Canvas'],
    screenshots: [Whiteboard1, Whiteboard2, Whiteboard3]
  },
  {
    title: "Notes App",
    description: 
      `Personal notes with auth, tags, and quick search.
      Built with React, TypeScript, and Vite for a fast and responsive user experience.
      Features include note creation, editing, tagging, and quick search functionality.`,
    repoUrl: 'https://github.com/RonRonnix/noteapp.git',
    highlights: ['React', 'TypeScript', 'REST'],
    screenshots: [Notes1, Notes2, Notes3]
  }
]

const experienceImages = [
  {
    title: "BlendIToro Internship",
    images: [blendit1, blendit2, blendit3, blendit4, blendit5, blendit6, blendit7, blendit8]
  }
]

function LazyMount({ children, className = '' }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || shouldRender) return
    if (!('IntersectionObserver' in window)) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldRender(true)
        observer.disconnect()
      },
      { rootMargin: '500px 0px', threshold: 0 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [shouldRender])

  return <div ref={containerRef} className={className}>{shouldRender ? children : null}</div>
}

function App() {
  const aboutCardRef = useRef<HTMLDivElement | null>(null)
  const [aboutVisible, setAboutVisible] = useState(false)
  const worksref = useRef<HTMLDivElement | null>(null)
  const [worksVisible, setWorksVisible] = useState(false)
  const experienceCardRef = useRef<HTMLDivElement | null>(null)
  const [experienceVisible, setExperienceVisible] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setEmailCopied(true)
    } catch {
      setEmailCopied(false)
    }
  }

  useEffect(() => {
    const card = aboutCardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setAboutVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

    useEffect(() => {
    const card = experienceCardRef.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setExperienceVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

    useEffect(() => {
    const card = worksref.current
    if (!card) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setWorksVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.06 }
    )

    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 background-texture" />
      <DecorativePixelBlast />
      <Navbar />
      <main className="relative z-10 flex-1">
      <Hero />

      {/* Encapsulating box for About */}
        <section id="about" className="relative isolate bg-brand-900/90 px-4 py-5 sm:py-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-900 to-transparent" />
          <div className="relative max-w-7xl mx-auto">
            <div
              ref={aboutCardRef}
              className={
                'relative overflow-hidden rounded-2xl border border-white/10 bg-brand-800/80 backdrop-blur-md shadow-[0_18px_50px_-28px_rgba(0,0,0,0.8)] ' +
                (aboutVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-9')
              }
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.06),transparent_70%)]" />
              <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-4xl">About Me</h2>
                <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                <ul className="max-w-5xl text-brand-100/80 leading-relaxed">
                  <li>&bull; I'm a passionate fullstack developer with a strong focus on creating efficient, working, and user-friendly applications with hands-on experience in both frontend and backend development.</li>
                  <li>&bull; I have created personal projects that showcase my skills in various technologies which includes Laravel, React, TypeScript, Node.js, TailwindCSS, and more..</li>
                  <li>&bull; I thrive in collaborative environments, where I can contribute to team projects and learn from others.</li>
                  <li>&bull; My goal is to continuously improve my skills and stay up-to-date with the latest industry trends, ensuring that I can deliver innovative and effective solutions to any challenge I encounter.</li>
                </ul>
                <LazyMount className="mt-6 min-h-14">
                  <Marquee
                    items={[
                      'Problem Solver',
                      'Clean Code Advocate',
                      'Team Collaborator',
                      'FrontEnd Developer',
                      'BackEnd Developer',
                      'Fullstack Developer',
                      'UI/UX Enthusiast',
                      'Continuous Learner',
                      'Performance Minded',
                      'Test Writing',
                      'Documentation',
                    ]}
                    direction="right"
                    className="py-4 border-y border-white/10"
                    speedSeconds={65}
                  />
                </LazyMount>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-brand-900/70 to-brand-900" />
        </section>

        {/* Encapsulating box for Experiences */}
        <section id="experience" className="relative isolate bg-brand-900/90 px-4 py-5 sm:py-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-900 to-transparent" />
          <div className="relative max-w-7xl mx-auto">
            <div
              ref={experienceCardRef}
              className={
                'relative overflow-hidden rounded-2xl border border-white/10 bg-brand-800/80 backdrop-blur-md shadow-[0_18px_50px_-28px_rgba(0,0,0,0.8)] ' +
                (experienceVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-9')
              }
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.06),transparent_70%)]" />
              <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-4xl">My Experience</h2>
                <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                <ul className="max-w-5xl text-brand-100/80 leading-relaxed">
                  <li>&bull; I was an intern in BlendIToro as a Front-End web developer where I was tased in handling the layout of the webpage and connecting back-end features to the front-end.</li>
                  <li>&bull; The things I learned:</li>
                  &ndash; React, PHP, Laravel, Postman, REST, SaaS, UI/UX, Flutter, Vercel Deployment
                  <li>&bull; I was assigned in a team of 5 interns with me being the only Front-End guy with another developer handling the mobile platform through Flutter, two developer being Back-end using Larvel and the last one being the PM who handles the project and the client.</li>
                </ul>

                <LazyMount className="mt-5 min-h-[11.625rem] border-y border-white/10 py-5 sm:min-h-[13.5rem] md:min-h-[14.5rem]">
                  <ImageMarquee
                    items={experienceImages[0].images.map((src, index) => ({
                      src,
                      alt: `${experienceImages[0].title} images ${index + 1}`
                    }))}
                    speedSeconds={110}
                  />
                </LazyMount>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-brand-900/70 to-brand-900" />
        </section>
        
      {/* Encapsulating box for Selected Works */}
        <section id="works" className="relative overflow-hidden bg-brand-900/80 px-4 py-5 sm:py-6">
          <div className="relative max-w-7xl mx-auto">
            <div
              ref={worksref}
              className={
                'relative overflow-hidden rounded-2xl border border-white/10 bg-brand-800/80 backdrop-blur-md shadow-[0_18px_50px_-28px_rgba(0,0,0,0.8)] ' +
                (worksVisible ? 'animate-slide-in-right' : 'opacity-0 -translate-x-9')
              }
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.06),transparent_70%)]" />
              <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10">
                <div className="max-w-3xl">
                  <h2 className="mb-3 text-2xl font-bold text-white sm:text-4xl">Projects I have done</h2>
                  <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                  <p className="text-brand-100/80 leading-relaxed">
                    A selection of my personal and collaborative projects, showcasing my skills in front-end and back-end development, 
                    as well as my ability to work with various technologies and frameworks. 
                    Each project highlights my problem-solving abilities, attention to detail, 
                    and commitment to delivering high-quality software solutions.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {projects.map(project => (
                    <div key={project.title} className="rounded-xl border border-white/10 bg-brand-800/60 p-4 sm:p-5">
                      <div className="grid gap-6 lg:grid-cols-[1fr,1.3fr] lg:items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          <p className="mt-3 text-base text-brand-100/80 leading-relaxed">{project.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2 text-xs text-brand-100/80">
                            {project.highlights.map(tag => (
                              <span key={tag} className="rounded-full border border-white/10 bg-brand-900/60 px-3 py-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                          {project.repoUrl ? (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-5 inline-flex text-sm font-semibold text-emerald-200 hover:text-white focus-ring"
                            >
                              GitHub Repo →
                            </a>
                          ) : (
                            <div className="mt-5 text-sm text-brand-100/60">Add repo link</div>
                          )}
                        </div>
                        <LazyMount className="min-h-[11.625rem] min-w-0 border-y border-white/10 py-5 sm:min-h-[13.5rem] md:min-h-[14.5rem]">
                          <ImageMarquee
                            items={project.screenshots.map((src, index) => ({
                              src,
                              alt: `${project.title} screenshot ${index + 1}`
                            }))}
                            speedSeconds={50}
                          />
                        </LazyMount>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative bg-brand-900/90 px-4 py-8 sm:py-10">
          <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-brand-800/80 px-5 py-8 text-center shadow-[0_18px_50px_-28px_rgba(0,0,0,0.8)] sm:px-8 sm:py-10">
            <p className="text-sm font-semibold tracking-wide text-emerald-200">LET&apos;S CONNECT</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-4xl">Have a project in mind?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-100/85">
              I&apos;m happy to discuss web-development opportunities, collaborations, and new ideas.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={handleCopyEmail} className="inline-flex rounded-md border border-emerald-300/60 bg-emerald-400/10 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-400/20 focus-ring">
                {emailCopied ? 'Email copied' : 'Copy email address'}
              </button>
              <a href={`mailto:${email}`} className="inline-flex rounded-md border border-white/15 px-5 py-3 text-base font-semibold text-brand-100/90 transition-colors hover:border-emerald-300/60 hover:text-white focus-ring">
                Open email app
              </a>
            </div>
            <p className="mt-3 text-sm text-brand-100/75">{email}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-base font-medium">
              {socialLinks.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" className="text-brand-100/85 underline decoration-emerald-300/60 underline-offset-4 transition-colors hover:text-white focus-ring">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/5 py-6 text-center text-xs text-brand-100/60">
        <p>&copy; {new Date().getFullYear()} Ronald Gelicame. Built with React + Vite, TypeScript, Node.js & Tailwind CSS.</p>
      </footer>
    </div>
  )
}

export default App
