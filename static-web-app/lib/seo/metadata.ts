import { BlogPost } from '../../types/blog';

/**
 * Generate SEO metadata for a blog post
 * @param post - Blog post to generate metadata for
 * @param baseUrl - Base URL of the site
 * @returns SEO metadata object
 */
export function generateBlogPostMetadata(post: BlogPost, baseUrl: string = '') {
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    author: post.author || 'Kenneth Heine',
    publishedTime: post.date,
    url: `${baseUrl}/blog/${post.slug}`,
    image: post.coverImage ? `${baseUrl}${post.coverImage}` : undefined,
  };
}

/**
 * Generate SEO metadata for a page
 * @param title - Page title
 * @param description - Page description
 * @param path - Page path
 * @param baseUrl - Base URL of the site
 * @returns SEO metadata object
 */
export function generatePageMetadata(
  title: string,
  description: string,
  path: string = '',
  baseUrl: string = ''
) {
  return {
    title,
    description,
    url: `${baseUrl}${path}`,
    type: 'website',
  };
}

/**
 * Generate canonical URL for a page
 * @param path - Page path
 * @param baseUrl - Base URL of the site
 * @returns Canonical URL
 */
export function generateCanonicalUrl(path: string, baseUrl: string = ''): string {
  return `${baseUrl}${path}`;
}