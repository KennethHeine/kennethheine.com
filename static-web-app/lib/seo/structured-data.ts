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

/**
 * Generate JSON-LD structured data for a Person (Kenneth Heine)
 * @param baseUrl - Base URL of the site
 * @returns JSON-LD structured data object
 */
export function generatePersonStructuredData(baseUrl: string = '') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kenneth Heine',
    jobTitle: 'Cloud Architecture Consultant',
    description:
      'DevOps engineer and cloud architect passionate about bringing AI into software development',
    url: `${baseUrl}/about`,
    sameAs: [
      // Add social media profiles when available
    ],
    knowsAbout: [
      'Azure Cloud Architecture',
      'DevOps',
      'AI in Software Development',
      'Infrastructure as Code',
      'Automation',
      'GitHub Copilot',
      'CI/CD Pipelines',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'KS Cloud Solutions',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DK',
    },
  };
}
