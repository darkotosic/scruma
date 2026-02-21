# AGENTS.md — Project Operating Rules (Codex / ChatGPT)

This repository contains a static website (Next.js static export) deployed to cPanel/WebDream. A separate Django API + Admin runs on Render. Follow these rules strictly.

## Language & Script Rules (Non-negotiable)
- Default content language: Serbian.
- Default script: Cyrillic (sr-Cyrl) for ALL UI/UX text.
- The UI must provide a visible toggle to switch to Latin (sr-Latn).
- Never introduce English UI strings in the product UI (docs are allowed).

## Product Scope
- Static website: 4–6 pages, modern UI, responsive, fast.
- Light/Dark theme toggle.
- Data comes from Django Admin via Django API.
- Every page must work without the API (static fallback content).
- The API integration must be additive (no hard dependency).

## Technical Constraints (cPanel/WebDream)
- The site must be deployable via cPanel Git Version Control.
- `.cpanel.yml` must exist at repository root and be committed.
- Deployment target: `public_html/` (or a configured custom path).
- Avoid dangerous deployment patterns (do not copy `.git` or use broad wildcards).

## Architecture Guidelines
- Use Next.js in a static-export compatible configuration.
- Keep runtime API calls optional and resilient (timeouts, graceful fallback).
- Centralize API base URL configuration (ENV or a single config module).
- Keep content models simple: news/announcements/events/matches.

## Quality Bar
- No regressions: preserve existing behavior unless explicitly instructed.
- Accessibility: semantic HTML, proper contrast, keyboard focus.
- Performance: minimal JS, optimized assets, avoid heavy dependencies.
- Security: sanitize any HTML coming from the API; never trust input.

## Deliverable Conventions
When implementing changes:
- Provide exact file paths.
- Provide complete file contents for new files.
- Provide minimal diffs for edits.
- Keep commits logically grouped (docs, config, UI, API integration).

## Definition of Done (MVP)
- Pages exist and render in Cyrillic by default.
- Latin toggle works across all pages.
- Light/Dark toggle works across all pages.
- Static export produces `out/`.
- `.cpanel.yml` deploys `out/` into `public_html/`.
