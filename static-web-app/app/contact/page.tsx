// --- file: app/contact/page.tsx ---
import { MailIcon } from '@/components/icons/MailIcon';
import Container from '@/components/layout/Container';
import { Metadata } from 'next';

// SEO metadata for the contact page
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Kenneth Heine about AI automation, DevOps consulting, Azure cloud architecture, or development workflow optimization.',
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
      {/* Header Section */}
      <section className='py-20 sm:py-32'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <div className='mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/20'>
              <MailIcon className='h-8 w-8 text-brand-600 dark:text-brand-400' />
            </div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
              Let&apos;s Connect
            </h1>{' '}
            <p className='mt-6 text-lg leading-7 text-gray-600 dark:text-gray-300'>
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

      {/* Contact Information */}
      <section className='pb-20'>
        <Container>
          <div className='mx-auto max-w-2xl'>
            <div className='rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Get in Touch
              </h2>{' '}
              <p className='mt-4 text-gray-600 dark:text-gray-300'>
                Ready to explore AI automation and cloud architecture for your
                development workflow? I offer consulting on GitHub Copilot
                implementation, CI/CD automation, Azure cloud architecture
                design, and smart development integrations. Let&apos;s discuss
                how to make your team more productive and build scalable
                solutions.
              </p>
              <div className='mt-8'>
                {' '}
                <a
                  href='mailto:kenneth@kscloud.io'
                  className='inline-flex items-center gap-3 rounded-lg bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-brand-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:bg-brand-950 dark:hover:bg-brand-900 dark:focus:ring-offset-gray-800'
                >
                  <MailIcon className='h-5 w-5' />
                  kenneth@kscloud.io
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Additional Information */}
      <section className='py-20 bg-gray-50 dark:bg-gray-900/50'>
        <Container>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              What to Expect
            </h2>

            <div className='mt-12 grid gap-8 sm:grid-cols-3'>
              <div className='text-center'>
                <div className='mx-auto h-12 w-12 rounded-full bg-brand-100 p-3 dark:bg-brand-900/20'>
                  <svg
                    className='h-6 w-6 text-brand-600 dark:text-brand-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </div>{' '}
                <h3 className='mt-4 text-base font-semibold text-gray-900 dark:text-white'>
                  Quick Response
                </h3>{' '}
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                  I&apos;ll get back to you within 24 hours
                </p>
              </div>

              <div className='text-center'>
                <div className='mx-auto h-12 w-12 rounded-full bg-brand-100 p-3 dark:bg-brand-900/20'>
                  <svg
                    className='h-6 w-6 text-brand-600 dark:text-brand-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
                    />
                  </svg>
                </div>
                <h3 className='mt-4 text-base font-semibold text-gray-900 dark:text-white'>
                  Thoughtful Discussion
                </h3>{' '}
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                  I&apos;ll take time to understand your needs
                </p>
              </div>

              <div className='text-center'>
                <div className='mx-auto h-12 w-12 rounded-full bg-brand-100 p-3 dark:bg-brand-900/20'>
                  <svg
                    className='h-6 w-6 text-brand-600 dark:text-brand-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </div>
                <h3 className='mt-4 text-base font-semibold text-gray-900 dark:text-white'>
                  Clear Next Steps
                </h3>{' '}
                <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
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
