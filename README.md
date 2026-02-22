# СЦ Рума — интернет презентација (монорепо)

Овај репозиторијум садржи:
- **scruma-web/** — статички сајт (Next.js export), деплој на **WebDream/cPanel** у `public_html`
- **scruma-api/** — **Django API + Django Admin**, деплој на **Render**

## Језик и писмо
- Комплетан UI/UX је подразумевано на **ћирилици**
- Постоји прекидач за **латиницу**
- Све странице морају имати **статички fallback** (садржај видљив и без API-ја)

## Странице (планирано 4–6)
- Почетна
- О нама / Спортски центар
- Најаве утакмица
- Обавештења
- Контакт
- (опционо) Галерија

## Деплој — WebDream (scruma-web)
1. `scruma-web` се гради у `scruma-web/out/`
2. cPanel Git Deployment копира `scruma-web/out/*` у `public_html` преко `.cpanel.yml`

## Деплој — Render (scruma-api)
- Render Web Service користи Root Directory: `scruma-api`
- Build:
  - `pip install -r requirements.txt`
  - `python manage.py collectstatic --noinput`
  - `python manage.py migrate`
- Start:
  - `gunicorn config.wsgi:application`

## Локални развој (опционо)
### scruma-web
- `cd scruma-web`
- `npm i`
- `npm run build && npm run export`

### scruma-api
- `cd scruma-api`
- `python -m venv .venv`
- `pip install -r requirements.txt`
- `python manage.py migrate`
- `python manage.py runserver`


## CMS извор истине
- Frontend садржај се учитава искључиво преко API (`/api/v1/...`), без локалног fallback садржаја.
- Када CMS садржај није унет, странице приказују статусну поруку „Садржај још није унет“.

## Enterprise документација
- Детаљна enterprise анализа и фазни план: `docs/ENTERPRISE_GRADE_PLAN.md`
- Комплетан инвентар Git-праћених фајлова: `docs/FILE_INVENTORY.md`
- Генерација инвентара: `scripts/generate_file_inventory.sh`
