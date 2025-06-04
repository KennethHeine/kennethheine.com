/**
 * @fileoverview Example TypeScript interfaces with comprehensive documentation
 * @author Kenneth Sølberg
 */

/**
 * Represents a user in the system
 * 
 * @example
 * ```typescript
 * const user: User = {
 *   id: 'user-123',
 *   email: 'john@example.com',
 *   profile: {
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     avatar: 'https://example.com/avatar.jpg'
 *   },
 *   settings: {
 *     theme: 'dark',
 *     notifications: true
 *   },
 *   createdAt: '2024-01-15T10:00:00Z',
 *   lastLoginAt: '2024-01-20T15:30:00Z'
 * };
 * ```
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  
  /** User's email address (must be unique) */
  email: string;
  
  /** User profile information */
  profile: UserProfile;
  
  /** User preferences and settings */
  settings: UserSettings;
  
  /** 
   * ISO timestamp when user was created
   * @example "2024-01-15T10:00:00Z"
   */
  createdAt: string;
  
  /** 
   * ISO timestamp of last login (null if never logged in)
   * @example "2024-01-20T15:30:00Z"
   */
  lastLoginAt: string | null;
  
  /** 
   * Whether the user account is active
   * @default true
   */
  isActive?: boolean;
  
  /** 
   * User role defining permissions
   * @default 'user'
   */
  role?: 'admin' | 'moderator' | 'user';
}

/**
 * User profile information containing personal details
 */
export interface UserProfile {
  /** User's first name */
  firstName: string;
  
  /** User's last name */
  lastName: string;
  
  /** 
   * User's display name (optional, defaults to first + last name)
   * @example "John D."
   */
  displayName?: string;
  
  /** 
   * URL to user's profile picture
   * @example "https://example.com/avatar.jpg"
   */
  avatar?: string;
  
  /** 
   * User's bio or description
   * @maxLength 500
   */
  bio?: string;
  
  /** 
   * User's location
   * @example "San Francisco, CA"
   */
  location?: string;
  
  /** 
   * User's website URL
   * @example "https://johndoe.com"
   */
  website?: string;
  
  /** 
   * Social media links
   * @example { "twitter": "johndoe", "github": "johndoe" }
   */
  socialLinks?: Record<string, string>;
}

/**
 * User settings and preferences
 */
export interface UserSettings {
  /** 
   * UI theme preference
   * @default 'system'
   */
  theme?: 'light' | 'dark' | 'system';
  
  /** 
   * Whether to receive email notifications
   * @default true
   */
  notifications?: boolean;
  
  /** 
   * User's preferred language
   * @default 'en'
   */
  language?: string;
  
  /** 
   * User's timezone
   * @example "America/New_York"
   */
  timezone?: string;
  
  /** 
   * Privacy settings
   */
  privacy?: PrivacySettings;
}

/**
 * Privacy settings for user data
 */
export interface PrivacySettings {
  /** 
   * Whether profile is public
   * @default false
   */
  publicProfile?: boolean;
  
  /** 
   * Whether to show online status
   * @default true
   */
  showOnlineStatus?: boolean;
  
  /** 
   * Who can send direct messages
   * @default 'everyone'
   */
  allowMessages?: 'nobody' | 'friends' | 'everyone';
}

/**
 * Represents a blog post in the system
 * 
 * @example
 * ```typescript
 * const post: BlogPost = {
 *   id: 'post-123',
 *   title: 'Getting Started with TypeScript',
 *   slug: 'getting-started-typescript',
 *   content: '# Introduction\n\nTypeScript is...',
 *   excerpt: 'Learn the basics of TypeScript...',
 *   author: userObject,
 *   publishedAt: '2024-01-15T10:00:00Z',
 *   tags: ['typescript', 'programming'],
 *   metadata: {
 *     readingTime: 5,
 *     wordCount: 1200
 *   }
 * };
 * ```
 */
export interface BlogPost {
  /** Unique identifier for the post */
  id: string;
  
  /** Post title */
  title: string;
  
  /** 
   * URL-friendly version of the title
   * @example "getting-started-typescript"
   */
  slug: string;
  
  /** 
   * Full post content in markdown format
   * @remarks Supports MDX syntax for interactive components
   */
  content: string;
  
  /** 
   * Brief excerpt or summary of the post
   * @maxLength 300
   */
  excerpt?: string;
  
  /** Post author information */
  author: User;
  
  /** 
   * Featured image URL
   * @example "https://example.com/featured-image.jpg"
   */
  featuredImage?: string;
  
  /** 
   * ISO timestamp when post was published
   * @example "2024-01-15T10:00:00Z"
   */
  publishedAt: string;
  
  /** 
   * ISO timestamp when post was last updated
   * @example "2024-01-16T14:30:00Z"
   */
  updatedAt?: string;
  
  /** 
   * Post tags for categorization
   * @example ["typescript", "programming", "tutorial"]
   */
  tags?: string[];
  
  /** 
   * Post categories
   * @example ["Technology", "Web Development"]
   */
  categories?: string[];
  
  /** 
   * Whether the post is published
   * @default false
   */
  isPublished?: boolean;
  
  /** 
   * Whether comments are enabled
   * @default true
   */
  allowComments?: boolean;
  
  /** Additional post metadata */
  metadata?: PostMetadata;
}

/**
 * Metadata associated with a blog post
 */
export interface PostMetadata {
  /** 
   * Estimated reading time in minutes
   * @minimum 1
   */
  readingTime?: number;
  
  /** 
   * Total word count
   * @minimum 0
   */
  wordCount?: number;
  
  /** 
   * Number of views
   * @minimum 0
   */
  viewCount?: number;
  
  /** 
   * Number of likes
   * @minimum 0
   */
  likeCount?: number;
  
  /** 
   * SEO metadata
   */
  seo?: SEOMetadata;
}

/**
 * SEO metadata for content optimization
 */
export interface SEOMetadata {
  /** 
   * Meta description for search engines
   * @maxLength 160
   */
  description?: string;
  
  /** 
   * Keywords for search optimization
   * @example ["typescript", "web development", "tutorial"]
   */
  keywords?: string[];
  
  /** 
   * Open Graph title
   * @maxLength 60
   */
  ogTitle?: string;
  
  /** 
   * Open Graph description
   * @maxLength 300
   */
  ogDescription?: string;
  
  /** 
   * Open Graph image URL
   * @example "https://example.com/og-image.jpg"
   */
  ogImage?: string;
  
  /** 
   * Twitter card type
   * @default "summary"
   */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
}

/**
 * API response wrapper for consistent response format
 * 
 * @template T - Type of the response data
 * 
 * @example
 * ```typescript
 * // Success response
 * const response: ApiResponse<User[]> = {
 *   success: true,
 *   data: [user1, user2],
 *   message: 'Users retrieved successfully'
 * };
 * 
 * // Error response
 * const errorResponse: ApiResponse<null> = {
 *   success: false,
 *   data: null,
 *   error: {
 *     code: 'USER_NOT_FOUND',
 *     message: 'User with ID 123 not found'
 *   }
 * };
 * ```
 */
export interface ApiResponse<T> {
  /** Whether the request was successful */
  success: boolean;
  
  /** Response data (null on error) */
  data: T | null;
  
  /** 
   * Human-readable message
   * @example "User created successfully"
   */
  message?: string;
  
  /** Error information (only present when success is false) */
  error?: ApiError;
  
  /** Additional metadata */
  meta?: {
    /** Current page number (for paginated responses) */
    page?: number;
    /** Items per page */
    limit?: number;
    /** Total number of items */
    total?: number;
    /** Total number of pages */
    totalPages?: number;
  };
}

/**
 * Standardized error information
 */
export interface ApiError {
  /** 
   * Error code for programmatic handling
   * @example "VALIDATION_ERROR"
   */
  code: string;
  
  /** Human-readable error message */
  message: string;
  
  /** 
   * Detailed field-level errors (for validation)
   * @example { "email": ["Email is required"], "password": ["Too short"] }
   */
  details?: Record<string, string[]>;
  
  /** 
   * Stack trace (only in development)
   * @internal
   */
  stack?: string;
}

/**
 * Configuration for paginated requests
 * 
 * @example
 * ```typescript
 * const params: PaginationParams = {
 *   page: 1,
 *   limit: 20,
 *   sortBy: 'createdAt',
 *   sortOrder: 'desc'
 * };
 * ```
 */
export interface PaginationParams {
  /** 
   * Page number (1-based)
   * @minimum 1
   * @default 1
   */
  page?: number;
  
  /** 
   * Number of items per page
   * @minimum 1
   * @maximum 100
   * @default 20
   */
  limit?: number;
  
  /** 
   * Field to sort by
   * @example "createdAt"
   */
  sortBy?: string;
  
  /** 
   * Sort order
   * @default "asc"
   */
  sortOrder?: 'asc' | 'desc';
  
  /** 
   * Search query
   * @example "typescript tutorial"
   */
  search?: string;
  
  /** 
   * Additional filters
   * @example { "category": "technology", "published": true }
   */
  filters?: Record<string, unknown>;
}

/**
 * Theme configuration for the application
 */
export interface ThemeConfig {
  /** 
   * Color palette definitions
   */
  colors: {
    /** Primary brand colors */
    primary: ColorScale;
    /** Secondary colors */
    secondary: ColorScale;
    /** Neutral colors (grays) */
    neutral: ColorScale;
    /** Success state colors */
    success: ColorScale;
    /** Warning state colors */
    warning: ColorScale;
    /** Error state colors */
    error: ColorScale;
  };
  
  /** Typography configuration */
  typography: {
    /** Font family definitions */
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    /** Font size scale */
    fontSize: Record<string, string>;
    /** Font weight scale */
    fontWeight: Record<string, number>;
  };
  
  /** Spacing scale */
  spacing: Record<string, string>;
  
  /** Border radius definitions */
  borderRadius: Record<string, string>;
  
  /** Shadow definitions */
  shadows: Record<string, string>;
}

/**
 * Color scale from light to dark
 * 
 * @example
 * ```typescript
 * const primaryColors: ColorScale = {
 *   50: '#eff6ff',
 *   100: '#dbeafe',
 *   500: '#3b82f6', // Base color
 *   900: '#1e3a8a'
 * };
 * ```
 */
export interface ColorScale {
  /** Lightest shade */
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  /** Base color */
  500: string;
  600: string;
  700: string;
  800: string;
  /** Darkest shade */
  900: string;
  /** Optional extra dark shade */
  950?: string;
}