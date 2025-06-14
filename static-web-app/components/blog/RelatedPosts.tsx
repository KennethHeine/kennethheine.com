// --- file: components/blog/RelatedPosts.tsx ---
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/blog';

/**
 * RelatedPosts component props
 */
export interface RelatedPostsProps {
  /** Array of related blog posts */
  posts: BlogPost[];
  /** Custom title for the section */
  title?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * RelatedPosts component displays a list of related blog posts
 *
 * Features:
 * - Clean card layout for each related post
 * - Shows title, date, excerpt, and category
 * - Links to individual posts
 * - Responsive grid layout
 * - Handles empty state gracefully
 *
 * @param posts - Array of related BlogPost objects
 * @param title - Section title (default: "Related Posts")
 * @param className - Additional CSS classes
 */
export function RelatedPosts({
  posts,
  title = 'Related Posts',
  className = '',
}: RelatedPostsProps) {
  // Don't render if no related posts
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          {title}
        </h2>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          More articles you might find interesting
        </p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map(post => (
          <article
            key={post.slug}
            className='group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800'
          >
            {/* Category and date */}
            <div className='mb-3 flex items-center justify-between text-sm'>
              {post.category && (
                <span className='inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'>
                  {post.category}
                </span>
              )}
              <time
                dateTime={post.date}
                className='text-gray-500 dark:text-gray-400'
              >
                {formatDate(post.date)}
              </time>
            </div>

            {/* Post title */}
            <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
              <Link
                href={`/blog/${post.slug}`}
                className='before:absolute before:inset-0 hover:text-brand-600 dark:hover:text-brand-400'
              >
                {post.title}
              </Link>
            </h3>

            {/* Post excerpt */}
            <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className='mt-4 flex flex-wrap gap-1'>
                {post.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className='inline-flex items-center rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className='text-xs text-gray-400 dark:text-gray-500'>
                    +{post.tags.length - 3} more
                  </span>
                )}
              </div>
            )}

            {/* Read more indicator */}
            <div className='mt-4 flex items-center text-sm font-medium text-brand-600 dark:text-brand-400'>
              Read more
              <svg
                className='ml-1 h-3 w-3 transition-transform group-hover:translate-x-1'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                />
              </svg>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
