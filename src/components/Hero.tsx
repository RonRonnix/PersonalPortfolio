import profileImg from '../assets/images/Profileimage.jpg' 
import Marquee from './Marquee'

export default function Hero() {
  return (
    <section id="home" className="relative bg-brand-900 pt-40 pb-28 px-4 overflow-visible">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-10 opacity-40">
        <div className="absolute -top-48 -left-24 w-[40rem] h-[40rem] rounded-full bg-[#2dd4bf] blur-[190px]" />
        <div className="absolute bottom-0 -right-24 w-[36rem] h-[36rem] rounded-full bg-[#38bdf8] blur-[140px]" />
      </div>

      {/* Encapsulating box */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-800/80 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_-24px_rgba(0,0,0,0.8)]">
          
          {/* gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.08),transparent_70%)]" />
          <div className="relative px-10 py-16 md:py-20 flex flex-col md:flex-row items-center gap-16 md:gap-20">
            
            {/* Text content */}
            <div className="flex-1 max-w-xl animate-fade-up">
              <p className="text-emerald-200 font-medium tracking-wide">Hello, I&apos;m Ronald,</p>
              <h1 className="mt-3 font-extrabold leading-tight tracking-tight text-gradient text-5xl sm:text-6xl">
                <span className="block">Full stack</span>
                <span className="block">Developer</span>
              </h1>
              <p className="mt-6 text-lg text-brand-100/85 leading-relaxed max-w-md">based in the Philippines.</p>
              <div className="mt-10 flex gap-5 items-center flex-wrap">
                <a href="/resume.pdf" className="inline-flex items-center rounded-md border border-emerald-300/60 bg-emerald-400/10 px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-400/20 focus-ring transition-colors">Resume</a>
                <a href="#works" className="text-sm font-medium text-brand-100/80 hover:text-white focus-ring">View Works →</a>
              </div>
            </div>

            {/* Image circle */}
            <div className="flex-1 flex justify-center animate-fade-up">
              <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                <div className="absolute inset-0 rounded-full border border-white/20" />
                <div className="absolute inset-4 rounded-full border border-white/15" />
                <div className="absolute inset-4 rounded-full overflow-hidden shadow-xl ring-1 ring-black/30 bg-brand-700/20 backdrop-blur-sm">
                  <img
                    src={profileImg}
                    alt="Ronald profile portrait"
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.2),transparent_65%)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tech stack marquee */}
      <div className="mt-12 max-w-7xl mx-auto px-4">
        <Marquee
          items={[
            'TypeScript',
            'JavaScript',
            'React',
            'HTML5',
            'CSS3 / Tailwind',
            'REST APIs',
            'Vite',
            'Git / GitHub',
            'Responsive Design',
            'Accessibility (a11y)',
            'Performance Optimization'
          ]}
          className="py-4 border-y border-white/10"
          speedSeconds={65}
        />
      </div>
    </section>
  )
}
