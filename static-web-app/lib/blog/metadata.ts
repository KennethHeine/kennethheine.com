import matter from 'gray-matter';
import { BlogPostFrontmatter } from '../../types/blog';

/**
 * Process frontmatter from MDX content
 * @param content - Raw MDX content with frontmatter
 * @returns Processed frontmatter data and content
 */
export function processFrontmatter(content: string): {
  data: BlogPostFrontmatter;
  content: string;
} {
  const { data, content: processedContent } = matter(content);
  return {
    data: data as BlogPostFrontmatter,
    content: processedContent,
  };
}

/**
 * Validate frontmatter data
 * @param data - Frontmatter data to validate
 * @returns True if valid, false otherwise
 */
export function validateFrontmatter(data: unknown): data is BlogPostFrontmatter {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const frontmatter = data as Record<string, unknown>;
  
  // Title is required
  if (typeof frontmatter.title !== 'string' || !frontmatter.title.trim()) {
    return false;
  }

  // Date should be a valid date string if provided
  if (frontmatter.date && typeof frontmatter.date === 'string') {
    const date = new Date(frontmatter.date);
    if (isNaN(date.getTime())) {
      return false;
    }
  }

  // Tags should be an array of strings if provided
  if (frontmatter.tags && (!Array.isArray(frontmatter.tags) || 
      !frontmatter.tags.every(tag => typeof tag === 'string'))) {
    return false;
  }

  return true;
}