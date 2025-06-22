// --- file: components/blog/BlogListWithFilters.tsx ---
'use client';

import { BlogFilters } from '@/components/blog/BlogFilters';
import { LoadingBlogList } from '@/components/blog/LoadingBlogList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/blog';
import Link from 'next/link';

/**
 * Props for BlogListWithFilters component
 */
export interface BlogListWithFiltersProps {
  /** Initial posts to display (required) */
  initialPosts: BlogPost[];
}

/**
 * BlogListWithFilters component with interactive filtering
 * Features:
 * - Interactive filtering by category, tag, and search
 * - Responsive layout with sidebar filters
 * - Load more functionality
 * - Click-to-filter tags
 */
export function BlogListWithFilters({
  initialPosts,
}: BlogListWithFiltersProps) {
  // Use the enhanced blog posts hook with filtering
  const {
    posts,
    categories,
    tags,
    searchQuery,
    setSearchQuery,
    currentCategory,
    filterByCategory,
    currentTag,
    filterByTag,
    resetFilters,
    hasMore,
    loadMore,
    loading,
  } = useBlogPosts({
    initialPosts,
    pageSize: 6, // Show 6 posts initially
  });

  return (
    <div className='mx-auto max-w-6xl'>
      <div className='grid gap-8 lg:grid-cols-4'>
        {/* Filters Sidebar */}
        <div className='lg:col-span-1'>
          <div className='sticky top-8'>
            <BlogFilters
              categories={categories}
              tags={tags}
              searchQuery={searchQuery}
              selectedCategory={currentCategory}
              selectedTag={currentTag}
              onSearchChange={setSearchQuery}
              onCategorySelect={filterByCategory}
              onTagSelect={filterByTag}
              onResetFilters={resetFilters}
            />
          </div>
        </div>

        {/* Posts Content */}
        <div className='lg:col-span-3'>
          {loading && posts.length === 0 ? (
            /* Loading state when no posts */
            <LoadingBlogList message='Loading posts...' />
          ) : posts.length === 0 ? (
            /* Empty state */
            <div className='text-center py-12'>
              <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
                No posts found
              </h3>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            /* Posts grid */
            <div className='space-y-8'>
              {posts.map(post => (
                <article
                  key={post.slug}
                  className='group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800'
                >
                  {/* Post header */}
                  <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        {/* Category badge */}
                        {post.category && (
                          <button
                            onClick={e => {
                              e.preventDefault();
                              if (post.category) {
                                filterByCategory(post.category);
                              }
                            }}
                            className='inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30'
                          >
                            {post.category}
                          </button>
                        )}

                        <time
                          dateTime={post.date}
                          className='text-sm text-gray-500 dark:text-gray-400'
                        >
                          {formatDate(post.date)}
                        </time>
                      </div>

                      <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                        <Link
                          href={`/blog/${post.slug}`}
                          className='before:absolute before:inset-0 hover:text-brand-600 dark:hover:text-brand-400'
                        >
                          {post.title}
                        </Link>
                      </h2>
                    </div>
                  </div>

                  {/* Post summary */}
                  <p className='mt-4 text-gray-600 dark:text-gray-300 line-clamp-2'>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='mt-6 flex flex-wrap gap-2'>
                      {post.tags.map(tag => (
                        <button
                          key={tag}
                          onClick={e => {
                            e.preventDefault();
                            filterByTag(tag);
                          }}
                          className='inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-700'
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Read more indicator */}
                  <div className='mt-6 flex items-center text-sm font-medium text-brand-600 dark:text-brand-400'>
                    Read article
                    <svg
                      className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
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

              {/* Load More Button */}
              {hasMore && (
                <div className='text-center pt-8'>
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className='inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  >
                    {loading ? (
                      <>
                        <LoadingSpinner size='sm' label='Loading more posts' />
                        Loading...
                      </>
                    ) : (
                      'Load More Posts'
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
