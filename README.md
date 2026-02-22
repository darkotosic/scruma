# СЦ Рума — монорепо (веб + API)

Овај репозиторијум садржи комплетно решење за сајт Спортског центра Рума:
- `scruma-web/` — Next.js фронтенд који се извози као статички сајт (`out/`)
- `scruma-api/` — Django API + Django Admin (CMS)
- `.cpanel.yml` — деплој статичког `scruma-web/out/` у `public_html` на WebDream/cPanel

## Тренутно стање (продукциона архитектура)
- Фронтенд је статички export (`next build && next export`) и не захтева Node runtime на продукцији.
- Садржај се учитава преко API слоја (`https://scruma-api.onrender.com`).
- API има Django Admin за управљање садржајем (вести, обавештења, спортске вести, странице, глобална подешавања сајта и футер).
- Подразумевано писмо у UI је ћирилица, уз подршку за латинични приказ.

## Структура монорепоа

```text
.
├── scruma-web/     # Next.js статички сајт
├── scruma-api/     # Django API + Admin CMS
├── docs/           # документација
├── scripts/        # помоћне скрипте
└── .cpanel.yml     # cPanel deploy pipeline
```

## Фронтенд (`scruma-web`)

### Кључне странице
- `/` (почетна)
- `/o-nama`
- `/kontakt`
- `/vesti` и `/vesti/detalj`
- `/obavestenja` и `/obavestenja/detalj`
- `/dogadjaji` и `/dogadjaji/detalj`
- `/galerija`
- `/sale` (+ подстранице сала)
- `/teretana`
- `/kuglana`
- `/velika-sala`
- `/bazen-borkovac`
- `/api-health`

### Локални рад
```bash
cd scruma-web
npm ci
npm run build
npm run export
```

Експортовани сајт је у: `scruma-web/out/`.

## API (`scruma-api`)

### Кључни endpoint-и
- `/` — статусна HTML страница
- `/health/` — health check
- `/api/v1/posts/?type=news|notice|sport`
- `/api/v1/posts/<id>/`
- `/api/v1/announcements/`
- `/api/v1/site/`
- `/api/v1/nav/`
- `/api/v1/pages/<slug>/`

### Локални рад
```bash
cd scruma-api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Render деплој (Root Directory: `scruma-api`)
- Build Command:
  - `pip install -r requirements.txt`
  - `python manage.py collectstatic --noinput`
  - `python manage.py migrate`
- Start Command:
  - `gunicorn config.wsgi:application`

## WebDream/cPanel деплој

`.cpanel.yml` ради:
1. `npm ci`
2. `npm run build`
3. `npm run export`
4. `rsync` садржај `scruma-web/out/` у `public_html/` (уз задржавање `.well-known`)

## CMS политика садржаја
- API је једини извор истине за текстуални садржај.
- На фронтенду нема локалних текстуалних fallback блокова као замена за CMS.
- Дозвољен је само статусни приказ када садржај још није унет.

## Корисна документација
- `docs/ENTERPRISE_GRADE_PLAN.md`
- `docs/FILE_INVENTORY.md`
- `scripts/generate_file_inventory.sh`
