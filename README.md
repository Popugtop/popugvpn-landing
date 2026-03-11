# PopugVPN Landing Page

Лендинг для VPN-сервиса **PopugVPN** на React + Tailwind CSS + Vite.
Дизайн повторяет палитру личного кабинета (`web.popugvpn.app`): глубокий тёмный фон, карточки с subtle-border, фиолетово-синий акцент.

Готов к деплою через Docker + Caddy с автоматическим HTTPS.

---

## Стек

| Слой | Инструмент |
|---|---|
| UI | React 18 + TypeScript |
| Сборщик | Vite 5 |
| Стили | Tailwind CSS 3 |
| Иконки | lucide-react |
| Веб-сервер (prod) | nginx:alpine |
| Контейнер | Docker multi-stage build |
| Прокси / TLS | Caddy 2 |

---

## Структура проекта

```
popugvpn-landing/
├── src/
│   ├── data/
│   │   └── config.json          # Весь контент: тексты, тарифы, ссылки
│   ├── components/
│   │   ├── Header.tsx           # Шапка: лого + кнопка кабинета
│   │   ├── Hero.tsx             # Главный экран: заголовок, CTA, терминал
│   │   ├── TerminalWindow.tsx   # Анимированный псевдо-терминал
│   │   ├── Marquee.tsx          # Бегущая строка с характеристиками
│   │   ├── Features.tsx         # Сетка преимуществ (4 карточки)
│   │   ├── Pricing.tsx          # Тарифы (3 карточки)
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useScrollReveal.ts   # IntersectionObserver — fade-in при скролле
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig*.json
├── nginx.conf                   # SPA fallback + gzip + кэш assets
├── Dockerfile                   # Multi-stage: node:20-alpine → nginx:1.27-alpine
├── docker-compose.yml           # Сервис landing, порт 8080, restart: always
├── .dockerignore
├── .gitignore
└── Caddyfile_snippet.txt        # Готовый блок для /etc/caddy/Caddyfile
```

---

## Конфигурация контента

Весь текст, тарифы и ссылки живут в **одном файле** — `src/data/config.json`.
Чтобы что-то изменить на странице, достаточно отредактировать его.

```jsonc
{
  "brand": {
    "name": "PopugVPN",
    "cabinetUrl": "https://web.popugvpn.app/"
  },
  "hero": {
    "title": "Свободный интернет без границ",
    "subtitle": "Быстрый, безопасный и безлимитный VPN для любых устройств.",
    "buttonText": "Личный кабинет"
  },
  "features": [
    { "icon": "zap",      "title": "Высокая скорость",   "desc": "..." },
    { "icon": "globe",    "title": "11 локаций",          "desc": "..." },
    { "icon": "infinity", "title": "Безлимитный трафик", "desc": "..." },
    { "icon": "shield",   "title": "Обход блокировок",   "desc": "..." }
  ],
  "pricing": [
    { "days": "30 дней", "price": "179₽", "popular": false },
    { "days": "60 дней", "price": "349₽", "popular": true  },  // выделяется
    { "days": "90 дней", "price": "549₽", "popular": false }
  ],
  "marquee": ["VLESS", "SHADOWSOCKS", "REALITY", "AES-256", ...]
}
```

> Тариф с `"popular": true` автоматически получает неоновую рамку, badge и акцентную кнопку.

---

## Локальная разработка

**Требования:** Node.js 18+, npm 9+

```bash
# Установить зависимости
npm install

# Запустить dev-сервер с hot reload
npm run dev
# → http://localhost:5173
```

### Сборка для продакшена

```bash
npm run build      # результат в dist/
npm run preview    # предпросмотр → http://localhost:4173
```

---

## Деплой через Docker

```bash
# Собрать образ и запустить контейнер
docker compose up -d --build

# Проверить статус
docker compose ps

# Логи
docker compose logs -f landing

# Остановить
docker compose down
```

Сайт будет доступен на `http://localhost:8080`.

### Пересборка после изменений

```bash
docker compose up -d --build
```

---

## Деплой с Caddy (HTTPS)

Caddy автоматически получает TLS-сертификаты через Let's Encrypt.

### 1. Настрой DNS

```
A     popugvpn.app     →  IP_СЕРВЕРА
CNAME www.popugvpn.app →  popugvpn.app
```

### 2. Добавь конфиг в Caddyfile

Скопируй блок из `Caddyfile_snippet.txt` в `/etc/caddy/Caddyfile`:

```caddy
popugvpn.app, www.popugvpn.app {
    reverse_proxy localhost:8080

    encode zstd gzip

    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
        -Server
    }
}
```

### 3. Применить конфиг

```bash
caddy reload --config /etc/caddy/Caddyfile
# или
systemctl reload caddy
```

### Полный деплой на чистом сервере (с нуля)

```bash
git clone <repo-url> /opt/popugvpn-landing
cd /opt/popugvpn-landing

docker compose up -d --build

cat Caddyfile_snippet.txt >> /etc/caddy/Caddyfile
caddy reload --config /etc/caddy/Caddyfile
```

---

## Дизайн-система

Кастомные токены из `tailwind.config.js`:

| Токен | Значение | Назначение |
|---|---|---|
| `bg-base` | `#0b0d14` | Фон страницы |
| `bg-card` | `#13161f` | Фон карточек |
| `bg-elevated` | `#1a1e2d` | Приподнятые элементы |
| `accent` | `#6366f1` | Кнопки, иконки |
| `accent-hover` | `#4f46e5` | Hover акцента |
| `accent-muted` | `rgba(99,102,241,0.15)` | Мягкий акцент-фон |
| `border-subtle` | `rgba(255,255,255,0.07)` | Границы карточек |

---

## Обновление тарифов

Редактируй `src/data/config.json`, затем пересобери:

```bash
# Локально
npm run build

# В Docker
docker compose up -d --build
```
