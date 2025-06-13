import { BlogPost } from '../../types/blog';

/**
 * Generate JSON-LD structured data for a blog post
 * @param post - Blog post to generate structured data for
 * @param baseUrl - Base URL of the site
 * @returns JSON-LD structured data object
 */
export function generateBlogPostStructuredData(
  post: BlogPost,
  baseUrl: string = ''
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author || 'Kenneth Heine',
    },
    datePublished: post.date,
    dateModified: post.date,
    url: `${baseUrl}/blog/${post.slug}`,
    image: post.coverImage ? `${baseUrl}${post.coverImage}` : undefined,
    keywords: post.tags,
    publisher: {
      '@type': 'Person',
      name: 'Kenneth Heine',
      url: baseUrl,
    },
  };
}

/**
 * Generate JSON-LD structured data for the website
 * @param baseUrl - Base URL of the site
 * @returns JSON-LD structured data object
 */
export function generateWebsiteStructuredData(baseUrl: string = '') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kenneth Heine',
    description: 'Personal website and blog of Kenneth Heine',
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: 'Kenneth Heine',
    },
  };
}
