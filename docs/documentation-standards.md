# Documentation Standards

## 📋 Overview

This document establishes comprehensive JSDoc/TSDoc standards for the Kenneth Heine website project. These standards ensure consistent, maintainable, and helpful documentation throughout the codebase.

## 🎯 Goals

- **Consistency**: Standardized documentation patterns across all code
- **Maintainability**: Clear documentation that helps with code maintenance
- **Developer Experience**: IntelliSense support and better IDE integration
- **Onboarding**: Easier understanding for new contributors
- **Quality**: Enforced documentation through linting and TypeScript

## 📚 Documentation Standards

### 1. Component Documentation

#### React Components

All React components must include:

```typescript
/**
 * Brief description of the component's purpose
 * 
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 * 
 * @param props - Component props
 * @returns JSX element
 */
export function ComponentName({ prop }: ComponentProps) {
  // implementation
}
```

#### Component Props Interface

```typescript
/**
 * Props for the ComponentName component
 */
interface ComponentProps {
  /** Brief description of the prop */
  prop: string;
  
  /** 
   * Optional prop with default value
   * @default false
   */
  optional?: boolean;
  
  /**
   * Event handler callback
   * @param value - The value passed to the handler
   */
  onEvent?: (value: string) => void;
}
```

### 2. Function Documentation

#### Utility Functions

```typescript
/**
 * Brief description of what the function does
 * 
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter
 * @returns Description of return value
 * 
 * @example
 * ```typescript
 * const result = functionName('input', 42);
 * console.log(result); // Expected output
 * ```
 */
export function functionName(param1: string, param2: number): string {
  // implementation
}
```

#### Async Functions

```typescript
/**
 * Brief description of the async operation
 * 
 * @param param - Description of parameter
 * @returns Promise resolving to description
 * @throws {Error} When operation fails
 * 
 * @example
 * ```typescript
 * try {
 *   const data = await asyncFunction('input');
 *   console.log(data);
 * } catch (error) {
 *   console.error('Operation failed:', error);
 * }
 * ```
 */
export async function asyncFunction(param: string): Promise<Data> {
  // implementation
}
```

### 3. Type Documentation

#### Interfaces

```typescript
/**
 * Represents a blog post in the system
 */
interface BlogPost {
  /** Unique identifier for the post */
  id: string;
  
  /** Post title */
  title: string;
  
  /** 
   * Post content in markdown format
   * @remarks This field supports MDX syntax
   */
  content: string;
  
  /** 
   * Publication date
   * @example "2024-01-15"
   */
  publishedAt: string;
}
```

#### Type Aliases

```typescript
/**
 * Theme options for the application
 * @see {@link useTheme} for usage
 */
type Theme = 'light' | 'dark' | 'system';

/**
 * Navigation item configuration
 */
type NavigationItem = {
  /** Display name for the navigation item */
  name: string;
  /** URL path for the navigation item */
  href: string;
};
```

### 4. Module Documentation

#### File Header

```typescript
/**
 * @fileoverview Brief description of the module's purpose
 * @author Kenneth Heine
 * @since 1.0.0
 */
```

#### Barrel Exports

```typescript
/**
 * @fileoverview Component library exports
 * @description This module provides a centralized export point for all UI components
 */

export { Button } from './Button';
export { Card } from './Card';
export type { ButtonProps, CardProps } from './types';
```

## 🏷️ Required Tags

### Essential Tags

- `@param` - Document all function parameters
- `@returns` - Document return values (use `@returns` not `@return`)
- `@example` - Provide usage examples for complex functions/components
- `@throws` - Document thrown exceptions
- `@default` - Document default values for optional props

### Optional but Recommended Tags

- `@see` - Reference related functions/components
- `@since` - Version when feature was added
- `@deprecated` - Mark deprecated features
- `@internal` - Mark internal-only APIs
- `@beta` - Mark experimental features
- `@remarks` - Additional important notes

## 📋 Documentation Requirements

### Required Documentation

1. **All exported functions** - Must have JSDoc comments
2. **All React components** - Must document purpose and props
3. **All public interfaces** - Must document all properties
4. **All type aliases** - Must explain the type's purpose
5. **Complex utility functions** - Must include examples

### Optional Documentation

1. **Private functions** - Document if complex
2. **Self-explanatory props** - Basic props with obvious purpose
3. **Standard event handlers** - onClick, onChange, etc.

## 🔧 Code Examples

### Component Example

```typescript
/**
 * A reusable button component with multiple variants and sizes
 * 
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * 
 * // Secondary button with custom size
 * <Button variant="secondary" size="lg">
 *   Large button
 * </Button>
 * ```
 */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick,
  ...rest 
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }))}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

/**
 * Props for the Button component
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: React.ReactNode;
  
  /** 
   * Visual style variant
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';
  
  /** 
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Click event handler
   * @param event - The click event
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```

### Hook Example

```typescript
/**
 * Custom hook for managing local storage state with SSR compatibility
 * 
 * @param key - The localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns Array containing the current value and setter function
 * 
 * @example
 * ```typescript
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * 
 * // Update theme
 * setTheme('dark');
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  // implementation
}
```

### Utility Function Example

```typescript
/**
 * Formats a date string or Date object for display
 * 
 * @param dateInput - Date in ISO format or Date object
 * @param options - Formatting options
 * @returns Formatted date string
 * 
 * @throws {Error} When date input is invalid
 * 
 * @example
 * ```typescript
 * formatDate('2024-01-15') // "January 15, 2024"
 * formatDate(new Date(), { format: 'short' }) // "Jan 15, 2024"
 * ```
 */
export function formatDate(
  dateInput: string | Date,
  options: FormatOptions = {}
): string {
  // implementation
}
```

## 🚫 What to Avoid

### Don't Document Obvious Things

```typescript
// ❌ Bad: Obvious documentation
/**
 * Sets the name
 * @param name - the name
 */
setName(name: string) {
  this.name = name;
}

// ✅ Good: Meaningful documentation
/**
 * Updates the user's display name and triggers validation
 * @param name - User's full name (2-50 characters)
 * @throws {ValidationError} When name doesn't meet requirements
 */
setName(name: string) {
  // implementation with validation
}
```

### Don't Use Vague Descriptions

```typescript
// ❌ Bad: Vague description
/**
 * Does something with data
 * @param data - some data
 */

// ✅ Good: Specific description
/**
 * Transforms raw blog post data into displayable format
 * @param data - Raw blog post data from CMS
 */
```

## 🔍 Documentation Quality Checklist

- [ ] All exported functions have JSDoc comments
- [ ] Component purpose is clearly explained
- [ ] All parameters are documented with types
- [ ] Return values are documented
- [ ] Examples are provided for complex APIs
- [ ] Error conditions are documented
- [ ] Default values are specified
- [ ] Links to related functions/components are included

## 🛠️ Tools and Configuration

### TypeScript Configuration

Documentation settings are configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "stripInternal": true
  }
}
```

### ESLint Rules

Documentation is enforced through ESLint:

```javascript
{
  "rules": {
    "valid-jsdoc": "error",
    "require-jsdoc": ["error", {
      "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": true,
        "ArrowFunctionExpression": true,
        "FunctionExpression": true
      }
    }],
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### TSDoc Configuration

TSDoc is configured via `.tsdoc.json` for consistent documentation generation.

## 📈 Enforcement Strategy

### Development Phase

1. **Gradual Implementation** - Add documentation to new code
2. **Component Focus** - Prioritize public components and utilities
3. **Review Process** - Include documentation in code reviews

### CI/CD Integration

1. **Linting** - ESLint rules enforce documentation requirements
2. **Type Checking** - TypeScript validates JSDoc types
3. **Documentation Generation** - Automated docs from comments

## 🔄 Maintenance

### Regular Review

- Review documentation during code reviews
- Update documentation when functionality changes
- Remove outdated or incorrect documentation
- Ensure examples remain working and relevant

### Documentation Debt

- Track components without documentation
- Prioritize high-traffic components
- Schedule documentation sprints
- Measure documentation coverage

---

**Note**: This documentation standard is a living document. It should be updated as the project evolves and new patterns emerge.