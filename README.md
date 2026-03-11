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

### Что нужно на сервере

- Ubuntu 22.04 / Debian 12 (или любой Linux с systemd)
- Docker + Docker Compose
- Caddy 2
- Домен с настроенными DNS-записями

---

### Шаг 1 — Настрой DNS

В панели своего DNS-провайдера добавь записи:

```
A     popugvpn.app      →  <IP сервера>
A     www.popugvpn.app  →  <IP сервера>
```

Проверь через `ping popugvpn.app` — должен ответить твой сервер.
DNS может обновляться до 24 часов, но обычно за 5–15 минут.

---

### Шаг 2 — Установи Docker

```bash
# Обновить пакеты
sudo apt update && sudo apt upgrade -y

# Установить Docker одной командой
curl -fsSL https://get.docker.com | sudo sh

# Добавить своего пользователя в группу docker (без sudo для docker-команд)
sudo usermod -aG docker $USER

# Применить изменения группы (или перелогиниться)
newgrp docker

# Проверить
docker --version
docker compose version
```

---

### Шаг 3 — Установи Caddy

```bash
# Добавить репозиторий Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
  | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
  | sudo tee /etc/apt/sources.list.d/caddy-stable.list

# Установить
sudo apt update
sudo apt install -y caddy

# Проверить статус
sudo systemctl status caddy
```

---

### Шаг 4 — Склонируй репозиторий

```bash
# Клонировать в /opt (стандартное место для приложений)
sudo git clone https://github.com/Popugtop/popugvpn-landing.git /opt/popugvpn-landing

# Дать права своему пользователю
sudo chown -R $USER:$USER /opt/popugvpn-landing

cd /opt/popugvpn-landing
```

---

### Шаг 5 — Запусти Docker-контейнер

```bash
# Собрать образ и запустить в фоне
docker compose up -d --build

# Проверить что контейнер запущен
docker compose ps

# Убедиться что сайт отдаёт ответ локально
curl -I http://localhost:8080
# должно вернуть: HTTP/1.1 200 OK
```

---

### Шаг 6 — Настрой Caddy

```bash
# Открыть Caddyfile для редактирования
sudo nano /etc/caddy/Caddyfile
```

Удали всё что там есть по умолчанию и вставь:

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

> Готовый блок также лежит в файле `Caddyfile_snippet.txt` в репозитории.

Сохрани файл (`Ctrl+O`, `Enter`, `Ctrl+X`) и примени конфиг:

```bash
# Проверить синтаксис без применения
sudo caddy validate --config /etc/caddy/Caddyfile

# Применить конфиг
sudo systemctl reload caddy

# Проверить что Caddy работает
sudo systemctl status caddy
```

Caddy автоматически получит TLS-сертификат от Let's Encrypt — обычно за 10–30 секунд.

---

### Шаг 7 — Проверь результат

Открой в браузере:
- `https://popugvpn.app` — должен работать с замком (HTTPS)
- `https://www.popugvpn.app` — должен открываться так же

Проверить сертификат через командную строку:

```bash
curl -I https://popugvpn.app
# HTTP/2 200 — сайт работает с HTTPS
```

---

### Обновление сайта после изменений в коде

```bash
cd /opt/popugvpn-landing

# Получить изменения из GitHub
git pull

# Пересобрать и перезапустить контейнер
docker compose up -d --build
```

Сайт будет недоступен ~10–20 секунд пока пересобирается образ.

---

### Полезные команды

```bash
# Логи контейнера в реальном времени
docker compose logs -f landing

# Перезапустить контейнер без пересборки
docker compose restart landing

# Остановить
docker compose down

# Посмотреть занятое место образами
docker images

# Удалить старые неиспользуемые образы
docker image prune -f
```

---

### Автозапуск при перезагрузке сервера

Docker-контейнер уже настроен на автозапуск (`restart: always` в `docker-compose.yml`).
Caddy тоже запускается автоматически как systemd-сервис.

Проверить:

```bash
# После перезагрузки сервера всё должно подняться само
sudo reboot

# После перезагрузки проверить
docker compose -f /opt/popugvpn-landing/docker-compose.yml ps
sudo systemctl status caddy
```

---

### Возможные проблемы

**Caddy не получает сертификат**
- Убедись что DNS уже указывает на сервер: `dig popugvpn.app`
- Порты 80 и 443 должны быть открыты: `sudo ufw allow 80 && sudo ufw allow 443`
- Проверь логи Caddy: `sudo journalctl -u caddy -n 50`

**Сайт не открывается после деплоя**
- Проверь что контейнер работает: `docker compose ps`
- Проверь логи контейнера: `docker compose logs landing`
- Проверь что порт 8080 слушается: `ss -tlnp | grep 8080`

**Ошибка при сборке Docker-образа**
- Проверь свободное место на диске: `df -h`
- Попробуй очистить Docker-кэш: `docker system prune -f`

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
# На сервере
cd /opt/popugvpn-landing
git pull
docker compose up -d --build
```
