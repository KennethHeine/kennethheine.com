# AGENTS.md

A guide for AI coding agents working on the kennethheine.com personal website.

## Project Overview

Next.js 16 personal website (App Router, static export) deployed to Azure
Static Web Apps via GitHub Actions, with infrastructure as code in Bicep.
A blog system (MDX) exists but is currently disabled: pages are in the private
`app/_blog/` folder, sitemap entries are off, and `staticwebapp.config.json`
returns 404 for `/blog*`. Its code must still compile and pass tests.

**Tech stack**: Next.js 16, React 19, TypeScript 5.9, Tailwind CSS 4,
Jest 30 + React Testing Library, Playwright, Azure Static Web Apps, Bicep.

## The 5 key commands

All run from `static-web-app/`:

```bash
npm ci                  # install (Node 22, see .nvmrc)
npm run lint            # eslint (flat config, eslint 9)
npm run format:check    # prettier (npm run format to fix)
npm run test:coverage   # jest, enforces >=85% coverage thresholds
npm run build           # static export to out/ (+ copies staticwebapp.config.json)
```

These are exactly the CI gate (`test_command` in `.github/workflows/deploy.yml`).
Also useful: `npm run type-check`, `npm test -- path/to/file`,
`npm run test:e2e` (Playwright; install browsers first with
`npx playwright install chromium`). `npm run check` combines types, lint,
formatting and coverage. `npm run swa:start` optionally previews `out/` using
a pinned SWA CLI downloaded on demand; it is not a project dependency.

## Design system — "Signal & Ledger"

The site has one committed aesthetic: precision-engineering editorial.

- **Fonts** (self-hosted via `next/font/local` in `app/layout.tsx`;
  woff2 files committed under `app/fonts/`): Bricolage Grotesque (display,
  `font-display`), Archivo (body, `font-sans`), IBM Plex Mono (`font-mono`).
  Never load fonts from external origins — the CSP blocks them.
- **Color tokens** in `app/globals.css` `@theme`: `brand-*` is a signal-orange
  ramp; `gray-*` is overridden to warm ink/paper neutrals. Restyle by changing
  token values, not by introducing new color families.
- **Signature utilities** (defined in `globals.css`): `bg-blueprint` (hairline
  grid), `texture-grain`, `label-mono` (ledger labels like `Index / 01`),
  `link-underline`, `frame-ticks` (photo crop marks), `reveal` +
  `reveal-delay-1..6` (staggered page-load animation, reduced-motion safe).
- Dark/light theme via class strategy (`.dark`), toggled by `ThemeToggle` and
  persisted in localStorage key `theme` (raw string: light|dark|system).
  Preserve this feature.
- Accessibility is a feature: skip links, landmark roles, `aria-current`,
  focus rings, reduced-motion support. Keep the a11y tests green.

## Testing instructions

- Unit tests in `static-web-app/__tests__/` (mirrors source layout); e2e in
  `static-web-app/e2e/` (`*.spec.ts`, Playwright, runs against `npm run dev`).
- Coverage thresholds (jest.config.js): 85% branches/functions/statements,
  86% lines — plus stricter per-file thresholds for `app/layout.tsx`.
- Many tests assert on ARIA roles, element IDs (`main-content`,
  `main-navigation`, `footer`, `hero-heading`, `featured-content-heading`),
  exact alt texts, and metadata strings. When redesigning markup, keep those
  contracts or update the tests deliberately.
- Note: new jsdom forbids `delete global.window` — don't write fake-SSR tests
  that way.

## CI/CD

- `.github/workflows/deploy.yml` is a thin caller of the reusable
  `static-web-deploy.yml` in KennethHeine/Azure-infrastructure (@main).
  One workflow handles production (push to main), per-PR preview
  environments, teardown on PR close, and the quality gate.
- The gate = `npm run lint && npm run format:check && npm run test:coverage`
  plus Playwright e2e (`run_e2e: true`). e2e runs BEFORE build in CI.
- Deploy steps are skipped for Dependabot; the gate still runs and
  `dependabot-auto-merge.yml` keys on the green "Deploy Web App" run to
  enable auto-merge (squash).
- Dependabot (`.github/dependabot.yml`): daily npm, weekly actions.
  **eslint majors are ignored** (2026-06: plugin ecosystem doesn't support
  eslint 10 yet — `eslint-plugin-import-x` et al.; revisit later).
  TypeScript major updates are also ignored to retain the 5.x toolchain.
- Infra changes: edit `infra/*.bicep` and push — `deploy-infra.yml` deploys
  via OIDC. Never deploy by hand. Static Web App SKU is parameterized
  (Free by default).

## Code style

- TypeScript strict; avoid `any`. Functional React components.
- Tailwind 4 utility classes + CSS-variable theming in `app/globals.css`
  (`@theme`, `@utility` — no tailwind.config file).
- Prettier formats in its own `format:check` gate; ESLint (flat config) lints
  without rerunning Prettier. No git hooks — CI is the gate.
- Conventional commit messages (feat/fix/chore/ci/docs/refactor).

## Key files & directories

| Path                                      | Purpose                                  |
| ----------------------------------------- | ---------------------------------------- |
| `static-web-app/app/`                     | App Router pages, layout, globals.css    |
| `static-web-app/app/fonts/`               | Committed woff2 fonts (next/font/local)  |
| `static-web-app/components/`              | React components (ui, layout, blog, …)   |
| `static-web-app/lib/`                     | Utilities (blog, seo, accessibility, ui) |
| `static-web-app/__tests__/`               | Jest unit tests                          |
| `static-web-app/e2e/`                     | Playwright e2e tests                     |
| `static-web-app/staticwebapp.config.json` | SWA routes, headers, CSP                 |
| `.github/workflows/deploy.yml`            | CI/CD entry point (reusable workflow)    |
| `infra/`                                  | Bicep IaC (deployed by deploy-infra.yml) |

## Important constraints

- **Static export only** (`output: 'export'`) — no server features, no
  backend API, no auth.
- **CSP is strict** (`staticwebapp.config.json`): assets are self-hosted except
  the optional Cloudflare Web Analytics beacon and its collection endpoint.
  `static-web-app/analytics.json` contains its public site token; an empty token
  disables tracking. Only production builds on the listed production hosts
  load it. Keep development and PR previews excluded. See `docs/SITE_TRAFFIC.md`.
- **All deployments via GitHub Actions**; never deploy locally.
- **Design changes require Kenneth's manual review.** Any frontend/visual
  design change (layout, styling, typography, theme) must go through a PR
  and wait for Kenneth to review and merge it — never push design changes
  to `main` and never self-merge such a PR. The PR's preview environment is
  the place to show the change. All other changes (fixes, dependencies,
  tests, CI, infra, non-visual refactors) may ship to `main` autonomously.
- Blog stays disabled until intentionally re-enabled. Follow
  `static-web-app/BLOG_ENABLE_DISABLE.md`; the route folder and Next.js 16
  parameters also need work before removing the `/blog*` edge blocks.

## Definition of done

Run from `static-web-app/`: `npm run lint && npm run format:check &&
npm run test:coverage && npm run build` — all green before pushing.
Update tests and relevant docs (this file, READMEs) with behavior changes.
