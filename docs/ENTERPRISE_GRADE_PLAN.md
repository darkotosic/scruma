# Enterprise-grade анализа и план унапређења

## 1) Обим анализе
Ова анализа покрива све **Git-праћене** фајлове у монорепоу (149 фајлова у тренутку писања). Детаљан списак је у документу `docs/FILE_INVENTORY.md`.

## 2) Стање пројекта по доменима

### 2.1 Архитектура и структура
- Монорепо је добро раздвојен на `scruma-web` (Next.js static export) и `scruma-api` (Django + Admin).
- Деплој стратегија је усаглашена са ограничењима платформе (cPanel за статичке фајлове, Render за Python сервис).
- Постоји јасан ADR/деплој опис, али недостаје дубља техничка спецификација за enterprise рад (SLO/SLA, runbook, incident процес).

### 2.2 Frontend (scruma-web)
- Next.js апликација већ подржава статички export и постоје руте за кључне странице.
- Постоји инфраструктура за CMS читање и translit toggle компоненте.
- Недостају:
  - аутоматизовани quality gate-ови (типови + lint + build у CI),
  - e2e smoke тест за кључне руте,
  - формални performance budget и accessibility checklist.

### 2.3 Backend (scruma-api)
- Django подешавања, миграције, admin и API структура постоје.
- Render-friendly setup је присутан (`Procfile`, `runtime.txt`, `requirements.txt`).
- Недостају:
  - тестови критичних API endpoint-а,
  - централизовано логовање и tracing,
  - security hardening листа (headers, rate limit, audit trail за admin радње).

### 2.4 DevOps и испорука
- `.cpanel.yml` има корисне pre-check-ове и синхронизацију у `public_html`.
- Недостаје GitHub Actions/CI pipeline који би пре деплоја гарантовaо квалитет.
- Недостаје release дисциплина (semver/tagging/changelog policy).

### 2.5 Управљање садржајем (CMS политика)
- Пројекат прати правило „API је једина истина“ и статусни fallback.
- За enterprise ниво потребно је:
  - дефинисати versioning за CMS шеме,
  - додати валидацију садржаја у admin-у,
  - увести content workflow (draft/review/publish).

## 3) Enterprise-grade roadmap (фазно)

## Фаза 0 — Baseline стабилизација (1 недеља)
1. Закључати build/check стандарде:
   - Web: `npm ci`, `npm run lint`, `npm run build`, `npm run export`
   - API: `pip install -r requirements.txt`, `python manage.py check`, `python manage.py test`
2. Увести јединствену definition-of-done листу за PR.
3. Увести check-листу за безбедност конфигурације (SECRET_KEY, DEBUG, ALLOWED_HOSTS, CORS).

## Фаза 1 — Квалитет и аутоматизација (1–2 недеље)
1. Подићи CI workflow за web+api.
2. Додати smoke тестове за најважније руте (`/`, `/o-nama`, `/kontakt`, `/vesti`).
3. Додати basic API contract тестове за кључне endpoint-е.

## Фаза 2 — Безбедност и усаглашеност (2 недеље)
1. Security headers и CSP стратегија за web.
2. Rate limiting и audit логови за admin/API.
3. Dependency scanning и SAST у CI.

## Фаза 3 — Оперативна изврсност (2–3 недеље)
1. Sentry/OpenTelemetry за web+api.
2. Дефинисати SLO/SLA и alert прагова.
3. Написати incident runbook и rollback процедуре.

## Фаза 4 — Скалабилност производа (континуирано)
1. CMS workflow (draft/review/publish).
2. Performance оптимизације (слике, кеш, TTFB).
3. A/B и content analytics уз очување приватности.

## 4) Тачне Codex инструкције (копирај/налепи)

> Користи следеће инструкције по редоследу. Свака је спремна за један Codex задатак.

### Инструкција A — CI baseline
"Додај GitHub Actions workflow који за сваки PR покреће web lint+build+export и Django check+test. Немој мењати постојеће руте. После измена покрени локалне команде за валидацију и прикажи резултат."

### Инструкција B — Test hardening
"Напиши минималне, али корисне smoke тестове за Next.js руте и API contract тестове за Django endpoint-е. Тестови морају бити брзи и стабилни."

### Инструкција C — Security pass
"Примени security hardening: заглавља, CORS контроле, и rate limiting за API. Додај документацију за безбедносне одлуке у `docs/`."

### Инструкција D — Observability
"Интегриши Sentry или OpenTelemetry за web и api са могућношћу искључивања преко env променљивих. Додај runbook за incident response."

### Инструкција E — CMS workflow
"Прошири Django моделе/админ да подрже draft-review-publish workflow за кључне садржаје и ажурирај frontend да приказује само објављен садржај."

## 5) Примењено у овом кораку
У овом commit-у су примењене припремне enterprise активности:
1. Уведен је аутоматски генератор комплетног инвентара Git-праћених фајлова.
2. Генерисан је инвентар свих праћених фајлова за ревизију и планирање.
3. Документован је enterprise-grade roadmap са конкретним фазама и Codex инструкцијама.

## 6) KPI за праћење напретка
- Build успех (web/api): > 99%
- Покривеност тестовима: иницијално 40%, циљ 70%+
- MTTR за продукционе инциденте: < 60 мин
- Lighthouse perf/accessibility score: 90+
- Број критичних security налаза: 0
