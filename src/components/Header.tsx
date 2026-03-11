import { ExternalLink } from 'lucide-react'

interface Props {
  brand: { name: string; cabinetUrl: string }
  hero: { buttonText: string }
}

export default function Header({ brand, hero }: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <img src="/vpn_logo.jpeg" alt={brand.name} className="h-8 w-8 rounded-lg object-cover" />
          <span className="text-base font-semibold tracking-tight text-white">
            {brand.name}
          </span>
        </a>

        {/* CTA */}
        <a
          href={brand.cabinetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover hover:shadow-accent-glow active:scale-95"
        >
          {hero.buttonText}
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      </div>
    </header>
  )
}
