// --- file: app/page.tsx ---
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import Container from '@/components/layout/Container';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateWebsiteStructuredData } from '@/lib/seo/structured-data';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// SEO metadata for the home page
export const metadata: Metadata = {
  title: 'Home',
  description:
    'Kenneth Heine helps project leaders make technical decisions so the plan holds. Technical advisor for Azure cloud and platform projects — Predictable Delivery™.',
  openGraph: {
    title: 'Kenneth Heine - Technical Advisor for Project Leaders',
    description:
      'Kenneth Heine helps project leaders make technical decisions so the plan holds. Technical advisor for Azure cloud and platform projects — Predictable Delivery™.',
    type: 'website',
    url: 'https://kennethheine.com',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kenneth Heine - Technical Advisor for Project Leaders',
      },
    ],
  },
  twitter: null,
  alternates: {
    canonical: 'https://kennethheine.com',
  },
};

/**
 * Home page component
 * Features:
 * - Hero section with profile photo and tagline
 * - Call-to-action buttons
 * - Brief introduction
 * - Links to other sections
 */
export default function HomePage() {
  const websiteData = generateWebsiteStructuredData('https://kennethheine.com');

  return (
    <main>
      <JsonLd data={websiteData} />
      {/* Hero Section - Modernized with gradient background */}
      <section
        className='relative overflow-hidden py-20 sm:py-32'
        aria-labelledby='hero-heading'
        role='banner'
      >
        {/* Animated gradient background */}
        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-brand-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(3,105,161,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.05),transparent_50%)]' />
        </div>

        <Container>
          <div className='mx-auto max-w-4xl text-center'>
            {/* Profile Photo with modern styling */}
            <div className='animate-scale-in mb-8'>
              <div
                className='relative mx-auto h-32 w-32 overflow-hidden rounded-full ring-4 ring-brand-500/30 shadow-xl transition-all duration-300 hover:ring-8 hover:ring-brand-500/40 hover:shadow-2xl dark:ring-brand-400/30 dark:hover:ring-brand-400/40'
                role='img'
                aria-label='Kenneth Heine profile photo'
              >
                <Image
                  src='/images/profile-photo.jpg'
                  alt='Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
                  fill
                  className='object-cover transition-transform duration-300 hover:scale-110'
                  priority
                  sizes='128px'
                />
              </div>
            </div>

            {/* Hero Headline with animation */}
            <h1
              id='hero-heading'
              className='animate-slide-up text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'
            >
              Hi, I&apos;m{' '}
              <span className='bg-gradient-to-r from-brand-500 via-brand-600 to-blue-600 bg-clip-text text-transparent'>
                Kenneth Heine
              </span>
            </h1>

            {/* Tagline with staggered animation */}
            <p
              className='mt-6 animate-slide-up text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl'
              style={{
                animationDelay: '0.1s',
                opacity: 0,
                animationFillMode: 'forwards',
              }}
              role='doc-subtitle'
            >
              I help project leaders make technical decisions so the plan holds.
              Technical advisor for Azure cloud and platform projects.
            </p>

            {/* CTA Buttons with modern styling */}
            <nav
              className='mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center'
              style={{
                animationDelay: '0.2s',
                opacity: 0,
                animationFillMode: 'forwards',
              }}
              aria-label='Primary call-to-action navigation'
            >
              <Link
                href='/about'
                className='group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:shadow-brand-500/30 dark:hover:shadow-brand-500/40 dark:focus:ring-offset-gray-900 animate-slide-up'
                aria-describedby='about-cta-description'
              >
                How It Works
                <ArrowRightIcon
                  className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  aria-hidden='true'
                />
              </Link>
              <span id='about-cta-description' className='sr-only'>
                Navigate to the about page to learn more about the Predictable
                Delivery program
              </span>
              <Link
                href='/contact'
                className='group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-brand-500/20 bg-white/80 px-8 py-4 text-base font-semibold text-gray-900 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-brand-500/40 hover:bg-white hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-gray-600/50 dark:bg-gray-800/80 dark:text-white dark:hover:border-gray-500/80 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900 animate-slide-up'
                aria-describedby='contact-cta-description'
              >
                Get In Touch
                <ArrowRightIcon
                  className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  aria-hidden='true'
                />
              </Link>
              <span id='contact-cta-description' className='sr-only'>
                Navigate to the contact page to get in touch and connect
              </span>
            </nav>
          </div>
        </Container>
      </section>

      {/* Featured Content with modern cards */}
      <section
        className='py-20 bg-gray-50 dark:bg-gray-900/50'
        aria-labelledby='featured-content-heading'
      >
        <Container>
          <div className='mx-auto max-w-4xl'>
            <h2
              id='featured-content-heading'
              className='text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl'
            >
              Predictable Delivery™
            </h2>
            <p className='mt-4 text-center text-base text-gray-600 dark:text-gray-400'>
              A 3-step process to make technical risk and dependencies visible
              and manageable — so the plan holds.
            </p>
            <div className='mt-12 grid gap-8 sm:grid-cols-3'>
              {/* Step 1: Clarity */}
              <article
                className='group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-gray-700/50 dark:bg-gray-800/50 backdrop-blur-sm'
                aria-labelledby='clarity-heading'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <div className='relative'>
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors duration-300 group-hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-400 dark:group-hover:bg-brand-900/50'>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                      />
                    </svg>
                  </div>
                  <h3
                    id='clarity-heading'
                    className='text-xl font-semibold text-gray-900 dark:text-white'
                  >
                    1. Clarity
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400'>
                    We map scope, dependencies, and top risks (Azure, vendor,
                    operations, security) and create a decision list.
                  </p>
                </div>
              </article>

              {/* Step 2: Control */}
              <article
                className='group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-gray-700/50 dark:bg-gray-800/50 backdrop-blur-sm'
                aria-labelledby='control-heading'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <div className='relative'>
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors duration-300 group-hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-400 dark:group-hover:bg-brand-900/50'>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
                      />
                    </svg>
                  </div>
                  <h3
                    id='control-heading'
                    className='text-xl font-semibold text-gray-900 dark:text-white'
                  >
                    2. Control
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400'>
                    We turn it into governance: acceptance criteria, vendor
                    questions, milestones, and a &ldquo;definition of
                    done&rdquo; for platform deliverables.
                  </p>
                </div>
              </article>

              {/* Step 3: Delivery */}
              <article
                className='group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-gray-700/50 dark:bg-gray-800/50 backdrop-blur-sm'
                aria-labelledby='delivery-heading'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-brand-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <div className='relative'>
                  <div className='mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition-colors duration-300 group-hover:bg-brand-200 dark:bg-brand-900/30 dark:text-brand-400 dark:group-hover:bg-brand-900/50'>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
                      />
                    </svg>
                  </div>
                  <h3
                    id='delivery-heading'
                    className='text-xl font-semibold text-gray-900 dark:text-white'
                  >
                    3. Delivery
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400'>
                    We ensure go-live readiness: release/rollback, operability,
                    ownership, and a clear readiness checklist.
                  </p>
                </div>
              </article>
            </div>

            {/* CTA to learn more */}
            <div className='mt-12 text-center'>
              <Link
                href='/contact'
                className='group inline-flex items-center gap-2 text-base font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300'
              >
                Start your Predictable Delivery™ program
                <ArrowRightIcon
                  className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  aria-hidden='true'
                />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
