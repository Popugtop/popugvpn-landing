import { useScrollReveal } from '../hooks/useScrollReveal'

interface Server {
  name: string
  flag: string
}

interface Props {
  servers: Server[]
}

export default function Servers({ servers }: Props) {
  const { ref, visible } = useScrollReveal()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-14 sm:py-20 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-card px-3 py-1 text-xs font-medium text-slate-400">
            Серверы
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {'11 '}
            <span className="bg-accent-gradient bg-clip-text text-transparent">локаций</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500">Все серверы доступны на любом тарифе</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {servers.map((server) => (
            <div
              key={server.name}
              className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-card px-4 py-3.5"
            >
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xl leading-none">{server.flag}</span>
              <span className="text-sm font-medium text-slate-200">{server.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
