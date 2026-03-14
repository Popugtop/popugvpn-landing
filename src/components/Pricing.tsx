import { Check, Sparkles, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface Plan {
  days: string
  price: string
  description: string
  popular: boolean
}

interface Props {
  pricing: Plan[]
  cabinetUrl: string
  serversCount: number
}

export default function Pricing({ pricing, cabinetUrl, serversCount }: Props) {
  const perks = [
    'Протокол VLESS + Reality',
    `Все ${serversCount} локаций`,
    'Без ограничений по скорости',
    'Поддержка 24/7',
  ]
  const { ref, visible } = useScrollReveal()

  return (
    <section
      id="pricing"
      ref={ref as React.RefObject<HTMLElement>}
      className={`relative py-14 sm:py-20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(99,102,241,0.12),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card px-3 py-1 text-xs font-medium text-slate-400">
            Тарифы
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Простые и{' '}
            <span className="bg-accent-gradient bg-clip-text text-transparent">честные цены</span>
          </h2>
          <p className="mt-3 text-slate-400">
            Все тарифы включают одинаковый полный доступ. Разница только в сроке.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {pricing.map((plan, i) => (
            <div
              key={plan.days}
              className={`relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? 'shadow-popular-glow ring-2 ring-accent/70'
                  : 'border border-border-subtle bg-bg-card hover:-translate-y-1'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.popular && <div className="absolute inset-0 bg-bg-card" />}
              {plan.popular && <div className="absolute inset-x-0 top-0 h-px bg-accent-gradient" />}

              <div className="relative flex flex-grow flex-col p-7">
                {plan.popular && (
                  <div className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-gradient px-3 py-1 text-xs font-semibold text-white shadow-accent-glow">
                    <Sparkles className="h-3 w-3" />
                    Популярный
                  </div>
                )}

                <div className="mb-1 text-sm font-medium text-slate-400">{plan.days}</div>

                <div className="mb-4 flex items-end gap-1">
                  <span className={`text-5xl font-extrabold tracking-tight ${
                    plan.popular ? 'bg-accent-gradient bg-clip-text text-transparent' : 'text-white'
                  }`}>
                    {plan.price}
                  </span>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-slate-400">{plan.description}</p>

                <ul className="mb-8 flex flex-col gap-2.5">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                        plan.popular ? 'bg-accent/20' : 'bg-white/[0.08]'
                      }`}>
                        <Check
                          className={`h-2.5 w-2.5 ${plan.popular ? 'text-accent' : 'text-slate-400'}`}
                          strokeWidth={3}
                        />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <a
                  href={cabinetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group mt-auto flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                    plan.popular
                      ? 'bg-accent-gradient text-white shadow-accent-glow hover:opacity-90 hover:shadow-[0_0_32px_rgba(99,102,241,0.5)]'
                      : 'border border-border-subtle bg-bg-elevated text-slate-200 hover:border-accent/40 hover:bg-accent-muted hover:text-white'
                  }`}
                >
                  Выбрать тариф
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Оплата через Telegram Bot или Личный кабинет · Мгновенная активация · Без подписок
        </p>
      </div>
    </section>
  )
}
