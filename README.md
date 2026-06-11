# Kenneth Heine Personal Website

A modern, accessible personal website built with Next.js 16, deployed as an Azure Static Web App with comprehensive testing and CI/CD pipelines.

![Deploy to Production](https://github.com/KennethHeine/kennethheine.com/actions/workflows/deploy-production.yml/badge.svg)
![Test Coverage](https://github.com/KennethHeine/kennethheine.com/actions/workflows/test-coverage.yml/badge.svg)

## 🌟 Features

- **Modern Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Static Export**: Optimized for Azure Static Web Apps deployment
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive color contrast testing
- **Blog System**: MDX-powered blog with syntax highlighting (currently disabled)
- **Dark/Light Mode**: Automatic and manual theme switching
- **SEO Optimized**: Meta tags, Open Graph, sitemap, and robots.txt
- **Comprehensive Testing**: Jest unit tests + Playwright E2E tests
- **Infrastructure as Code**: Bicep templates for Azure resources
- **CI/CD Pipelines**: GitHub Actions for testing and deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ (see `.nvmrc`)
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/KennethHeine/kennethheine.com.git
cd kennethheine.com

# Install dependencies
cd static-web-app
npm ci

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

### Available Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot-reload |
| `npm run build`         | Build for production (static export)     |
| `npm run lint`          | Run ESLint                               |
| `npm run lint:fix`      | Fix ESLint issues automatically          |
| `npm run format`        | Format code with Prettier                |
| `npm run format:check`  | Check code formatting                    |
| `npm run type-check`    | Run TypeScript type checking             |
| `npm test`              | Run Jest unit tests                      |
| `npm run test:coverage` | Run tests with coverage report           |
| `npm run test:e2e`      | Run Playwright E2E tests                 |
| `npm run check`         | Run all checks (type-check, lint, test)  |

## 📁 Project Structure

```
kennethheine.com/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD pipelines
├── infra/                  # Azure Bicep infrastructure templates
│   ├── main.bicep         # Main infrastructure template
│   ├── modules/           # Reusable Bicep modules
│   └── parameters/        # Environment-specific parameters
├── static-web-app/        # Next.js application
│   ├── app/               # Next.js App Router pages
│   ├── components/        # React components
│   ├── content/           # Blog posts (MDX files)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── public/            # Static assets
│   ├── types/             # TypeScript type definitions
│   ├── __tests__/         # Jest unit tests
│   └── e2e/               # Playwright E2E tests
├── AGENTS.md              # AI coding agent instructions
└── README.md              # This file
```

## 🧪 Testing

The project includes comprehensive testing:

### Unit Tests (Jest + React Testing Library)

```bash
cd static-web-app
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm run test:coverage      # With coverage report
```

### E2E Tests (Playwright)

```bash
cd static-web-app
npx playwright install chromium --with-deps  # First time setup
npm run test:e2e           # Run E2E tests
npm run test:e2e:ui        # Interactive UI mode
```

### Test Organization

- `__tests__/components/` - Component tests
- `__tests__/lib/` - Utility function tests
- `__tests__/hooks/` - Custom hook tests
- `__tests__/pages/` - Page tests
- `__tests__/accessibility/` - Accessibility tests
- `__tests__/integration/` - Integration tests
- `e2e/` - End-to-end tests

## 🏗️ Deployment

### Environments

| Environment | Branch        | URL                                          |
| ----------- | ------------- | -------------------------------------------- |
| Production  | `main`        | [kennethheine.com](https://kennethheine.com) |
| Preview     | Pull requests | Auto-generated preview URLs                  |

### CI/CD Pipeline

1. **Test Job**: Runs on every push and PR
   - Linting and formatting checks
   - Unit tests
   - E2E tests
   - Build validation

2. **Deploy Job**: Runs after successful tests
   - Production: Automatic on `main` branch
   - Preview: Automatic on pull requests

### Infrastructure

Infrastructure is managed with Bicep templates in the `infra/` directory:

```bash
# Deploy infrastructure (via GitHub Actions)
# See .github/workflows/deploy-infrastructure.yml
```

## 🎨 Design System

"Signal & Ledger" — a precision-engineering editorial aesthetic: warm
paper / deep ink surfaces with a single signal-orange accent, self-hosted
Bricolage Grotesque / Archivo / IBM Plex Mono type, hairline blueprint
grids, and monospace ledger labels. Tokens and signature utilities live in
`static-web-app/app/globals.css`; the system is documented in
[AGENTS.md](AGENTS.md). Light and dark themes both meet WCAG 2.1 AA.

## 📝 Blog System

The blog system supports MDX with:

- Syntax highlighting (Prism.js)
- Frontmatter metadata
- Static generation

**Note**: Blog functionality is currently disabled. See `static-web-app/BLOG_ENABLE_DISABLE.md` for instructions to re-enable.

## 🔐 Security

- No backend API - all content is statically generated
- No authentication or user sessions
- Dependencies monitored with Dependabot
- Security vulnerabilities should be reported per `SECURITY.md`

## 🤝 Contributing

This is a personal site maintained largely by AI coding agents — see
[AGENTS.md](AGENTS.md) for the working agreement (commands, gates,
conventions). Issues and suggestions are welcome.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Azure Static Web Apps](https://azure.microsoft.com/services/app-service/static/) - Hosting
- [Playwright](https://playwright.dev/) - E2E testing
- [Jest](https://jestjs.io/) - Unit testing
