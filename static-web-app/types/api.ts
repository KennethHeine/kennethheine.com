/**
 * API and data fetching type definitions
 * Contains types for API responses, requests, and data management
 */

/**
 * Generic API response interface
 */
export interface APIResponse<T = unknown> {
  /** Whether the request was successful */
  success: boolean;
  /** Response data */
  data?: T;
  /** Error message if request failed */
  error?: string;
  /** Additional metadata */
  meta?: APIResponseMeta;
}

/**
 * API response metadata interface
 */
export interface APIResponseMeta {
  /** Response timestamp */
  timestamp: string;
  /** Unique request ID */
  requestId?: string;
  /** Response time in milliseconds */
  responseTime?: number;
  /** API version */
  version?: string;
  /** Rate limit information */
  rateLimit?: RateLimitInfo;
  /** Pagination information */
  pagination?: PaginationMeta;
  /** Additional metadata */
  [key: string]: unknown;
}

/**
 * Rate limit information interface
 */
export interface RateLimitInfo {
  /** Requests allowed per time window */
  limit: number;
  /** Remaining requests in current window */
  remaining: number;
  /** Time until rate limit resets (Unix timestamp) */
  resetTime: number;
  /** Rate limit window in seconds */
  windowSize: number;
}

/**
 * Pagination metadata for API responses
 */
export interface PaginationMeta {
  /** Current page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of items */
  total: number;
  /** Total number of pages */
  pages: number;
  /** Whether there are more pages */
  hasNext: boolean;
  /** Whether there are previous pages */
  hasPrev: boolean;
  /** URL for next page */
  nextUrl?: string;
  /** URL for previous page */
  prevUrl?: string;
}

/**
 * API error response interface
 */
export interface APIError {
  /** Error code */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Detailed error description */
  details?: string;
  /** Field-specific errors */
  fieldErrors?: Record<string, string[]>;
  /** Error stack trace (development only) */
  stack?: string;
  /** Additional error context */
  context?: Record<string, unknown>;
}

/**
 * HTTP status codes
 */
export enum HTTPStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

/**
 * HTTP methods
 */
export type HTTPMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

/**
 * API request configuration interface
 */
export interface APIRequestConfig {
  /** Request URL */
  url: string;
  /** HTTP method */
  method?: HTTPMethod;
  /** Request headers */
  headers?: Record<string, string>;
  /** Request body */
  body?: unknown;
  /** Query parameters */
  params?: Record<string, string | number | boolean>;
  /** Request timeout in milliseconds */
  timeout?: number;
  /** Whether to include credentials */
  credentials?: 'include' | 'omit' | 'same-origin';
  /** Abort signal for cancellation */
  signal?: AbortSignal;
  /** Whether to retry on failure */
  retry?: boolean;
  /** Number of retry attempts */
  retryAttempts?: number;
  /** Delay between retries in milliseconds */
  retryDelay?: number;
}

/**
 * Contact form submission interface
 */
export interface ContactFormSubmission {
  /** Sender's name */
  name: string;
  /** Sender's email */
  email: string;
  /** Message subject */
  subject: string;
  /** Message content */
  message: string;
  /** Optional company/organization */
  company?: string;
  /** Optional phone number */
  phone?: string;
  /** Honeypot field for spam protection */
  honeypot?: string;
  /** Submission timestamp */
  timestamp?: string;
}

/**
 * Contact form response interface
 */
export interface ContactFormResponse {
  /** Submission success status */
  success: boolean;
  /** Response message */
  message: string;
  /** Submission ID */
  submissionId?: string;
  /** Validation errors */
  errors?: Record<string, string>;
}

/**
 * Newsletter subscription interface
 */
export interface NewsletterSubscription {
  /** Subscriber email */
  email: string;
  /** Subscriber name */
  name?: string;
  /** Subscription preferences */
  preferences?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    topics: string[];
  };
  /** Source of subscription */
  source?: string;
  /** Subscription timestamp */
  timestamp?: string;
}

/**
 * Blog search request interface
 */
export interface BlogSearchRequest {
  /** Search query */
  query: string;
  /** Search in specific fields */
  fields?: ('title' | 'content' | 'excerpt' | 'tags')[];
  /** Filter by tags */
  tags?: string[];
  /** Filter by date range */
  dateRange?: {
    from?: string;
    to?: string;
  };
  /** Sort options */
  sort?: 'relevance' | 'date' | 'title';
  /** Sort order */
  order?: 'asc' | 'desc';
  /** Pagination */
  page?: number;
  /** Items per page */
  limit?: number;
}

/**
 * Blog search response interface
 */
export interface BlogSearchResponse {
  /** Search results */
  results: BlogSearchResult[];
  /** Total number of results */
  total: number;
  /** Search query used */
  query: string;
  /** Search time in milliseconds */
  searchTime: number;
  /** Suggested corrections */
  suggestions?: string[];
  /** Faceted search results */
  facets?: {
    tags: { name: string; count: number }[];
    years: { year: number; count: number }[];
  };
}

/**
 * Blog search result interface
 */
export interface BlogSearchResult {
  /** Post slug */
  slug: string;
  /** Post title */
  title: string;
  /** Post excerpt */
  excerpt: string;
  /** Post tags */
  tags: string[];
  /** Publication date */
  date: string;
  /** Relevance score */
  score: number;
  /** Highlighted text snippets */
  highlights: {
    title?: string[];
    content?: string[];
    excerpt?: string[];
  };
}

/**
 * Analytics event interface
 */
export interface AnalyticsEvent {
  /** Event name */
  name: string;
  /** Event category */
  category:
    | 'page_view'
    | 'user_interaction'
    | 'form_submission'
    | 'error'
    | 'custom';
  /** Event properties */
  properties: Record<string, unknown>;
  /** Event timestamp */
  timestamp: number;
  /** User session ID */
  sessionId?: string;
  /** User ID */
  userId?: string;
}

/**
 * Cache configuration interface
 */
export interface CacheConfig {
  /** Cache key */
  key: string;
  /** Time to live in seconds */
  ttl: number;
  /** Whether to use stale-while-revalidate */
  staleWhileRevalidate?: boolean;
  /** Cache tags for invalidation */
  tags?: string[];
  /** Whether to cache errors */
  cacheErrors?: boolean;
}

/**
 * Data fetching hook configuration
 */
export interface UseFetchConfig<T> extends Omit<APIRequestConfig, 'url'> {
  /** Whether to fetch on mount */
  enabled?: boolean;
  /** Refetch interval in milliseconds */
  refetchInterval?: number;
  /** Refetch on window focus */
  refetchOnFocus?: boolean;
  /** Refetch on reconnect */
  refetchOnReconnect?: boolean;
  /** Select function to transform data */
  select?: (data: T) => unknown;
  /** Cache configuration */
  cache?: CacheConfig;
  /** Optimistic updates */
  optimistic?: boolean;
}

/**
 * Data fetching hook return interface
 */
export interface UseFetchReturn<T> {
  /** Fetched data */
  data: T | undefined;
  /** Loading state */
  loading: boolean;
  /** Error state */
  error: APIError | null;
  /** Refetch function */
  refetch: () => Promise<void>;
  /** Mutate function for optimistic updates */
  mutate: (data: T | ((prev: T | undefined) => T)) => void;
  /** Whether data is stale */
  isStale: boolean;
  /** Last update timestamp */
  lastUpdated: number | null;
}
