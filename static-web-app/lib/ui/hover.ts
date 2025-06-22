// --- file: lib/ui/hover.ts ---
/**
 * Hover state utilities for consistent interactive feedback
 * Task #122: Create basic interactive hover states (simplified)
 *
 * Features:
 * - Consistent hover states for all interactive elements
 * - Touch device friendly (no persistent hover)
 * - Performance optimized (CSS-only animations)
 * - Theme-aware (light/dark mode support)
 * - Accessibility compliant
 */

import { cn } from '../utils';

/**
 * Hover effect types for different interaction patterns
 */
export type HoverEffect =
  | 'subtle' // Light background change
  | 'medium' // Background + slight transform
  | 'strong' // Background + transform + shadow
  | 'brand' // Brand color changes
  | 'lift' // Transform with shadow (cards, images)
  | 'glow' // Brand glow effect
  | 'fade' // Opacity changes
  | 'scale' // Scale transform
  | 'none'; // No hover effect

/**
 * Interactive element types for semantic hover styling
 */
export type InteractiveType =
  | 'button'
  | 'link'
  | 'card'
  | 'image'
  | 'icon'
  | 'nav-item'
  | 'social-link'
  | 'cta';

/**
 * Hover state configuration
 */
export interface HoverConfig {
  effect: HoverEffect;
  type: InteractiveType;
  className?: string;
}

/**
 * Base hover utility classes that work across themes
 * Uses Tailwind's built-in hover: pseudo-class modifiers
 * Touch devices are handled by Tailwind automatically
 */
const hoverEffects: Record<HoverEffect, string> = {
  subtle: 'hover:bg-gray-50 hover:dark:bg-gray-800',
  medium: 'hover:bg-gray-100 hover:dark:bg-gray-700 hover:-translate-y-0.5',
  strong:
    'hover:bg-gray-100 hover:dark:bg-gray-700 hover:-translate-y-1 hover:shadow-lg',
  brand: 'hover:text-brand-600 hover:dark:text-brand-400',
  lift: 'hover:-translate-y-1 hover:shadow-lg',
  glow: 'hover:shadow-lg hover:shadow-brand-500/25 hover:dark:shadow-brand-400/25',
  fade: 'hover:opacity-80',
  scale: 'hover:scale-105',
  none: '',
};

/**
 * Predefined hover styles for common interactive elements
 */
const interactiveHoverStyles: Record<InteractiveType, string> = {
  button:
    'transition-all duration-150 ease-in-out motion-reduce:transition-none hover:-translate-y-0.5',
  link: 'transition-colors duration-150 ease-in-out motion-reduce:transition-none hover:text-brand-600 hover:dark:text-brand-400',
  card: 'transition-all duration-200 ease-in-out motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg',
  image:
    'transition-all duration-200 ease-in-out motion-reduce:transition-none hover:scale-105',
  icon: 'transition-all duration-150 ease-in-out motion-reduce:transition-none hover:text-brand-600 hover:dark:text-brand-400 hover:scale-110',
  'nav-item':
    'transition-colors duration-150 ease-in-out motion-reduce:transition-none hover:text-brand-600 hover:dark:text-brand-400 hover:bg-brand-50 hover:dark:bg-brand-900/20',
  'social-link':
    'transition-all duration-150 ease-in-out motion-reduce:transition-none hover:text-brand-600 hover:dark:text-brand-400 hover:-translate-y-0.5',
  cta: 'transition-all duration-200 ease-in-out motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-500/25 hover:dark:shadow-brand-400/25',
};

/**
 * Generate hover styles for an interactive element
 *
 * @param config - Hover configuration
 * @returns Combined CSS classes for hover effects
 *
 * @example
 * ```tsx
 * <button className={getHoverStyles({ effect: 'medium', type: 'button' })}>
 *   Click me
 * </button>
 * ```
 */
export function getHoverStyles(config: HoverConfig): string {
  const { effect, type, className } = config;

  const baseStyles = interactiveHoverStyles[type];
  const effectStyles = effect !== 'none' ? hoverEffects[effect] : '';

  return cn(baseStyles, effectStyles, className);
}

/**
 * Quick hover style generators for common use cases
 */
export const hoverStyles = {
  /**
   * Button hover styles
   */
  button: (effect: HoverEffect = 'medium', className?: string) =>
    getHoverStyles({ effect, type: 'button', className }),

  /**
   * Link hover styles
   */
  link: (effect: HoverEffect = 'brand', className?: string) =>
    getHoverStyles({ effect, type: 'link', className }),

  /**
   * Card hover styles
   */
  card: (effect: HoverEffect = 'lift', className?: string) =>
    getHoverStyles({ effect, type: 'card', className }),

  /**
   * Icon hover styles
   */
  icon: (effect: HoverEffect = 'brand', className?: string) =>
    getHoverStyles({ effect, type: 'icon', className }),

  /**
   * Navigation item hover styles
   */
  navItem: (effect: HoverEffect = 'brand', className?: string) =>
    getHoverStyles({ effect, type: 'nav-item', className }),

  /**
   * Social link hover styles
   */
  socialLink: (effect: HoverEffect = 'medium', className?: string) =>
    getHoverStyles({ effect, type: 'social-link', className }),

  /**
   * CTA (Call-to-Action) hover styles
   */
  cta: (effect: HoverEffect = 'glow', className?: string) =>
    getHoverStyles({ effect, type: 'cta', className }),
};

/**
 * CSS utility classes that can be used directly in components
 * These work automatically with touch devices via Tailwind's hover handling
 */
export const hoverClasses = {
  // Subtle hover effects
  subtle:
    'hover:bg-gray-50 hover:dark:bg-gray-800 transition-colors duration-150 motion-reduce:transition-none',

  // Medium hover effects with slight movement
  medium:
    'hover:bg-gray-100 hover:dark:bg-gray-700 hover:-translate-y-0.5 transition-all duration-150 motion-reduce:transition-none',

  // Strong hover effects with lift and shadow
  strong:
    'hover:bg-gray-100 hover:dark:bg-gray-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 motion-reduce:transition-none',

  // Brand color changes
  brand:
    'hover:text-brand-600 hover:dark:text-brand-400 transition-colors duration-150 motion-reduce:transition-none',

  // Card lift effect
  lift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200 motion-reduce:transition-none',

  // Brand glow effect
  glow: 'hover:shadow-lg hover:shadow-brand-500/25 hover:dark:shadow-brand-400/25 transition-all duration-200 motion-reduce:transition-none',

  // Scale effect
  scale:
    'hover:scale-105 transition-transform duration-200 motion-reduce:transition-none',

  // Fade effect
  fade: 'hover:opacity-80 transition-opacity duration-150 motion-reduce:transition-none',
} as const;

/**
 * Helper to create touch-friendly hover classes
 * Automatically wraps hover effects in @media (hover: hover) query
 */
export function touchFriendlyHover(classes: string): string {
  // Split classes and add hover media query prefix to hover classes
  return classes
    .split(' ')
    .map(cls => {
      if (cls.startsWith('hover:')) {
        return `@media (hover: hover) { .${cls.replace('hover:', '')} }`;
      }
      return cls;
    })
    .join(' ');
}

/**
 * Validate if the current device supports hover
 * Can be used for conditional rendering or styling
 */
export function supportsHover(): boolean {
  if (typeof window === 'undefined') return true; // SSR default - assume hover support
  return window.matchMedia('(hover: hover)').matches;
}

/**
 * React hook for hover support detection
 */
export function useHoverSupport(): boolean {
  const [hasHover, setHasHover] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(hover: hover)').matches;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(hover: hover)');

    const handleChange = (e: MediaQueryListEvent) => {
      setHasHover(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return hasHover;
}

// React import for the hook
import React from 'react';

export default {
  getHoverStyles,
  hoverStyles,
  hoverClasses,
  touchFriendlyHover,
  supportsHover,
  useHoverSupport,
};
