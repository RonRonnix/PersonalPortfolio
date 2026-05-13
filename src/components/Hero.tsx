import profileImg from '../assets/images/Profileimage.jpg' 
import Marquee from './Marquee'

export default function Hero() {
  return (
    <section id="home" className="relative bg-brand-800 pt-40 pb-28 px-4 overflow-hidden">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-10 opacity-40">
        <div className="absolute -top-40 -left-24 w-[35rem] h-[35rem] rounded-full bg-[#83c298] blur-[200px]" />
        <div className="absolute bottom-0 -right-24 w-[36rem] h-[36rem] rounded-full bg-[#588970] blur-[110px]" />
      </div>

      {/* Encapsulating box */}
      <div className="relative max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-brand-500/85 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_30px_-5px_rgba(0,0,0,0.5)]">
          
          {/* gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08),transparent_70%)]" />
          <div className="relative px-10 py-16 md:py-20 flex flex-col md:flex-row items-center gap-16 md:gap-20">
            
            {/* Text content */}
            <div className="flex-1 max-w-xl">
              <p className="text-emerald-100 font-medium tracking-wide">Hello, I&apos;m Ronald,</p>
              <h1 className="mt-3 font-extrabold leading-tight tracking-tight text-white text-5xl sm:text-6xl">
                <span className="block">Full stack</span>
                <span className="block">Developer</span>
              </h1>
              <p className="mt-6 text-lg text-brand-50/85 leading-relaxed max-w-md">based in the Philippines.</p>
              <div className="mt-10 flex gap-5 items-center flex-wrap">
                <a href="/resume.pdf" className="inline-flex items-center rounded-md border border-emerald-200/70 bg-emerald-300/5 px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-400/15 focus-ring transition-colors">Resume</a>
                <a href="#works" className="text-sm font-medium text-emerald-50/80 hover:text-white focus-ring">View Works →</a>
              </div>
            </div>

            {/* Image circle */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80 group">
                <div className="absolute inset-0 rounded-full border border-white/30" />
                <div className="absolute inset-4 rounded-full border border-white/30" />
                <div className="absolute inset-4 rounded-full overflow-hidden shadow-xl ring-1 ring-black/20 bg-brand-700/20 backdrop-blur-sm">
                  <img
                    src={profileImg}
                    alt="Ronald profile portrait"
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.15),transparent_65%)]" />
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
