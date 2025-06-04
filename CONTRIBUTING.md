# Contributing to kennethheine.com

Welcome to the contributing guide for Kenneth Heine's personal website! This document provides comprehensive guidelines for contributing to this Next.js 14 project with TypeScript, Tailwind CSS, and Azure Static Web Apps deployment.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Commit Standards](#commit-standards)
- [Pull Request Process](#pull-request-process)
- [Deployment Guidelines](#deployment-guidelines)
- [Architecture Decision Records](#architecture-decision-records)
- [Additional Resources](#additional-resources)
- [Getting Help](#getting-help)

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Git** with configured user name and email
- **VS Code** (recommended) with project extensions

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KennethHeine/kennethheine.com.git
   cd kennethheine.com
   ```

2. **Install dependencies:**
   ```bash
   cd static-web-app
   npm install
   ```

3. **Verify setup:**
   ```bash
   npm run check  # Runs type-check, lint, format:check, and test
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

### Project Structure

```
kennethheine.com/
├── static-web-app/           # Next.js application
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reusable React components
│   ├── content/              # MDX blog posts and content
│   ├── lib/                  # Utility functions
│   ├── types/                # TypeScript type definitions
│   ├── __tests__/            # Jest test suites
│   └── public/               # Static assets
├── infra/                    # Bicep Infrastructure as Code
├── .github/workflows/        # CI/CD pipelines
└── docs/                     # Project documentation
```

## 🔄 Development Workflow

### Branch Strategy

- **main** - Production branch (protected)
- **feature/** - Feature development branches
- **fix/** - Bug fix branches
- **docs/** - Documentation updates

### Local Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Auto-fix ESLint issues
npm run format          # Format code with Prettier
npm run format:check    # Check Prettier formatting
npm run type-check      # TypeScript type checking

# Testing
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report

# Combined Checks
npm run check           # Run all quality checks
npm run fix             # Auto-fix linting and formatting
```

## 📝 Code Standards

### TypeScript Guidelines

**Strict Mode Configuration:**
- All TypeScript strict checks enabled
- No `any` types (use `unknown` or proper typing)
- Explicit return types for public functions
- Consistent import/export patterns

**Type Definitions:**
```typescript
// ✅ Good - Explicit interface with JSDoc
interface UserProfile {
  /** Unique user identifier */
  id: string;
  /** Display name */
  name: string;
  /** Optional email address */
  email?: string;
}

// ✅ Good - Generic with constraints
interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ❌ Bad - Using any type
function processData(data: any): any {
  return data;
}
```

### ESLint Rules

Key rules enforced:
- `@typescript-eslint/no-unused-vars: error`
- `@typescript-eslint/no-explicit-any: warn`
- `@typescript-eslint/consistent-type-imports: error`
- `react-hooks/exhaustive-deps: warn`
- `import/order: error` (with auto-sorting)

### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### File Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Pages:** kebab-case (`blog-post.tsx`) or PascalCase (`page.tsx`)
- **Utilities:** camelCase (`formatDate.ts`)
- **Types:** camelCase (`userTypes.ts`)
- **Tests:** Match source file (`UserProfile.test.tsx`)

## 🧩 Component Guidelines

### Component Structure

```typescript
'use client'; // Only when needed for client-side features

import type { ComponentProps } from '@/types/common';
import { cn } from '@/lib/utils';

/**
 * UserProfile component displays user information
 * 
 * @param user - User data object
 * @param className - Optional CSS classes
 * @param children - Optional child elements
 */
interface UserProfileProps extends ComponentProps {
  /** User data to display */
  user: UserProfile;
  /** Display variant */
  variant?: 'default' | 'compact';
}

export function UserProfile({ 
  user, 
  variant = 'default',
  className,
  children,
  ...props 
}: UserProfileProps) {
  return (
    <div 
      className={cn(
        'rounded-lg border p-4',
        variant === 'compact' && 'p-2',
        className
      )}
      {...props}
    >
      <h3 className="font-semibold">{user.name}</h3>
      {user.email && (
        <p className="text-sm text-gray-600">{user.email}</p>
      )}
      {children}
    </div>
  );
}
```

### Component Patterns

**Props Interface:**
- Extend `ComponentProps` for common props
- Use optional props with default values
- Document all props with JSDoc comments

**Styling:**
- Use Tailwind CSS utility classes
- Implement design system patterns
- Use `clsx` or `cn` utility for conditional classes
- Support custom `className` prop

**Export Pattern:**
- Named exports for components
- Default exports for pages
- Consistent import/export structure

### State Management

```typescript
// ✅ Good - Local state with proper typing
const [isLoading, setIsLoading] = useState<boolean>(false);
const [user, setUser] = useState<UserProfile | null>(null);

// ✅ Good - Custom hooks for complex logic
function useUserProfile(userId: string) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Implementation...
  
  return { user, loading };
}
```

### Accessibility Standards

- Include proper ARIA labels
- Ensure keyboard navigation support
- Maintain color contrast standards
- Use semantic HTML elements

## 🧪 Testing Requirements

### Coverage Thresholds

**Global Requirements:**
- **Branches:** 85%
- **Functions:** 85%
- **Lines:** 86%
- **Statements:** 85%

**Critical Files:** 90% coverage for:
- Layout components
- Core utilities
- Authentication logic

### Test File Structure

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { UserProfile } from '../UserProfile';

const mockUser: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

describe('UserProfile', () => {
  it('renders user name correctly', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays email when provided', () => {
    render(<UserProfile user={mockUser} />);
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <UserProfile user={mockUser} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
```

### Testing Patterns

- **Unit Tests:** All components and utilities
- **Integration Tests:** Page-level functionality
- **Accessibility Tests:** ARIA and keyboard navigation
- **Snapshot Tests:** Avoid unless necessary

## 📝 Commit Standards

### Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

**Examples:**
```bash
feat(components): add UserProfile component with email display
fix(blog): resolve MDX rendering issue for code blocks
docs: update CONTRIBUTING.md with testing guidelines
style: format components with prettier
test(utils): add comprehensive tests for date formatting
```

### Commit Guidelines

- Use present tense ("add feature" not "added feature")
- Keep first line under 100 characters
- Include body for complex changes
- Reference issues when applicable

## 🔀 Pull Request Process

### Before Creating PR

1. **Ensure code quality:**
   ```bash
   npm run check  # Must pass all checks
   ```

2. **Run tests:**
   ```bash
   npm run test:coverage  # Must meet coverage thresholds
   ```

3. **Update documentation:**
   - Update JSDoc comments
   - Add/update README sections if needed
   - Update type definitions

### PR Requirements

- **Clear description** of changes
- **Screenshots** for UI changes
- **Test coverage** maintained or improved
- **No breaking changes** without discussion
- **Documentation updates** included

### Review Process

1. Automated checks must pass
2. At least one reviewer approval
3. No unresolved conversations
4. All requirements met

## 🚀 Deployment Guidelines

### Deployment Policy

**⚠️ Important:** ALL deployments must go through GitHub Actions CI/CD pipeline.

**✅ Local Development (Encouraged):**
```bash
npm run dev          # Development server
npm run build        # Test build process
npm test             # Run tests
npm run check        # Validate changes
```

**❌ Never Deploy Locally:**
- No manual Azure deployments
- No bypassing CI/CD pipeline
- All production changes through GitHub Actions

### Deployment Triggers

- **Frontend:** Changes to `static-web-app/` on main branch
- **Infrastructure:** Changes to `infra/` on main branch
- **Preview:** Automatic for pull requests

### Environment Configuration

- **Production:** Deployed to Azure Static Web Apps
- **Preview:** Unique URLs for each PR
- **Local:** Development server only

## 📐 Architecture Decision Records

### Overview

Architecture Decision Records (ADRs) document significant architectural decisions for transparency and knowledge sharing. All major technical decisions should be documented as ADRs.

### When to Create an ADR

Create an ADR for decisions about:

- **Technology Choices:** Frameworks, libraries, platforms, tools
- **Architecture Patterns:** Design patterns, data flow, component structure
- **Infrastructure:** Hosting, deployment, CI/CD, monitoring
- **Development Process:** Workflows, standards, conventions
- **Security & Compliance:** Authentication, authorization, data handling

### ADR Process

1. **Identify Decision:** Recognize when an architectural decision needs documentation
2. **Research Options:** Investigate alternatives and gather context
3. **Create ADR:** Use the [ADR template](./docs/architecture/adr-template.md)
4. **Review & Discuss:** Get team feedback on the proposed decision
5. **Finalize:** Mark as "Accepted" and implement the decision
6. **Update Index:** Add to the [ADR README](./docs/architecture/README.md)

### ADR Guidelines

- **Be Concise:** Keep ADRs focused and readable
- **Include Context:** Explain the situation that requires a decision
- **Document Alternatives:** Show what options were considered and why they were rejected
- **Note Consequences:** List positive, negative, and neutral outcomes
- **Use Template:** Follow the established [ADR template](./docs/architecture/adr-template.md)
- **Update Status:** Keep ADR status current (Proposed, Accepted, Deprecated, Superseded)

### Existing ADRs

See [Architecture Decision Records](./docs/architecture/README.md) for the complete list of current ADRs and process documentation.

## 📚 Additional Resources

- [Architecture Decision Records](./docs/architecture/README.md)
- [Detailed Coding Standards](./docs/coding-standards.md)
- [Documentation Standards](./docs/documentation-standards.md)
- [Next.js 14 Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Testing Library Documentation](https://testing-library.com/docs/)

## 🆘 Getting Help

- **Issues:** Create GitHub issue for bugs or feature requests
- **Discussions:** Use GitHub Discussions for questions
- **Documentation:** Check existing docs and ADRs
- **Code Review:** Request review from maintainers

---

Thank you for contributing to kennethheine.com! Your contributions help maintain high code quality and improve the development experience.