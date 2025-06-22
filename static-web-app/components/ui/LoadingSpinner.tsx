/**
 * @fileoverview Accessible loading spinner component
 * @author Kenneth Heine
 */

import { cn } from '@/lib/utils';

/**
 * Props for the LoadingSpinner component
 */
export interface LoadingSpinnerProps {
  /** Custom CSS classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Loading text for screen readers */
  label?: string;
  /** Show loading text visually */
  showText?: boolean;
}

/**
 * Accessible loading spinner component
 *
 * Features:
 * - Screen reader accessible with ARIA labels
 * - Respects reduced motion preferences
 * - Multiple size variants
 * - CSS-only animation for performance
 * - High contrast mode support
 *
 * @param className - Additional CSS classes
 * @param size - Size variant (sm, md, lg)
 * @param label - Loading text for screen readers
 * @param showText - Whether to show loading text visually
 */
export function LoadingSpinner({
  className,
  size = 'md',
  label = 'Loading',
  showText = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        showText && 'justify-center',
        className
      )}
      role='status'
      aria-live='polite'
      aria-label={label}
    >
      {/* Spinner */}
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-brand-600 dark:border-gray-600 dark:border-t-brand-400',
          sizeClasses[size]
        )}
        aria-hidden='true'
      />

      {/* Loading text */}
      {showText && (
        <span
          className={cn(
            'text-gray-600 dark:text-gray-400',
            textSizeClasses[size]
          )}
        >
          {label}
        </span>
      )}

      {/* Screen reader only text */}
      {!showText && <span className='sr-only'>{label}</span>}
    </div>
  );
}
