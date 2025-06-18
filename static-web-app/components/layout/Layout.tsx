// --- file: components/Layout.tsx ---
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MobileMenu } from '../navigation/MobileMenu';
import { SkipLinks } from '../navigation/SkipLinks';
import { ThemeToggle } from '../ui/ThemeToggle';
import Container from './Container';

/**
 * Main layout component that wraps all pages
 * Features:
 * - Responsive header with navigation
 * - Active route highlighting
 * - Mobile menu
 * - Dark mode toggle
 * - Footer with social links
 */
export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation items
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <div className='min-h-screen bg-white dark:bg-gray-900'>
      {/* Skip Links for keyboard navigation */}
      <SkipLinks />

      {/* Header */}
      <header className='sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80'>
        <Container>
          <div className='flex h-16 items-center justify-between'>
            {/* Logo */}
            <Link
              href='/'
              className='text-xl font-bold text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900'
            >
              Kenneth Heine
            </Link>

            {/* Desktop Navigation */}
            <nav
              id='main-navigation'
              className='hidden md:flex md:items-center md:space-x-8'
              role='navigation'
              aria-label='Main navigation'
              tabIndex={-1}
            >
              {navigation.map(item => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                      isActive
                        ? 'text-brand-600 dark:text-brand-400'
                        : 'text-gray-700 hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right side controls */}
            <div className='flex items-center space-x-4'>
              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                type='button'
                className='md:hidden min-w-11 min-h-11 p-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900'
                onClick={() => setMobileMenuOpen(true)}
                aria-label='Open main navigation menu'
                aria-expanded={mobileMenuOpen}
                aria-controls='mobile-menu'
              >
                <svg
                  className='h-6 w-6 text-gray-700 dark:text-gray-300'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>
      {/* Mobile Menu */}
      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigation={navigation}
        pathname={pathname}
        id='mobile-menu'
      />
      {/* Main Content */}
      <main id='main-content' className='flex-1' tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer
        id='footer'
        className='border-t border-gray-200 bg-white py-12 dark:border-gray-800 dark:bg-gray-950'
        tabIndex={-1}
      >
        <Container>
          <div className='md:flex md:items-center md:justify-between'>
            <div className='text-center md:text-left'>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                &copy; {new Date().getFullYear()} Kenneth Heine. All rights
                reserved.
              </p>
            </div>{' '}
            <div className='mt-4 flex justify-center space-x-6 md:mt-0'>
              <a
                href='https://github.com/kennethheine'
                className='text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub profile'
              >
                <span className='sr-only'>GitHub</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
              <a
                href='https://www.linkedin.com/in/kenneth-heine-5a588360/'
                className='text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-950'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn profile'
              >
                <span className='sr-only'>LinkedIn</span>
                <svg
                  className='h-6 w-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
