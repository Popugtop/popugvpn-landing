# PopugVPN Landing Page

Лендинг для VPN-сервиса **PopugVPN** — стильная тёмная страница на React + Tailwind CSS + Vite. Дизайн повторяет палитру личного кабинета (`web.popugvpn.app`): глубокий тёмный фон, карточки с subtle-border и фиолетово-синий акцент.

Готов к деплою через Docker + Caddy с автоматическим HTTPS.

---

## Технологии

| Слой | Инструмент |
|------|-----------|
| UI-фреймворк | React 18 + TypeScript |
| Сборщик | Vite 5 |
| Стили | Tailwind CSS 3 |
| Иконки | lucide-react |
| Веб-сервер | nginx:alpine (в контейнере) |
| Контейнеризация | Docker (multi-stage build) |
| Прокси / TLS | Caddy 2 |

---

## Структура проекта

```
popugvpn-landing/
├── src/
│   ├── data/
│   │   └── config.json        # Весь контент: тексты, тарифы, ссылки
│   ├── components/
│   │   ├── Header.tsx         # Шапка: лого + кнопка "Личный кабинет"
│   │   ├── Hero.tsx           # Главный экран: заголовок, CTA, badges
│   │   ├── Features.tsx       # Сетка преимуществ (4 карточки)
│   │   ├── Pricing.tsx        # Тарифы (3 карточки, popular выделен)
│   │   └── Footer.tsx         # Подвал
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── nginx.conf                 # nginx конфиг для SPA + кэш assets
├── Dockerfile                 # Multi-stage: node → nginx
├── docker-compose.yml         # Сервис landing на порту 8080
├── .dockerignore
└── Caddyfile_snippet.txt      # Готовый блок для основного Caddyfile
```

---

## Конфигурация контента

Весь текст, тарифы и ссылки живут в **одном файле** — `src/data/config.json`. Редактировать страницу без знания React:

```json
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
  "features": [ ... ],
  "pricing": [
    { "days": "30 дней", "price": "179₽", "popular": false },
    { "days": "60 дней", "price": "349₽", "popular": true },
    { "days": "90 дней", "price": "549₽", "popular": false }
  ]
}
```

> Тариф с `"popular": true` автоматически получает неоновую рамку, badge и выделенную кнопку.

---

## Локальная разработка

### Требования

- Node.js 18+
- npm 9+

### Установка и запуск

```bash
# 1. Установить зависимости
npm install --legacy-peer-deps

# 2. Запустить dev-сервер (hot reload)
npm run dev
```

Сайт откроется на `http://localhost:5173`.

### Сборка для продакшена

```bash
npm run build
# Результат в папке dist/
```

Предпросмотр собранного билда:

```bash
npm run preview
# http://localhost:4173
```

---

## Деплой через Docker

### Сборка и запуск контейнера

```bash
# Собрать образ и запустить (порт 8080 на хосте → 80 в контейнере)
docker compose up -d --build

# Проверить статус
docker compose ps

# Посмотреть логи
docker compose logs -f landing
```

Сайт будет доступен на `http://localhost:8080`.

### Остановка

```bash
docker compose down
```

### Пересборка после изменений кода

```bash
docker compose up -d --build
```

---

## Деплой с Caddy (HTTPS)

Caddy автоматически получает и обновляет TLS-сертификаты через Let's Encrypt.

### 1. Убедись, что DNS настроен

```
A     popugvpn.app      → IP_СЕРВЕРА
CNAME www.popugvpn.app  → popugvpn.app
```

### 2. Добавь конфиг в Caddyfile

Скопируй содержимое `Caddyfile_snippet.txt` в `/etc/caddy/Caddyfile`:

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

### 3. Примени конфиг

```bash
caddy reload --config /etc/caddy/Caddyfile
# или перезапуск сервиса
systemctl reload caddy
```

### Полный деплой на чистом сервере

```bash
# 1. Клонировать репозиторий
git clone <repo-url> /opt/popugvpn-landing
cd /opt/popugvpn-landing

# 2. Запустить контейнер
docker compose up -d --build

# 3. Добавить Caddyfile snippet и перезагрузить Caddy
cat Caddyfile_snippet.txt >> /etc/caddy/Caddyfile
caddy reload --config /etc/caddy/Caddyfile
```

---

## Дизайн-система

Цвета и токены из `tailwind.config.js`:

| Токен | HEX / значение | Назначение |
|-------|---------------|-----------|
| `bg-base` | `#0b0d14` | Фон страницы |
| `bg-card` | `#13161f` | Фон карточек |
| `bg-elevated` | `#1a1e2d` | Приподнятые элементы |
| `accent` | `#6366f1` | Кнопки, иконки, акцент |
| `accent-hover` | `#4f46e5` | Hover-состояние акцента |
| `accent-muted` | `rgba(99,102,241,0.15)` | Мягкий акцент-фон |
| `border-subtle` | `rgba(255,255,255,0.07)` | Границы карточек |

---

## Обновление тарифов или текста

Достаточно отредактировать `src/data/config.json` и пересобрать:

```bash
# Локально
npm run build

# В Docker
docker compose up -d --build
```

---

## Лицензия

MIT — используй свободно для своих проектов.
