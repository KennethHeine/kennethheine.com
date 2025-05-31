// --- file: components/TimelineItem.tsx ---
interface TimelineItemProps {
  item: {
    year: string
    title: string
    company: string
    description: string
  }
  index: number
}

/**
 * Timeline item component for professional journey
 * Used in the About page timeline section
 */
export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <div className="relative flex items-start gap-6 sm:gap-8">
      {/* Timeline dot */}
      <div className="relative flex h-16 w-16 flex-none items-center justify-center sm:absolute sm:left-1/2 sm:-translate-x-1/2">
        <div className="h-4 w-4 rounded-full bg-brand-500 ring-4 ring-white dark:ring-gray-900"></div>
      </div>
      
      {/* Content */}
      <div className={`flex-1 min-w-0 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'} ${index % 2 === 1 ? 'sm:translate-x-full' : ''}`}>
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <div className="flex flex-col gap-1 sm:gap-2">
            <time className="text-sm font-semibold text-brand-600 dark:text-brand-400">
              {item.year}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {item.company}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
