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
 * Contact page component
 * Features:
 * - Simple placeholder page as requested
 * - No form elements, no client-side validation, no JS required
 * - Just static content with mailto link
 * - Clean, accessible design
 */
export default function ContactPage() {
  return (
    <main>
      {/* Header Section with modern design */}
      <section className='relative overflow-hidden py-20 sm:py-32'>
        {/* Gradient background */}
        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-brand-50/50 via-blue-50/30 to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(3,105,161,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.03),transparent_50%)]' />
        </div>

        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 shadow-xl shadow-brand-500/30 transition-transform duration-300 hover:scale-105 dark:from-brand-400 dark:to-brand-500 dark:shadow-brand-400/20 animate-scale-in'>
              <MailIcon className='h-10 w-10 text-white' />
            </div>
            <h1 className='animate-slide-up text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
              Let&apos;s Connect
            </h1>{' '}
            <p
              className='mt-6 animate-slide-up text-lg leading-7 text-gray-600 dark:text-gray-300'
              style={{
                animationDelay: '0.1s',
                opacity: 0,
                animationFillMode: 'forwards',
              }}
            >
              Interested in AI automation, DevOps consulting, Azure cloud
              architecture, or optimizing your development workflows? I&apos;d
              love to discuss how AI, automation, and scalable cloud solutions
              can help your team work smarter and deliver better software.
              Whether you want to explore GitHub Copilot integration, CI/CD
              automation, Azure architecture design, or just connect about the
              latest AI tools, let&apos;s chat!
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information & Scheduling with modern card */}
      <section className='pb-20'>
        <Container>
          <div className='mx-auto max-w-4xl'>
            <div className='overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/50 backdrop-blur-sm'>
              {/* Email Contact */}
              <div className='p-8 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50'>
                <div className='flex items-start gap-4'>
                  <div className='flex-shrink-0'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30'>
                      <MailIcon className='h-6 w-6 text-brand-600 dark:text-brand-400' />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                      Get in Touch
                    </h2>
                    <p className='text-gray-600 dark:text-gray-400 mb-4'>
                      Ready to explore AI automation, Azure cloud architecture,
                      or development workflow optimization? Feel free to send me
                      an email and let&apos;s discuss how to make your team more
                      productive and build scalable solutions.
                    </p>
                    <a
                      href='mailto:kenneth@kscloud.io'
                      className='inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-brand-500/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:shadow-brand-500/30 dark:hover:shadow-brand-500/40 dark:focus:ring-offset-gray-800'
                    >
                      <MailIcon className='h-5 w-5' />
                      kenneth@kscloud.io
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Additional Information with modern icon cards */}
      <section className='py-20 bg-gray-50 dark:bg-gray-900/50'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              What to Expect
            </h2>

            <div className='mt-12 grid gap-8 sm:grid-cols-3'>
              <div className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800/50 dark:ring-gray-700/50 backdrop-blur-sm'>
                <div className='absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <div className='relative'>
                  <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 p-3 transition-transform duration-300 group-hover:scale-110 dark:from-brand-900/30 dark:to-brand-800/30'>
                    <svg
                      className='h-7 w-7 text-brand-600 dark:text-brand-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  </div>{' '}
                  <h3 className='mt-4 text-base font-bold text-gray-900 dark:text-white'>
                    Quick Response
                  </h3>{' '}
                  <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                    I&apos;ll get back to you within 24 hours
                  </p>
                </div>
              </div>

              <div className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800/50 dark:ring-gray-700/50 backdrop-blur-sm'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <div className='relative'>
                  <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 p-3 transition-transform duration-300 group-hover:scale-110 dark:from-brand-900/30 dark:to-brand-800/30'>
                    <svg
                      className='h-7 w-7 text-brand-600 dark:text-brand-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
                      />
                    </svg>
                  </div>
                  <h3 className='mt-4 text-base font-bold text-gray-900 dark:text-white'>
                    Thoughtful Discussion
                  </h3>{' '}
                  <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                    I&apos;ll take time to understand your needs
                  </p>
                </div>
              </div>

              <div className='group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800/50 dark:ring-gray-700/50 backdrop-blur-sm'>
                <div className='absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                <div className='relative'>
                  <div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 p-3 transition-transform duration-300 group-hover:scale-110 dark:from-brand-900/30 dark:to-brand-800/30'>
                    <svg
                      className='h-7 w-7 text-brand-600 dark:text-brand-400'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>
                  </div>
                  <h3 className='mt-4 text-base font-bold text-gray-900 dark:text-white'>
                    Clear Next Steps
                  </h3>{' '}
                  <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                    We&apos;ll define actionable next steps together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
