import { ArrowRight, Lock, Zap, Globe } from 'lucide-react'
import TerminalWindow from './TerminalWindow'

interface Props {
  hero: { title: string; subtitle: string; buttonText: string }
  cabinetUrl: string
}

const floatingBadges = [
  { icon: Lock, label: 'Зашифровано' },
  { icon: Zap,  label: '1 Gbit/s'   },
  { icon: Globe,label: '11 локаций' },
]

export default function Hero({ hero, cabinetUrl }: Props) {
  return (
    <section className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        {/* 2-column layout on large screens */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* Left: text content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:flex-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-4 py-1.5 text-sm font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Работает в России и по всему миру
            </div>

            <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              {hero.title.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="bg-accent-gradient bg-clip-text text-transparent">
                {hero.title.split(' ').slice(2).join(' ')}
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-lg text-slate-400 sm:text-xl">
              {hero.subtitle}
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <a
                href={cabinetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl bg-accent-gradient px-7 py-3.5 text-base font-semibold text-white shadow-accent-glow transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_32px_rgba(99,102,241,0.5)] active:scale-95"
              >
                {hero.buttonText}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#pricing"
                className="rounded-xl border border-border-subtle px-7 py-3.5 text-base font-medium text-slate-300 transition-all duration-200 hover:border-accent/40 hover:bg-accent-muted hover:text-white"
              >
                Смотреть тарифы
              </a>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              {floatingBadges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-xl border border-border-subtle bg-bg-card px-4 py-2.5 text-sm font-medium text-slate-300 shadow-card"
                >
                  <Icon className="h-4 w-4 text-accent" strokeWidth={2} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: terminal window */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <TerminalWindow />
          </div>
        </div>
      </div>
    </section>
  )
}
