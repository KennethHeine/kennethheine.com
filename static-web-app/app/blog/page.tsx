// --- file: app/blog/page.tsx ---
import Container from '@/components/layout/Container';
import { BlogListWithFilters } from '@/components/blog/BlogListWithFilters';
import { getAllPosts } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';
import { Metadata } from 'next';
import { ErrorBoundary, BlogErrorFallback } from '@/components/error';

// SEO metadata for the blog page
export const metadata: Metadata = {
  title: 'Blog',
  description:
    'AI automation, DevOps, and Azure cloud architecture insights. Practical tutorials on GitHub Copilot, CI/CD automation, and scalable cloud solutions.',
  openGraph: {
    title: 'Blog - AI, DevOps & Cloud Architecture Insights',
    description:
      'AI automation, DevOps, and Azure cloud architecture insights. Practical tutorials on GitHub Copilot, CI/CD automation, and scalable cloud solutions.',
    type: 'website',
    url: 'https://kennethheine.com/blog',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog - AI, DevOps & Cloud Architecture Insights',
      },
    ],
  },
  twitter: null,
};

/**
 * Blog index page component with filtering
 * Features:
 * - Lists all blog posts from /content/posts/
 * - Interactive filtering by category, tag, and search
 * - Server-side rendering with client-side interactivity
 * - Responsive layout
 * - SEO-optimized metadata
 */
export default function BlogPage() {
  // Get all blog posts at build time for SSG
  const posts: BlogPost[] = getAllPosts();

  return (
    <main>
      {/* Header Section */}
      <section className='py-20 sm:py-32'>
        <Container>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
              AI, DevOps & Cloud Architecture Insights
            </h1>
            <p className='mt-6 text-lg leading-7 text-gray-600 dark:text-gray-300'>
              Practical tutorials and guides on GitHub Copilot, CI/CD
              automation, Azure cloud architecture, GPT APIs, and smart
              integrations that save time and improve software quality.
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts with Filters */}
      <section className='pb-20'>
        <Container>
          <ErrorBoundary
            name='BlogList'
            fallback={BlogErrorFallback}
            showDetails={process.env.NODE_ENV === 'development'}
          >
            <BlogListWithFilters initialPosts={posts} />
          </ErrorBoundary>
        </Container>
      </section>
    </main>
  );
}
