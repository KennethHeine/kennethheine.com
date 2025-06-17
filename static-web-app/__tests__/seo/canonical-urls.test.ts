// --- file: __tests__/seo/canonical-urls.test.ts ---
import { metadata as homeMetadata } from '@/app/page';
import { metadata as aboutMetadata } from '@/app/about/page';
import { metadata as blogMetadata } from '@/app/blog/page';
import { metadata as contactMetadata } from '@/app/contact/page';
import { metadata as notFoundMetadata } from '@/app/not-found';
import { generateMetadata as generateBlogPostMetadata } from '@/app/blog/[slug]/page';

// Mock blog functions
jest.mock('@/lib/blog', () => ({
  getPostBySlug: jest.fn(),
}));

import { getPostBySlug } from '@/lib/blog';

describe('Canonical URLs Implementation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Static Pages Canonical URLs', () => {
    it('home page has correct canonical URL', () => {
      expect(homeMetadata.alternates?.canonical).toBe(
        'https://kennethheine.com'
      );
    });

    it('about page has correct canonical URL', () => {
      expect(aboutMetadata.alternates?.canonical).toBe(
        'https://kennethheine.com/about'
      );
    });

    it('blog page has correct canonical URL', () => {
      expect(blogMetadata.alternates?.canonical).toBe(
        'https://kennethheine.com/blog'
      );
    });

    it('contact page has correct canonical URL', () => {
      expect(contactMetadata.alternates?.canonical).toBe(
        'https://kennethheine.com/contact'
      );
    });

    it('404 page has correct canonical URL', () => {
      expect(notFoundMetadata.alternates?.canonical).toBe(
        'https://kennethheine.com/404'
      );
    });
  });

  describe('Dynamic Pages Canonical URLs', () => {
    const mockPost = {
      slug: 'test-blog-post',
      title: 'Test Blog Post',
      excerpt: 'This is a test blog post excerpt',
      content: 'Test content',
      date: '2024-01-15',
      tags: ['test', 'blog'],
      category: 'Technology',
      readingTime: 5,
    };

    it('blog post pages have correct canonical URLs', async () => {
      const mockGetPostBySlug = getPostBySlug as jest.MockedFunction<
        typeof getPostBySlug
      >;
      mockGetPostBySlug.mockReturnValue(mockPost);

      const metadata = await generateBlogPostMetadata({
        params: { slug: 'test-blog-post' },
      });

      expect(metadata.alternates?.canonical).toBe(
        'https://kennethheine.com/blog/test-blog-post'
      );
      expect(mockGetPostBySlug).toHaveBeenCalledWith('test-blog-post');
    });

    it('handles blog post with special characters in slug', async () => {
      const specialSlugPost = {
        ...mockPost,
        slug: 'test-post-with-dashes-and-numbers-123',
      };

      const mockGetPostBySlug = getPostBySlug as jest.MockedFunction<
        typeof getPostBySlug
      >;
      mockGetPostBySlug.mockReturnValue(specialSlugPost);

      const metadata = await generateBlogPostMetadata({
        params: { slug: 'test-post-with-dashes-and-numbers-123' },
      });

      expect(metadata.alternates?.canonical).toBe(
        'https://kennethheine.com/blog/test-post-with-dashes-and-numbers-123'
      );
    });

    it('handles non-existent blog post', async () => {
      const mockGetPostBySlug = getPostBySlug as jest.MockedFunction<
        typeof getPostBySlug
      >;
      mockGetPostBySlug.mockReturnValue(null);

      const metadata = await generateBlogPostMetadata({
        params: { slug: 'non-existent-post' },
      });

      // Should not have canonical URL for non-existent posts
      expect(metadata.alternates?.canonical).toBeUndefined();
      expect(metadata.title).toBe('Post Not Found');
    });
  });

  describe('Canonical URL Format Validation', () => {
    const canonicalUrls = [
      homeMetadata.alternates?.canonical,
      aboutMetadata.alternates?.canonical,
      blogMetadata.alternates?.canonical,
      contactMetadata.alternates?.canonical,
      notFoundMetadata.alternates?.canonical,
    ];

    it('all canonical URLs use HTTPS protocol', () => {
      canonicalUrls.forEach(url => {
        expect(url).toMatch(/^https:\/\//);
      });
    });

    it('all canonical URLs use the correct domain', () => {
      canonicalUrls.forEach(url => {
        expect(url).toMatch(/^https:\/\/kennethheine\.com/);
      });
    });

    it('canonical URLs do not have trailing slashes (except root)', () => {
      canonicalUrls.forEach(url => {
        if (url !== 'https://kennethheine.com') {
          expect(url).not.toMatch(/\/$/);
        }
      });
    });

    it('canonical URLs are properly formatted', () => {
      const urlPattern = /^https:\/\/kennethheine\.com(\/[a-z0-9-]*)*$/;
      canonicalUrls.forEach(url => {
        expect(url).toMatch(urlPattern);
      });
    });
  });

  describe('SEO Best Practices', () => {
    const metadataObjects = [
      { name: 'home', metadata: homeMetadata },
      { name: 'about', metadata: aboutMetadata },
      { name: 'blog', metadata: blogMetadata },
      { name: 'contact', metadata: contactMetadata },
      { name: 'not-found', metadata: notFoundMetadata },
    ];

    it('all pages have canonical URLs defined', () => {
      metadataObjects.forEach(({ name: _name, metadata }) => {
        expect(metadata.alternates?.canonical).toBeDefined();
        expect(metadata.alternates?.canonical).toBeTruthy();
      });
    });

    it('canonical URLs match OpenGraph URLs where applicable', () => {
      metadataObjects.forEach(({ name: _name, metadata }) => {
        if (metadata.openGraph?.url) {
          expect(metadata.alternates?.canonical).toBe(metadata.openGraph.url);
        }
      });
    });

    it('canonical URLs are absolute URLs', () => {
      metadataObjects.forEach(({ name: _name, metadata }) => {
        const canonical = metadata.alternates?.canonical;
        expect(canonical).toMatch(/^https?:\/\//);
      });
    });
  });

  describe('URL Structure Consistency', () => {
    it('maintains clean URL structure without query parameters', () => {
      const canonicalUrls = [
        homeMetadata.alternates?.canonical,
        aboutMetadata.alternates?.canonical,
        blogMetadata.alternates?.canonical,
        contactMetadata.alternates?.canonical,
      ];

      canonicalUrls.forEach(url => {
        expect(url).not.toContain('?');
        expect(url).not.toContain('#');
        expect(url).not.toContain('&');
      });
    });

    it('uses consistent path structure', () => {
      expect(aboutMetadata.alternates?.canonical).toBe(
        'https://kennethheine.com/about'
      );
      expect(blogMetadata.alternates?.canonical).toBe(
        'https://kennethheine.com/blog'
      );
      expect(contactMetadata.alternates?.canonical).toBe(
        'https://kennethheine.com/contact'
      );
    });

    it('blog posts follow consistent pattern', async () => {
      const mockGetPostBySlug = getPostBySlug as jest.MockedFunction<
        typeof getPostBySlug
      >;
      mockGetPostBySlug.mockReturnValue({
        slug: 'example-post',
        title: 'Example Post',
        excerpt: 'Example excerpt',
        content: 'Example content',
        date: '2024-01-15',
        tags: ['example'],
        category: 'Technology',
        readingTime: 5,
      });

      const metadata = await generateBlogPostMetadata({
        params: { slug: 'example-post' },
      });

      expect(metadata.alternates?.canonical).toBe(
        'https://kennethheine.com/blog/example-post'
      );
    });
  });
});
