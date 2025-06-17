import { render } from '@testing-library/react';
import HomePage from '../../app/page';
import AboutPage from '../../app/about/page';
import BlogPostPage from '../../app/blog/[slug]/page';

// Mock the MDX processing for blog posts
jest.mock('../../lib/blog', () => ({
  getPostBySlug: jest.fn((slug: string) => {
    if (slug === 'test-post') {
      return {
        title: 'Test Blog Post',
        slug: 'test-post',
        date: '2024-01-15',
        excerpt: 'A test blog post excerpt',
        content: 'Test content',
        tags: ['javascript', 'testing'],
        published: true,
        author: 'Kenneth Heine',
        readingTime: 5,
        coverImage: '/images/test-cover.jpg',
      };
    }
    return null;
  }),
  getRelatedPosts: jest.fn(() => []),
}));

// Mock the EnhancedBlogContent component
jest.mock('../../components/blog', () => ({
  EnhancedBlogContent: ({ post }: { post: any }) => (
    <div data-testid='blog-content'>{post.title}</div>
  ),
  RelatedPosts: () => <div data-testid='related-posts'>Related posts</div>,
}));

describe('Structured Data Integration', () => {
  describe('HomePage structured data', () => {
    it('includes WebSite structured data script', () => {
      const { container } = render(<HomePage />);
      const script = container.querySelector(
        'script[type="application/ld+json"]'
      );

      expect(script).toBeInTheDocument();
      expect(script?.innerHTML).toContain('"@type": "WebSite"');
      expect(script?.innerHTML).toContain('"name": "Kenneth Heine"');
      expect(script?.innerHTML).toContain('"url": "https://kennethheine.com"');
    });

    it('includes proper WebSite schema structure', () => {
      const { container } = render(<HomePage />);
      const script = container.querySelector(
        'script[type="application/ld+json"]'
      );

      expect(script).toBeInTheDocument();
      const structuredData = JSON.parse(script?.innerHTML || '{}');

      expect(structuredData).toEqual({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Kenneth Heine',
        description: 'Personal website and blog of Kenneth Heine',
        url: 'https://kennethheine.com',
        author: {
          '@type': 'Person',
          name: 'Kenneth Heine',
        },
      });
    });
  });

  describe('AboutPage structured data', () => {
    it('includes Person structured data script', () => {
      const { container } = render(<AboutPage />);
      const script = container.querySelector(
        'script[type="application/ld+json"]'
      );

      expect(script).toBeInTheDocument();
      expect(script?.innerHTML).toContain('"@type": "Person"');
      expect(script?.innerHTML).toContain('"name": "Kenneth Heine"');
      expect(script?.innerHTML).toContain(
        '"jobTitle": "Cloud Architecture Consultant"'
      );
    });

    it('includes proper Person schema structure', () => {
      const { container } = render(<AboutPage />);
      const script = container.querySelector(
        'script[type="application/ld+json"]'
      );

      expect(script).toBeInTheDocument();
      const structuredData = JSON.parse(script?.innerHTML || '{}');

      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('Person');
      expect(structuredData.name).toBe('Kenneth Heine');
      expect(structuredData.jobTitle).toBe('Cloud Architecture Consultant');
      expect(structuredData.url).toBe('https://kennethheine.com/about');
      expect(structuredData.knowsAbout).toEqual([
        'Azure Cloud Architecture',
        'DevOps',
        'AI in Software Development',
        'Infrastructure as Code',
        'Automation',
        'GitHub Copilot',
        'CI/CD Pipelines',
      ]);
    });
  });

  describe('BlogPostPage structured data', () => {
    it('includes BlogPosting structured data script for valid post', () => {
      const { container } = render(
        <BlogPostPage params={{ slug: 'test-post' }} />
      );
      const script = container.querySelector(
        'script[type="application/ld+json"]'
      );

      expect(script).toBeInTheDocument();
      expect(script?.innerHTML).toContain('"@type": "BlogPosting"');
      expect(script?.innerHTML).toContain('"headline": "Test Blog Post"');
    });

    it('includes proper BlogPosting schema structure', () => {
      const { container } = render(
        <BlogPostPage params={{ slug: 'test-post' }} />
      );
      const script = container.querySelector(
        'script[type="application/ld+json"]'
      );

      expect(script).toBeInTheDocument();
      const structuredData = JSON.parse(script?.innerHTML || '{}');

      expect(structuredData['@context']).toBe('https://schema.org');
      expect(structuredData['@type']).toBe('BlogPosting');
      expect(structuredData.headline).toBe('Test Blog Post');
      expect(structuredData.description).toBe('A test blog post excerpt');
      expect(structuredData.url).toBe(
        'https://kennethheine.com/blog/test-post'
      );
      expect(structuredData.keywords).toEqual(['javascript', 'testing']);
      expect(structuredData.author.name).toBe('Kenneth Heine');
      expect(structuredData.publisher.name).toBe('Kenneth Heine');
    });
  });

  describe('JSON-LD validation', () => {
    it('all structured data is valid JSON', () => {
      // Test HomePage
      const { container: homeContainer } = render(<HomePage />);
      const homeScript = homeContainer.querySelector(
        'script[type="application/ld+json"]'
      );
      expect(() => JSON.parse(homeScript?.innerHTML || '')).not.toThrow();

      // Test AboutPage
      const { container: aboutContainer } = render(<AboutPage />);
      const aboutScript = aboutContainer.querySelector(
        'script[type="application/ld+json"]'
      );
      expect(() => JSON.parse(aboutScript?.innerHTML || '')).not.toThrow();

      // Test BlogPostPage
      const { container: blogContainer } = render(
        <BlogPostPage params={{ slug: 'test-post' }} />
      );
      const blogScript = blogContainer.querySelector(
        'script[type="application/ld+json"]'
      );
      expect(() => JSON.parse(blogScript?.innerHTML || '')).not.toThrow();
    });

    it('all structured data includes required schema.org properties', () => {
      // Test that all pages have @context and @type
      const pages = [
        { component: <HomePage />, expectedType: 'WebSite' },
        { component: <AboutPage />, expectedType: 'Person' },
        {
          component: <BlogPostPage params={{ slug: 'test-post' }} />,
          expectedType: 'BlogPosting',
        },
      ];

      pages.forEach(({ component, expectedType }) => {
        const { container } = render(component);
        const script = container.querySelector(
          'script[type="application/ld+json"]'
        );
        const data = JSON.parse(script?.innerHTML || '{}');

        expect(data['@context']).toBe('https://schema.org');
        expect(data['@type']).toBe(expectedType);
      });
    });
  });
});
