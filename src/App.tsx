import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import ImageMarquee from './components/ImageMarquee'
import cyberShot1 from './assets/images/Cyber1.jpg'
import cyberShot2 from './assets/images/Cyber2.jpg'
import cyberShot3 from './assets/images/Cyber3.jpg'
import Whiteboard1 from './assets/images/Whiteboard1.jpg'
import Whiteboard2 from './assets/images/Whiteboard2.jpg'
import Whiteboard3 from './assets/images/Whiteboard3.jpg'
import Notes1 from './assets/images/Notes1.jpg'
import Notes2 from './assets/images/Notes2.jpg'
import Notes3 from './assets/images/Notes3.jpg'
import Rhaven1 from './assets/images/Rhaven1.png'
import Rhaven2 from './assets/images/Rhaven2.png'
import Rhaven3 from './assets/images/Rhaven3.png'

const projects = [
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
    title: "Rhaven's Garage",
    description: 
      `E-commerce platform for a motorcycle repair shop, featuring product listings, cart, and checkout functionality.
      Laravel backend with REST API, React frontend, and TypeScript for type safety. 
      Includes user authentication, order management, checkout, and admin functionalities with inventory history tracking
      products, services, and categories management with image rendering for managing products and orders.`,
    repoUrl: 'https://github.com/RonRonnix/PersonalPortfolio.git',
    highlights: ['Laravel', 'React', 'PHP', 'MySQL', 'REST'],
    screenshots: [Rhaven1, Rhaven2, Rhaven3]
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

function App() {
  const aboutCardRef = useRef<HTMLDivElement | null>(null)
  const [aboutVisible, setAboutVisible] = useState(false)
  const worksref = useRef<HTMLDivElement | null>(null)
  const [worksVisible, setWorksVisible] = useState(false)

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
      <Hero />

      {/* Encapsulating box for About */}
        <section id="about" className="relative py-10 bg-brand-900/90 isolate">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-900 to-transparent" />
          {/* Background atmosphere */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-60 -left-40 w-[40rem] h-[40rem] rounded-full bg-[#22d3ee] blur-[170px]" />
            <div className="absolute top-40 -right-60 w-[46rem] h-[46rem] rounded-full bg-[#14b8a6] blur-[160px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75rem] h-[75rem] rounded-full bg-emerald-400/15 blur-[160px]" />
          </div>
        
          <div className="relative max-w-7xl mx-auto">
            <div
              ref={aboutCardRef}
              className={
                'relative overflow-hidden rounded-3xl border border-white/10 bg-brand-800/80 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_-24px_rgba(0,0,0,0.8)] ' +
                (aboutVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-9')
              }
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.06),transparent_70%)]" />
              <div className="max-w-5xl mx-auto px-auto md:py-12">
                <h2 className="text-5xl font-bold mb-8 text-white">About Me</h2>
                <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                <ul className="max-w-5xl text-brand-100/80 leading-relaxed">
                  <li>&bull; I'm a passionate fullstack developer with a strong focus on creating efficient, working, and user-friendly applications with a background in both frontend and backend development.</li>
                  <li>&bull; I bring a holistic approach to solving complex problems and delivering high-quality solutions.</li>
                  <li>&bull; I have created personal projects that showcase my skills in various technologies which includes Laravel, React, TypeScript, Node.js, and more.</li>
                  <li>&bull; I thrive in collaborative environments, where I can contribute to team projects and learn from others.</li>
                  <li>&bull; My goal is to continuously improve my skills and stay up-to-date with the latest industry trends,</li>
                  <li>&bull; ensuring that I can deliver innovative and effective solutions to any challenge I encounter.</li>
                </ul>
                <div className="mt-10">
                  <Marquee
                    items={[
                      'Problem Solver',
                      // 'Clean Code Advocate',
                      'Team Collaborator',
                      'FrontEnd Developer',
                      'BackEnd Developer',
                      'Fullstack Developer',
                      'UI/UX Enthusiast',
                      'Continuous Learner',
                      'Performance Minded',
                      // 'Test Writing',
                      'Documentation',
                    ]}
                    direction="right"
                    className="py-4 border-y border-white/10"
                    speedSeconds={65}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-brand-900/70 to-brand-900" />
        </section>
        
      {/* Encapsulating box for Selected Works */}
        <section id="works" className="relative overflow-hidden py-10 bg-brand-900/80">
          <div className="relative max-w-7xl mx-auto">
            {/* Background atmosphere */}
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute bottom-120 -left-120 w-[40rem] h-[40rem] rounded-full bg-[#14b8a6] blur-[170px]" />
              <div className="absolute -bottom-60 -right-90 w-[46rem] h-[46rem] rounded-full bg-[#1b97aa] blur-[160px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75rem] h-[75rem] rounded-full bg-emerald-400/15 blur-[160px]" />
            </div>
            <div
              ref={worksref}
              className={
                'relative overflow-hidden rounded-3xl border border-white/10 bg-brand-800/80 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_-24px_rgba(0,0,0,0.8)] ' +
                (worksVisible ? 'animate-slide-in-right' : 'opacity-0 -translate-x-9')
              }
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.06),transparent_70%)]" />
              <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 md:py-16">
                <div className="max-w-3xl">
                  <h2 className="text-5xl font-bold mb-4 text-white">Projects I have done</h2>
                  <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                  <p className="text-brand-100/80 leading-relaxed">
                    A selection of my personal and collaborative projects, showcasing my skills in front-end and back-end development, 
                    as well as my ability to work with various technologies and frameworks. 
                    Each project highlights my problem-solving abilities, attention to detail, 
                    and commitment to delivering high-quality software solutions.
                  </p>
                </div>

                <div className="mt-10 space-y-6">
                  {projects.map(project => (
                    <div key={project.title} className="rounded-2xl border border-white/10 bg-brand-800/60 p-6">
                      <div className="grid gap-6 lg:grid-cols-[1fr,1.3fr] lg:items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                          <p className="mt-3 text-sm text-brand-100/80 leading-relaxed">{project.description}</p>
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
                        <ImageMarquee
                          items={project.screenshots.map((src, index) => ({
                            src,
                            alt: `${project.title} screenshot ${index + 1}`
                          }))}
                          className="py-2 border-y border-white/10"
                          speedSeconds={50}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-10 text-center text-sm text-brand-100/60 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Ronald Gelicame. Built with React + Vite, TypeScript, Node.js & Tailwind CSS.</p>
      </footer>
    </div>
  )
}

export default App
