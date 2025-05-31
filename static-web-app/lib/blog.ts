import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost, BlogPostFrontmatter } from '../types/blog'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * Get all post slugs from the posts directory
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const allFiles = fs.readdirSync(postsDirectory)
  return allFiles
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const frontmatter = data as BlogPostFrontmatter
  
  return {
    slug,
    title: frontmatter.title || '',
    date: frontmatter.date || '',
    excerpt: frontmatter.excerpt || '',
    tags: frontmatter.tags || [],
    published: frontmatter.published !== false, // Default to true if not specified
    content,
    author: frontmatter.author,
    coverImage: frontmatter.coverImage,
  }
}

/**
 * Get all published posts, sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
  
  return posts
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => 
    post.tags.some((postTag) => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const allTags = allPosts.flatMap((post) => post.tags)
  return Array.from(new Set(allTags))
}