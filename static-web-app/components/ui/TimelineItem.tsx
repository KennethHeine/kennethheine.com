// --- file: components/TimelineItem.tsx ---
import type { BaseComponentProps } from '../../types/ui';

/**
 * Timeline item data interface
 */
export interface TimelineItemData {
  year: string;
  title: string;
  company: string;
  description: string;
}

/**
 * Timeline item component props interface
 *
 * Follows consistent prop patterns:
 * - Extends BaseComponentProps for standard props (className, children, style, testId)
 * - Event handlers follow onAction naming pattern
 * - Supports forwardRef pattern for DOM access
 */
interface TimelineItemProps extends BaseComponentProps {
  /** Timeline item data */
  item: TimelineItemData;
  /** Index in the timeline (for styling alternation) */
  index: number;
}

/**
 * Timeline item component for professional journey
 * Modern design with enhanced visual effects
 */
export function TimelineItem({ item, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className='relative'>
      {/* Timeline dot with glow effect */}
      <div className='absolute left-8 sm:left-1/2 sm:-translate-x-1/2 flex h-4 w-4 items-center justify-center'>
        <div className='absolute h-8 w-8 rounded-full bg-brand-500/20 animate-pulse dark:bg-brand-400/20'></div>
        <div className='relative h-4 w-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 ring-4 ring-white shadow-lg dark:from-brand-400 dark:to-brand-500 dark:ring-gray-900'></div>
      </div>

      {/* Content container with modern card design */}
      <div
        className={`ml-16 sm:ml-0 sm:flex sm:w-full ${isEven ? 'sm:justify-start' : 'sm:justify-end'}`}
      >
        <div className={`sm:w-1/2 ${isEven ? 'sm:pr-8' : 'sm:pl-8'}`}>
          <div
            className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800/50 dark:ring-gray-700/50 backdrop-blur-sm ${isEven ? 'sm:text-right' : 'sm:text-left'}`}
          >
            {/* Gradient overlay on hover */}
            <div className='absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

            <div className='relative flex flex-col gap-1 sm:gap-2'>
              <time
                className='inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-400'
                dateTime={item.year}
              >
                <span className='h-1 w-8 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 dark:from-brand-400 dark:to-brand-500' />
                {item.year}
              </time>
              <h3 className='text-lg font-bold text-gray-900 dark:text-white'>
                {item.title}
              </h3>
              <p className='text-sm font-semibold text-gray-600 dark:text-gray-400'>
                {item.company}
              </p>
              <p className='mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
