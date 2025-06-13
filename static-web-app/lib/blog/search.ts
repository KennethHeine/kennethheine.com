import { BlogPost } from '../../types/blog';
import { getPostSlugs, getPostBySlug } from './parser';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * Get all published posts, sorted by date (newest first)
 * @returns Array of published BlogPost objects
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
 * @param tag - Tag to filter by
 * @returns Array of BlogPost objects with the specified tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post =>
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all unique tags from all posts
 * @returns Array of unique tag strings
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const allTags = allPosts.flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
}
