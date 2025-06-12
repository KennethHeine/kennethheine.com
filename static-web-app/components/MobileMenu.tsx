// --- file: components/MobileMenu.tsx ---
'use client';

import Link from 'next/link';

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  pathname: string;
}

/**
 * Mobile menu component
 * Slide-out menu for mobile navigation
 */
export function MobileMenu({
  open,
  onClose,
  navigation,
  pathname,
}: MobileMenuProps) {
  if (!open) {
    return null;
  }

  return (
    <div className='fixed inset-0 z-50 md:hidden'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/20 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Menu panel */}
      <div className='fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl dark:bg-gray-900'>
        <div className='flex h-16 items-center justify-between px-4'>
          <span className='text-lg font-semibold text-gray-900 dark:text-white'>
            Menu
          </span>
          <button
            type='button'
            onClick={onClose}
            className='rounded-md p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'
            aria-label='Close menu'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <nav className='px-4 py-6'>
          <div className='space-y-1'>
            {navigation.map(item => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
