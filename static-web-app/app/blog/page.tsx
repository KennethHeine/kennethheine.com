// --- file: app/blog/page.tsx ---
import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import Container from '@/components/Container'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/types/blog'

// SEO metadata for the blog page
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights about web development, technology, and software engineering.',
}

/**
 * Blog index page component
 * Features:
 * - Lists all blog posts from /content/posts/
 * - Shows title, date, summary, and tags for each post
 * - Responsive grid layout
 * - Links to individual blog posts
 */
export default async function BlogPage() {
  // Get all blog posts at build time
  const posts: BlogPost[] = getAllPosts()

  return (
    <main>
      {/* Header Section */}
      <section className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Blog
            </h1>
            <p className="mt-6 text-lg leading-7 text-gray-600 dark:text-gray-300">
              Thoughts, tutorials, and insights about web development, technology, 
              and the ever-evolving world of software engineering.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts */}
      <section className="pb-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            {posts.length === 0 ? (
              /* Empty state */
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  No posts yet
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Check back soon for new content!
                </p>
              </div>
            ) : (
              /* Posts grid */
              <div className="space-y-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    {/* Post header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="before:absolute before:inset-0 hover:text-brand-600 dark:hover:text-brand-400"
                          >
                            {post.title}
                          </Link>
                        </h2>
                        
                        <time 
                          dateTime={post.date}
                          className="mt-2 block text-sm text-gray-500 dark:text-gray-400"
                        >
                          {formatDate(post.date)}
                        </time>
                      </div>
                    </div>                    {/* Post summary */}
                    <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/20 dark:text-brand-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read more indicator */}
                    <div className="mt-6 flex items-center text-sm font-medium text-brand-600 dark:text-brand-400">
                      Read article
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </main>
  )
}
