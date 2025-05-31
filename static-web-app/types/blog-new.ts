// --- file: types/blog.ts ---
/**
 * Type definitions for blog-related data structures
 * These types ensure type safety when working with blog posts and metadata
 */

// Basic blog post interface with all necessary fields
export interface BlogPost {
  /** Unique identifier for the blog post (usually the filename without extension) */
  slug: string
  
  /** The title of the blog post */
  title: string
  
  /** Publication date in ISO string format (YYYY-MM-DD) */
  date: string
  
  /** Brief summary/description of the post */
  summary: string
  
  /** Array of tags associated with the post */
  tags: string[]
  
  /** The full MDX/Markdown content of the post */
  content: string
  
  /** Optional author name */
  author?: string
  
  /** Optional featured image URL */
  image?: string
  
  /** Whether the post is published (default: true) */
  published?: boolean
}

// Type for blog listing/preview (without full content)
export interface BlogPostPreview {
  /** Unique identifier for the blog post */
  slug: string
  
  /** The title of the blog post */
  title: string
  
  /** Publication date in ISO string format */
  date: string
  
  /** Brief summary/description of the post */
  summary: string
  
  /** Array of tags associated with the post */
  tags: string[]
  
  /** Optional author name */
  author?: string
  
  /** Optional featured image URL */
  image?: string
}

// Type for pagination metadata
export interface PaginationInfo {
  /** Current page number (1-based) */
  currentPage: number
  
  /** Total number of pages */
  totalPages: number
  
  /** Total number of posts */
  totalPosts: number
  
  /** Number of posts per page */
  postsPerPage: number
  
  /** Whether there's a previous page */
  hasPrevious: boolean
  
  /** Whether there's a next page */
  hasNext: boolean
}

// Type for paginated blog posts response
export interface PaginatedPosts {
  /** Array of blog post previews */
  posts: BlogPostPreview[]
  
  /** Pagination metadata */
  pagination: PaginationInfo
}

// Type for tag information
export interface TagInfo {
  /** Tag name */
  name: string
  
  /** Number of posts with this tag */
  count: number
  
  /** URL-friendly slug for the tag */
  slug: string
}
