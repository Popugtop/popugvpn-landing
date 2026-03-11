import { Shield } from 'lucide-react'

interface Props {
  brand: { name: string; cabinetUrl: string }
}

export default function Footer({ brand }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-subtle bg-bg-base">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-70"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-gradient">
              <Shield className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold text-white">{brand.name}</span>
          </a>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <a
              href={brand.cabinetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-300"
            >
              Личный кабинет
            </a>
            <a
              href={`${brand.cabinetUrl}support`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-300"
            >
              Поддержка
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-slate-600">
            © {year} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
