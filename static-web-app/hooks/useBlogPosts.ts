/**
 * @fileoverview Blog data fetching hooks with React 19 patterns
 * @author Kenneth Heine
 */

'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import type { BlogPost } from '@/types/blog';

interface UseBlogPostsOptions {
  /** Initial posts to display (required for client-side operation) */
  initialPosts: BlogPost[];
  /** Filter by tag */
  tag?: string;
  /** Filter by category */
  category?: string;
  /** Search query */
  searchQuery?: string;
  /** Number of posts per page */
  pageSize?: number;
}

interface UseBlogPostsReturn {
  /** Current posts */
  posts: BlogPost[];
  /** All available tags */
  tags: string[];
  /** All available categories */
  categories: string[];
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: string | null;
  /** Search query */
  searchQuery: string;
  /** Set search query */
  setSearchQuery: (query: string) => void;
  /** Filter by tag */
  filterByTag: (tag: string | null) => void;
  /** Current tag filter */
  currentTag: string | null;
  /** Filter by category */
  filterByCategory: (category: string | null) => void;
  /** Current category filter */
  currentCategory: string | null;
  /** Load more posts */
  loadMore: () => void;
  /** Whether more posts are available */
  hasMore: boolean;
  /** Reset filters */
  resetFilters: () => void;
}

/**
 * Enhanced blog posts hook with React 19 patterns
 *
 * Features:
 * - Client-side search and filtering
 * - Pagination support
 * - Tag filtering
 * - React 19 transitions for smooth UX
 * - Optimistic updates
 *
 * @param options - Configuration options
 * @returns Blog posts state and controls
 *
 * @example
 * ```typescript
 * const { posts, tags, filterByTag, setSearchQuery } = useBlogPosts({
 *   pageSize: 10
 * });
 *
 * // Filter by tag
 * filterByTag('azure');
 *
 * // Search posts
 * setSearchQuery('Next.js');
 * ```
 */
export function useBlogPosts(options: UseBlogPostsOptions): UseBlogPostsReturn {
  const {
    initialPosts,
    tag: initialTag = null,
    category: initialCategory = null,
    searchQuery: initialSearchQuery = '',
    pageSize = 10,
  } = options;

  const [isPending, startTransition] = useTransition();
  const [allPosts] = useState<BlogPost[]>(() => initialPosts);
  const [searchQuery, setSearchQueryState] = useState(initialSearchQuery);
  const [currentTag, setCurrentTag] = useState<string | null>(initialTag);
  const [currentCategory, setCurrentCategory] = useState<string | null>(
    initialCategory
  );
  const [displayCount, setDisplayCount] = useState(pageSize);
  const [error, setError] = useState<string | null>(null);

  // Get all available tags and categories from the provided posts
  const tags = useMemo(() => {
    const allTags = allPosts.flatMap(post => post.tags);
    return Array.from(new Set(allTags)).sort();
  }, [allPosts]);

  const categories = useMemo(() => {
    const allCategories = allPosts
      .map(post => post.category)
      .filter((category): category is string => Boolean(category));
    return Array.from(new Set(allCategories)).sort();
  }, [allPosts]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    try {
      let filtered = allPosts;

      // Filter by tag
      if (currentTag) {
        filtered = filtered.filter(
          post => post.tags && post.tags.includes(currentTag)
        );
      }

      // Filter by category
      if (currentCategory) {
        filtered = filtered.filter(post => post.category === currentCategory);
      }

      // Search in title, excerpt, and content
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        filtered = filtered.filter(
          post =>
            post.title.toLowerCase().includes(query) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
            (post.content && post.content.toLowerCase().includes(query)) ||
            (post.tags &&
              post.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }

      return filtered;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter posts');
      return allPosts;
    }
  }, [allPosts, currentTag, currentCategory, searchQuery]);

  // Get posts to display (with pagination)
  const posts = useMemo(() => {
    return filteredPosts.slice(0, displayCount);
  }, [filteredPosts, displayCount]);

  // Check if more posts are available
  const hasMore = displayCount < filteredPosts.length;

  const setSearchQuery = useCallback(
    (query: string) => {
      startTransition(() => {
        setSearchQueryState(query);
        setDisplayCount(pageSize); // Reset pagination when searching
        setError(null);
      });
    },
    [pageSize]
  );

  const filterByTag = useCallback(
    (tag: string | null) => {
      startTransition(() => {
        setCurrentTag(tag);
        setDisplayCount(pageSize); // Reset pagination when filtering
        setError(null);
      });
    },
    [pageSize]
  );

  const filterByCategory = useCallback(
    (category: string | null) => {
      startTransition(() => {
        setCurrentCategory(category);
        setDisplayCount(pageSize); // Reset pagination when filtering
        setError(null);
      });
    },
    [pageSize]
  );

  const loadMore = useCallback(() => {
    startTransition(() => {
      setDisplayCount(current => current + pageSize);
    });
  }, [pageSize]);

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setSearchQueryState('');
      setCurrentTag(null);
      setCurrentCategory(null);
      setDisplayCount(pageSize);
      setError(null);
    });
  }, [pageSize]);

  return {
    posts,
    tags,
    categories,
    loading: isPending,
    error,
    searchQuery,
    setSearchQuery,
    filterByTag,
    currentTag,
    filterByCategory,
    currentCategory,
    loadMore,
    hasMore,
    resetFilters,
  };
}
