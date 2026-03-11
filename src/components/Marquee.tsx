interface Props {
  items: string[]
}

export default function Marquee({ items }: Props) {
  // 4 copies ensure content is always wider than any viewport
  const quad = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-border-subtle bg-bg-card py-3.5">
      {/* Left/right fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg-card to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg-card to-transparent" />

      <div className="flex animate-marquee">
        {quad.map((item, i) => (
          <span key={i} className="inline-flex flex-shrink-0 items-center gap-4 px-6 font-mono text-xs font-semibold uppercase tracking-widest text-slate-500">
            {item}
            <span className="h-1 w-1 rounded-full bg-accent/50" />
          </span>
        ))}
      </div>
    </div>
  )
}
