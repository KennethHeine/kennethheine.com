// --- file: components/TimelineItem.tsx ---
interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    company: string;
    description: string;
  };
  index: number;
}

/**
 * Timeline item component for professional journey
 * Used in the About page timeline section
 */
export function TimelineItem({ item, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className='relative'>
      {/* Timeline dot */}
      <div className='absolute left-8 sm:left-1/2 sm:-translate-x-1/2 flex h-4 w-4 items-center justify-center'>
        <div className='h-4 w-4 rounded-full bg-brand-500 ring-4 ring-white dark:ring-gray-900'></div>
      </div>

      {/* Content container */}
      <div
        className={`ml-16 sm:ml-0 sm:flex sm:w-full ${isEven ? 'sm:justify-start' : 'sm:justify-end'}`}
      >
        <div className={`sm:w-1/2 ${isEven ? 'sm:pr-8' : 'sm:pl-8'}`}>
          <div
            className={`rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 ${isEven ? 'sm:text-right' : 'sm:text-left'}`}
          >
            {' '}
            <div className='flex flex-col gap-1 sm:gap-2'>
              <time
                className='text-sm font-semibold text-brand-600 dark:text-brand-400'
                dateTime={item.year}
              >
                {item.year}
              </time>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                {item.title}
              </h3>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                {item.company}
              </p>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
