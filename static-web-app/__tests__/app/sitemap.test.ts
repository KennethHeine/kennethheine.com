/**
 * Tests for sitemap generation functionality
 */

import sitemap from '../../app/sitemap';
import * as blogUtils from '../../lib/blog';

// Mock the blog utilities
jest.mock('../../lib/blog', () => ({
  getAllPosts: jest.fn(),
}));

const mockGetAllPosts = blogUtils.getAllPosts as jest.MockedFunction<
  typeof blogUtils.getAllPosts
>;

describe('Sitemap Generation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Static Pages', () => {
    it('should include all static pages with correct priorities', async () => {
      // Mock empty blog posts to test static pages only
      mockGetAllPosts.mockReturnValue([]);

      const sitemapData = sitemap();

      expect(sitemapData).toHaveLength(4);

      // Home page
      const homePage = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com'
      );
      expect(homePage).toBeDefined();
      expect(homePage?.priority).toBe(1);
      expect(homePage?.changeFrequency).toBe('monthly');

      // About page
      const aboutPage = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/about'
      );
      expect(aboutPage).toBeDefined();
      expect(aboutPage?.priority).toBe(0.9);
      expect(aboutPage?.changeFrequency).toBe('monthly');

      // Blog index page
      const blogPage = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/blog'
      );
      expect(blogPage).toBeDefined();
      expect(blogPage?.priority).toBe(0.8);
      expect(blogPage?.changeFrequency).toBe('weekly');

      // Contact page
      const contactPage = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/contact'
      );
      expect(contactPage).toBeDefined();
      expect(contactPage?.priority).toBe(0.7);
      expect(contactPage?.changeFrequency).toBe('monthly');
    });

    it('should have lastModified dates for static pages', async () => {
      mockGetAllPosts.mockReturnValue([]);

      const sitemapData = sitemap();

      sitemapData.forEach(entry => {
        expect(entry.lastModified).toBeInstanceOf(Date);
        expect(entry.lastModified).toBeTruthy();
      });
    });
  });

  describe('Dynamic Blog Pages', () => {
    it('should include blog posts with correct configuration', async () => {
      const mockPosts = [
        {
          slug: 'test-post-1',
          title: 'Test Post 1',
          date: '2025-06-01',
          excerpt: 'Test excerpt 1',
          content: 'Test content 1',
          tags: ['test'],
          published: true,
        },
        {
          slug: 'test-post-2',
          title: 'Test Post 2',
          date: '2025-05-30',
          excerpt: 'Test excerpt 2',
          content: 'Test content 2',
          tags: ['test'],
          published: true,
        },
      ];

      mockGetAllPosts.mockReturnValue(mockPosts);

      const sitemapData = sitemap();

      // Should have 4 static pages + 2 blog posts
      expect(sitemapData).toHaveLength(6);

      // Check first blog post
      const blogPost1 = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/blog/test-post-1'
      );
      expect(blogPost1).toBeDefined();
      expect(blogPost1?.priority).toBe(0.6);
      expect(blogPost1?.changeFrequency).toBe('weekly');
      expect(blogPost1?.lastModified).toEqual(new Date('2025-06-01'));

      // Check second blog post
      const blogPost2 = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/blog/test-post-2'
      );
      expect(blogPost2).toBeDefined();
      expect(blogPost2?.priority).toBe(0.6);
      expect(blogPost2?.changeFrequency).toBe('weekly');
      expect(blogPost2?.lastModified).toEqual(new Date('2025-05-30'));
    });

    it('should handle empty blog posts gracefully', async () => {
      mockGetAllPosts.mockReturnValue([]);

      const sitemapData = sitemap();

      // Should only have static pages
      expect(sitemapData).toHaveLength(4);

      // All URLs should be static pages
      const urls = sitemapData.map(entry => entry.url);
      expect(urls).toEqual([
        'https://kennethheine.com',
        'https://kennethheine.com/about',
        'https://kennethheine.com/blog',
        'https://kennethheine.com/contact',
      ]);
    });

    it('should use correct base URL for all entries', async () => {
      mockGetAllPosts.mockReturnValue([
        {
          slug: 'test-post',
          title: 'Test Post',
          date: '2025-06-01',
          excerpt: 'Test excerpt',
          content: 'Test content',
          tags: ['test'],
          published: true,
        },
      ]);

      const sitemapData = sitemap();

      sitemapData.forEach(entry => {
        expect(entry.url).toMatch(/^https:\/\/kennethheine\.com/);
      });
    });
  });

  describe('Sitemap Structure', () => {
    it('should return valid MetadataRoute.Sitemap structure', async () => {
      mockGetAllPosts.mockReturnValue([]);

      const sitemapData = sitemap();

      expect(Array.isArray(sitemapData)).toBe(true);

      sitemapData.forEach(entry => {
        expect(entry).toHaveProperty('url');
        expect(entry).toHaveProperty('lastModified');
        expect(entry).toHaveProperty('changeFrequency');
        expect(entry).toHaveProperty('priority');

        expect(typeof entry.url).toBe('string');
        expect(entry.lastModified).toBeInstanceOf(Date);
        expect(typeof entry.changeFrequency).toBe('string');
        expect(typeof entry.priority).toBe('number');
        expect(entry.priority).toBeGreaterThan(0);
        expect(entry.priority).toBeLessThanOrEqual(1);
      });
    });

    it('should have valid change frequencies', async () => {
      mockGetAllPosts.mockReturnValue([
        {
          slug: 'test-post',
          title: 'Test Post',
          date: '2025-06-01',
          excerpt: 'Test excerpt',
          content: 'Test content',
          tags: ['test'],
          published: true,
        },
      ]);

      const sitemapData = sitemap();

      const validFrequencies = [
        'always',
        'hourly',
        'daily',
        'weekly',
        'monthly',
        'yearly',
        'never',
      ];

      sitemapData.forEach(entry => {
        expect(validFrequencies).toContain(entry.changeFrequency);
      });
    });

    it('should maintain priority hierarchy', async () => {
      mockGetAllPosts.mockReturnValue([
        {
          slug: 'test-post',
          title: 'Test Post',
          date: '2025-06-01',
          excerpt: 'Test excerpt',
          content: 'Test content',
          tags: ['test'],
          published: true,
        },
      ]);

      const sitemapData = sitemap();

      const homePage = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com'
      );
      const aboutPage = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/about'
      );
      const blogPage = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/blog'
      );
      const contactPage = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/contact'
      );
      const blogPost = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/blog/test-post'
      );

      // Home page should have highest priority
      expect(homePage?.priority).toBe(1);

      // About page should be higher than blog
      expect(aboutPage?.priority).toBeGreaterThan(blogPage?.priority || 0);

      // Blog page should be higher than contact
      expect(blogPage?.priority).toBeGreaterThan(contactPage?.priority || 0);

      // Contact should be higher than blog posts
      expect(contactPage?.priority).toBeGreaterThan(blogPost?.priority || 0);
    });
  });

  describe('Date Handling', () => {
    it('should use blog post dates for lastModified', async () => {
      const testDate = '2025-01-15';
      mockGetAllPosts.mockReturnValue([
        {
          slug: 'dated-post',
          title: 'Dated Post',
          date: testDate,
          excerpt: 'Test excerpt',
          content: 'Test content',
          tags: ['test'],
          published: true,
        },
      ]);

      const sitemapData = sitemap();

      const blogPost = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/blog/dated-post'
      );
      expect(blogPost?.lastModified).toEqual(new Date(testDate));
    });

    it('should handle invalid dates gracefully', async () => {
      mockGetAllPosts.mockReturnValue([
        {
          slug: 'invalid-date-post',
          title: 'Invalid Date Post',
          date: 'invalid-date',
          excerpt: 'Test excerpt',
          content: 'Test content',
          tags: ['test'],
          published: true,
        },
      ]);

      const sitemapData = sitemap();

      const blogPost = sitemapData.find(
        entry => entry.url === 'https://kennethheine.com/blog/invalid-date-post'
      );
      expect(blogPost?.lastModified).toBeInstanceOf(Date);
      // Invalid dates become NaN dates, but the constructor still creates a Date object
      expect(blogPost?.lastModified).toBeDefined();
    });
  });

  describe('SEO Requirements', () => {
    it('should meet sitemap protocol requirements', async () => {
      mockGetAllPosts.mockReturnValue([]);

      const sitemapData = sitemap();

      // Should have absolute URLs
      sitemapData.forEach(entry => {
        expect(entry.url).toMatch(/^https?:\/\//);
      });

      // Should have valid priorities (0.0 to 1.0)
      sitemapData.forEach(entry => {
        expect(entry.priority).toBeGreaterThanOrEqual(0);
        expect(entry.priority).toBeLessThanOrEqual(1);
      });

      // Should have lastModified dates
      sitemapData.forEach(entry => {
        expect(entry.lastModified).toBeInstanceOf(Date);
      });
    });

    it('should provide comprehensive site coverage', async () => {
      const mockPosts = [
        {
          slug: 'post-1',
          title: 'Post 1',
          date: '2025-06-01',
          excerpt: 'Test excerpt',
          content: 'Test content',
          tags: ['test'],
          published: true,
        },
        {
          slug: 'post-2',
          title: 'Post 2',
          date: '2025-05-30',
          excerpt: 'Test excerpt',
          content: 'Test content',
          tags: ['test'],
          published: true,
        },
      ];

      mockGetAllPosts.mockReturnValue(mockPosts);

      const sitemapData = sitemap();

      // Should include all static pages
      expect(
        sitemapData.some(entry => entry.url === 'https://kennethheine.com')
      ).toBe(true);
      expect(
        sitemapData.some(
          entry => entry.url === 'https://kennethheine.com/about'
        )
      ).toBe(true);
      expect(
        sitemapData.some(entry => entry.url === 'https://kennethheine.com/blog')
      ).toBe(true);
      expect(
        sitemapData.some(
          entry => entry.url === 'https://kennethheine.com/contact'
        )
      ).toBe(true);

      // Should include all blog posts
      expect(
        sitemapData.some(
          entry => entry.url === 'https://kennethheine.com/blog/post-1'
        )
      ).toBe(true);
      expect(
        sitemapData.some(
          entry => entry.url === 'https://kennethheine.com/blog/post-2'
        )
      ).toBe(true);

      // Total should match static pages + blog posts
      expect(sitemapData).toHaveLength(4 + mockPosts.length);
    });
  });
});
