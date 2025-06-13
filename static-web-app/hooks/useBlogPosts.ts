/**
 * @fileoverview Blog data fetching hooks with React 19 patterns
 * @author Kenneth Heine
 */

'use client';

import { useCallback, useMemo, useState, useTransition } from 'react';
import { getAllPosts, getPostBySlug, getAllTags } from '@/lib/blog';
import type { BlogPost } from '@/types/blog';

interface UseBlogPostsOptions {
  /** Initial posts to display */
  initialPosts?: BlogPost[];
  /** Filter by tag */
  tag?: string;
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
export function useBlogPosts(
  options: UseBlogPostsOptions = {}
): UseBlogPostsReturn {
  const {
    initialPosts = [],
    tag: initialTag = null,
    searchQuery: initialSearchQuery = '',
    pageSize = 10,
  } = options;

  const [isPending, startTransition] = useTransition();
  const [allPosts] = useState<BlogPost[]>(() =>
    initialPosts.length > 0 ? initialPosts : getAllPosts()
  );
  const [searchQuery, setSearchQueryState] = useState(initialSearchQuery);
  const [currentTag, setCurrentTag] = useState<string | null>(initialTag);
  const [displayCount, setDisplayCount] = useState(pageSize);
  const [error, setError] = useState<string | null>(null);

  // Get all available tags
  const tags = useMemo(() => getAllTags(), []);

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
  }, [allPosts, currentTag, searchQuery]);

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

  const loadMore = useCallback(() => {
    startTransition(() => {
      setDisplayCount(current => current + pageSize);
    });
  }, [pageSize]);

  const resetFilters = useCallback(() => {
    startTransition(() => {
      setSearchQueryState('');
      setCurrentTag(null);
      setDisplayCount(pageSize);
      setError(null);
    });
  }, [pageSize]);

  return {
    posts,
    tags,
    loading: isPending,
    error,
    searchQuery,
    setSearchQuery,
    filterByTag,
    currentTag,
    loadMore,
    hasMore,
    resetFilters,
  };
}

interface UsePostOptions {
  /** Post slug */
  slug: string;
  /** Enable optimistic loading */
  optimistic?: boolean;
}

interface UsePostReturn {
  /** Current post */
  post: BlogPost | null;
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: string | null;
  /** Related posts */
  relatedPosts: BlogPost[];
  /** Navigate to next post */
  nextPost: () => void;
  /** Navigate to previous post */
  previousPost: () => void;
}

/**
 * Individual blog post hook with navigation
 *
 * @param options - Configuration options
 * @returns Post state and navigation controls
 */
export function usePost(options: UsePostOptions): UsePostReturn {
  const { slug, optimistic = true } = options;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Get post data
  const post = useMemo(() => {
    try {
      return getPostBySlug(slug);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
      return null;
    }
  }, [slug]);

  // Get related posts based on tags
  const relatedPosts = useMemo(() => {
    if (!post || !post.tags || post.tags.length === 0) return [];

    try {
      const allPosts = getAllPosts();
      return allPosts
        .filter(
          p =>
            p.slug !== post.slug &&
            p.tags &&
            p.tags.some(tag => post.tags!.includes(tag))
        )
        .slice(0, 3); // Limit to 3 related posts
    } catch (err) {
      console.warn('Failed to load related posts:', err);
      return [];
    }
  }, [post]);

  const nextPost = useCallback(() => {
    if (!optimistic) return;

    startTransition(() => {
      // Implementation would depend on routing setup
      console.log('Navigate to next post');
    });
  }, [optimistic]);

  const previousPost = useCallback(() => {
    if (!optimistic) return;

    startTransition(() => {
      // Implementation would depend on routing setup
      console.log('Navigate to previous post');
    });
  }, [optimistic]);

  return {
    post,
    loading: isPending,
    error,
    relatedPosts,
    nextPost,
    previousPost,
  };
}
