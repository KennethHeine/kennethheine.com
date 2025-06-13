// --- file: components/ui/Badge.tsx ---
'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * Badge size variants
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge visual variants
 */
export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'outline';

/**
 * Badge component props interface
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant of the badge */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: BadgeSize;
  /** Icon to display before the text */
  icon?: React.ReactNode;
  /** Custom className for additional styling */
  className?: string;
  /** Badge content */
  children?: React.ReactNode;
}

/**
 * Badge variant styles mapping
 */
const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  primary:
    'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-600/20 dark:bg-brand-900/20 dark:text-brand-300 dark:ring-brand-400/30',
  secondary:
    'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/20 dark:bg-gray-900/20 dark:text-gray-400 dark:ring-gray-400/30',
  success:
    'bg-success-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-400/30',
  warning:
    'bg-warning-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-400/30',
  error:
    'bg-error-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-400/30',
  outline:
    'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
};

/**
 * Badge size styles mapping
 */
const badgeSizes: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

/**
 * Badge component for labels, categories, and status indicators
 *
 * @example
 * ```tsx
 * <Badge variant="primary" size="md">
 *   Featured
 * </Badge>
 *
 * <Badge variant="success" icon={<CheckIcon />}>
 *   Completed
 * </Badge>
 *
 * <Badge variant="error" size="sm">
 *   Error
 * </Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { variant = 'default', size = 'md', icon, className, children, ...props },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full font-medium',
          badgeVariants[variant],
          badgeSizes[size],
          className
        )}
        {...props}
      >
        {icon && <span className='mr-1.5'>{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
