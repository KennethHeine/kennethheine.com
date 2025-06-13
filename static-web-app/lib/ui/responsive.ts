/**
 * Check if the current device is mobile based on screen width
 * @param width - Screen width to check (default: window.innerWidth)
 * @returns True if mobile
 */
export function isMobile(width?: number): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR fallback
  }
  
  const screenWidth = width ?? window.innerWidth;
  return screenWidth < 768; // Tailwind's md breakpoint
}

/**
 * Check if the current device is tablet based on screen width
 * @param width - Screen width to check (default: window.innerWidth)
 * @returns True if tablet
 */
export function isTablet(width?: number): boolean {
  if (typeof window === 'undefined') {
    return false; // SSR fallback
  }
  
  const screenWidth = width ?? window.innerWidth;
  return screenWidth >= 768 && screenWidth < 1024; // Between md and lg
}

/**
 * Check if the current device is desktop based on screen width
 * @param width - Screen width to check (default: window.innerWidth)
 * @returns True if desktop
 */
export function isDesktop(width?: number): boolean {
  if (typeof window === 'undefined') {
    return true; // SSR fallback to desktop
  }
  
  const screenWidth = width ?? window.innerWidth;
  return screenWidth >= 1024; // Tailwind's lg breakpoint
}

/**
 * Get the current breakpoint name
 * @param width - Screen width to check (default: window.innerWidth)
 * @returns Breakpoint name ('mobile' | 'tablet' | 'desktop')
 */
export function getCurrentBreakpoint(width?: number): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') {
    return 'desktop'; // SSR fallback
  }
  
  const screenWidth = width ?? window.innerWidth;
  
  if (screenWidth < 768) return 'mobile';
  if (screenWidth < 1024) return 'tablet';
  return 'desktop';
}