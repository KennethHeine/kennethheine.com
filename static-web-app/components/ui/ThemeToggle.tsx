// --- file: components/ThemeToggle.tsx ---
'use client';

import { useTheme } from '../providers/ThemeProvider';
import { useFocusStyles } from '../../hooks/useFocusManagement';
import { cn } from '../../lib/utils';
import type { BaseComponentProps, ComponentSize } from '../../types/ui';

/**
 * Theme toggle component props interface
 *
 * Follows consistent prop patterns:
 * - Extends BaseComponentProps for standard props (className, children, style, testId)
 * - Uses centralized ComponentSize type
 * - Event handlers follow onAction naming pattern
 * - Supports forwardRef pattern for DOM access
 */
export interface ThemeToggleProps extends BaseComponentProps {
  /** Size of the toggle button */
  size?: ComponentSize;
  /** Whether to show text label alongside icon */
  showLabel?: boolean;
  /** Custom click handler - follows onAction naming pattern */
  onClick?: () => void;
}

/**
 * Theme toggle button component
 * Cycles between light, dark, and system themes
 * Enhanced with improved focus management for Task #118
 */
export function ThemeToggle({
  size = 'md',
  showLabel = false,
  className,
  onClick,
  ...props
}: ThemeToggleProps = {}) {
  const { theme, setTheme } = useTheme();

  // Enhanced focus styles for better accessibility
  const focusStyles = useFocusStyles('button');

  const handleToggle = () => {
    if (onClick) {
      onClick();
    }

    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  // Size mapping for icons and padding
  const sizeClasses: Record<ComponentSize, { icon: string; padding: string }> =
    {
      xs: { icon: 'h-3 w-3', padding: 'p-1' },
      sm: { icon: 'h-4 w-4', padding: 'p-1.5' },
      md: { icon: 'h-5 w-5', padding: 'p-2' },
      lg: { icon: 'h-6 w-6', padding: 'p-2.5' },
      xl: { icon: 'h-7 w-7', padding: 'p-3' },
    };

  const { icon: iconSize, padding } = sizeClasses[size];

  const getIcon = () => {
    const baseIconProps = {
      className: iconSize,
      fill: 'none',
      viewBox: '0 0 24 24',
      strokeWidth: 1.5,
      stroke: 'currentColor',
    };

    switch (theme) {
      case 'light':
        return (
          <svg {...baseIconProps}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
            />
          </svg>
        );
      case 'dark':
        return (
          <svg {...baseIconProps}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z'
            />
          </svg>
        );
      case 'system':
        return (
          <svg {...baseIconProps}>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25'
            />
          </svg>
        );
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system mode';
      case 'system':
        return 'Switch to light mode';
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={cn(
        'rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white theme-transition',
        focusStyles,
        padding,
        className
      )}
      aria-label={getLabel()}
      title={getLabel()}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
      {...props}
    >
      <div className={cn('flex items-center gap-2')}>
        {getIcon()}
        {showLabel && (
          <span className='text-sm font-medium'>
            {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'}
          </span>
        )}
      </div>
    </button>
  );
}
