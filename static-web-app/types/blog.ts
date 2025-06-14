/**
 * Type definitions for blog-related data structures
 * These types ensure type safety when working with blog posts and metadata
 */

/**
 * Complete blog post interface with all fields
 */
export interface BlogPost {
  /** Unique identifier for the blog post (usually the filename without extension) */
  slug: string;

  /** The title of the blog post */
  title: string;

  /** Publication date in ISO string format (YYYY-MM-DD) */
  date: string;

  /** Brief summary/description of the post */
  excerpt: string;

  /** The full MDX/Markdown content of the post */
  content: string;

  /** Array of tags associated with the post */
  tags: string[];

  /** Category of the post (typically one per post) */
  category?: string;

  /** Whether the post is published (default: true) */
  published: boolean;

  /** Estimated reading time in minutes */
  readingTime?: number;

  /** Optional author name */
  author?: string;

  /** Optional featured image URL */
  coverImage?: string;
}

/**
 * Blog post frontmatter interface for MDX processing
 */
export interface BlogPostFrontmatter {
  /** The title of the blog post */
  title: string;

  /** Publication date (can be string or Date object from gray-matter) */
  date: string | Date;

  /** Brief summary/description of the post */
  excerpt?: string;

  /** Alternative summary field for compatibility */
  summary?: string;

  /** Array of tags associated with the post */
  tags?: string[];

  /** Category of the post (typically one per post) */
  category?: string;

  /** Whether the post is published (default: true) */
  published?: boolean;

  /** Optional author name */
  author?: string;

  /** Optional featured image URL */
  coverImage?: string;
}

/**
 * Blog post preview interface (without full content) for listings
 */
export interface BlogPostPreview {
  /** Unique identifier for the blog post */
  slug: string;

  /** The title of the blog post */
  title: string;

  /** Publication date in ISO string format */
  date: string;

  /** Brief summary/description of the post */
  excerpt: string;

  /** Array of tags associated with the post */
  tags: string[];

  /** Category of the post */
  category?: string;

  /** Optional author name */
  author?: string;

  /** Optional featured image URL */
  coverImage?: string;
}

/**
 * Pagination metadata interface
 */
export interface PaginationInfo {
  /** Current page number (1-based) */
  currentPage: number;

  /** Total number of pages */
  totalPages: number;

  /** Total number of posts */
  totalPosts: number;

  /** Number of posts per page */
  postsPerPage: number;

  /** Whether there's a previous page */
  hasPrevious: boolean;

  /** Whether there's a next page */
  hasNext: boolean;
}

/**
 * Paginated blog posts response interface
 */
export interface PaginatedPosts {
  /** Array of blog post previews */
  posts: BlogPostPreview[];

  /** Pagination metadata */
  pagination: PaginationInfo;
}

/**
 * Legacy paginated posts interface for backward compatibility
 * @deprecated Use PaginatedPosts with pagination property instead
 */
export interface LegacyPaginatedPosts {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Blog tag information interface
 */
export interface BlogTag {
  /** Tag name */
  name: string;

  /** Number of posts with this tag */
  count: number;

  /** URL-friendly slug for the tag */
  slug: string;
}

/**
 * Blog category information interface
 */
export interface BlogCategory {
  /** Category name */
  name: string;

  /** Number of posts in this category */
  count: number;

  /** URL-friendly slug for the category */
  slug: string;
}
