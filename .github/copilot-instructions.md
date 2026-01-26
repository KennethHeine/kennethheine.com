# Copilot Instructions

A comprehensive guide for GitHub Copilot coding agent working on the kennethheine.com personal website.

## Project Overview

This is a **Next.js 16** personal website deployed as an **Azure Static Web App**. It features a blog system with MDX, comprehensive testing (Jest + Playwright), and automated CI/CD pipelines with GitHub Actions.

**Tech Stack**: Next.js 16, React 19, TypeScript 5.9, Tailwind CSS 4, Jest 30, Playwright 1.58, Azure Static Web Apps, Bicep (IaC)

**Important Constraints**:
- **Static Export Only**: Site must work as a static export (`output: 'export'` in next.config.mjs)
- **No Backend API**: All content is statically generated - never add a backend API
- **No Authentication**: Don't add user login, sessions, or auth flows
- **Azure Free SKU**: Only use Azure Free SKU for Static Web Apps

## Quick Reference Commands

All commands must be run from the `static-web-app/` directory.

**Node.js Version**: 22 (specified in `static-web-app/.nvmrc`)

```bash
cd static-web-app

# Install dependencies (ALWAYS run first, ~18s)
npm ci

# Development server with hot-reload
npm run dev

# VALIDATION SEQUENCE (run before completing any task):
npm run format      # Fix formatting (~4s)
npm run lint        # Check linting (~8s) - use lint:fix to auto-fix
npm run type-check  # TypeScript check (~6s)
npm test            # Unit tests - 78 suites, 1282 tests (~9s)
npm run test:e2e    # E2E tests - 36 tests (~23s, requires Playwright)
npm run build       # Production build (~11s)
```

### Playwright Setup (Required for E2E tests)
```bash
npx playwright install chromium --with-deps
```

## Project Structure

```
kennethheine.com/
├── .github/
│   └── workflows/           # CI/CD pipelines (test-coverage, deploy-*)
├── static-web-app/          # Main Next.js application
│   ├── app/                 # Next.js App Router (pages, layouts)
│   ├── components/          # React components (blog/, ui/, navigation/, etc.)
│   ├── lib/                 # Utilities (blog processing, helpers)
│   ├── types/               # TypeScript type definitions
│   ├── __tests__/           # Jest unit tests (mirrors source structure)
│   ├── e2e/                 # Playwright E2E tests (*.spec.ts)
│   ├── content/posts/       # MDX blog posts
│   ├── public/              # Static assets
│   ├── jest.config.js       # Jest configuration
│   ├── playwright.config.ts # Playwright configuration
│   ├── eslint.config.mjs    # ESLint flat config
│   └── tsconfig.json        # TypeScript configuration
├── infra/                   # Azure Bicep templates
├── AGENTS.md                # Additional AI agent guidance
└── CONTRIBUTING.md          # Contribution guidelines
```

## Code Style & Conventions

- **TypeScript**: Use strict types, prefer interfaces over type aliases, avoid `any`
- **React**: Functional components with hooks, use `forwardRef` for DOM access
- **Styling**: Tailwind CSS v4 utility classes with CSS variables in `app/globals.css`
- **Formatting**: Prettier (run `npm run format` before committing)
- **Linting**: ESLint with TypeScript, React, accessibility rules
- **Commit Messages**: Conventional commits enforced via commitlint (feat, fix, docs, etc.)

### Component Patterns
- Extend `BaseComponentProps` from `types/common.ts` for standard props
- Use centralized `ComponentSize` and `ComponentVariant` types
- Follow patterns in `docs/component-prop-patterns.md`

## Testing

### Unit Tests (Jest + React Testing Library)
- Tests in `__tests__/` directory, mirroring source structure
- Test files: `*.test.ts` or `*.test.tsx`
- Run single file: `npm test -- path/to/test.tsx`
- Coverage thresholds: 85%+ (branches, functions, lines)

### E2E Tests (Playwright)
- Tests in `e2e/` directory
- Test files: `*.spec.ts`
- Uses dev server on port 3000
- Projects: chromium, Mobile Chrome

### Adding Tests
1. Create test file in `__tests__/` matching source location
2. Import from `@testing-library/react` and `@testing-library/jest-dom`
3. Follow existing test patterns in the codebase

## CI/CD Pipelines

### Pre-commit Hooks (Husky)
- `pre-commit`: Runs `npm run lint && npm test` in static-web-app/
- `commit-msg`: Validates conventional commit format

### GitHub Workflows
| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `test-coverage.yml` | Push/PR to main | Runs tests with coverage, uploads to Codecov |
| `deploy-production.yml` | Push to main | Full test suite + deploy to Azure |
| `deploy-preview.yml` | Pull requests | Preview deployment |
| `copilot-setup-steps.yml` | Modified | Validates setup steps |

### CI Validation Sequence
The CI runs these steps in order:
1. `npm ci` - Install dependencies
2. `npm run lint` - ESLint check
3. `npm run format:check` - Prettier check
4. `npm test` - Unit tests
5. `npx playwright install chromium --with-deps` - Install browsers
6. `npm run test:e2e` - E2E tests
7. `npm run build` - Production build
8. Validate `out/index.html` exists

## Key Files Reference

| File | Purpose |
|------|---------|
| `static-web-app/package.json` | Dependencies and npm scripts |
| `static-web-app/.nvmrc` | Node.js version (22) |
| `static-web-app/next.config.mjs` | Next.js config (static export) |
| `static-web-app/tsconfig.json` | TypeScript config with path aliases |
| `static-web-app/eslint.config.mjs` | ESLint flat config |
| `static-web-app/jest.config.js` | Jest config with coverage thresholds |
| `static-web-app/playwright.config.ts` | E2E test config |
| `static-web-app/app/globals.css` | Tailwind theme and CSS variables |
| `static-web-app/staticwebapp.config.json` | Azure SWA routing config |

## Path Aliases

Use these TypeScript path aliases for imports (relative to `static-web-app/`):
- `@/*` → `./*`
- `@/components/*` → `./components/*`
- `@/lib/*` → `./lib/*`
- `@/types/*` → `./types/*`
- `@/app/*` → `./app/*`

## Common Workflows

### Adding a New Component
1. Create component in `components/[category]/`
2. Add unit tests in `__tests__/components/[category]/`
3. Ensure accessibility (WCAG 2.1 AA)
4. Run validation sequence before completing

### Adding a Blog Post (when blog is enabled)
1. Create `.mdx` file in `content/posts/`
2. Add required frontmatter (title, date, description)
3. Run `npm run build` to verify static generation

### Fixing a Bug
1. Write a failing test that reproduces the bug
2. Fix the bug
3. Verify the test passes
4. Run full validation sequence

## Known Issues & Workarounds

- **next.config.mjs warning**: The `eslint` key in next.config.mjs shows a deprecation warning during dev server. This is expected and does not affect builds.
- **Build artifacts**: The `out/` directory is generated by `npm run build` and is gitignored.
- **Playwright cache**: Browsers are cached in `~/.cache/ms-playwright`. Run `npx playwright install chromium --with-deps` if E2E tests fail on missing browsers.

## Trust These Instructions

These instructions have been validated by running all commands successfully. Trust this documentation first. Only perform additional searches if:
1. Information in these instructions is incomplete for your task
2. You encounter an error not covered here
3. You need to understand specific implementation details

For implementation patterns, refer to existing code in the repository as examples.
