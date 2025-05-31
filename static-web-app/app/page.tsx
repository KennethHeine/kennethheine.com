// --- file: app/page.tsx ---
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon'
import Container from '@/components/Container'

// SEO metadata for the home page
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Kenneth Heine\'s personal website. Full-stack developer passionate about creating exceptional digital experiences.',
}

/**
 * Home page component
 * Features:
 * - Hero section with profile photo and tagline
 * - Call-to-action buttons
 * - Brief introduction
 * - Links to other sections
 */
export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            {/* Profile Photo */}
            <div className="relative mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full ring-4 ring-brand-500/20 dark:ring-brand-400/20">
              <Image
                src="/profile-photo.jpg"
                alt="Kenneth Heine - Profile Photo"
                fill
                className="object-cover"
                priority
                sizes="128px"
              />
            </div>
            
            {/* Hero Headline */}            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-r from-brand-500 to-brand-600 bg-clip-text text-transparent">
                Kenneth Heine
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-xl">
              Full-stack developer passionate about creating exceptional digital experiences 
              with modern web technologies and clean, maintainable code.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-brand-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Learn More About Me
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
              >
                Read My Blog
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Quick Introduction */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Building the Web, One Line at a Time
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
              With years of experience in full-stack development, I specialize in creating 
              scalable web applications using TypeScript, React, Next.js, and modern cloud 
              technologies. I believe in writing clean, maintainable code and delivering 
              exceptional user experiences.
            </p>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">5+</div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">50+</div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-500 dark:text-brand-400">∞</div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Learning Mindset
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Featured Content */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-4xl">            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              What I&apos;m Up To
            </h2>
            
            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {/* Latest Blog Post Preview */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Latest from the Blog
                </h3>                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Sharing insights about web development, best practices, and the latest 
                  technologies I&apos;m exploring.
                </p>
                <Link
                  href="/blog"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  View all posts
                  <ArrowRightIcon className="h-3 w-3" />
                </Link>
              </div>
              
              {/* Contact Preview */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Let&apos;s Connect
                </h3><p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Interested in working together or just want to say hello? I&apos;d love to 
                  hear from you.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  Get in touch
                  <ArrowRightIcon className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
