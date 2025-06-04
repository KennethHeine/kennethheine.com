/**
 * @fileoverview Example React component with comprehensive documentation
 * @author Kenneth Sølberg
 */

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * A reusable card component for displaying content with optional actions
 * 
 * Features:
 * - Responsive design with multiple size variants
 * - Optional header and footer sections
 * - Customizable styling through className prop
 * - Built-in loading and error states
 * 
 * @component
 * @example
 * ```tsx
 * // Basic card
 * <Card title="My Card">
 *   <p>Card content goes here</p>
 * </Card>
 * 
 * // Card with action
 * <Card 
 *   title="Interactive Card" 
 *   onAction={() => console.log('Action clicked')}
 *   actionLabel="Click me"
 * >
 *   <p>This card has an action button</p>
 * </Card>
 * 
 * // Loading state
 * <Card title="Loading Card" loading>
 *   <p>This content is hidden while loading</p>
 * </Card>
 * ```
 * 
 * @param props - Component props
 * @returns JSX element representing the card
 */
export function Card({
  title,
  children,
  variant = 'default',
  size = 'md',
  loading = false,
  error = null,
  onAction,
  actionLabel = 'Action',
  className,
  ...rest
}: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  /**
   * Handles the expand/collapse toggle
   */
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  /**
   * Handles action button click
   * @param event - Click event
   */
  const handleAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onAction?.(event);
  };

  if (loading) {
    return (
      <div 
        className={cn(
          'animate-pulse rounded-lg border border-gray-200 p-4',
          'dark:border-gray-700',
          className
        )}
        {...rest}
      >
        <div className="h-4 bg-gray-200 rounded mb-2 dark:bg-gray-700"></div>
        <div className="h-20 bg-gray-200 rounded dark:bg-gray-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className={cn(
          'rounded-lg border border-red-200 p-4 bg-red-50',
          'dark:border-red-800 dark:bg-red-950',
          className
        )}
        {...rest}
      >
        <h3 className="text-red-800 font-medium dark:text-red-200">Error</h3>
        <p className="text-red-600 text-sm mt-1 dark:text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        // Base styles
        'rounded-lg border bg-white shadow-sm',
        'dark:bg-gray-900 dark:border-gray-700',
        
        // Variant styles
        {
          'border-gray-200': variant === 'default',
          'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950': variant === 'primary',
          'border-gray-300 shadow-md': variant === 'elevated',
        },
        
        // Size styles
        {
          'p-3': size === 'sm',
          'p-4': size === 'md', 
          'p-6': size === 'lg',
        },
        
        className
      )}
      {...rest}
    >
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          
          {onAction && (
            <button
              onClick={handleAction}
              className={cn(
                'px-3 py-1 text-sm font-medium rounded',
                'bg-blue-600 text-white hover:bg-blue-700',
                'dark:bg-blue-700 dark:hover:bg-blue-600',
                'transition-colors duration-200'
              )}
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn(
        'text-gray-700 dark:text-gray-300',
        { 'hidden': loading }
      )}>
        {children}
      </div>

      {/* Optional expand/collapse functionality */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Additional content can be shown here when expanded.
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Props for the Card component
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card title displayed in the header */
  title?: string;
  
  /** Card content */
  children: React.ReactNode;
  
  /** 
   * Visual style variant for the card
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'elevated';
  
  /** 
   * Size of the card affecting padding
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  
  /** 
   * Whether the card is in loading state
   * @default false
   */
  loading?: boolean;
  
  /** 
   * Error message to display instead of content
   * @default null
   */
  error?: string | null;
  
  /** 
   * Action button label
   * @default 'Action'
   */
  actionLabel?: string;
  
  /**
   * Optional action handler for the card
   * Called when the action button is clicked
   * 
   * @param event - The click event from the action button
   * 
   * @example
   * ```tsx
   * <Card onAction={(e) => {
   *   console.log('Card action triggered', e);
   *   // Handle the action
   * }}>
   *   Content
   * </Card>
   * ```
   */
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /** 
   * Additional CSS classes to apply to the card
   * @remarks Combined with internal classes using cn() utility
   */
  className?: string;
}

/**
 * Default props for the Card component
 * @internal
 */
Card.defaultProps = {
  variant: 'default',
  size: 'md',
  loading: false,
  error: null,
  actionLabel: 'Action',
} as Partial<CardProps>;

/**
 * Display name for React DevTools
 * @internal
 */
Card.displayName = 'Card';

export default Card;