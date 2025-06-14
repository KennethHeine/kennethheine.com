// --- file: app/blog/[slug]/page.tsx ---
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import Container from '@/components/layout/Container';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EnhancedBlogContent, RelatedPosts } from '@/components/blog';

// Type for page props
interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

/**
 * Generate static params for all blog posts at build time
 * This enables static generation for each blog post
 */
export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for each blog post
 * This provides SEO metadata specific to each post
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Kenneth Heine'],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

/**
 * Individual blog post page component
 * Features:
 * - Renders MDX content with proper styling
 * - Shows post metadata (title, date, tags)
 * - Back to blog navigation
 * - Responsive prose styling
 */
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  // If post doesn't exist, show 404
  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = getRelatedPosts(post, 3);

  return (
    <main>
      <article>
        {/* Header Section */}
        <section className='py-20 sm:py-32'>
          <Container>
            <div className='mx-auto max-w-3xl'>
              {/* Back to blog link */}
              <Link
                href='/blog'
                className='inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300'
              >
                <ArrowLeftIcon className='h-4 w-4' />
                Back to Blog
              </Link>

              {/* Post header */}
              <header className='mt-8'>
                <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
                  {post.title}
                </h1>
                <div className='mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                  <div className='flex items-center gap-4'>
                    <time
                      dateTime={post.date}
                      className='text-sm text-gray-500 dark:text-gray-400'
                    >
                      {formatDate(post.date)}
                    </time>

                    {/* Category badge */}
                    {post.category && (
                      <span className='inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'>
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className='inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 dark:bg-brand-900/20 dark:text-brand-300'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>{' '}
                {/* Summary */}
                {post.excerpt && (
                  <p className='mt-6 text-lg leading-7 text-gray-600 dark:text-gray-300'>
                    {post.excerpt}
                  </p>
                )}
              </header>
            </div>
          </Container>
        </section>

        {/* Post Content */}
        <section className='pb-20'>
          <Container>
            <EnhancedBlogContent post={post} />
          </Container>
        </section>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className='border-t border-gray-200 bg-gray-50 py-20 dark:border-gray-700 dark:bg-gray-900/50'>
          <Container>
            <div className='mx-auto max-w-6xl'>
              <RelatedPosts posts={relatedPosts} />
            </div>
          </Container>
        </section>
      )}

      {/* Navigation to other posts */}
      <section className='border-t border-gray-200 py-12 dark:border-gray-700'>
        <Container>
          <div className='mx-auto max-w-3xl'>
            <div className='flex justify-center'>
              <Link
                href='/blog'
                className='inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900'
              >
                <ArrowLeftIcon className='h-4 w-4' />
                View All Posts
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
