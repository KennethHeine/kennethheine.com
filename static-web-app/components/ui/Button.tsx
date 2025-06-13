// --- file: components/ui/Button.tsx ---
'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import type {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../types/ui';

/**
 * Button component props interface
 *
 * Follows consistent prop patterns:
 * - Extends BaseComponentProps for standard props (className, children, style, testId)
 * - Uses centralized ComponentSize and ComponentVariant types
 * - Event handlers follow onAction naming pattern
 * - Supports forwardRef pattern for DOM access
 */
export interface ButtonProps
  extends BaseComponentProps,
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      keyof BaseComponentProps
    > {
  /** Visual variant of the button */
  variant?: ComponentVariant | 'danger';
  /** Size of the button */
  size?: ComponentSize;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Icon to display before the text */
  icon?: React.ReactNode;
  /** Icon to display after the text */
  iconAfter?: React.ReactNode;
  /** Button click handler - follows onAction naming pattern */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Base button styles using Tailwind CSS and design tokens
 */
const buttonBaseStyles = 'btn';

/**
 * Button variant styles mapping
 */
const buttonVariants: Record<ComponentVariant | 'danger', string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost:
    'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
  destructive:
    'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500',
  danger: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500',
};

/**
 * Button size styles mapping
 */
const buttonSizes: Record<ComponentSize, string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

/**
 * Button component for consistent interactive elements
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * <Button variant="outline" size="sm" icon={<Icon />} loading>
 *   Loading...
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconAfter,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          buttonBaseStyles,
          buttonVariants[variant],
          buttonSizes[size],
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className='animate-spin -ml-1 mr-2 h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        )}
        {!loading && icon && <span className='mr-2'>{icon}</span>}
        {children}
        {!loading && iconAfter && <span className='ml-2'>{iconAfter}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
