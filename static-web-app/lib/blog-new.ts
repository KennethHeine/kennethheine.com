// --- file: lib/blog.ts ---
/**
 * Blog utilities for handling MDX files and blog post operations
 * This module provides functions to read, parse, and process blog posts
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types/blog'

// Directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * Get all blog posts from the content directory
 * Returns posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  // Ensure the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory not found, returning empty array')
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    .filter(name => name.endsWith('.mdx') || name.endsWith('.md'))
    .map((fileName) => {      const slug = fileName.replace(/\.(mdx|md)$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Parse the frontmatter and content
      const { data, content } = matter(fileContents)
      
      return {
        slug,
        content,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || data.summary || '',
        tags: data.tags || [],
        published: data.published !== false,
      } as BlogPost
    })
  
  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

/**
 * Get a specific blog post by its slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    // Try .mdx first, then .md
    let fileContents: string
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8')
    } catch {
      const mdPath = path.join(postsDirectory, `${slug}.md`)
      fileContents = fs.readFileSync(mdPath, 'utf8')
    }
    
    const { data, content } = matter(fileContents)
      return {
      slug,
      content,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || data.summary || '',
      tags: data.tags || [],
      published: data.published !== false,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => 
    post.tags && post.tags.includes(tag)
  )
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tagSet = new Set<string>()
  
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag))
    }
  })
  
  return Array.from(tagSet).sort()
}
