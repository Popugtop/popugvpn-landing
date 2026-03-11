import { Zap, Globe, Infinity, Shield, LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  globe: Globe,
  infinity: Infinity,
  shield: Shield,
}

const accentColors: Record<string, { bg: string; text: string; shadow: string }> = {
  zap: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    shadow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]',
  },
  globe: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    shadow: 'group-hover:shadow-[0_0_20px_rgba(14,165,233,0.2)]',
  },
  infinity: {
    bg: 'bg-accent-muted',
    text: 'text-accent',
    shadow: 'group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]',
  },
  shield: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    shadow: 'group-hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]',
  },
}

interface Feature {
  icon: string
  title: string
  desc: string
}

interface Props {
  features: Feature[]
}

export default function Features({ features }: Props) {
  return (
    <section className="relative py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card px-3 py-1 text-xs font-medium text-slate-400">
            Возможности
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Всё, что нужно для{' '}
            <span className="bg-accent-gradient bg-clip-text text-transparent">
              свободного интернета
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Shield
            const colors = accentColors[feature.icon] ?? accentColors.shield

            return (
              <div
                key={feature.icon}
                className={`group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 hover:-translate-y-1 ${colors.shadow}`}
              >
                {/* Card shine */}
                <div className="pointer-events-none absolute inset-0 bg-card-shine opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg}`}
                >
                  <Icon className={`h-5 w-5 ${colors.text}`} strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-base font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
