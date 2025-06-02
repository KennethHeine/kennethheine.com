// --- file: types/blog/index.ts ---
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
  total: number
  currentPage: number
  totalPages: number
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
}

export interface BlogTag {
  name: string
  slug: string
  count: number
}

export interface BlogAuthor {
  name: string
  slug: string
  bio?: string
  avatar?: string
}
