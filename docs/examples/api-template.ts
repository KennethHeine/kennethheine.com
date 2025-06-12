/**
 * @fileoverview Example API interfaces with comprehensive documentation
 * @author Kenneth Heine
 */

/**
 * Base API client configuration
 */
export interface ApiClientConfig {
  /** 
   * Base URL for the API
   * @example "https://api.example.com/v1"
   */
  baseUrl: string;
  
  /** 
   * API key for authentication
   * @remarks Should be stored securely
   */
  apiKey?: string;
  
  /** 
   * Request timeout in milliseconds
   * @default 10000
   */
  timeout?: number;
  
  /** 
   * Default headers to include with requests
   * @example { "Content-Type": "application/json" }
   */
  defaultHeaders?: Record<string, string>;
  
  /** 
   * Whether to retry failed requests
   * @default true
   */
  retryOnFailure?: boolean;
  
  /** 
   * Maximum number of retry attempts
   * @default 3
   */
  maxRetries?: number;
}

/**
 * Standard API request configuration
 * 
 * @template TParams - Type of request parameters
 * @template TBody - Type of request body
 */
export interface ApiRequest<TParams = unknown, TBody = unknown> {
  /** 
   * HTTP method
   * @example "GET"
   */
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  
  /** 
   * API endpoint path
   * @example "/users/{id}"
   */
  endpoint: string;
  
  /** 
   * URL parameters for path substitution
   * @example { id: "123" }
   */
  params?: TParams;
  
  /** 
   * Query string parameters
   * @example { page: 1, limit: 20 }
   */
  query?: Record<string, string | number | boolean>;
  
  /** 
   * Request body data
   */
  body?: TBody;
  
  /** 
   * Additional headers for this request
   * @example { "Authorization": "Bearer token123" }
   */
  headers?: Record<string, string>;
  
  /** 
   * Request timeout override
   * @minimum 1000
   */
  timeout?: number;
}

/**
 * Standard API response format
 * 
 * @template TData - Type of response data
 */
export interface ApiResponse<TData = unknown> {
  /** HTTP status code */
  status: number;
  
  /** Whether the request was successful */
  success: boolean;
  
  /** Response data */
  data: TData;
  
  /** 
   * Human-readable message
   * @example "User created successfully"
   */
  message?: string;
  
  /** Error information (if request failed) */
  error?: ApiErrorInfo;
  
  /** Response metadata */
  meta?: ApiResponseMeta;
}

/**
 * API error information
 */
export interface ApiErrorInfo {
  /** 
   * Error code for programmatic handling
   * @example "VALIDATION_ERROR"
   */
  code: string;
  
  /** Human-readable error message */
  message: string;
  
  /** 
   * Detailed field-level errors
   * @example { "email": ["Required field"], "age": ["Must be positive"] }
   */
  details?: Record<string, string[]>;
  
  /** 
   * Unique identifier for this error instance
   * @example "err_123456789"
   */
  correlationId?: string;
}

/**
 * Response metadata for additional information
 */
export interface ApiResponseMeta {
  /** 
   * Request timestamp
   * @example "2024-01-15T10:00:00Z"
   */
  timestamp?: string;
  
  /** 
   * API version that processed the request
   * @example "v1.2.0"
   */
  version?: string;
  
  /** 
   * Request processing time in milliseconds
   * @minimum 0
   */
  processingTime?: number;
  
  /** 
   * Rate limiting information
   */
  rateLimit?: RateLimitInfo;
  
  /** 
   * Pagination information (for list endpoints)
   */
  pagination?: PaginationInfo;
}

/**
 * Rate limiting information
 */
export interface RateLimitInfo {
  /** 
   * Maximum requests allowed per time window
   * @minimum 1
   */
  limit: number;
  
  /** 
   * Remaining requests in current window
   * @minimum 0
   */
  remaining: number;
  
  /** 
   * Time when the rate limit resets (Unix timestamp)
   * @example 1705320000
   */
  resetTime: number;
  
  /** 
   * Time window duration in seconds
   * @example 3600
   */
  window: number;
}

/**
 * Pagination information for list responses
 */
export interface PaginationInfo {
  /** 
   * Current page number
   * @minimum 1
   */
  page: number;
  
  /** 
   * Number of items per page
   * @minimum 1
   */
  limit: number;
  
  /** 
   * Total number of items
   * @minimum 0
   */
  total: number;
  
  /** 
   * Total number of pages
   * @minimum 0
   */
  totalPages: number;
  
  /** Whether there's a next page */
  hasNext: boolean;
  
  /** Whether there's a previous page */
  hasPrevious: boolean;
  
  /** URL for next page (if available) */
  nextUrl?: string;
  
  /** URL for previous page (if available) */
  previousUrl?: string;
}

/**
 * User management API endpoints
 * 
 * @example
 * ```typescript
 * const userApi: UserApi = {
 *   async getUser(id) {
 *     return apiClient.request({
 *       method: 'GET',
 *       endpoint: '/users/{id}',
 *       params: { id }
 *     });
 *   },
 *   
 *   async createUser(userData) {
 *     return apiClient.request({
 *       method: 'POST',
 *       endpoint: '/users',
 *       body: userData
 *     });
 *   }
 * };
 * ```
 */
export interface UserApi {
  /**
   * Retrieves a user by ID
   * 
   * @param id - User ID
   * @returns Promise resolving to user data
   * @throws {ApiError} When user is not found
   * 
   * @example
   * ```typescript
   * const user = await userApi.getUser('user-123');
   * console.log(user.data.email);
   * ```
   */
  getUser(id: string): Promise<ApiResponse<User>>;
  
  /**
   * Creates a new user
   * 
   * @param userData - User creation data
   * @returns Promise resolving to created user
   * @throws {ApiError} When validation fails
   * 
   * @example
   * ```typescript
   * const newUser = await userApi.createUser({
   *   email: 'john@example.com',
   *   firstName: 'John',
   *   lastName: 'Doe'
   * });
   * ```
   */
  createUser(userData: CreateUserRequest): Promise<ApiResponse<User>>;
  
  /**
   * Updates an existing user
   * 
   * @param id - User ID
   * @param updates - Partial user data to update
   * @returns Promise resolving to updated user
   */
  updateUser(id: string, updates: UpdateUserRequest): Promise<ApiResponse<User>>;
  
  /**
   * Deletes a user
   * 
   * @param id - User ID
   * @returns Promise resolving to deletion confirmation
   */
  deleteUser(id: string): Promise<ApiResponse<{ deleted: boolean }>>;
  
  /**
   * Lists users with pagination and filtering
   * 
   * @param options - List options including pagination and filters
   * @returns Promise resolving to paginated user list
   */
  listUsers(options?: ListUsersOptions): Promise<ApiResponse<User[]>>;
}

/**
 * Blog post management API endpoints
 */
export interface BlogApi {
  /**
   * Retrieves a blog post by ID or slug
   * 
   * @param identifier - Post ID or slug
   * @returns Promise resolving to blog post data
   */
  getPost(identifier: string): Promise<ApiResponse<BlogPost>>;
  
  /**
   * Creates a new blog post
   * 
   * @param postData - Blog post creation data
   * @returns Promise resolving to created post
   */
  createPost(postData: CreatePostRequest): Promise<ApiResponse<BlogPost>>;
  
  /**
   * Updates an existing blog post
   * 
   * @param id - Post ID
   * @param updates - Partial post data to update
   * @returns Promise resolving to updated post
   */
  updatePost(id: string, updates: UpdatePostRequest): Promise<ApiResponse<BlogPost>>;
  
  /**
   * Deletes a blog post
   * 
   * @param id - Post ID
   * @returns Promise resolving to deletion confirmation
   */
  deletePost(id: string): Promise<ApiResponse<{ deleted: boolean }>>;
  
  /**
   * Lists blog posts with pagination, filtering, and sorting
   * 
   * @param options - List options
   * @returns Promise resolving to paginated post list
   */
  listPosts(options?: ListPostsOptions): Promise<ApiResponse<BlogPost[]>>;
  
  /**
   * Publishes a draft blog post
   * 
   * @param id - Post ID
   * @returns Promise resolving to published post
   */
  publishPost(id: string): Promise<ApiResponse<BlogPost>>;
  
  /**
   * Unpublishes a blog post (returns to draft)
   * 
   * @param id - Post ID
   * @returns Promise resolving to unpublished post
   */
  unpublishPost(id: string): Promise<ApiResponse<BlogPost>>;
}

/**
 * Data required to create a new user
 */
export interface CreateUserRequest {
  /** User's email address (must be unique) */
  email: string;
  
  /** User's first name */
  firstName: string;
  
  /** User's last name */
  lastName: string;
  
  /** 
   * User's password (will be hashed)
   * @minLength 8
   */
  password: string;
  
  /** 
   * User role
   * @default "user"
   */
  role?: 'admin' | 'moderator' | 'user';
  
  /** Optional profile information */
  profile?: Partial<UserProfile>;
  
  /** Optional user settings */
  settings?: Partial<UserSettings>;
}

/**
 * Data for updating an existing user
 */
export interface UpdateUserRequest {
  /** Updated email address */
  email?: string;
  
  /** Updated first name */
  firstName?: string;
  
  /** Updated last name */
  lastName?: string;
  
  /** 
   * New password (will be hashed)
   * @minLength 8
   */
  password?: string;
  
  /** Updated role */
  role?: 'admin' | 'moderator' | 'user';
  
  /** Whether the account is active */
  isActive?: boolean;
  
  /** Updated profile information */
  profile?: Partial<UserProfile>;
  
  /** Updated user settings */
  settings?: Partial<UserSettings>;
}

/**
 * Options for listing users
 */
export interface ListUsersOptions {
  /** 
   * Page number
   * @minimum 1
   * @default 1
   */
  page?: number;
  
  /** 
   * Items per page
   * @minimum 1
   * @maximum 100
   * @default 20
   */
  limit?: number;
  
  /** 
   * Search query (searches name and email)
   * @example "john"
   */
  search?: string;
  
  /** 
   * Filter by user role
   */
  role?: 'admin' | 'moderator' | 'user';
  
  /** 
   * Filter by active status
   */
  isActive?: boolean;
  
  /** 
   * Sort field
   * @default "createdAt"
   */
  sortBy?: 'createdAt' | 'email' | 'firstName' | 'lastName' | 'lastLoginAt';
  
  /** 
   * Sort order
   * @default "desc"
   */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Data required to create a new blog post
 */
export interface CreatePostRequest {
  /** Post title */
  title: string;
  
  /** 
   * Post slug (auto-generated if not provided)
   * @example "getting-started-typescript"
   */
  slug?: string;
  
  /** Post content in markdown */
  content: string;
  
  /** 
   * Post excerpt
   * @maxLength 300
   */
  excerpt?: string;
  
  /** Featured image URL */
  featuredImage?: string;
  
  /** 
   * Whether to publish immediately
   * @default false
   */
  isPublished?: boolean;
  
  /** 
   * Whether to allow comments
   * @default true
   */
  allowComments?: boolean;
  
  /** Post tags */
  tags?: string[];
  
  /** Post categories */
  categories?: string[];
  
  /** SEO metadata */
  seo?: Partial<SEOMetadata>;
}

/**
 * Data for updating an existing blog post
 */
export interface UpdatePostRequest {
  /** Updated title */
  title?: string;
  
  /** Updated slug */
  slug?: string;
  
  /** Updated content */
  content?: string;
  
  /** Updated excerpt */
  excerpt?: string;
  
  /** Updated featured image */
  featuredImage?: string;
  
  /** Updated publish status */
  isPublished?: boolean;
  
  /** Updated comment setting */
  allowComments?: boolean;
  
  /** Updated tags */
  tags?: string[];
  
  /** Updated categories */
  categories?: string[];
  
  /** Updated SEO metadata */
  seo?: Partial<SEOMetadata>;
}

/**
 * Options for listing blog posts
 */
export interface ListPostsOptions {
  /** Page number */
  page?: number;
  
  /** Items per page */
  limit?: number;
  
  /** Search query (searches title and content) */
  search?: string;
  
  /** Filter by author ID */
  authorId?: string;
  
  /** Filter by publish status */
  isPublished?: boolean;
  
  /** Filter by tags */
  tags?: string[];
  
  /** Filter by categories */
  categories?: string[];
  
  /** 
   * Sort field
   * @default "publishedAt"
   */
  sortBy?: 'publishedAt' | 'updatedAt' | 'title' | 'viewCount';
  
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
  
  /** 
   * Date range filter
   * @example { start: "2024-01-01", end: "2024-12-31" }
   */
  dateRange?: {
    start?: string;
    end?: string;
  };
}

/**
 * WebSocket API message format
 * 
 * @template TData - Type of message data
 */
export interface WebSocketMessage<TData = unknown> {
  /** 
   * Message type identifier
   * @example "user.updated"
   */
  type: string;
  
  /** Message data payload */
  data: TData;
  
  /** 
   * Message timestamp
   * @example "2024-01-15T10:00:00Z"
   */
  timestamp: string;
  
  /** 
   * Unique message identifier
   * @example "msg_123456789"
   */
  id?: string;
  
  /** 
   * Channel or room identifier
   * @example "user-notifications"
   */
  channel?: string;
}

/**
 * WebSocket connection configuration
 */
export interface WebSocketConfig {
  /** 
   * WebSocket URL
   * @example "wss://api.example.com/ws"
   */
  url: string;
  
  /** 
   * Authentication token
   */
  token?: string;
  
  /** 
   * Automatic reconnection settings
   */
  reconnect?: {
    /** Whether to auto-reconnect */
    enabled: boolean;
    /** Maximum retry attempts */
    maxAttempts: number;
    /** Delay between attempts (ms) */
    delay: number;
  };
  
  /** 
   * Heartbeat/ping configuration
   */
  heartbeat?: {
    /** Heartbeat interval (ms) */
    interval: number;
    /** Heartbeat timeout (ms) */
    timeout: number;
  };
}