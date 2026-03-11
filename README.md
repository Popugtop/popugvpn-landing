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
    { "days": "60 дней", "price": "349₽", "popular": true  },
    { "days": "90 дней", "price": "549₽", "popular": false }
  ],
  "marquee": ["VLESS", "REALITY", "AES-256", "1 GBIT/S", ...]
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

> **Проблема с правами на node_modules?**
> Если получаешь `EACCES: permission denied` — значит папка установлена от root.
> Исправь: `sudo chown -R $(whoami):staff node_modules`
> Или удали и переустанови: `rm -rf node_modules && npm install`

### Сборка для продакшена

```bash
npm run build      # результат в dist/
npm run preview    # предпросмотр → http://localhost:4173
```

---

## Деплой на сервер

**Требования:** сервер с Ubuntu/Debian, домен направленный на IP сервера.

---

### 1. Установи Docker

```bash
curl -fsSL https://get.docker.com | sh
```

### 2. Установи Caddy

```bash
apt install -y caddy
```

### 3. Склонируй репозиторий и запусти

```bash
git clone https://github.com/Popugtop/popugvpn-landing.git /opt/popugvpn-landing
cd /opt/popugvpn-landing
docker compose up -d --build
```

### 4. Настрой Caddy

Открой `/etc/caddy/Caddyfile` и замени содержимое на:

```caddy
popugvpn.app, www.popugvpn.app {
    reverse_proxy localhost:8080
    encode zstd gzip
}
```

Примени:

```bash
systemctl reload caddy
```

Готово — сайт работает на `https://popugvpn.app`. Caddy сам получит TLS-сертификат.

---

### Обновление после изменений

```bash
cd /opt/popugvpn-landing
git pull
docker compose up -d --build
```

---

### Полезные команды

```bash
docker compose logs -f landing   # логи в реальном времени
docker compose restart landing   # перезапустить без пересборки
docker compose down              # остановить
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

## Обновление контента (тарифы, тексты, ссылки)

Всё редактируется в одном файле — `src/data/config.json`. Никакого знания React не нужно.

После правок — закоммить и запушить:

```bash
git add src/data/config.json
git commit -m "update content"
git push
```

Затем на сервере подтянуть и пересобрать:

```bash
cd /opt/popugvpn-landing
git pull
docker compose up -d --build
```

---

## Обновление кода (новые компоненты, правки вёрстки)

После любых изменений в `src/` — пересобрать локально, проверить, запушить:

```bash
# Локально — проверить что собирается без ошибок
npm run build

# Закоммитить изменения
git add .
git commit -m "your message"
git push

# На сервере — подтянуть и перебилдить Docker-образ
cd /opt/popugvpn-landing
git pull
docker compose up -d --build
```
