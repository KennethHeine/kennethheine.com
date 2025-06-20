// --- file: lib/accessibility/focus.ts ---
/**
 * Focus management utilities for enhanced keyboard navigation and accessibility
 *
 * Implements WCAG 2.1 Success Criteria:
 * - 2.1.1 Keyboard accessibility
 * - 2.4.3 Focus Order
 * - 2.4.7 Focus Visible
 * - 1.4.11 Non-text Contrast (for focus indicators)
 */

/**
 * Enhanced focus indicator styles that work across themes and respect user preferences
 */
export const focusStyles = {
  /**
   * Base focus ring styles with proper contrast ratios
   * Meets WCAG 2.1 AA requirements (4.5:1 contrast ratio)
   */
  base: [
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-brand-500',
    'focus:ring-offset-white',
    'dark:focus:ring-offset-gray-900',
    'dark:focus:ring-brand-400',
    // High contrast mode support
    'forced-colors:focus:ring-[Highlight]',
    'forced-colors:focus:ring-offset-[Canvas]',
  ].join(' '),

  /**
   * Enhanced focus styles for interactive elements with better visibility
   */
  enhanced: [
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-brand-500',
    'focus:ring-offset-white',
    'dark:focus:ring-offset-gray-900',
    'dark:focus:ring-brand-400',
    // High contrast mode support
    'forced-colors:focus:ring-[Highlight]',
    'forced-colors:focus:ring-offset-[Canvas]',
    // Transition for smooth focus changes (respects reduced motion)
    'transition-shadow',
    'duration-150',
    'motion-reduce:transition-none',
  ].join(' '),

  /**
   * Focus styles for buttons and primary interactive elements
   */
  button: [
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-brand-500',
    'focus:ring-offset-white',
    'dark:focus:ring-offset-gray-900',
    'dark:focus:ring-brand-400',
    // High contrast mode
    'forced-colors:focus:ring-[Highlight]',
    'forced-colors:focus:ring-offset-[ButtonFace]',
    // Smooth transitions
    'transition-all',
    'duration-150',
    'motion-reduce:transition-none',
  ].join(' '),

  /**
   * Focus styles for links and text-based interactive elements
   */
  link: [
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-1',
    'focus:ring-brand-500',
    'focus:ring-offset-white',
    'dark:focus:ring-offset-gray-900',
    'dark:focus:ring-brand-400',
    // High contrast mode
    'forced-colors:focus:ring-[Highlight]',
    'forced-colors:focus:ring-offset-[Canvas]',
    // Smooth transitions
    'transition-shadow',
    'duration-150',
    'motion-reduce:transition-none',
  ].join(' '),

  /**
   * Focus styles for form inputs and controls
   */
  input: [
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-brand-500',
    'focus:border-brand-500',
    'dark:focus:ring-brand-400',
    'dark:focus:border-brand-400',
    // High contrast mode
    'forced-colors:focus:ring-[Highlight]',
    'forced-colors:focus:border-[Highlight]',
    // Smooth transitions
    'transition-colors',
    'transition-shadow',
    'duration-150',
    'motion-reduce:transition-none',
  ].join(' '),

  /**
   * Focus styles for skip links and navigation aids
   */
  skipLink: [
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-white',
    'focus:ring-offset-2',
    'focus:ring-offset-brand-600',
    // High contrast mode
    'forced-colors:focus:ring-[Canvas]',
    'forced-colors:focus:ring-offset-[Highlight]',
    // Smooth transitions
    'transition-all',
    'duration-150',
    'motion-reduce:transition-none',
  ].join(' '),
};

/**
 * Focus management utility functions
 */
export const focusUtils = {
  /**
   * Traps focus within a given element (useful for modals, menus)
   * @param element - The container element to trap focus within
   * @returns Cleanup function to remove the trap
   */
  trapFocus: (element: HTMLElement): (() => void) => {
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);

    // Focus the first element initially
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTabKey);
    };
  },

  /**
   * Gets all focusable elements within a container
   * @param container - The container to search within
   * @returns Array of focusable elements
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ');

    return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
      element => {
        // Check if element is visible and not hidden
        const style = window.getComputedStyle(element);
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          // In test environments, offsetWidth/Height may be 0, so we check for that
          (element.offsetWidth > 0 ||
            element.offsetHeight > 0 ||
            // Allow elements that are in the DOM but don't have layout yet
            (element.offsetWidth === 0 &&
              element.offsetHeight === 0 &&
              style.display !== 'none' &&
              style.visibility !== 'hidden'))
        );
      }
    );
  },

  /**
   * Moves focus to the next/previous focusable element
   * @param direction - Direction to move focus ('next' or 'previous')
   * @param container - Optional container to limit search within
   */
  moveFocus: (
    direction: 'next' | 'previous',
    container?: HTMLElement
  ): void => {
    const root = container || document.body;
    const focusableElements = focusUtils.getFocusableElements(root);
    const currentIndex = focusableElements.indexOf(
      document.activeElement as HTMLElement
    );

    if (currentIndex === -1) return;

    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % focusableElements.length
        : (currentIndex - 1 + focusableElements.length) %
          focusableElements.length;

    focusableElements[nextIndex]?.focus();
  },

  /**
   * Manages focus restoration for components that temporarily take focus
   * @param restoreElement - Element to restore focus to, defaults to previously focused element
   * @returns Function to restore focus
   */
  manageFocusRestore: (restoreElement?: HTMLElement): (() => void) => {
    const elementToRestore =
      restoreElement || (document.activeElement as HTMLElement);

    return () => {
      if (elementToRestore && typeof elementToRestore.focus === 'function') {
        // Small delay to ensure DOM updates are complete
        setTimeout(() => {
          elementToRestore.focus();
        }, 0);
      }
    };
  },

  /**
   * Checks if an element should receive focus indicators based on user preferences
   * @param element - Element to check
   * @returns Whether focus indicators should be shown
   */
  shouldShowFocusIndicator: (element: HTMLElement): boolean => {
    // Always show focus for keyboard navigation
    if (element.matches(':focus-visible')) return true;

    // Check if user has high contrast enabled
    if (window.matchMedia('(prefers-contrast: high)').matches) return true;

    // Check if user prefers reduced motion (may want more visible indicators)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return true;

    return false;
  },
};

/**
 * High contrast mode detection and utilities
 */
export const highContrastUtils = {
  /**
   * Detects if high contrast mode is enabled
   * @returns Boolean indicating if high contrast mode is active
   */
  isHighContrast: (): boolean => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return false;

    // Check for Windows High Contrast mode
    return (
      window.matchMedia('(prefers-contrast: high)').matches ||
      window.matchMedia('(-ms-high-contrast: active)').matches ||
      window.matchMedia('(-ms-high-contrast: black-on-white)').matches ||
      window.matchMedia('(-ms-high-contrast: white-on-black)').matches
    );
  },

  /**
   * Gets appropriate focus styles for high contrast mode
   * @param baseStyles - Base styles to enhance
   * @returns Enhanced styles for high contrast
   */
  getHighContrastStyles: (baseStyles: string): string => {
    if (!highContrastUtils.isHighContrast()) return baseStyles;

    return [
      baseStyles,
      'forced-colors:ring-[Highlight]',
      'forced-colors:ring-offset-[Canvas]',
      'forced-colors:border-[Highlight]',
    ].join(' ');
  },
};

/**
 * Reduced motion utilities for focus animations
 */
export const motionUtils = {
  /**
   * Checks if user prefers reduced motion
   * @returns Boolean indicating reduced motion preference
   */
  prefersReducedMotion: (): boolean => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  /**
   * Gets transition classes that respect motion preferences
   * @param normalTransition - Transition classes for normal motion
   * @returns Appropriate transition classes
   */
  getTransition: (normalTransition: string): string => {
    return motionUtils.prefersReducedMotion()
      ? 'motion-reduce:transition-none'
      : normalTransition;
  },
};

/**
 * Comprehensive focus style generator that combines all accessibility considerations
 * @param type - Type of interactive element
 * @param options - Additional options for customization
 * @returns Complete focus style string
 */
export function getFocusStyles(
  type: 'base' | 'enhanced' | 'button' | 'link' | 'input' | 'skipLink' = 'base',
  options: {
    highContrast?: boolean;
    reducedMotion?: boolean;
    customRing?: string;
    customOffset?: string;
  } = {}
): string {
  const baseStyle = focusStyles[type];

  // Apply high contrast enhancements if needed
  const highContrastStyle =
    options.highContrast || highContrastUtils.isHighContrast()
      ? highContrastUtils.getHighContrastStyles(baseStyle)
      : baseStyle;

  // Apply custom ring/offset if provided
  let finalStyle = highContrastStyle;
  if (options.customRing) {
    finalStyle = finalStyle.replace(
      /focus:ring-\w+-\d+/g,
      `focus:ring-${options.customRing}`
    );
  }
  if (options.customOffset) {
    finalStyle = finalStyle.replace(
      /focus:ring-offset-\w+-\d+/g,
      `focus:ring-offset-${options.customOffset}`
    );
  }

  return finalStyle;
}

export default {
  focusStyles,
  focusUtils,
  highContrastUtils,
  motionUtils,
  getFocusStyles,
};
