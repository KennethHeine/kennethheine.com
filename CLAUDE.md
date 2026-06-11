# CLAUDE.md

Read `AGENTS.md` — it is the single source of truth for working on this repo
(project layout, design system, CI/CD, constraints).

Quick facts:

- App lives in `static-web-app/` (Next.js 16 static export → Azure SWA).
- The 5 key commands (run in `static-web-app/`):
  `npm ci` · `npm run lint` · `npm run format:check` ·
  `npm run test:coverage` · `npm run build`
- CI gate = those commands + Playwright e2e; push to `main` deploys.
- No git hooks; CI is the gate. Conventional commits.
- Fonts are self-hosted (strict CSP) — never add external font/script origins.
