import { Calendar, Database, Monitor, Globe, ArrowRight, LucideIcon } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const iconMap: Record<string, LucideIcon> = {
  calendar: Calendar,
  database: Database,
  monitor: Monitor,
  globe: Globe,
}

interface Perk  { icon: string; text: string }
interface Props {
  trial: {
    title: string
    subtitle: string
    perks: Perk[]
    buttonText: string
  }
  cabinetUrl: string
}

export default function Trial({ trial, cabinetUrl }: Props) {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-14 sm:py-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-bg-card">
          {/* Gradient top border */}
          <div className="absolute inset-x-0 top-0 h-px bg-accent-gradient" />

          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.1),transparent)]" />

          <div className="relative flex flex-col items-center gap-8 px-6 py-12 text-center sm:px-12 lg:flex-row lg:text-left">
            {/* Text */}
            <div className="flex-1">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
                Бесплатно
              </div>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
                {trial.title}
              </h2>
              <p className="mt-2 text-slate-400">{trial.subtitle}</p>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {trial.perks.map((perk) => {
                const Icon = iconMap[perk.icon] ?? Globe
                return (
                  <div
                    key={perk.icon}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-border-subtle bg-bg-elevated px-4 py-3.5"
                  >
                    <Icon className="h-5 w-5 text-accent" strokeWidth={2} />
                    <span className="text-sm font-medium text-slate-200">{perk.text}</span>
                  </div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex-shrink-0">
              <a
                href={cabinetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-xl bg-accent-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-accent-glow transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_32px_rgba(99,102,241,0.5)] active:scale-95 whitespace-nowrap"
              >
                {trial.buttonText}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
