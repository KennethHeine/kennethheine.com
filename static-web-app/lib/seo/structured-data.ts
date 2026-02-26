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
    description:
      'Kenneth Heine helps project leaders make technical decisions so the plan holds. Technical advisor for Azure cloud and platform projects.',
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
    jobTitle: 'Technical Advisor – Azure & Platform Delivery',
    description:
      'Technical advisor helping project leaders make technical decisions so the plan holds',
    url: `${baseUrl}/about`,
    sameAs: [
      // Add social media profiles when available
    ],
    knowsAbout: [
      'Azure Cloud Architecture',
      'Technical Advisory',
      'Vendor Management',
      'Risk Assessment',
      'Go-Live Readiness',
      'DevOps',
      'CI/CD Pipelines',
      'Platform Delivery',
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
