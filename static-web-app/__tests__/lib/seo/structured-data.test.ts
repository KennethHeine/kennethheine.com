import {
  generateBlogPostStructuredData,
  generateWebsiteStructuredData,
  generatePersonStructuredData,
} from '../../../lib/seo/structured-data';
import { BlogPost } from '../../../types/blog';

describe('SEO Structured Data utilities', () => {
  describe('generateBlogPostStructuredData', () => {
    const mockPost: BlogPost = {
      title: 'Understanding JavaScript Closures',
      slug: 'understanding-javascript-closures',
      date: '2024-01-15',
      excerpt: 'A comprehensive guide to understanding closures in JavaScript',
      content: 'Detailed content about closures...',
      tags: ['javascript', 'programming', 'web-development'],
      published: true,
      author: 'Jane Developer',
      readingTime: 8,
      coverImage: '/images/closures-cover.jpg',
    };

    it('generates complete structured data for blog post with all fields', () => {
      const result = generateBlogPostStructuredData(
        mockPost,
        'https://example.com'
      );

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Understanding JavaScript Closures',
        description:
          'A comprehensive guide to understanding closures in JavaScript',
        author: {
          '@type': 'Person',
          name: 'Jane Developer',
        },
        datePublished: '2024-01-15',
        dateModified: '2024-01-15',
        url: 'https://example.com/blog/understanding-javascript-closures',
        image: 'https://example.com/images/closures-cover.jpg',
        keywords: ['javascript', 'programming', 'web-development'],
        publisher: {
          '@type': 'Person',
          name: 'Kenneth Heine',
          url: 'https://example.com',
        },
      });
    });

    it('generates structured data without base URL', () => {
      const result = generateBlogPostStructuredData(mockPost);

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: 'Understanding JavaScript Closures',
        description:
          'A comprehensive guide to understanding closures in JavaScript',
        author: {
          '@type': 'Person',
          name: 'Jane Developer',
        },
        datePublished: '2024-01-15',
        dateModified: '2024-01-15',
        url: '/blog/understanding-javascript-closures',
        image: '/images/closures-cover.jpg',
        keywords: ['javascript', 'programming', 'web-development'],
        publisher: {
          '@type': 'Person',
          name: 'Kenneth Heine',
          url: '',
        },
      });
    });

    it('handles missing author field', () => {
      const postWithoutAuthor = { ...mockPost, author: undefined };
      const result = generateBlogPostStructuredData(
        postWithoutAuthor,
        'https://example.com'
      );

      expect(result.author).toEqual({
        '@type': 'Person',
        name: 'Kenneth Heine',
      });
    });

    it('handles missing cover image', () => {
      const postWithoutImage = { ...mockPost, coverImage: undefined };
      const result = generateBlogPostStructuredData(
        postWithoutImage,
        'https://example.com'
      );

      expect(result.image).toBeUndefined();
    });

    it('handles empty tags array', () => {
      const postWithoutTags = { ...mockPost, tags: [] };
      const result = generateBlogPostStructuredData(postWithoutTags);

      expect(result.keywords).toEqual([]);
    });

    it('handles single tag', () => {
      const postWithSingleTag = { ...mockPost, tags: ['javascript'] };
      const result = generateBlogPostStructuredData(postWithSingleTag);

      expect(result.keywords).toEqual(['javascript']);
    });

    it('uses post date for both published and modified dates', () => {
      const result = generateBlogPostStructuredData(
        mockPost,
        'https://example.com'
      );

      expect(result.datePublished).toBe('2024-01-15');
      expect(result.dateModified).toBe('2024-01-15');
    });

    it('includes proper schema.org context and type', () => {
      const result = generateBlogPostStructuredData(mockPost);

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('BlogPosting');
    });

    it('includes publisher information with Kenneth Heine as default', () => {
      const result = generateBlogPostStructuredData(
        mockPost,
        'https://example.com'
      );

      expect(result.publisher).toEqual({
        '@type': 'Person',
        name: 'Kenneth Heine',
        url: 'https://example.com',
      });
    });
  });

  describe('generateWebsiteStructuredData', () => {
    it('generates complete website structured data with base URL', () => {
      const result = generateWebsiteStructuredData('https://example.com');

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Kenneth Heine',
        description: 'Personal website and blog of Kenneth Heine',
        url: 'https://example.com',
        author: {
          '@type': 'Person',
          name: 'Kenneth Heine',
        },
      });
    });

    it('generates website structured data without base URL', () => {
      const result = generateWebsiteStructuredData();

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Kenneth Heine',
        description: 'Personal website and blog of Kenneth Heine',
        url: '',
        author: {
          '@type': 'Person',
          name: 'Kenneth Heine',
        },
      });
    });

    it('handles empty base URL parameter', () => {
      const result = generateWebsiteStructuredData('');

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Kenneth Heine',
        description: 'Personal website and blog of Kenneth Heine',
        url: '',
        author: {
          '@type': 'Person',
          name: 'Kenneth Heine',
        },
      });
    });

    it('includes proper schema.org context and type', () => {
      const result = generateWebsiteStructuredData('https://example.com');

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('WebSite');
    });

    it('includes author information', () => {
      const result = generateWebsiteStructuredData('https://example.com');

      expect(result.author).toEqual({
        '@type': 'Person',
        name: 'Kenneth Heine',
      });
    });

    it('uses consistent branding', () => {
      const result = generateWebsiteStructuredData('https://example.com');

      expect(result.name).toBe('Kenneth Heine');
      expect(result.description).toBe(
        'Personal website and blog of Kenneth Heine'
      );
      expect(result.author.name).toBe('Kenneth Heine');
    });
  });

  describe('generatePersonStructuredData', () => {
    it('generates complete person structured data with base URL', () => {
      const result = generatePersonStructuredData('https://example.com');

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Kenneth Heine',
        jobTitle: 'Cloud Architecture Consultant',
        description:
          'DevOps engineer and cloud architect passionate about bringing AI into software development',
        url: 'https://example.com/about',
        sameAs: [],
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
      });
    });

    it('generates person structured data without base URL', () => {
      const result = generatePersonStructuredData();

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Kenneth Heine',
        jobTitle: 'Cloud Architecture Consultant',
        description:
          'DevOps engineer and cloud architect passionate about bringing AI into software development',
        url: '/about',
        sameAs: [],
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
      });
    });

    it('includes proper schema.org context and type', () => {
      const result = generatePersonStructuredData('https://example.com');

      expect(result['@context']).toBe('https://schema.org');
      expect(result['@type']).toBe('Person');
    });

    it('includes professional information', () => {
      const result = generatePersonStructuredData('https://example.com');

      expect(result.name).toBe('Kenneth Heine');
      expect(result.jobTitle).toBe('Cloud Architecture Consultant');
      expect(result.description).toContain('DevOps engineer');
      expect(result.worksFor).toEqual({
        '@type': 'Organization',
        name: 'KS Cloud Solutions',
      });
    });

    it('includes knowledge areas', () => {
      const result = generatePersonStructuredData('https://example.com');

      expect(result.knowsAbout).toEqual([
        'Azure Cloud Architecture',
        'DevOps',
        'AI in Software Development',
        'Infrastructure as Code',
        'Automation',
        'GitHub Copilot',
        'CI/CD Pipelines',
      ]);
    });

    it('includes location information', () => {
      const result = generatePersonStructuredData('https://example.com');

      expect(result.address).toEqual({
        '@type': 'PostalAddress',
        addressCountry: 'DK',
      });
    });

    it('handles empty base URL parameter', () => {
      const result = generatePersonStructuredData('');

      expect(result.url).toBe('/about');
    });
  });
});
