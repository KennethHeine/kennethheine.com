// --- file: app/contact/page.tsx ---
import { MailIcon } from '@/components/icons/MailIcon';
import Container from '@/components/layout/Container';
import { Metadata } from 'next';

// SEO metadata for the contact page
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Kenneth Heine about AI automation, DevOps consulting, Azure cloud architecture, or development workflow optimization.',
  openGraph: {
    title: 'Contact Kenneth Heine - AI, DevOps & Cloud Consulting',
    description:
      'Get in touch with Kenneth Heine about AI automation, DevOps consulting, Azure cloud architecture, or development workflow optimization.',
    type: 'website',
    url: 'https://kennethheine.com/contact',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Kenneth Heine - AI, DevOps & Cloud Consulting',
      },
    ],
  },
  twitter: null,
  alternates: {
    canonical: 'https://kennethheine.com/contact',
  },
};

/**
 * Contact page component - "Signal & Ledger" editorial layout
 * Features:
 * - No form, no client-side JS: a single oversized mailto signal
 * - "What to expect" as a numbered ledger
 * - Clean, accessible design
 */
export default function ContactPage() {
  return (
    <main>
      {/* Header Section */}
      <section className='relative overflow-hidden border-b border-gray-200 bg-blueprint texture-grain dark:border-gray-800'>
        <div
          className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,transparent_30%,var(--color-gray-50)_95%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,transparent_30%,var(--color-gray-950)_95%)]'
          aria-hidden='true'
        />
        <Container>
          <div className='relative mx-auto max-w-5xl py-20 sm:py-24'>
            <p className='reveal label-mono flex items-center gap-3'>
              <span
                className='inline-block h-px w-10 bg-brand-500'
                aria-hidden='true'
              />
              Transmission / 01
            </p>
            <h1 className='reveal reveal-delay-1 mt-3 font-display text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl'>
              Let&apos;s Connect<span className='text-brand-500'>.</span>
            </h1>
            <p className='reveal reveal-delay-2 mt-6 max-w-2xl text-lg leading-7 text-gray-600 dark:text-gray-300'>
              Interested in AI automation, DevOps consulting, Azure cloud
              architecture, or optimizing your development workflows? I&apos;d
              love to discuss how AI, automation, and scalable cloud solutions
              can help your team work smarter and deliver better software.
              Whether you want to explore GitHub Copilot integration, CI/CD
              automation, Azure architecture design, or just connect about the
              latest AI tools, let&apos;s chat!
            </p>

            {/* The one true CTA - an oversized mailto signal */}
            <div className='reveal reveal-delay-3 mt-14 border-t border-gray-200 pt-8 dark:border-gray-800'>
              <h2 className='label-mono'>Get in Touch</h2>
              <a
                href='mailto:kenneth@kscloud.io'
                className='group mt-3 inline-flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-2xl font-bold tracking-tight text-gray-900 transition-colors duration-200 hover:text-brand-600 sm:text-4xl lg:text-6xl dark:text-gray-50 dark:hover:text-brand-400 motion-reduce:transition-none'
              >
                <MailIcon
                  className='h-7 w-7 text-brand-500 sm:h-10 sm:w-10'
                  aria-hidden='true'
                />
                <span className='link-underline'>kenneth@kscloud.io</span>
              </a>
              <p className='label-mono mt-4'>
                Response time: usually within 24 hours
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What to Expect - numbered ledger */}
      <section className='py-20 sm:py-24'>
        <Container>
          <div className='mx-auto max-w-5xl'>
            <p className='label-mono'>Protocol / 02</p>
            <h2 className='mt-3 font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl'>
              What to Expect
            </h2>

            <div className='mt-12'>
              <div className='grid gap-4 border-t border-gray-200 py-8 sm:grid-cols-12 sm:gap-8 dark:border-gray-800'>
                <span
                  className='font-mono text-sm font-semibold text-brand-600 dark:text-brand-400 sm:col-span-1'
                  aria-hidden='true'
                >
                  01
                </span>
                <h3 className='font-display text-lg font-semibold text-gray-900 dark:text-gray-50 sm:col-span-4'>
                  Quick Response
                </h3>
                <p className='text-sm leading-6 text-gray-600 dark:text-gray-400 sm:col-span-7'>
                  I&apos;ll get back to you within 24 hours
                </p>
              </div>

              <div className='grid gap-4 border-t border-gray-200 py-8 sm:grid-cols-12 sm:gap-8 dark:border-gray-800'>
                <span
                  className='font-mono text-sm font-semibold text-brand-600 dark:text-brand-400 sm:col-span-1'
                  aria-hidden='true'
                >
                  02
                </span>
                <h3 className='font-display text-lg font-semibold text-gray-900 dark:text-gray-50 sm:col-span-4'>
                  Thoughtful Discussion
                </h3>
                <p className='text-sm leading-6 text-gray-600 dark:text-gray-400 sm:col-span-7'>
                  I&apos;ll take time to understand your needs
                </p>
              </div>

              <div className='grid gap-4 border-t border-b border-gray-200 py-8 sm:grid-cols-12 sm:gap-8 dark:border-gray-800'>
                <span
                  className='font-mono text-sm font-semibold text-brand-600 dark:text-brand-400 sm:col-span-1'
                  aria-hidden='true'
                >
                  03
                </span>
                <h3 className='font-display text-lg font-semibold text-gray-900 dark:text-gray-50 sm:col-span-4'>
                  Clear Next Steps
                </h3>
                <p className='text-sm leading-6 text-gray-600 dark:text-gray-400 sm:col-span-7'>
                  We&apos;ll define actionable next steps together
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
