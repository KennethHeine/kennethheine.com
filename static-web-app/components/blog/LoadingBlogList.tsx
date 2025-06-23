/**
 * @fileoverview Loading state component for blog list
 * @author Kenneth Heine
 */

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

/**
 * Props for the LoadingBlogList component
 */
export interface LoadingBlogListProps {
  /** Custom CSS classes */
  className?: string;
  /** Number of skeleton items to show */
  itemCount?: number;
  /** Loading message */
  message?: string;
}

/**
 * Loading state component for blog list
 *
 * Features:
 * - Simple loading spinner with message
 * - Maintains layout space to prevent shifts
 * - Accessible for screen readers
 * - Minimal, non-intrusive design
 * - Supports reduced motion preferences
 *
 * @param className - Additional CSS classes
 * @param itemCount - Number of skeleton items (unused in minimal design)
 * @param message - Loading message to display
 */
export function LoadingBlogList({
  className,
  itemCount: _itemCount = 3,
  message = 'Loading posts...',
}: LoadingBlogListProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 space-y-4',
        className
      )}
    >
      {/* Loading spinner */}
      <LoadingSpinner size='lg' label={message} showText={true} />

      {/* Additional context */}
      <p className='text-sm text-gray-500 dark:text-gray-400 text-center max-w-md'>
        Filtering and organizing your content
      </p>
    </div>
  );
}
