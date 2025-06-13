/**
 * Main library index - Re-exports all utilities for backward compatibility
 * This file maintains the existing API while organizing code into logical modules
 */

// Blog utilities
export * from './blog';

// UI utilities
export * from './ui';

// SEO utilities
export * from './seo';

// General utilities
export * from './utils';

// Legacy re-exports for backward compatibility
// These maintain the original import paths that may be used throughout the codebase
export {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
  getPostsByTag,
  getAllTags,
} from './blog';

export { cn, truncate, debounce } from './ui';

export {
  formatDate,
  formatRelativeDate,
  slugify,
  capitalize,
  pluralize,
  deepClone,
  isValidEmail,
  generateId,
  calculateReadingTime,
  formatReadingTime,
} from './utils';
