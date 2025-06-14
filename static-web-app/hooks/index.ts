/**
 * @fileoverview Centralized exports for all custom hooks
 * @author Kenneth Heine
 */

// Theme management
export { useTheme } from './useTheme';
export type { Theme, ResolvedTheme } from './useTheme';

// Blog data management
export { useBlogPosts } from './useBlogPosts';

// Local storage
export { useLocalStorage } from './useLocalStorage';

// Media queries and responsive design
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersReducedMotion,
  usePrefersDarkMode,
  usePrefersHighContrast,
  useIsLandscape,
  useIsTouchDevice,
  useBreakpoint,
  useViewportSize,
} from './useMediaQuery';

// Debouncing
export {
  useDebounce,
  useDebouncedCallback,
  useDebouncedValue,
} from './useDebounce';

// SEO and metadata
export {
  usePageMetadata,
  useBlogPostMetadata,
  useStaticPageMetadata,
} from './usePageMetadata';

// React 19 optimistic updates
export {
  useOptimisticUpdates,
  useOptimisticList,
  useOptimisticForm,
} from './useOptimisticUpdates';
