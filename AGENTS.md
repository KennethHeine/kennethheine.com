# AGENTS.md

A guide for AI coding agents working on the kennethheine.com personal website.

## Project Overview

This is a Next.js 15 personal website deployed as an Azure Static Web App with Infrastructure as Code using Bicep templates. It features a blog system with MDX, comprehensive testing (unit + E2E), and automated CI/CD pipelines.

**Tech Stack**: Next.js 15, TypeScript, Tailwind CSS 4, React 19, Jest, Playwright, Azure Static Web Apps, Bicep

## Setup Commands

- Install dependencies: `cd static-web-app && npm ci`
- Start dev server: `cd static-web-app && npm run dev`
- Run unit tests: `cd static-web-app && npm test`
- Run E2E tests: `cd static-web-app && npm run test:e2e`
- Build for production: `cd static-web-app && npm run build`
- Run linter: `cd static-web-app && npm run lint`
- Fix linting issues: `cd static-web-app && npm run lint:fix`
- Check formatting: `cd static-web-app && npm run format:check`
- Fix formatting: `cd static-web-app && npm run format`
- Type check: `cd static-web-app && npm run type-check`

## Dev Environment Tips

- Use `npm run dev` in `static-web-app/` while iterating on the application with hot-reload enabled.
- The Node.js version is specified in `.nvmrc` (Node 22).
- All dependencies are locked in `package-lock.json` - use `npm ci` for clean installs.
- The project uses Jest for unit testing with React Testing Library.
- Playwright browsers need to be installed: `npx playwright install chromium --with-deps`

## Testing Instructions

- Find the CI plan in `.github/workflows/` folder.
- Run `npm test` in `static-web-app/` to execute all unit tests in `__tests__/` directory.
- Run `npm run test:e2e` in `static-web-app/` to execute Playwright E2E tests in `e2e/` directory.
- Tests are organized by category in subdirectories:
  - `__tests__/components/` - Component tests
  - `__tests__/lib/` - Utility function tests
  - `__tests__/hooks/` - Custom hook tests
  - `__tests__/pages/` - Page tests
  - `__tests__/accessibility/` - Accessibility tests
  - `__tests__/integration/` - Integration tests
  - `e2e/` - Playwright E2E tests
- To focus on one test file, use: `npm test -- path/to/test.tsx`
- Fix any test or type errors until the whole suite is green.
- After moving files or changing imports, run `npm run lint` to verify ESLint and TypeScript rules pass.
- Add or update tests for the code you change, even if nobody asked.
- Test naming: `*.test.ts` or `*.test.tsx` for unit tests, `*.spec.ts` for E2E tests.

## Code Style

- **TypeScript**: Use strict types, prefer interfaces over types, avoid `any`.
- **React**: Use functional components with hooks, prefer `useCallback` and `useMemo` for optimization.
- **Styling**: Use Tailwind CSS v4 utility classes with CSS variable-based theming in `app/globals.css`.
- **Components**: Create accessible components following WCAG guidelines.
- **Formatting**: Prettier handles formatting - run `npm run format` before committing.
- **Linting**: ESLint handles code quality - run `npm run lint` before committing.

## PR Instructions

**IMPORTANT: Before completing any task, Copilot MUST run these validation commands:**

```bash
cd static-web-app
npm run format      # Fix formatting issues
npm run lint        # Check for linting errors
npm test            # Run all unit tests
npm run test:e2e    # Run E2E tests
npm run build       # Verify production build succeeds
```

All commands must pass before the work is considered complete. If any command fails, fix the issues and re-run until all pass.

Additional guidelines:

- Add or update tests for new functionality.
- Update relevant `.md` files if behavior changes.
- Follow existing patterns in the codebase.

## Key Files & Directories

| Path                                  | Purpose                                        |
| ------------------------------------- | ---------------------------------------------- |
| `static-web-app/app/`                 | Next.js App Router pages and layouts           |
| `static-web-app/components/`          | React components                               |
| `static-web-app/lib/`                 | Utilities (blog processing, helpers)           |
| `static-web-app/types/`               | TypeScript type definitions                    |
| `static-web-app/__tests__/`           | Jest unit tests                                |
| `static-web-app/e2e/`                 | Playwright E2E tests                           |
| `static-web-app/content/posts/`       | MDX blog posts                                 |
| `static-web-app/app/globals.css`      | Tailwind v4 theme configuration                |
| `.github/workflows/`                  | CI/CD workflows                                |
| `infra/`                              | Bicep Infrastructure as Code templates         |

## Important Constraints

- **Static Export**: The site must work as a static export for Azure Static Web Apps.
- **No Backend API**: All content is statically generated - never suggest adding a backend API.
- **No Authentication**: Don't add user login, sessions, or auth flows.
- **GitHub Actions Only**: All deployments must go through GitHub Actions, never deploy locally.
- **Azure Free SKU**: Use Azure Free SKU only for Static Web Apps.

## Data Models

Key types in `static-web-app/types/`:

- `Post` - Blog post metadata and content
- `FrontMatter` - Blog post YAML frontmatter
- `Theme` - Light/dark theme type

## Workflow Examples

### Adding a New Component

1. Create component in `static-web-app/components/`
2. Add unit tests in `static-web-app/__tests__/components/`
3. Verify accessibility requirements are met
4. Run full test suite before committing

### Adding a Blog Post

1. Create new `.mdx` file in `static-web-app/content/posts/`
2. Add required frontmatter (title, date, description, etc.)
3. Run `npm run build` to verify static generation works

### Fixing a Bug

1. Write a failing test that reproduces the bug
2. Fix the bug
3. Verify the test passes
4. Check for similar bugs elsewhere
5. Update documentation if needed

## Resources

- **Project Docs**: `README.md`, `CONTRIBUTING.md`
- **Deployment**: `INFRASTRUCTURE_STATUS.md`, `PREVIEW_DEPLOYMENT_FIX.md`
- **Testing**: `jest.config.js`, `codecov.yml`
- **Copilot Instructions**: `.github/copilot-instructions.md`
