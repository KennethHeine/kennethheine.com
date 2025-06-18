// --- file: components/MobileMenu.tsx ---
'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface NavigationItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  pathname: string;
  id?: string;
}

/**
 * Mobile menu component
 * Slide-out menu for mobile navigation with WCAG accessibility features
 */
export function MobileMenu({
  open,
  onClose,
  navigation,
  pathname,
  id = 'mobile-menu',
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  // Handle escape key and focus trapping
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = menuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKeyPress);

    // Focus the close button when menu opens
    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 md:hidden'
      role='dialog'
      aria-modal='true'
      aria-labelledby={`${id}-heading`}
    >
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/20 backdrop-blur-sm'
        onClick={onClose}
        aria-hidden='true'
      />

      {/* Menu panel */}
      <div
        ref={menuRef}
        id={id}
        className='fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl dark:bg-gray-900'
      >
        <div className='flex h-16 items-center justify-between px-4'>
          <span
            id={`${id}-heading`}
            className='text-lg font-semibold text-gray-900 dark:text-white'
          >
            Menu
          </span>
          <button
            ref={firstFocusableRef}
            type='button'
            onClick={onClose}
            className='min-w-11 min-h-11 p-2.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900'
            aria-label='Close navigation menu'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <nav
          className='px-4 py-6'
          role='navigation'
          aria-label='Main navigation'
        >
          <div className='space-y-1'>
            {navigation.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              const isLast = index === navigation.length - 1;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  ref={isLast ? lastFocusableRef : undefined}
                  className={`block rounded-md px-4 py-3 min-h-11 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
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
