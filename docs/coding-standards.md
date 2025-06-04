# Coding Standards & Technical Specifications

This document provides detailed technical standards and patterns for the kennethheine.com project, complementing the general guidelines in [CONTRIBUTING.md](../CONTRIBUTING.md).

## 📋 Table of Contents

- [TypeScript Standards](#typescript-standards)
- [React Component Patterns](#react-component-patterns)
- [Styling Guidelines](#styling-guidelines)
- [Testing Standards](#testing-standards)
- [Performance Guidelines](#performance-guidelines)
- [Security Standards](#security-standards)
- [File Organization](#file-organization)

## 🎯 TypeScript Standards

### Strict Configuration

Our `tsconfig.json` enforces strict typing:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  }
}
```

### Type Definition Patterns

**Interface Definitions:**
```typescript
// ✅ Good - Comprehensive interface with documentation
interface BlogPost {
  /** Unique post identifier */
  id: string;
  /** Post title */
  title: string;
  /** Post content in markdown */
  content: string;
  /** Publication date */
  publishedAt: Date;
  /** Optional featured image */
  featuredImage?: string;
  /** Post tags for categorization */
  tags: string[];
  /** SEO metadata */
  seo: {
    description: string;
    keywords: string[];
  };
}

// ✅ Good - Generic with proper constraints
interface APIResponse<T extends Record<string, unknown> = Record<string, unknown>> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}
```

**Type vs Interface Usage:**
```typescript
// ✅ Use interfaces for object shapes
interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// ✅ Use types for unions, primitives, and computed types
type Theme = 'light' | 'dark' | 'system';
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
type ComponentVariant = 'primary' | 'secondary' | 'ghost';
```

### Function Type Annotations

```typescript
// ✅ Good - Explicit return types for public functions
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ✅ Good - Generic function with constraints
export function createApiResponse<T extends Record<string, unknown>>(
  data: T,
  success: boolean = true
): APIResponse<T> {
  return {
    success,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: crypto.randomUUID(),
    },
  };
}

// ✅ Good - Async function with proper typing
export async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`/api/posts/${id}`);
    const data = await response.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}
```

### Path Aliases

Use configured path aliases for cleaner imports:

```typescript
// ✅ Good - Using path aliases
import type { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// ❌ Bad - Relative imports for distant files
import type { BlogPost } from '../../../types/blog';
import { formatDate } from '../../lib/utils';
```

## ⚛️ React Component Patterns

### Component Structure Template

```typescript
'use client'; // Only when client-side features are needed

import type { ComponentProps } from '@/types/common';
import { cn } from '@/lib/utils';

/**
 * BlogCard component displays blog post preview information
 * 
 * Features:
 * - Responsive design with mobile-first approach
 * - Dark mode support via Tailwind CSS
 * - Accessibility-compliant markup
 * - SEO-optimized structure
 * 
 * @param post - Blog post data
 * @param variant - Display variant (default: 'card')
 * @param className - Additional CSS classes
 * @param onClick - Optional click handler
 */
interface BlogCardProps extends ComponentProps {
  /** Blog post data to display */
  post: BlogPost;
  /** Visual variant */
  variant?: 'card' | 'compact' | 'featured';
  /** Optional click handler */
  onClick?: (post: BlogPost) => void;
}

export function BlogCard({
  post,
  variant = 'card',
  className,
  onClick,
  ...props
}: BlogCardProps) {
  const handleClick = () => {
    onClick?.(post);
  };

  return (
    <article
      className={cn(
        // Base styles
        'rounded-lg border bg-white shadow-sm transition-shadow',
        'hover:shadow-md dark:bg-gray-800 dark:border-gray-700',
        // Variant styles
        {
          'p-6': variant === 'card',
          'p-4': variant === 'compact',
          'p-8 border-2 border-brand-200': variant === 'featured',
        },
        // Interactive styles
        onClick && 'cursor-pointer hover:shadow-lg',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Featured image */}
      {post.featuredImage && (
        <div className="mb-4 aspect-video overflow-hidden rounded-md">
          <img
            src={post.featuredImage}
            alt={`Featured image for ${post.title}`}
            className="h-full w-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {post.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
          {post.seo.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <time
          dateTime={post.publishedAt.toISOString()}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {formatDate(post.publishedAt)}
        </time>
      </div>
    </article>
  );
}
```

### Prop Patterns

**Base Props Interface:**
```typescript
// All components should extend ComponentProps for consistency
interface ComponentProps {
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
  /** Optional test ID for testing */
  testId?: string;
  /** Optional children elements */
  children?: React.ReactNode;
}
```

**Event Handler Patterns:**
```typescript
// ✅ Good - Descriptive handler with proper typing
interface ButtonProps extends ComponentProps {
  /** Button click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
}

// ✅ Good - Form handler with validation
interface ContactFormProps extends ComponentProps {
  /** Form submission handler */
  onSubmit?: (data: ContactFormData) => Promise<void>;
  /** Validation error handler */
  onError?: (errors: ValidationError[]) => void;
  /** Initial form values */
  initialValues?: Partial<ContactFormData>;
}
```

### Custom Hooks

```typescript
/**
 * Custom hook for managing theme state
 * Handles system theme detection and localStorage persistence
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Implementation...
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }, []);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}

/**
 * Custom hook for API data fetching with proper error handling
 */
export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

## 🎨 Styling Guidelines

### Tailwind CSS Patterns

**Design System Classes:**
```typescript
// ✅ Good - Consistent design system usage
const buttonVariants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};
```

**Responsive Design:**
```typescript
// ✅ Good - Mobile-first responsive classes
<div className="
  grid grid-cols-1 gap-4
  sm:grid-cols-2 sm:gap-6
  lg:grid-cols-3 lg:gap-8
  xl:grid-cols-4
">
```

**Dark Mode Support:**
```typescript
// ✅ Good - Consistent dark mode patterns
<div className="
  bg-white text-gray-900
  dark:bg-gray-900 dark:text-white
  border-gray-200 dark:border-gray-700
">
```

### CSS Utility Function

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for combining and merging Tailwind CSS classes
 * Handles conditional classes and resolves conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Usage examples:
cn('px-4 py-2', 'bg-blue-500', { 'text-white': true }); // 'px-4 py-2 bg-blue-500 text-white'
cn('px-4', 'px-6'); // 'px-6' (latter takes precedence)
```

## 🧪 Testing Standards

### Component Testing

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogCard } from '../BlogCard';

const mockPost: BlogPost = {
  id: '1',
  title: 'Test Blog Post',
  content: 'Test content',
  publishedAt: new Date('2024-01-01'),
  tags: ['test', 'javascript'],
  seo: {
    description: 'Test description',
    keywords: ['test'],
  },
};

describe('BlogCard', () => {
  it('renders blog post information correctly', () => {
    render(<BlogCard post={mockPost} />);
    
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('handles click events correctly', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<BlogCard post={mockPost} onClick={handleClick} />);
    
    await user.click(screen.getByRole('article'));
    
    expect(handleClick).toHaveBeenCalledWith(mockPost);
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<BlogCard post={mockPost} variant="featured" />);
    
    expect(screen.getByRole('article')).toHaveClass('border-2', 'border-brand-200');
    
    rerender(<BlogCard post={mockPost} variant="compact" />);
    
    expect(screen.getByRole('article')).toHaveClass('p-4');
  });

  it('renders featured image when provided', () => {
    const postWithImage = {
      ...mockPost,
      featuredImage: '/test-image.jpg',
    };
    
    render(<BlogCard post={postWithImage} />);
    
    const image = screen.getByRole('img', { name: /featured image/i });
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('initializes with system theme', () => {
    const { result } = renderHook(() => useTheme());
    
    expect(result.current.theme).toBe('system');
  });

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useTheme());
    
    act(() => {
      result.current.setTheme('light');
    });
    
    expect(result.current.theme).toBe('light');
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
  });
});
```

### Utility Testing

```typescript
import { formatDate, cn } from '../utils';

describe('formatDate', () => {
  it('formats date correctly', () => {
    const date = new Date('2024-01-15');
    const formatted = formatDate(date);
    
    expect(formatted).toBe('January 15, 2024');
  });

  it('handles invalid dates gracefully', () => {
    const invalidDate = new Date('invalid');
    const formatted = formatDate(invalidDate);
    
    expect(formatted).toBe('Invalid Date');
  });
});

describe('cn utility', () => {
  it('merges classes correctly', () => {
    const result = cn('px-4 py-2', 'bg-blue-500', { 'text-white': true });
    
    expect(result).toBe('px-4 py-2 bg-blue-500 text-white');
  });

  it('resolves conflicting Tailwind classes', () => {
    const result = cn('px-4', 'px-6');
    
    expect(result).toBe('px-6');
  });
});
```

## ⚡ Performance Guidelines

### Code Splitting

```typescript
// ✅ Good - Dynamic imports for large components
import dynamic from 'next/dynamic';

const BlogEditor = dynamic(() => import('@/components/BlogEditor'), {
  loading: () => <div>Loading editor...</div>,
  ssr: false,
});

// ✅ Good - Lazy loading with React.lazy
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

### Memoization Patterns

```typescript
// ✅ Good - Memoizing expensive computations
const ExpensiveComponent = memo(({ data }: { data: ComplexData[] }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveOperation(item),
    }));
  }, [data]);

  const handleClick = useCallback((id: string) => {
    // Handle click
  }, []);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onClick={handleClick} />
      ))}
    </div>
  );
});
```

### Image Optimization

```typescript
import Image from 'next/image';

// ✅ Good - Optimized images with Next.js
<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
  className="rounded-lg"
/>

// ✅ Good - Responsive images
<Image
  src="/blog-image.jpg"
  alt="Blog post image"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

## 🔒 Security Standards

### Input Validation

```typescript
import { z } from 'zod';

// ✅ Good - Schema validation with Zod
const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email format'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  company: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

// ✅ Good - Validation in API routes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ContactFormSchema.parse(body);
    
    // Process validated data
    return Response.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }
    
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Content Security

```typescript
// ✅ Good - Sanitizing user content
import DOMPurify from 'isomorphic-dompurify';

function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  });
}

// ✅ Good - Safe rendering of user content
function UserComment({ content }: { content: string }) {
  const sanitizedContent = sanitizeHtml(content);
  
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="prose prose-sm"
    />
  );
}
```

## 📁 File Organization

### Directory Structure

```
static-web-app/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Route groups
│   ├── api/                 # API routes
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── forms/               # Form components
│   ├── layout/              # Layout components
│   └── icons/               # Icon components
├── lib/                     # Utility functions
│   ├── utils.ts             # General utilities
│   ├── api.ts               # API utilities
│   ├── validations.ts       # Schema validations
│   └── constants.ts         # App constants
├── types/                   # TypeScript definitions
│   ├── common.ts            # Common types
│   ├── api.ts               # API types
│   └── blog.ts              # Blog-specific types
├── __tests__/               # Test files
│   ├── components/          # Component tests
│   ├── pages/               # Page tests
│   └── utils/               # Utility tests
└── public/                  # Static assets
    ├── images/              # Image assets
    └── icons/               # Icon assets
```

### Import Organization

```typescript
// ✅ Good - Organized imports with consistent order
// 1. React and Next.js imports
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 2. Third-party library imports
import { clsx } from 'clsx';
import { format } from 'date-fns';

// 3. Internal imports (using path aliases)
import type { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// 4. Relative imports
import { BlogMeta } from './BlogMeta';
import styles from './BlogCard.module.css';
```

### Naming Conventions

**Files and Directories:**
- Components: `PascalCase.tsx`
- Pages: `kebab-case.tsx` or `page.tsx`
- Utilities: `camelCase.ts`
- Types: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

**Variables and Functions:**
- Variables: `camelCase`
- Functions: `camelCase`
- Components: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Types/Interfaces: `PascalCase`

---

This document serves as the technical foundation for maintaining code quality and consistency across the kennethheine.com project. For general contribution guidelines, see [CONTRIBUTING.md](../CONTRIBUTING.md).