import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostFrontmatter } from '../types/blog';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all post slugs from the posts directory
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const allFiles = fs.readdirSync(postsDirectory);
  return allFiles
    .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.(mdx|md)$/, ''));
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    // Try .mdx first
    let fullPath = path.join(postsDirectory, `${slug}.mdx`);
    let fileContents: string;
    
    try {
      fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch {
      // If .mdx fails, try .md
      fullPath = path.join(postsDirectory, `${slug}.md`);
      fileContents = fs.readFileSync(fullPath, 'utf8');
    }

    const { data, content } = matter(fileContents);
    const frontmatter = data as BlogPostFrontmatter;

    return {
      slug,
      title: frontmatter.title || 'Untitled',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      excerpt: frontmatter.excerpt || frontmatter.summary || '',
      tags: frontmatter.tags || [],
      published: frontmatter.published !== false, // Default to true if not specified
      content,
      author: frontmatter.author,
      coverImage: frontmatter.coverImage,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all published posts, sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory not found, returning empty array');
    return [];
  }

  const slugs = getPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post =>
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const allTags = allPosts.flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
}
