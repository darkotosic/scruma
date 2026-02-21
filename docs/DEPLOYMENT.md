# Deployment

1. Покренути `npm ci`.
2. Покренути `npm run build` (креира `out/`).
3. cPanel Git Deploy чита `.cpanel.yml` и копира `out/*` у `public_html/`.
