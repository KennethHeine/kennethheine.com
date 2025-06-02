// --- file: components/ui/TimelineItem.tsx ---
import { TimelineItemProps } from '../../types/ui';

/**
 * Timeline item component for professional journey
 * Used in the About page timeline section
 */
export function TimelineItem({ item }: TimelineItemProps) {
  // Previously used for alternating styles, can be re-implemented if needed
  // const isEven = index % 2 === 0;
  
  return (
    <div className="relative">
      {/* Timeline dot */}
      <div className="absolute left-0 mt-1 h-4 w-4 rounded-full border border-gray-300 bg-gray-200 dark:border-gray-700 dark:bg-gray-800"></div>
      
      {/* Timeline line */}
      <div className="absolute left-2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-800"></div>
      
      {/* Content container */}
      <div className="ml-8 pb-8">
        {/* Year badge */}
        <span className="inline-flex items-center rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20 dark:bg-brand-900/20 dark:text-brand-300 dark:ring-brand-400/30">
          {item.year}
        </span>
        
        {/* Job title */}
        <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
          {item.title}
        </h3>
        
        {/* Company */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.company}
        </p>
        
        {/* Description */}
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {item.description}
        </p>
      </div>
    </div>
  )
}
