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
    'Kenneth Heine helps developers and DevOps teams work smarter with AI, automation, and Azure cloud architecture. Learn to code faster, deploy faster, and build scalable solutions.',
  openGraph: {
    title: 'Kenneth Heine - AI & Automation for Developers',
    description:
      'Kenneth Heine helps developers and DevOps teams work smarter with AI, automation, and Azure cloud architecture. Learn to code faster, deploy faster, and build scalable solutions.',
    type: 'website',
    url: 'https://kennethheine.com',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kenneth Heine - AI & Automation for Developers',
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
              AI, Automation & Cloud Architecture for Developers: Learn how to
              save time, increase code quality, and build smarter with modern AI
              tools.
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
                Learn More About Me
                <ArrowRightIcon
                  className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  aria-hidden='true'
                />
              </Link>
              <span id='about-cta-description' className='sr-only'>
                Navigate to the about page to learn more about Kenneth
                Heine&apos;s background and experience
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
              What I&apos;m Up To
            </h2>
            <div className='mt-12 grid gap-8 sm:grid-cols-2'>
              {/* Professional Services Preview */}
              <article
                className='group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-gray-700/50 dark:bg-gray-800/50 backdrop-blur-sm'
                aria-labelledby='services-preview-heading'
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
                        d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
                      />
                    </svg>
                  </div>
                  <h3
                    id='services-preview-heading'
                    className='text-xl font-semibold text-gray-900 dark:text-white'
                  >
                    Professional Services & Consulting
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400'>
                    AI implementation, cloud architecture design, DevOps
                    automation, and technical mentoring services. Let&apos;s
                    work together to modernize your development workflow and
                    leverage AI tools effectively.
                  </p>
                  <Link
                    href='/contact'
                    className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300'
                    aria-describedby='services-link-description'
                  >
                    Learn more
                    <ArrowRightIcon
                      className='h-4 w-4 transition-transform group-hover:translate-x-1'
                      aria-hidden='true'
                    />
                  </Link>
                  <span id='services-link-description' className='sr-only'>
                    Navigate to the contact page to learn about professional
                    services
                  </span>
                </div>
              </article>

              {/* Contact Preview */}
              <article
                className='group relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-gray-700/50 dark:bg-gray-800/50 backdrop-blur-sm'
                aria-labelledby='contact-preview-heading'
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
                        d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                      />
                    </svg>
                  </div>
                  <h3
                    id='contact-preview-heading'
                    className='text-xl font-semibold text-gray-900 dark:text-white'
                  >
                    Let&apos;s Connect
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400'>
                    Interested in working together or just want to say hello?
                    I&apos;d love to hear from you.
                  </p>
                  <Link
                    href='/contact'
                    className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300'
                    aria-describedby='contact-link-description'
                  >
                    Get in touch
                    <ArrowRightIcon
                      className='h-4 w-4 transition-transform group-hover:translate-x-1'
                      aria-hidden='true'
                    />
                  </Link>
                  <span id='contact-link-description' className='sr-only'>
                    Navigate to the contact page to get in touch with Kenneth
                    Heine
                  </span>
                </div>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
