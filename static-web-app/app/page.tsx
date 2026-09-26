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
    'Kenneth Heine is a DevOps engineer and cloud architect in Copenhagen. He helps development teams use AI, automation, and Azure to ship software with less manual work.',
  openGraph: {
    title: 'Kenneth Heine - AI & Automation for Developers',
    description:
      'Kenneth Heine is a DevOps engineer and cloud architect in Copenhagen. He helps development teams use AI, automation, and Azure to ship software with less manual work.',
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
 * Home page component - "Signal & Ledger" editorial hero
 * Features:
 * - Asymmetric hero on a hairline blueprint grid with oversized display type
 * - Profile photo set as a technical figure (crop marks + caption)
 * - Coordinates ledger row (location / focus / status)
 * - Numbered ledger entries instead of cards for current work
 */
export default function HomePage() {
  const websiteData = generateWebsiteStructuredData('https://kennethheine.com');

  return (
    <main>
      <JsonLd data={websiteData} />
      {/* Hero Section - blueprint grid, editorial composition */}
      <section
        className='relative overflow-hidden border-b border-gray-200 bg-blueprint texture-grain dark:border-gray-800'
        aria-labelledby='hero-heading'
        role='banner'
      >
        {/* Radial fade so the grid recedes towards the edges */}
        <div
          className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,transparent_30%,var(--color-gray-50)_95%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,transparent_30%,var(--color-gray-950)_95%)]'
          aria-hidden='true'
        />

        <Container>
          <div className='relative py-20 sm:py-24 lg:py-28'>
            {/* Technical crosshair marks */}
            <span
              className='pointer-events-none absolute right-0 top-8 hidden font-mono text-lg text-brand-500/60 lg:block'
              aria-hidden='true'
            >
              +
            </span>
            <span
              className='pointer-events-none absolute bottom-8 left-1/2 hidden font-mono text-lg text-brand-500/60 lg:block'
              aria-hidden='true'
            >
              +
            </span>
            {/* Monospace kicker */}
            <p className='reveal label-mono flex items-center gap-3'>
              <span
                className='inline-block h-px w-10 bg-brand-500'
                aria-hidden='true'
              />
              Kenneth Heine
              <span aria-hidden='true'>/</span>
              AI, automation &amp; cloud architecture
            </p>

            <div className='mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10'>
              {/* Headline column */}
              <div className='lg:col-span-8'>
                <h1
                  id='hero-heading'
                  className='reveal reveal-delay-1 font-display text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl lg:text-7xl xl:text-[5.5rem] xl:leading-[1.02]'
                >
                  The cloud should run itself
                  <span className='text-brand-500'>.</span>
                </h1>

                <p
                  className='reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300'
                  role='doc-subtitle'
                >
                  Hi, I&apos;m Kenneth. I&apos;m a DevOps engineer in
                  Copenhagen, and I help teams put AI and automation to work on
                  Azure, so deployments happen on their own and nobody has to
                  babysit a pipeline.
                </p>

                {/* CTA Buttons */}
                <nav
                  className='reveal reveal-delay-3 mt-10 flex flex-col gap-4 sm:flex-row'
                  aria-label='Primary call-to-action navigation'
                >
                  <Link
                    href='/about'
                    className='group inline-flex items-center justify-center gap-3 rounded-sm bg-brand-600 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-brand-500 motion-reduce:transition-none dark:bg-brand-500 dark:hover:bg-brand-400 dark:text-gray-950'
                    aria-describedby='about-cta-description'
                  >
                    More about me
                    <ArrowRightIcon
                      className='h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none'
                      aria-hidden='true'
                    />
                  </Link>
                  <span id='about-cta-description' className='sr-only'>
                    Navigate to the about page to learn more about Kenneth
                    Heine&apos;s background and experience
                  </span>
                  <Link
                    href='/contact'
                    className='group inline-flex items-center justify-center gap-3 rounded-sm border border-gray-300 px-7 py-3.5 text-base font-semibold text-gray-900 transition-colors duration-200 hover:border-brand-500 hover:text-brand-600 motion-reduce:transition-none dark:border-gray-700 dark:text-gray-100 dark:hover:border-brand-400 dark:hover:text-brand-400'
                    aria-describedby='contact-cta-description'
                  >
                    Get in touch
                    <ArrowRightIcon
                      className='h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none'
                      aria-hidden='true'
                    />
                  </Link>
                  <span id='contact-cta-description' className='sr-only'>
                    Navigate to the contact page to get in touch and connect
                  </span>
                </nav>
              </div>

              {/* Figure column - the human in the loop */}
              <figure className='reveal reveal-delay-4 lg:col-span-4 lg:justify-self-end'>
                <div
                  className='frame-ticks relative aspect-square w-52 sm:w-60 lg:w-64 xl:w-72 overflow-hidden'
                  role='img'
                  aria-label='Kenneth Heine profile photo'
                >
                  <Image
                    src='/images/profile-photo.jpg'
                    alt='Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
                    fill
                    className='object-cover grayscale transition-all duration-500 hover:grayscale-0 motion-reduce:transition-none'
                    priority
                    sizes='(min-width: 1280px) 288px, (min-width: 1024px) 256px, 240px'
                  />
                </div>
                <figcaption className='label-mono mt-4'>
                  Fig. 01 / the human in the loop
                </figcaption>
              </figure>
            </div>

            {/* Coordinates ledger row */}
            <dl className='reveal reveal-delay-5 mt-16 grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 sm:grid-cols-3 dark:border-gray-800'>
              <div>
                <dt className='label-mono'>Location</dt>
                <dd className='mt-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
                  Copenhagen, Denmark
                </dd>
              </div>
              <div>
                <dt className='label-mono'>Focus</dt>
                <dd className='mt-1 text-sm font-medium text-gray-900 dark:text-gray-100'>
                  AI &times; DevOps &times; Azure
                </dd>
              </div>
              <div>
                <dt className='label-mono'>Status</dt>
                <dd className='mt-1 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100'>
                  <span
                    className='h-2 w-2 rounded-full bg-brand-500 animate-pulse-slow'
                    aria-hidden='true'
                  />
                  Open for consulting
                </dd>
              </div>
            </dl>
          </div>
        </Container>
      </section>

      {/* Featured Content - numbered ledger entries */}
      <section
        className='py-20 sm:py-24'
        aria-labelledby='featured-content-heading'
      >
        <Container>
          <div className='mx-auto max-w-5xl'>
            <p className='label-mono'>Index / 01</p>
            <h2
              id='featured-content-heading'
              className='mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl'
            >
              What I&apos;m up to
            </h2>

            <div className='mt-12'>
              {/* Professional Services entry */}
              <article
                className='group grid gap-4 border-t border-gray-200 py-10 transition-colors duration-200 hover:bg-gray-100/60 sm:grid-cols-12 sm:gap-8 dark:border-gray-800 dark:hover:bg-gray-900/60 motion-reduce:transition-none'
                aria-labelledby='services-preview-heading'
              >
                <span
                  className='font-mono text-sm font-semibold text-brand-600 dark:text-brand-400 sm:col-span-1'
                  aria-hidden='true'
                >
                  01
                </span>
                <div className='sm:col-span-4'>
                  <h3
                    id='services-preview-heading'
                    className='font-display text-xl font-semibold text-gray-900 dark:text-gray-50'
                  >
                    Professional Services &amp; Consulting
                  </h3>
                </div>
                <div className='sm:col-span-7'>
                  <p className='text-sm leading-6 text-gray-600 dark:text-gray-400'>
                    Consulting on Azure architecture, CI/CD automation, and
                    getting real value out of AI coding tools. I also mentor
                    teams that want to build that muscle in-house instead of
                    renting it.
                  </p>
                  <Link
                    href='/contact'
                    className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300'
                    aria-describedby='services-link-description'
                  >
                    <span className='link-underline'>Learn more</span>
                    <ArrowRightIcon
                      className='h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none'
                      aria-hidden='true'
                    />
                  </Link>
                  <span id='services-link-description' className='sr-only'>
                    Navigate to the contact page to learn about professional
                    services
                  </span>
                </div>
              </article>

              {/* Contact entry */}
              <article
                className='group grid gap-4 border-t border-b border-gray-200 py-10 transition-colors duration-200 hover:bg-gray-100/60 sm:grid-cols-12 sm:gap-8 dark:border-gray-800 dark:hover:bg-gray-900/60 motion-reduce:transition-none'
                aria-labelledby='contact-preview-heading'
              >
                <span
                  className='font-mono text-sm font-semibold text-brand-600 dark:text-brand-400 sm:col-span-1'
                  aria-hidden='true'
                >
                  02
                </span>
                <div className='sm:col-span-4'>
                  <h3
                    id='contact-preview-heading'
                    className='font-display text-xl font-semibold text-gray-900 dark:text-gray-50'
                  >
                    Let&apos;s Connect
                  </h3>
                </div>
                <div className='sm:col-span-7'>
                  <p className='text-sm leading-6 text-gray-600 dark:text-gray-400'>
                    Working on something where this could help, or just want to
                    say hej? Write me, I read everything myself.
                  </p>
                  <Link
                    href='/contact'
                    className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300'
                    aria-describedby='contact-link-description'
                  >
                    <span className='link-underline'>Get in touch</span>
                    <ArrowRightIcon
                      className='h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none'
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
