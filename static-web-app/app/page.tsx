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
      {/* Hero Section */}
      <section
        className='relative py-20 sm:py-32'
        aria-labelledby='hero-heading'
        role='banner'
      >
        <Container>
          <div className='mx-auto max-w-4xl text-center'>
            {/* Profile Photo */}
            <div
              className='relative mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full ring-4 ring-brand-500/20 dark:ring-brand-400/20'
              role='img'
              aria-label='Kenneth Heine profile photo'
            >
              <Image
                src='/images/profile-photo.jpg'
                alt='Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
                fill
                className='object-cover'
                priority
                sizes='128px'
              />
            </div>
            {/* Hero Headline */}
            <h1
              id='hero-heading'
              className='text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl'
            >
              Hi, I&apos;m{' '}
              <span className='bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent'>
                Kenneth Heine
              </span>
            </h1>
            {/* Tagline */}
            <p
              className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl'
              role='doc-subtitle'
            >
              AI, Automation & Cloud Architecture for Developers: Learn how to
              save time, increase code quality, and build smarter with modern AI
              tools.
            </p>
            {/* CTA Buttons */}
            <nav
              className='mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center'
              aria-label='Primary call-to-action navigation'
            >
              <Link
                href='/about'
                className='inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:bg-brand-950 dark:hover:bg-brand-900 dark:focus:ring-offset-gray-900'
                aria-describedby='about-cta-description'
              >
                Learn More About Me
                <ArrowRightIcon className='h-4 w-4' aria-hidden='true' />
              </Link>
              <span id='about-cta-description' className='sr-only'>
                Navigate to the about page to learn more about Kenneth
                Heine&apos;s background and experience
              </span>
              <Link
                href='/blog'
                className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900'
                aria-describedby='blog-cta-description'
              >
                Read My Blog
                <ArrowRightIcon className='h-4 w-4' aria-hidden='true' />
              </Link>
              <span id='blog-cta-description' className='sr-only'>
                Navigate to the blog page to read articles about AI, automation,
                and cloud architecture
              </span>
            </nav>
          </div>
        </Container>
      </section>

      {/* Quick Introduction */}
      <section
        className='py-20 bg-gray-50 dark:bg-gray-900/50'
        aria-labelledby='introduction-heading'
      >
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <h2
              id='introduction-heading'
              className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl'
            >
              Work Smarter, Not Harder (For Real)
            </h2>
            <p className='mt-6 text-base leading-7 text-gray-600 dark:text-gray-300'>
              I help developers and DevOps teams understand and implement the
              latest AI and automation tools, while designing scalable cloud
              architectures on Azure. Together, we can free up time, reduce
              errors, and focus on the fun and creative parts of coding. With
              hands-on experience applying AI to real-world development
              pipelines and building robust cloud solutions, I break down
              complex concepts into practical, actionable strategies.
            </p>
            {/* Quick Stats */}
            <div
              className='mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3'
              role='group'
              aria-label='Professional experience metrics'
            >
              <div className='text-center'>
                <div
                  className='text-3xl font-bold text-brand-500 dark:text-brand-400'
                  aria-label='5 plus years of experience'
                >
                  5+
                </div>
                <div className='mt-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Years Cloud & DevOps
                </div>
              </div>
              <div className='text-center'>
                <div
                  className='text-3xl font-bold text-brand-500 dark:text-brand-400'
                  aria-label='Over 100,000 lines of code generated with AI'
                >
                  100K+
                </div>
                <div className='mt-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
                  Lines of AI-Generated Code
                </div>
              </div>
              <div className='text-center'>
                <div
                  className='text-3xl font-bold text-brand-500 dark:text-brand-400'
                  aria-label='Infinite learning mindset'
                >
                  ∞
                </div>
                <div className='mt-2 text-sm font-medium text-gray-600 dark:text-gray-400'>
                  AI Learning Mindset
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Content */}
      <section className='py-20' aria-labelledby='featured-content-heading'>
        <Container>
          <div className='mx-auto max-w-4xl'>
            <h2
              id='featured-content-heading'
              className='text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl'
            >
              What I&apos;m Up To
            </h2>
            <div className='mt-12 grid gap-8 sm:grid-cols-2'>
              {/* Latest Blog Post Preview */}
              <article
                className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800'
                aria-labelledby='blog-preview-heading'
              >
                <h3
                  id='blog-preview-heading'
                  className='text-lg font-semibold text-gray-900 dark:text-white'
                >
                  Latest AI, DevOps & Cloud Insights
                </h3>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                  Practical tutorials and guides on GitHub Copilot, CI/CD
                  automation, Azure cloud architecture, GPT APIs, and smart
                  integrations that save time and improve software quality.
                </p>
                <Link
                  href='/blog'
                  className='mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300'
                  aria-describedby='blog-link-description'
                >
                  View all posts
                  <ArrowRightIcon className='h-3 w-3' aria-hidden='true' />
                </Link>
                <span id='blog-link-description' className='sr-only'>
                  Navigate to the blog page to read all articles about AI,
                  DevOps, and cloud architecture
                </span>
              </article>

              {/* Contact Preview */}
              <article
                className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800'
                aria-labelledby='contact-preview-heading'
              >
                <h3
                  id='contact-preview-heading'
                  className='text-lg font-semibold text-gray-900 dark:text-white'
                >
                  Let&apos;s Connect
                </h3>
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                  Interested in working together or just want to say hello?
                  I&apos;d love to hear from you.
                </p>
                <Link
                  href='/contact'
                  className='mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300'
                  aria-describedby='contact-link-description'
                >
                  Get in touch
                  <ArrowRightIcon className='h-3 w-3' aria-hidden='true' />
                </Link>
                <span id='contact-link-description' className='sr-only'>
                  Navigate to the contact page to get in touch with Kenneth
                  Heine
                </span>
              </article>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
