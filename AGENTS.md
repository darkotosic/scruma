# AGENTS.md — Project Operating Rules

## Language & Script Requirements
- Default user-facing content must be **Serbian Cyrillic**.
- Provide a **Cyrillic/Latin toggle** for UI.
- Do not introduce English in the UI unless explicitly requested.

## Monorepo Layout
- `scruma-web/` = Next.js static site (export to `out/`)
- `scruma-api/` = Django API + Admin for content management
- Root `.cpanel.yml` deploys `scruma-web/out/` to WebDream `public_html`.

## Deployment Targets
- WebDream/cPanel: static files only (no Node runtime required).
- Render: Django web service (Root Directory `scruma-api`).

## Content Strategy
- Every page must have:
  1) a static fallback (rendered without API),
  2) optional dynamic enhancement via API.

## Coding Standards
- Keep changes minimal and reversible.
- Prefer configuration over complexity.
- Add clear comments only where non-obvious.
- Avoid breaking existing routes and deployment assumptions.

## Acceptance Criteria
- `scruma-web/out/` contains a fully working static site.
- `.cpanel.yml` successfully deploys to `public_html`.
- Render deploys `scruma-api` with migrations + static collection.
- Admin can manage: announcements, match previews, and page content.


## CMS политика
- API као једина истина: не враћати локалне текстуалне fallback садржаје у `scruma-web/src/lib/content.ts`.
- Relax rule је дозвољен само као статусни приказ „Садржај још није унет“.
