# Kenneth Heine Website - Next.js Application

This is the Next.js 15 application for kennethheine.com, a personal website deployed as an Azure Static Web App.

## Quick Start

```bash
# Install dependencies
npm ci

# Start development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
static-web-app/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── _blog/             # Blog pages (disabled)
│   ├── globals.css        # Global styles and theme
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # React components
│   ├── blog/              # Blog components
│   ├── error/             # Error boundary components
│   ├── icons/             # Icon components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── mdx/               # MDX rendering components
│   ├── navigation/        # Navigation components
│   ├── providers/         # Context providers
│   ├── seo/               # SEO components
│   └── ui/                # UI primitives (Button, Card, etc.)
├── content/               # Content files
│   └── posts/             # Blog posts (MDX)
├── docs/                  # Documentation
│   ├── accessibility/     # Accessibility documentation
│   └── component-prop-patterns.md
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── accessibility/     # Accessibility utilities
│   ├── blog/              # Blog processing utilities
│   ├── mdx/               # MDX utilities
│   ├── seo/               # SEO utilities
│   ├── ui/                # UI utilities
│   └── utils.ts           # General utilities
├── public/                # Static assets
│   └── images/            # Images
├── types/                 # TypeScript type definitions
├── __tests__/             # Jest unit tests
│   ├── accessibility/     # Accessibility tests
│   ├── components/        # Component tests
│   ├── hooks/             # Hook tests
│   ├── integration/       # Integration tests
│   ├── lib/               # Library tests
│   └── pages/             # Page tests
└── e2e/                   # Playwright E2E tests
```

## Available Scripts

### Development

```bash
npm run dev          # Start dev server with hot-reload
npm run build        # Build for production
npm run start        # Start production server
```

### Testing

```bash
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run Playwright E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
```

### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
npm run type-check   # TypeScript type checking
npm run check        # Run all checks
npm run fix          # Fix lint and format issues
```

### Azure Static Web Apps

```bash
npm run swa:init     # Initialize SWA CLI
npm run swa:build    # Build for SWA
npm run swa:start    # Start local SWA emulator
npm run swa:deploy   # Deploy to Azure (requires auth)
```

## Configuration Files

| File | Purpose |
|------|---------|
| `next.config.mjs` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |
| `postcss.config.js` | PostCSS configuration |
| `jest.config.js` | Jest test configuration |
| `playwright.config.ts` | Playwright E2E configuration |
| `eslint.config.mjs` | ESLint configuration |
| `.prettierrc.json` | Prettier configuration |
| `staticwebapp.config.json` | Azure SWA routing config |

## Key Technologies

- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS
- **MDX**: Markdown with JSX for blog
- **Jest**: Unit testing
- **Playwright**: E2E testing

## Component Development

### Component Patterns

All components follow standardized patterns (see `docs/component-prop-patterns.md`):

```typescript
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { BaseComponentProps, ComponentSize } from '@/types';

interface MyComponentProps extends BaseComponentProps {
  size?: ComponentSize;
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('base-styles', className)} {...props}>
        {children}
      </div>
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

### Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Include ARIA attributes where appropriate
- Maintain WCAG 2.1 AA color contrast (see `docs/accessibility/`)

## Theming

The theme system uses CSS variables defined in `app/globals.css`:

```css
@theme {
  --color-brand-500: #0369a1;
  /* ... other variables */
}
```

Toggle between light and dark themes via the `ThemeProvider` component.

## Testing Guidelines

### Unit Tests

- Place tests in `__tests__/` mirroring source structure
- Name test files with `.test.ts` or `.test.tsx` suffix
- Use React Testing Library for component tests

### E2E Tests

- Place tests in `e2e/` directory
- Name test files with `.spec.ts` suffix
- Test critical user flows

### Running Specific Tests

```bash
# Single file
npm test -- __tests__/components/Button.test.tsx

# Pattern matching
npm test -- --testPathPattern="Button"

# E2E specific test
npm run test:e2e -- e2e/navigation.spec.ts
```

## Blog System

The blog system is currently disabled. See `BLOG_ENABLE_DISABLE.md` for instructions on re-enabling.

When enabled, blog posts:

- Are written in MDX format in `content/posts/`
- Require frontmatter (title, date, description, etc.)
- Are statically generated at build time
- Support syntax highlighting with Prism.js

## Build Output

The build outputs to the `out/` directory as a static export:

```
out/
├── index.html
├── about/index.html
├── contact/index.html
├── sitemap.xml
├── robots.txt
├── staticwebapp.config.json
└── _next/
    └── static/
```

## Environment Variables

Currently, no environment variables are required for development. All configuration is handled through config files.

For production deployment, GitHub Secrets are used:

- `AZURE_SUBSCRIPTION_ID`
- `AZURE_TENANT_ID`
- `AZURE_CLIENT_ID`

## Troubleshooting

### Common Issues

**Build fails with type errors**
```bash
npm run type-check  # Check for type errors
```

**Tests fail**
```bash
npm run lint:fix    # Fix linting issues
npm run format      # Fix formatting
```

**E2E tests fail to start**
```bash
npx playwright install chromium --with-deps
```

**Styles not updating**
- Ensure Tailwind CSS classes are used correctly
- Check for CSS variable definitions in `globals.css`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [MDX Documentation](https://mdxjs.com/)
