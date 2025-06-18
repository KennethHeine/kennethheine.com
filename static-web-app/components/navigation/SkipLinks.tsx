// --- file: components/navigation/SkipLinks.tsx ---
'use client';

import { cn } from '../../lib/utils';

/**
 * Skip links component for keyboard navigation accessibility
 * Provides keyboard users with quick navigation to main content areas
 *
 * WCAG 2.1 Guidelines:
 * - Success Criterion 2.4.1 (Bypass Blocks)
 * - Success Criterion 2.1.1 (Keyboard accessible)
 * - Success Criterion 2.4.3 (Focus Order)
 */
export function SkipLinks() {
  const skipLinks = [
    {
      href: '#main-content',
      label: 'Skip to main content',
    },
    {
      href: '#main-navigation',
      label: 'Skip to navigation',
    },
    {
      href: '#footer',
      label: 'Skip to footer',
    },
  ];

  return (
    <div className='sr-only focus-within:not-sr-only'>
      {skipLinks.map(link => (
        <a
          key={link.href}
          href={link.href}
          className={cn(
            // Hide by default, show on focus
            'absolute left-0 top-0 z-[100]',
            'bg-brand-600 text-white',
            'px-4 py-2 text-sm font-medium',
            'rounded-br-md',
            'transform -translate-y-full',
            'focus:translate-y-0',
            'transition-transform duration-150 ease-in-out',
            // Focus states
            'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-600',
            // Ensure high contrast
            'dark:bg-brand-500 dark:text-white',
            'hover:bg-brand-700 dark:hover:bg-brand-400',
            'focus:bg-brand-700 dark:focus:bg-brand-400'
          )}
          onClick={e => {
            e.preventDefault();
            const target = document.querySelector(link.href);
            if (target) {
              // Focus the target element
              (target as HTMLElement).focus();
              // Also scroll to ensure visibility
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
