// Blog post types and interfaces

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  published: boolean
  readingTime?: number
  author?: string
  coverImage?: string
}

export interface BlogPostFrontmatter {
  title: string
  date: string
  excerpt?: string
  tags?: string[]
  published?: boolean
  author?: string
  coverImage?: string
}

export interface PaginatedPosts {
  posts: BlogPost[]
  currentPage: number
  totalPages: number
  totalPosts: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface BlogTag {
  name: string
  count: number
  slug: string
}