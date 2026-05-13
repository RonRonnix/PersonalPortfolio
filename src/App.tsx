import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
      <Hero />

      {/* Encapsulating box for About */}
        <section id="about" className="relative py-32 bg-brand-800/95 border-t border-white/55 isolate">
          {/* Background atmosphere */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute -top-50 -left-35 w-[40rem] h-[40rem] rounded-full bg-[#70aa83] blur-[130px]" />
            <div className="absolute top-50 -right-55 w-[46rem] h-[46rem] rounded-full bg-[#588970] blur-[130px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75rem] h-[75rem] rounded-full bg-emerald-300/20 blur-[160px] bg-fade-radial" />
          </div>
        
          <div className="relative max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-brand-500/85 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_30px_-5px_rgba(0,0,0,0.5)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.06),transparent_70%)]" />
              <div className="max-w-5xl mx-auto px-auto md:py-12">
                <h2 className="text-5xl font-bold mb-8">About Me</h2>
                <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                <p className="max-w-5xl text-brand-50/80 leading-relaxed">Add a concise professional summary, your core values, and a short story that shows your motivation. You can include a timeline, skills matrix, or a few personal highlights here.</p>
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
        </section>
        
      {/* Encapsulating box for Selected Works */}
        <section id="works" className="py-32 bg-brand-700/40 border-t border-white/55">
          <div className="relative max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-brand-500/85 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_30px_-5px_rgba(0,0,0,0.5)]">
              <div className="max-w-5xl mx-auto px-auto md:py-12">
                <h2 className="text-5xl font-bold mb-4">Selected Work</h2>
                <div className="mt-6 h-px w-32 mb-4 bg-white/30 rounded-full"></div>
                <p className="max-w-5xl text-brand-50/80 leading-relaxed">Showcase 3–6 projects with a strong headline, quick problem / solution summary, and technologies used. Include clear calls to action (live demo, repo).</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-10 text-center text-sm text-brand-100/60 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Ronald Gelicame. Built with React, TypeScript & Tailwind CSS.</p>
      </footer>
    </div>
  )
}

export default App
