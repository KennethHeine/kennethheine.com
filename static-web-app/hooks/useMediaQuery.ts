/**
 * @fileoverview Media query hook for responsive design
 * @author Kenneth Heine
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseMediaQueryOptions {
  /** Default value when SSR or matchMedia is not available */
  defaultValue?: boolean;
  /** Whether to initialize on mount */
  initializeOnMount?: boolean;
}

/**
 * Media query hook for responsive design
 * 
 * Features:
 * - SSR safe initialization
 * - Automatic cleanup
 * - TypeScript support
 * - Performance optimized
 * 
 * @param query - CSS media query string
 * @param options - Configuration options
 * @returns Whether the media query matches
 * 
 * @example
 * ```typescript
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 * const isLandscape = useMediaQuery('(orientation: landscape)');
 * 
 * // With default value
 * const isDesktop = useMediaQuery('(min-width: 1024px)', { 
 *   defaultValue: false 
 * });
 * ```
 */
export function useMediaQuery(
  query: string,
  options: UseMediaQueryOptions = {}
): boolean {
  const { defaultValue = false, initializeOnMount = true } = options;

  const [matches, setMatches] = useState<boolean>(() => {
    if (!initializeOnMount || typeof window === 'undefined') {
      return defaultValue;
    }

    // Check if matchMedia is available
    if (typeof window.matchMedia !== 'function') {
      return defaultValue;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // Check if we're in the browser and matchMedia is available
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    
    // Set initial value if we didn't initialize on mount
    if (!initializeOnMount) {
      setMatches(mediaQuery.matches);
    }

    // Create event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query, initializeOnMount]);

  return matches;
}

/**
 * Predefined breakpoint hooks for common responsive design patterns
 */

/**
 * Hook for mobile breakpoint (max-width: 768px)
 */
export function useIsMobile(defaultValue = false): boolean {
  return useMediaQuery('(max-width: 768px)', { defaultValue });
}

/**
 * Hook for tablet breakpoint (768px - 1024px)
 */
export function useIsTablet(defaultValue = false): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1024px)', { defaultValue });
}

/**
 * Hook for desktop breakpoint (min-width: 1024px)
 */
export function useIsDesktop(defaultValue = false): boolean {
  return useMediaQuery('(min-width: 1024px)', { defaultValue });
}

/**
 * Hook for reduced motion preference
 */
export function usePrefersReducedMotion(defaultValue = false): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)', { defaultValue });
}

/**
 * Hook for dark mode preference
 */
export function usePrefersDarkMode(defaultValue = false): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)', { defaultValue });
}

/**
 * Hook for high contrast preference
 */
export function usePrefersHighContrast(defaultValue = false): boolean {
  return useMediaQuery('(prefers-contrast: high)', { defaultValue });
}

/**
 * Hook for device orientation
 */
export function useIsLandscape(defaultValue = false): boolean {
  return useMediaQuery('(orientation: landscape)', { defaultValue });
}

/**
 * Hook for touch device detection
 */
export function useIsTouchDevice(defaultValue = false): boolean {
  return useMediaQuery('(hover: none) and (pointer: coarse)', { defaultValue });
}

/**
 * Hook that returns current breakpoint as a string
 */
export function useBreakpoint(): 'mobile' | 'tablet' | 'desktop' | 'unknown' {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isDesktop) return 'desktop';
  return 'unknown';
}

/**
 * Hook that returns viewport dimensions
 */
export function useViewportSize(): { width: number; height: number } {
  const [size, setSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
