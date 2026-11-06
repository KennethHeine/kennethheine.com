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
 * Custom 404 page component - "Signal & Ledger" styling
 * Features:
 * - Oversized display-type error code on the blueprint grid
 * - Navigation options to main sections
 * - Proper SEO metadata
 */
export default function NotFound() {
  return (
    <main>
      <section className='relative overflow-hidden bg-blueprint texture-grain'>
        <div
          className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,var(--color-gray-50)_95%)] dark:bg-[radial-gradient(ellipse_at_50%_30%,transparent_30%,var(--color-gray-950)_95%)]'
          aria-hidden='true'
        />
        <Container>
          <div className='relative mx-auto max-w-2xl py-24 text-center sm:py-32'>
            <p className='label-mono'>Signal lost / error</p>

            {/* 404 Number */}
            <div className='mt-4 font-display text-6xl font-bold text-brand-500 dark:text-brand-400 sm:text-8xl'>
              404
            </div>

            {/* Error Message */}
            <h1 className='mt-6 font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-3xl'>
              Page Not Found
            </h1>

            <p className='mt-4 text-base leading-7 text-gray-600 dark:text-gray-300'>
              This page doesn&apos;t exist. Maybe it never did, maybe I moved
              it. Either way, the home page has everything that does.
            </p>

            {/* Navigation Options */}
            <div className='mt-10 flex justify-center'>
              <Link
                href='/'
                className='group inline-flex items-center justify-center gap-2 rounded-sm bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-500 dark:bg-brand-500 dark:text-gray-950 dark:hover:bg-brand-400 motion-reduce:transition-none'
              >
                <ArrowLeftIcon
                  className='h-4 w-4 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none'
                  aria-hidden='true'
                />
                Back to Home
              </Link>
            </div>

            {/* Additional Links */}
            <div className='mt-10 border-t border-gray-200 pt-6 dark:border-gray-800'>
              <p className='label-mono'>Or explore these sections</p>
              <div className='mt-4 flex flex-wrap justify-center gap-6'>
                <Link
                  href='/about'
                  className='link-underline text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300'
                >
                  About Me
                </Link>
                <Link
                  href='/contact'
                  className='link-underline text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300'
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
