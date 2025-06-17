// --- file: app/not-found.tsx ---
import { ArrowLeftIcon } from '@/components/icons/ArrowLeftIcon';
import Container from '@/components/layout/Container';
import { Metadata } from 'next';
import Link from 'next/link';

// SEO metadata for the 404 page
export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    "The page you are looking for could not be found. Return to Kenneth Heine's homepage or explore other sections.",
  openGraph: {
    title: '404 - Page Not Found | Kenneth Heine',
    description:
      "The page you are looking for could not be found. Return to Kenneth Heine's homepage or explore other sections.",
    type: 'website',
    url: 'https://kennethheine.com/404',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page Not Found | Kenneth Heine',
      },
    ],
  },
  twitter: null,
  alternates: {
    canonical: 'https://kennethheine.com/404',
  },
};

/**
 * Custom 404 page component
 * Features:
 * - Friendly error message
 * - Navigation options to main sections
 * - Consistent design with the rest of the site
 * - Proper SEO metadata
 */
export default function NotFound() {
  return (
    <main>
      <section className='py-20 sm:py-32'>
        <Container>
          <div className='mx-auto max-w-2xl text-center'>
            {/* 404 Number */}
            <div className='text-6xl font-bold text-brand-500 dark:text-brand-400 sm:text-8xl'>
              404
            </div>

            {/* Error Message */}
            <h1 className='mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl'>
              Page Not Found
            </h1>

            <p className='mt-4 text-base leading-7 text-gray-600 dark:text-gray-300'>
              Sorry, the page you&apos;re looking for doesn&apos;t exist or has
              been moved.
            </p>

            {/* Navigation Options */}
            <div className='mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center'>
              <Link
                href='/'
                className='inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:bg-brand-950 dark:hover:bg-brand-900 dark:focus:ring-offset-gray-900'
              >
                <ArrowLeftIcon className='h-4 w-4' />
                Back to Home
              </Link>

              <Link
                href='/blog'
                className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900'
              >
                Read Blog Posts
              </Link>
            </div>

            {/* Additional Links */}
            <div className='mt-8'>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                Or explore these sections:
              </p>
              <div className='mt-4 flex flex-wrap justify-center gap-4'>
                <Link
                  href='/about'
                  className='text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300'
                >
                  About Me
                </Link>
                <Link
                  href='/contact'
                  className='text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300'
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
