/**
 * Blog utilities - Main entry point for blog functionality
 *
 * This file maintains backward compatibility while using the new modular structure.
 * Implementation has been organized into:
 * - lib/blog/parser.ts - MDX parsing functions
 * - lib/blog/search.ts - Blog search and filtering functions
 * - lib/blog/metadata.ts - Frontmatter processing functions
 */

// Re-export all blog functions to maintain backward compatibility
export { getPostSlugs, getPostBySlug } from './blog/parser';

export { getAllPosts, getPostsByTag, getAllTags } from './blog/search';
