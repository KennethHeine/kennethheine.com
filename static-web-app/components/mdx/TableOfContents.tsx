'use client';

import { TocItem } from '@/lib/mdx/processor';

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
  title?: string;
}

/**
 * Table of Contents component for blog posts
 * Provides navigation to different sections of the post
 */
export function TableOfContents({
  items,
  className = '',
  title = 'Table of Contents',
}: TableOfContentsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const handleItemClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav
      className={`rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 ${className}`}
      aria-label='Table of contents'
    >
      <h3 className='mb-3 text-sm font-semibold text-gray-900 dark:text-white'>
        {title}
      </h3>
      <ul className='space-y-1 text-sm'>
        {items.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className={`ml-${(item.level - 1) * 3}`}
          >
            <button
              onClick={() => handleItemClick(item.id)}
              className='block w-full text-left text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors'
              type='button'
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
