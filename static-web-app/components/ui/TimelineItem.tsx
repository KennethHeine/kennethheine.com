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
 * "Signal & Ledger" styling: hairline panels alternating across the spine,
 * monospace year stamps, square signal markers
 */
export function TimelineItem({ item, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className='relative'>
      {/* Timeline marker - square signal */}
      <div className='absolute left-8 top-1.5 flex h-3 w-3 -translate-x-1/2 items-center justify-center sm:left-1/2'>
        <div className='h-3 w-3 rotate-45 border-2 border-brand-500 bg-gray-50 dark:border-brand-400 dark:bg-gray-950'></div>
      </div>

      {/* Content container */}
      <div
        className={`ml-16 sm:ml-0 sm:flex sm:w-full ${isEven ? 'sm:justify-start' : 'sm:justify-end'}`}
      >
        <div className={`sm:w-1/2 ${isEven ? 'sm:pr-10' : 'sm:pl-10'}`}>
          <div className='group border border-gray-200 bg-gray-50 p-6 transition-colors duration-200 hover:border-brand-500/50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-400/50 motion-reduce:transition-none'>
            <div className='flex flex-col gap-1 sm:gap-2'>
              <time
                className='font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400'
                dateTime={item.year}
              >
                {item.year}
              </time>
              <h3 className='font-display text-lg font-bold text-gray-900 dark:text-gray-50'>
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
