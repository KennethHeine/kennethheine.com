// --- file: components/ui/Badge.tsx ---
'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import type {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../types/ui';

/**
 * Badge visual variants extending base ComponentVariant
 */
export type BadgeVariant =
  | ComponentVariant
  | 'default'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Badge component props interface
 *
 * Follows consistent prop patterns:
 * - Extends BaseComponentProps for standard props (className, children, style, testId)
 * - Uses centralized ComponentSize type
 * - Event handlers follow onAction naming pattern
 * - Supports forwardRef pattern for DOM access
 */
export interface BadgeProps
  extends BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLSpanElement>, keyof BaseComponentProps> {
  /** Visual variant of the badge */
  variant?: BadgeVariant;
  /** Size of the badge */
  size?: ComponentSize;
  /** Icon to display before the text */
  icon?: React.ReactNode;
  /** Badge click handler - follows onAction naming pattern */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
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
  ghost:
    'bg-transparent border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
  outline:
    'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
  destructive:
    'bg-error-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-400/30',
  success:
    'bg-success-50 text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/20 dark:text-green-300 dark:ring-green-400/30',
  warning:
    'bg-warning-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20 dark:bg-yellow-900/20 dark:text-yellow-300 dark:ring-yellow-400/30',
  error:
    'bg-error-50 text-red-700 ring-1 ring-inset ring-red-600/20 dark:bg-red-900/20 dark:text-red-300 dark:ring-red-400/30',
};

/**
 * Badge size styles mapping
 */
const badgeSizes: Record<ComponentSize, string> = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
  xl: 'px-5 py-2 text-lg',
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
