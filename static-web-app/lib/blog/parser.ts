import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostFrontmatter } from '../../types/blog';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all post slugs from the posts directory
 * @returns Array of post slugs
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
 * @param slug - The post slug
 * @returns BlogPost object or null if not found
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
      date:
        frontmatter.date instanceof Date
          ? frontmatter.date.toISOString().split('T')[0]
          : frontmatter.date || new Date().toISOString().split('T')[0],
      excerpt: frontmatter.excerpt || frontmatter.summary || '',
      tags: frontmatter.tags || [],
      category: frontmatter.category,
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
