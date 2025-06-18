// --- file: components/layout/ReadingContainer.tsx ---
'use client';

import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ReadingContainerProps {
  children: ReactNode;
  className?: string;
  /** Enable mobile-optimized reading width */
  mobileOptimized?: boolean;
}

/**
 * ReadingContainer component for optimal reading experience
 *
 * Optimizes line length and typography for mobile devices:
 * - Maximum 65 characters per line for optimal readability
 * - Mobile-specific width adjustments
 * - Enhanced spacing and typography
 *
 * @example
 * ```tsx
 * <ReadingContainer mobileOptimized>
 *   <Typography variant="body1">
 *     Long-form content that benefits from optimized line length...
 *   </Typography>
 * </ReadingContainer>
 * ```
 */
export default function ReadingContainer({
  children,
  className = '',
  mobileOptimized = true,
}: ReadingContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto',
        // Base reading width for optimal readability
        'max-w-3xl',
        // Mobile optimizations when enabled
        mobileOptimized && [
          'reading-width', // Custom utility for optimal character count
          'px-4 sm:px-6', // Mobile-specific padding
        ],
        className
      )}
    >
      {children}
    </div>
  );
}
