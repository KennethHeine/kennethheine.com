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
    // eslint-disable-next-line no-console
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

/**
 * Get all unique categories from all posts
 * @returns Array of unique category strings
 */
export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const allCategories = allPosts
    .map(post => post.category)
    .filter((category): category is string => Boolean(category));
  return Array.from(new Set(allCategories)).sort();
}

/**
 * Get posts by category
 * @param category - Category to filter by
 * @returns Array of BlogPost objects in the specified category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(
    post => post.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get related posts based on shared tags
 * @param currentPost - The current post to find related posts for
 * @param limit - Maximum number of related posts to return (default: 3)
 * @returns Array of related BlogPost objects
 */
export function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3
): BlogPost[] {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return [];
  }

  const allPosts = getAllPosts();

  // Calculate relevance score for each post
  const postsWithScores = allPosts
    .filter(post => post.slug !== currentPost.slug && post.tags.length > 0)
    .map(post => {
      // Count shared tags
      const sharedTags = post.tags.filter(tag =>
        currentPost.tags.includes(tag)
      );

      // Calculate relevance score
      let score = sharedTags.length;

      // Bonus points for same category
      if (
        post.category &&
        currentPost.category &&
        post.category === currentPost.category
      ) {
        score += 0.5;
      }

      return { post, score, sharedTags: sharedTags.length };
    })
    .filter(item => item.score > 0) // Only include posts with shared content
    .sort((a, b) => {
      // Sort by score (descending), then by date (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.post.date > b.post.date ? -1 : 1;
    });

  return postsWithScores.slice(0, limit).map(item => item.post);
}
