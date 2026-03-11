import { Send, Bot, LayoutDashboard } from 'lucide-react'

interface Props {
  brand: {
    name: string
    cabinetUrl: string
    telegramChannel: string
    telegramBot: string
  }
}

export default function Footer({ brand }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border-subtle bg-bg-base">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-70">
            <img src="/vpn_logo.jpeg" alt={brand.name} className="h-7 w-7 rounded-lg object-cover" />
            <span className="text-sm font-semibold text-white">{brand.name}</span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm text-slate-500">
            <a
              href={brand.cabinetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-slate-300"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Личный кабинет
            </a>
            <a
              href={brand.telegramChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-slate-300"
            >
              <Send className="h-3.5 w-3.5" />
              Канал
            </a>
            <a
              href={brand.telegramBot}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-slate-300"
            >
              <Bot className="h-3.5 w-3.5" />
              Бот
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-slate-600">© {year} {brand.name}</p>
        </div>
      </div>
    </footer>
  )
}
