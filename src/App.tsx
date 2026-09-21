import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
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

const skillGroups = [
  { title: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'] },
  { title: 'Backend', skills: ['PHP', 'Laravel', 'Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Database', skills: ['PostgreSQL', 'MySQL'] },
  { title: 'Tools', skills: ['Git', 'GitHub', 'Vite', 'Postman', 'Vercel', 'Canvas', 'Sockets'] }
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
    description: 'A full-stack e-commerce and operations platform for a motorcycle repair shop.',
    details: [
      `Rhaven's Garage is a full-stack e-commerce and appointment-booking platform built with Laravel, PHP, React, TypeScript, Inertia.js, Vite, and Tailwind CSS. 
      It provides a public storefront, product and service catalogs, shopping cart, checkout, customer accounts, appointment scheduling, inventory management, order fulfillment, and administrative dashboards. 
      The platform uses PayMongo for secure hosted payments and refunds, n8n for automated order and inquiry workflows, Resend for transactional email, Cloudflare Turnstile for bot protection, and Sentry for error monitoring. 
      Authentication is handled through Laravel Fortify with email verification, password reset, two-factor authentication, while Spatie Permission provides role-based authorization for customers, administrators, and owners. 
      Additional security features include CSRF protection, rate limiting, secure cookies, security headers, activity logging, signed payment webhooks, database transactions, inventory reservations, Redis queues, and automated PostgreSQL backup and restore verification.`
    ],
    date: 'July 28, 2026 - September 5, 2026',
    repoUrl: 'https://github.com/RonRonnix/Rhaven-s-Garage',
    highlights: ['Laravel', 'React', 'PHP', 'PostgreSQL', 'REST', 'TailwindCSS', 'TypeScript', 'Inertia.js', 'Vite', 'n8n', 'Sentry', 'Resend', 'Cloudflare Turnstile'],
    screenshots: [Rhaven1, Rhaven2, Rhaven3]
  },
  {
    title: "Collaborative Whiteboard",
    description: 'A collaborative drawing application for shared boards and real-time interaction.',
    details: [
      `Whiteboard is a full-stack realtime collaboration application built with React, TypeScript, Vite, Tailwind CSS, Express, Prisma, PostgreSQL, and Socket.IO. 
      The platform allows authenticated users to register, verify their email, create collaborative rooms, invite others using room codes, and work together through a shared drawing canvas and realtime chat. 
      Drawing is implemented with the browser’s HTML Canvas API, while Socket.IO synchronizes strokes, cursor movements, participant presence, chat messages, and board updates between connected users. 
      The backend uses JWT authentication, bcrypt password hashing, Zod validation, protected API routes, CORS configuration, and database relationships managed through Prisma. 
      User accounts, rooms, invite codes, and verification records are stored in PostgreSQL, while active collaboration state is maintained in memory for fast realtime interaction.`
    ],
    date: 'November 23, 2025 - January 19, 2026',
    repoUrl: 'https://github.com/RonRonnix/Whiteboard.git',
    highlights: ['React + Typescript', 'Vite', 'TailwindCSS', 'Prisma', 'Express', 'Prisma', 'Sockets', 'Canvas'],
    screenshots: [Whiteboard1, Whiteboard2, Whiteboard3]
  },
    {
    title: "Cyber",
    description: 'A responsive e-commerce storefront focused on the customer purchase flow.',
    details: [
      `Cyber is a full-stack online shopping platform built with React, TypeScript, Vite, Tailwind CSS, Node.js, Express, Prisma, and PostgreSQL. 
      The application supports product browsing, product management, shopping carts, wishlists, customer profiles, addresses, orders, reviews, admin analytics, image uploads, and role-based administration. 
      It uses JWT authentication with secure HTTP-only cookies, bcrypt password hashing, Zod validation, CSRF protection, CORS controls, rate limiting, and security headers. 
      Payments are handled through PayMongo, supporting cards, GCash, PayMaya, checkout sessions, webhooks, and refunds. 
      The project also includes backend testing with Vitest and Supertest, database seeding, operational documentation, and separate customer and administrator workflows.`
    ],
    date: 'December 20, 2025 - May 26, 2026',
    repoUrl: 'https://github.com/RonRonnix/E-commerce.git',
    highlights: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'REST'],
    screenshots: [cyberShot1, cyberShot2, cyberShot3]
  },
  {
    title: "Notes App",
    description: 'A personal note-taking application for creating, organizing, and finding notes quickly.',
    details: [
      `NoteApp is a full-stack note-taking application built with React, TypeScript, Vite, React Router, and Tailwind CSS on the frontend, with Node.js, Express, and TypeScript as the backend. 
      The application uses PostgreSQL for persistent storage and provides authenticated user registration and login through bcrypt password hashing and JSON Web Tokens. 
      Authenticated users can create, view, edit, and delete their own notes through a REST API, while server-side authorization ensures that users cannot access or modify notes belonging to other accounts. 
      The project also includes request validation with Zod, parameterized SQL queries, Helmet security headers, CORS configuration, responsive layouts, modal-based note editing, confirmation dialogs, loading states, and error handling. 
      Its architecture separates the frontend interface, backend API, authentication layer, and database access, making it a practical example of a modern full-stack CRUD application.`
    ],
    date: 'October 13, 2025 - November 3, 2025',
    repoUrl: 'https://github.com/RonRonnix/noteapp.git',
    highlights: ['React', 'TypeScript', 'REST', 'Vite', 'TailwindCSS', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'Zod'],
    screenshots: [Notes1, Notes2, Notes3]
  }
]

const experienceImages = [
  {
    title: "BlendIToro Internship",
    images: [blendit1, blendit2, blendit3, blendit4, blendit5, blendit6, blendit7, blendit8]
  }
]

function Disclosure({ header, children, className = '' }: { header: ReactNode; children: ReactNode; className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={`group rounded-xl border border-white/10 ${className}`} data-open={isOpen || undefined}>
      <button
        type="button"
        onClick={() => setIsOpen(open => !open)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left focus-ring sm:p-5"
      >
        {header}
        <span aria-hidden="true" className={`shrink-0 text-2xl text-emerald-200 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className="disclosure-content border-t border-white/10">
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  )
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
              <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-4xl">About Me</h2>
                <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                <div className="max-w-3xl space-y-4 text-base leading-relaxed text-justify text-brand-100/85">
                  <p>I&apos;m a full-stack developer based in Bohol, Philippines. I build practical web applications with React, TypeScript, Laravel, REST APIs, and PostgreSQL.</p>
                  <p>My recent work includes e-commerce flows, real-time collaboration tools, and note-management applications. I work across user interfaces, backend features, and the data layer that supports them.</p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {skillGroups.map(group => (
                    <section
                      key={group.title}
                      className="rounded-xl border border-white/10 bg-brand-900/40 p-4"
                    >
                      <h3 className="text-base font-semibold text-white">
                        {group.title}
                      </h3>
                            <ul
                              className={`mt-3 text-sm text-brand-100/80 ${
                                group.skills.length > 4
                                  ? "grid grid-cols-2 gap-x-4 gap-y-2"
                                  : "space-y-2"
                              }`}
                            >
                        {group.skills.map(skill => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
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
              <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
                <h2 className="mb-4 text-2xl font-bold text-white sm:text-4xl">My Experience</h2>
                <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                <Disclosure className="bg-brand-900/40" header={<div>
                      <h3 className="text-lg font-semibold text-white">BlendIToro — Front-End Web Development Intern</h3>
                      <p className="mt-1 text-sm text-brand-100/75">Layout implementation, backend integration, and collaboration in a five-person internship team.</p>
                    </div>}
                >
                    <div className="p-4 sm:p-5">
                      <div className="space-y-2 text-base text-justify leading-relaxed text-brand-100/85">
                        <p> During my internship at BlendToro, I contributed to the development of a client-focused web application by building the webpage with responsive and reusable interfaces with React and TypeScript and integrating REST APIs with backend services. 
                          I collaborated with a five-person development team to translate client requirements into functional features, while contributing to UI/UX decisions, debugging, and application improvements. 
                          I also gained experience with real-world deployment workflows through Vercel and worked closely with teammates to test, refine, and deliver application features.</p>
                      </div>
                      <p className="mt-4 text-sm font-medium text-emerald-100">Technologies used: React, PHP, Laravel, Postman, REST APIs, SaaS, UI/UX, Flutter, and Vercel.</p>
                      <ImageMarquee
                        items={experienceImages[0].images.map((src, index) => ({ src, alt: `${experienceImages[0].title} image ${index + 1}` }))}
                        className="mt-5 border-y border-white/10 py-5"
                        speedSeconds={110}
                      />
                    </div>
                </Disclosure>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-brand-900/70 to-brand-900" />
        </section>
        
      {/* Encapsulating box for my work */}
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
                  <h2 className="mb-3 text-2xl font-bold text-white sm:text-4xl">My Projects</h2>
                  <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                  <p className="text-brand-100/80 text-justify leading-relaxed">
                    Here are some of my recent projects. Each project includes a description, technical scope, stack, screenshots, and a link to the source code on GitHub.
                    Expand a project to review its technical scope, stack, screenshots, and source code.
                  </p>
                </div>

                <div className="mt-6 space-y-4">
                  {projects.map(project => (
                    <Disclosure key={project.title} className="bg-brand-800/60" header={<div>
                          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          <p className="mt-1 text-sm text-brand-100/75">{project.description}</p>
                          <p className="mt-2 text-xs font-medium text-emerald-100/80">Project date: {project.date}</p>
                        </div>}
                    >
                        <div className="p-4 sm:p-5">
                          <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wide text-emerald-200">Technical scope</h4>
                            <ul className="mt-3 space-y-2 text-base text-justify leading-relaxed text-brand-100/85">
                              {project.details.map(detail => <li key={detail}>{detail}</li>)}
                            </ul>
                            <h4 className="mt-5 text-sm font-semibold uppercase tracking-wide text-emerald-200">Stack</h4>
                            <div className="mt-3 flex flex-wrap gap-2 text-sm text-brand-100/80">
                              {project.highlights.map(tag => (
                                <span key={tag} className="rounded-full border border-white/10 bg-brand-900/60 px-3 py-1">{tag}</span>
                              ))}
                            </div>
                            <ImageMarquee
                              items={project.screenshots.map((src, index) => ({ src, alt: `${project.title} screenshot ${index + 1}` }))}
                              className="mt-5 border-y border-white/10 py-5"
                              speedSeconds={65}
                            />
                            {/* <p className="mt-5 text-sm text-brand-100/65">Live demo: </p> */}
                            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-emerald-200 hover:text-white focus-ring">
                              View source on GitHub →
                            </a>
                          </div>
                        </div>
                    </Disclosure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative bg-brand-900/90 px-4 py-8 sm:py-10">
          <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-brand-800/80 px-5 py-8 text-center shadow-[0_18px_50px_-28px_rgba(0,0,0,0.8)] sm:px-8 sm:py-10">
            <p className="text-sm font-semibold tracking-wide text-emerald-200">LET&apos;S CONNECT</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-4xl">Interested in working with me?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-100/85">
              I&apos;m happy to discuss web-development opportunities, collaborations, and new ideas.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" onClick={handleCopyEmail} className="inline-flex cursor-pointer rounded-md border border-emerald-300/60 bg-emerald-400/10 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-400/20 focus-ring">
                {emailCopied ? 'Email copied' : 'Copy email address'}
              </button>
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
