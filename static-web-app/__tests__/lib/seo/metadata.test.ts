import {
  generateBlogPostMetadata,
  generatePageMetadata,
  generateCanonicalUrl,
} from '../../../lib/seo/metadata';
import { BlogPost } from '../../../types/blog';

describe('SEO Metadata utilities', () => {
  describe('generateBlogPostMetadata', () => {
    const mockPost: BlogPost = {
      title: 'Test Blog Post',
      slug: 'test-blog-post',
      date: '2024-01-15',
      excerpt: 'This is a test blog post excerpt',
      content: 'Test content',
      tags: ['javascript', 'testing'],
      author: 'Test Author',
      readingTime: '5 min read',
      coverImage: '/images/test-cover.jpg',
    };

    it('generates complete metadata for blog post with all fields', () => {
      const result = generateBlogPostMetadata(mockPost, 'https://example.com');

      expect(result).toEqual({
        title: 'Test Blog Post',
        description: 'This is a test blog post excerpt',
        keywords: 'javascript, testing',
        author: 'Test Author',
        publishedTime: '2024-01-15',
        url: 'https://example.com/blog/test-blog-post',
        image: 'https://example.com/images/test-cover.jpg',
      });
    });

    it('generates metadata without base URL', () => {
      const result = generateBlogPostMetadata(mockPost);

      expect(result).toEqual({
        title: 'Test Blog Post',
        description: 'This is a test blog post excerpt',
        keywords: 'javascript, testing',
        author: 'Test Author',
        publishedTime: '2024-01-15',
        url: '/blog/test-blog-post',
        image: '/images/test-cover.jpg',
      });
    });

    it('handles missing author field', () => {
      const postWithoutAuthor = { ...mockPost, author: undefined };
      const result = generateBlogPostMetadata(postWithoutAuthor, 'https://example.com');

      expect(result.author).toBe('Kenneth Heine');
    });

    it('handles missing cover image', () => {
      const postWithoutImage = { ...mockPost, coverImage: undefined };
      const result = generateBlogPostMetadata(postWithoutImage, 'https://example.com');

      expect(result.image).toBeUndefined();
    });

    it('handles empty tags array', () => {
      const postWithoutTags = { ...mockPost, tags: [] };
      const result = generateBlogPostMetadata(postWithoutTags);

      expect(result.keywords).toBe('');
    });

    it('handles single tag', () => {
      const postWithSingleTag = { ...mockPost, tags: ['javascript'] };
      const result = generateBlogPostMetadata(postWithSingleTag);

      expect(result.keywords).toBe('javascript');
    });
  });

  describe('generatePageMetadata', () => {
    it('generates complete metadata for page with all parameters', () => {
      const result = generatePageMetadata(
        'About Page',
        'Learn more about us',
        '/about',
        'https://example.com'
      );

      expect(result).toEqual({
        title: 'About Page',
        description: 'Learn more about us',
        url: 'https://example.com/about',
        type: 'website',
      });
    });

    it('generates metadata with default path', () => {
      const result = generatePageMetadata(
        'Home Page',
        'Welcome to our site',
        undefined,
        'https://example.com'
      );

      expect(result).toEqual({
        title: 'Home Page',
        description: 'Welcome to our site',
        url: 'https://example.com',
        type: 'website',
      });
    });

    it('generates metadata without base URL', () => {
      const result = generatePageMetadata(
        'Contact Page',
        'Get in touch with us',
        '/contact'
      );

      expect(result).toEqual({
        title: 'Contact Page',
        description: 'Get in touch with us',
        url: '/contact',
        type: 'website',
      });
    });

    it('handles empty path and base URL', () => {
      const result = generatePageMetadata(
        'Test Page',
        'Test description'
      );

      expect(result).toEqual({
        title: 'Test Page',
        description: 'Test description',
        url: '',
        type: 'website',
      });
    });
  });

  describe('generateCanonicalUrl', () => {
    it('generates canonical URL with base URL and path', () => {
      const result = generateCanonicalUrl('/about', 'https://example.com');
      expect(result).toBe('https://example.com/about');
    });

    it('generates canonical URL without base URL', () => {
      const result = generateCanonicalUrl('/contact');
      expect(result).toBe('/contact');
    });

    it('handles empty path', () => {
      const result = generateCanonicalUrl('', 'https://example.com');
      expect(result).toBe('https://example.com');
    });

    it('handles root path', () => {
      const result = generateCanonicalUrl('/', 'https://example.com');
      expect(result).toBe('https://example.com/');
    });

    it('handles path with query parameters', () => {
      const result = generateCanonicalUrl('/blog?page=2', 'https://example.com');
      expect(result).toBe('https://example.com/blog?page=2');
    });
  });
});