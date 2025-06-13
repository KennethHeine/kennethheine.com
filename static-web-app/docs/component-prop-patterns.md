# Component Prop Patterns Documentation

This document outlines the standardized prop patterns used across all UI components in the kennethheine.com project.

## Core Pattern Philosophy

All components follow consistent patterns to ensure:
- **Developer Experience**: Predictable APIs across all components
- **Type Safety**: Comprehensive TypeScript interfaces with proper inheritance
- **Maintainability**: Centralized type definitions and consistent naming
- **Accessibility**: Standard props for testing and accessibility
- **Flexibility**: forwardRef patterns and proper event handling

## Base Component Props

All UI components extend `BaseComponentProps` which provides:

```typescript
interface BaseComponentProps {
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** Optional test ID for testing */
  testId?: string;
  /** Optional children elements */
  children?: ReactNode;
}
```

## Centralized Type System

### Component Sizes
```typescript
type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```
Used by: Button, Card, Input, Badge, Modal, ThemeToggle

### Component Variants
```typescript
type ComponentVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';
```
Used by: Button, Badge (with extensions)

## Interface Patterns

### 1. Standard Component Interface

```typescript
export interface ComponentProps 
  extends BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, keyof BaseComponentProps> {
  /** Component-specific props */
  variant?: ComponentVariant;
  size?: ComponentSize;
  /** Event handlers following onAction pattern */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
```

### 2. Form Component Interface

```typescript
export interface FormComponentProps
  extends BaseComponentProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseComponentProps | 'size'> {
  size?: ComponentSize;
  variant?: 'default' | 'error' | 'success';
  /** Event handlers following onAction pattern */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
```

### 3. Compound Component Interface

```typescript
export interface CompoundComponentProps 
  extends BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  // Compound-specific props
}
```

## Event Handler Naming

All event handlers follow the `onAction` pattern:

### Standard Events
- `onClick` - Mouse click events
- `onChange` - Input change events  
- `onFocus` - Focus events
- `onBlur` - Blur events
- `onSubmit` - Form submission
- `onClose` - Modal/dialog close events

### Custom Events
- `onToggle` - Toggle state changes
- `onSelect` - Selection events
- `onError` - Error handling
- `onSuccess` - Success callbacks

## forwardRef Pattern

All components use React's forwardRef for DOM access:

```typescript
export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ variant = 'default', size = 'md', className, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);

Component.displayName = 'Component';
```

## Size and Variant Mappings

### Size Styles
Components maintain consistent size mappings:

```typescript
const sizeStyles: Record<ComponentSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm', 
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};
```

### Variant Styles
Components implement variant mappings based on their specific needs while maintaining consistency with the design system.

## Documentation Standards

Every component interface includes:

```typescript
/**
 * Component description and purpose
 * 
 * Follows consistent prop patterns:
 * - Extends BaseComponentProps for standard props (className, children, style, testId)
 * - Uses centralized ComponentSize and ComponentVariant types
 * - Event handlers follow onAction naming pattern
 * - Supports forwardRef pattern for DOM access
 */
```

## Component Examples

### Button Component
- ✅ Extends BaseComponentProps
- ✅ Uses ComponentSize and ComponentVariant
- ✅ Supports onClick with proper typing
- ✅ Implements forwardRef pattern

### Card Component  
- ✅ Extends BaseComponentProps
- ✅ Uses ComponentSize
- ✅ Compound component pattern (Card.Header, Card.Body, Card.Footer)
- ✅ Implements forwardRef pattern

### Input Component
- ✅ Extends BaseComponentProps
- ✅ Uses ComponentSize
- ✅ Proper form event handlers (onChange, onFocus, onBlur)
- ✅ Implements forwardRef pattern

## Testing Patterns

Components should be tested for:
- ✅ Prop inheritance from BaseComponentProps
- ✅ Size and variant mappings
- ✅ Event handler functionality
- ✅ forwardRef implementation
- ✅ Accessibility attributes

## Migration Notes

When updating existing components:

1. **Extend BaseComponentProps** instead of defining className, children separately
2. **Use centralized types** (ComponentSize, ComponentVariant) instead of local definitions
3. **Remove duplicate prop definitions** that are covered by BaseComponentProps
4. **Ensure event handlers follow onAction naming**
5. **Add proper TypeScript documentation** with pattern notes
6. **Update size/variant mappings** to include all ComponentSize options

## Benefits

This standardized approach provides:

- **Consistency**: All components behave predictably
- **Type Safety**: Comprehensive TypeScript coverage
- **Maintainability**: Centralized type definitions
- **Developer Experience**: Familiar APIs across components
- **Accessibility**: Standard props for testing and ARIA support
- **Flexibility**: forwardRef support for complex use cases