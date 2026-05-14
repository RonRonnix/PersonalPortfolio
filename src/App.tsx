import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'

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
      { threshold: 0.25 }
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
        <section id="about" className="relative py-32 bg-brand-900/90 isolate">
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
                <p className="max-w-5xl text-brand-100/80 leading-relaxed">Add a concise professional summary, your core values, and a short story that shows your motivation. You can include a timeline, skills matrix, or a few personal highlights here.</p>
                <div className="mt-10">
                  <Marquee
                    items={[
                      'Problem Solver',
                      'Clean Code Advocate',
                      'Team Collaborator',
                      'UI/UX Focused',
                      'Continuous Learner',
                      'Performance Minded',
                      'Test Writing',
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
        <section id="works" className="py-32 bg-brand-900/80">
          <div className="relative max-w-7xl mx-auto">
            <div
              ref={worksref}
              className={
                'relative overflow-hidden rounded-3xl border border-white/10 bg-brand-800/80 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_-24px_rgba(0,0,0,0.8)] ' +
                (worksVisible ? 'animate-slide-in-right' : 'opacity-0 -translate-x-9')
              }
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-800/80 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_-24px_rgba(0,0,0,0.8)]">
                <div className="max-w-5xl mx-auto px-auto md:py-12">
                  <h2 className="text-5xl font-bold mb-4 text-white">Projects I have done</h2>
                  <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                  <p className="max-w-5xl text-brand-100/80 leading-relaxed">Samples.</p>
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
