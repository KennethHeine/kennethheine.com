/**
 * @fileoverview Loading state component for related posts
 * @author Kenneth Heine
 */

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils';

/**
 * Props for the LoadingRelatedPosts component
 */
export interface LoadingRelatedPostsProps {
  /** Custom CSS classes */
  className?: string;
  /** Loading message */
  message?: string;
  /** Title for the section */
  title?: string;
}

/**
 * Loading state component for related posts section
 *
 * Features:
 * - Maintains section layout structure
 * - Simple loading indicator
 * - Accessible for screen readers
 * - Minimal design to avoid distraction
 * - Respects reduced motion preferences
 *
 * @param className - Additional CSS classes
 * @param message - Loading message to display
 * @param title - Section title to maintain structure
 */
export function LoadingRelatedPosts({
  className,
  message = 'Loading related posts...',
  title = 'Related Posts',
}: LoadingRelatedPostsProps) {
  return (
    <section className={cn('py-12', className)}>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          {title}
        </h2>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          Finding articles you might enjoy
        </p>
      </div>

      <div
        className='flex flex-col items-center justify-center py-8 space-y-4'
        data-testid='loading-container'
      >
        {/* Loading spinner */}
        <LoadingSpinner size='md' label={message} showText={true} />
      </div>
    </section>
  );
}
