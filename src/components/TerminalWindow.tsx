import { useEffect, useState } from 'react'

const LINES = [
  { prefix: '$', text: ' popugvpn connect --auto', color: 'text-slate-300', delay: 0 },
  { prefix: '▶', text: ' Resolving fastest server...', color: 'text-slate-500', delay: 700 },
  { prefix: '▶', text: ' Protocol: VLESS + Reality ✓', color: 'text-emerald-400', delay: 1500 },
  { prefix: '▶', text: ' Encryption: AES-256-GCM  ✓', color: 'text-emerald-400', delay: 2200 },
  { prefix: '▶', text: ' Server: Frankfurt, DE     ✓', color: 'text-emerald-400', delay: 3000 },
  { prefix: '▶', text: ' Latency: 14ms             ✓', color: 'text-emerald-400', delay: 3700 },
  { prefix: '●', text: ' Connected', color: 'text-accent font-semibold', delay: 4500 },
]

export default function TerminalWindow() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typedChars, setTypedChars] = useState(0)

  // Reveal lines one by one
  useEffect(() => {
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleCount(i + 1), line.delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  // Typewriter effect on first line
  const firstLine = LINES[0].text
  useEffect(() => {
    if (typedChars >= firstLine.length) return
    const t = setTimeout(() => setTypedChars(c => c + 1), 60)
    return () => clearTimeout(t)
  }, [typedChars, firstLine.length])

  return (
    <div className="relative w-full max-w-sm rounded-2xl border border-border-subtle bg-[#0d0f18] shadow-terminal lg:ml-auto">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-border-subtle px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 text-center text-xs text-slate-600">
          popugvpn — zsh
        </span>
      </div>

      {/* Content */}
      <div className="p-5 font-mono text-sm leading-relaxed">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div key={i} className={`flex gap-2 ${line.color}`}>
            <span className={i === 0 ? 'text-accent' : ''}>{line.prefix}</span>
            <span>
              {i === 0 ? firstLine.slice(0, typedChars) : line.text}
              {i === 0 && typedChars < firstLine.length && (
                <span className="animate-blink text-accent">▌</span>
              )}
            </span>
          </div>
        ))}

        {/* Blinking cursor after last visible line */}
        {visibleCount === LINES.length && (
          <div className="mt-1 flex gap-2 text-slate-600">
            <span>$</span>
            <span className="animate-blink text-accent">▌</span>
          </div>
        )}
      </div>
    </div>
  )
}
