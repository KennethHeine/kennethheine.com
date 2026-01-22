# Contributing to Kenneth Heine's Website

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js 22+ (version specified in `.nvmrc`)
- npm 10+
- Git

### Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/kennethheine.com.git
   cd kennethheine.com
   ```

2. **Install dependencies**

   ```bash
   cd static-web-app
   npm ci
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Install Playwright browsers (for E2E tests)**

   ```bash
   npx playwright install chromium --with-deps
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-blog-pagination`
- `fix/header-mobile-navigation`
- `docs/update-readme`
- `refactor/simplify-theme-provider`

### Making Changes

1. Create a new branch from `main`
2. Make your changes following the code style guidelines
3. Write or update tests as needed
4. Run all checks before committing

### Running Checks

Before submitting a PR, ensure all checks pass:

```bash
cd static-web-app

# Fix formatting
npm run format

# Run linter
npm run lint

# Run type checking
npm run type-check

# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Build the project
npm run build
```

Or run all checks at once:

```bash
npm run check
```

## Code Style

### TypeScript

- Use strict types; avoid `any`
- Prefer interfaces over type aliases for object shapes
- Export types from dedicated type files in `types/`

```typescript
// ✅ Good
interface UserProfile {
  name: string;
  email: string;
}

// ❌ Avoid
type UserProfile = {
  name: any;
  email: any;
};
```

### React Components

- Use functional components with hooks
- Follow the component patterns in `docs/component-prop-patterns.md`
- Extend `BaseComponentProps` for common props
- Use `forwardRef` for components that need DOM access

```typescript
// ✅ Good
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(styles, className)} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
```

### Styling

- Use Tailwind CSS utility classes
- Follow the existing theme system in `globals.css`
- Use CSS variables for theming
- Ensure WCAG 2.1 AA color contrast compliance

### File Organization

- Components go in `components/` organized by category
- Tests go in `__tests__/` mirroring the source structure
- Types go in `types/`
- Utilities go in `lib/`

## Testing

### Unit Tests

- Write tests for all new components and utilities
- Use React Testing Library for component tests
- Follow existing test patterns

```typescript
// Example component test
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-brand-500');
  });
});
```

### E2E Tests

- Write E2E tests for critical user flows
- Use Playwright's test patterns
- Keep tests independent and isolated

```typescript
// Example E2E test
test('navigation works correctly', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About');
  await expect(page).toHaveURL('/about');
});
```

### Accessibility Testing

- Include accessibility checks in component tests
- Use `jest-axe` for automated accessibility testing
- Verify keyboard navigation works

## Pull Request Process

### Before Submitting

1. Ensure all checks pass (`npm run check`)
2. Update documentation if needed
3. Add tests for new functionality
4. Rebase on latest `main` if needed

### PR Description

Include in your PR description:

- **Summary**: What does this PR do?
- **Motivation**: Why is this change needed?
- **Testing**: How was this tested?
- **Screenshots**: For UI changes, include before/after screenshots

### Review Process

1. PRs require at least one approval
2. All CI checks must pass
3. Address review feedback promptly
4. Squash commits before merging (if many small commits)

### After Merging

- Delete your feature branch
- Verify the deployment succeeds
- Monitor for any issues

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
# Feature
feat(blog): add pagination to blog listing

# Bug fix
fix(navigation): correct mobile menu close behavior

# Documentation
docs(readme): update installation instructions

# Tests
test(button): add accessibility tests for Button component
```

### Commit Linting

This project uses `commitlint` with `husky` to enforce commit message format. Commits that don't follow the convention will be rejected.

## Questions?

If you have questions or need help:

1. Check existing issues and discussions
2. Open a new issue with the "question" label
3. Be clear and provide context

Thank you for contributing! 🙏
