/**
 * Tests for robots.txt generation functionality
 */

import robots from '../../app/robots';

// Helper function to get rules as a single object (handles both single rule and array)
function getRules(robotsData: ReturnType<typeof robots>) {
  return Array.isArray(robotsData.rules)
    ? robotsData.rules[0]
    : robotsData.rules;
}

describe('Robots.txt Generation', () => {
  describe('Basic Robot Directives', () => {
    it('should generate robots with correct basic structure', () => {
      const robotsData = robots();

      expect(robotsData).toHaveProperty('rules');
      expect(robotsData).toHaveProperty('sitemap');
    });

    it('should allow all user agents', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      expect(rules.userAgent).toBe('*');
    });

    it('should allow root path', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      expect(rules.allow).toBe('/');
    });

    it('should disallow _next directory', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      expect(rules.disallow).toBe('/_next/');
    });

    it('should reference the sitemap', () => {
      const robotsData = robots();

      expect(robotsData.sitemap).toBe('https://kennethheine.com/sitemap.xml');
    });
  });

  describe('Robots.txt Structure', () => {
    it('should return valid MetadataRoute.Robots structure', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      // Check main structure
      expect(robotsData).toHaveProperty('rules');
      expect(robotsData).toHaveProperty('sitemap');

      // Check rules structure
      expect(rules).toHaveProperty('userAgent');
      expect(rules).toHaveProperty('allow');
      expect(rules).toHaveProperty('disallow');

      // Check data types
      expect(typeof rules.userAgent).toBe('string');
      expect(typeof rules.allow).toBe('string');
      expect(typeof rules.disallow).toBe('string');
      expect(typeof robotsData.sitemap).toBe('string');
    });

    it('should use absolute URL for sitemap', () => {
      const robotsData = robots();

      expect(robotsData.sitemap).toMatch(/^https?:\/\//);
      expect(robotsData.sitemap).toContain('kennethheine.com');
    });

    it('should reference existing sitemap endpoint', () => {
      const robotsData = robots();

      expect(robotsData.sitemap).toBe('https://kennethheine.com/sitemap.xml');
    });
  });

  describe('SEO Best Practices', () => {
    it('should follow robots.txt protocol standards', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      // User-agent should be valid
      expect(rules.userAgent).toBeTruthy();
      expect((rules.userAgent as string).length).toBeGreaterThan(0);

      // Paths should start with /
      expect(rules.allow).toMatch(/^\//);
      expect(rules.disallow).toMatch(/^\//);

      // Sitemap should be a valid URL
      expect(robotsData.sitemap).toMatch(/^https?:\/\/.+\.xml$/);
    });

    it('should allow search engine crawling of main content', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      expect(rules.allow).toBe('/');
    });

    it('should protect Next.js internal files', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      expect(rules.disallow).toBe('/_next/');
    });

    it('should enable sitemap discovery', () => {
      const robotsData = robots();

      expect(robotsData.sitemap).toBeTruthy();
      expect(robotsData.sitemap).toContain('sitemap.xml');
    });
  });

  describe('URL Configuration', () => {
    it('should use correct base URL', () => {
      const robotsData = robots();

      expect(robotsData.sitemap).toContain('https://kennethheine.com');
    });

    it('should maintain consistency with site domain', () => {
      const robotsData = robots();

      // Should match the domain used throughout the site
      expect(robotsData.sitemap).toMatch(/kennethheine\.com/);
    });
  });

  describe('Content Accessibility', () => {
    it('should allow public pages to be crawled', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      // Root path allows access to all public content
      expect(rules.allow).toBe('/');
    });

    it('should disallow technical directories only', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      // Only _next should be disallowed (Next.js build artifacts)
      expect(rules.disallow).toBe('/_next/');
    });

    it('should not block any content directories', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      // Should not disallow any content paths like /blog, /about, etc.
      expect(rules.disallow).not.toContain('/blog');
      expect(rules.disallow).not.toContain('/about');
      expect(rules.disallow).not.toContain('/contact');
    });
  });

  describe('Search Engine Optimization', () => {
    it('should provide sitemap for search engine discovery', () => {
      const robotsData = robots();

      expect(robotsData.sitemap).toBeTruthy();
      expect(robotsData.sitemap).toContain('.xml');
    });

    it('should use wildcard user agent for broad compatibility', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      expect(rules.userAgent).toBe('*');
    });

    it('should follow standard robots.txt format', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      // Should have all required fields for valid robots.txt
      expect(rules).toHaveProperty('userAgent');
      expect(rules).toHaveProperty('allow');
      expect(rules).toHaveProperty('disallow');
      expect(robotsData).toHaveProperty('sitemap');
    });
  });

  describe('Static Export Compatibility', () => {
    it('should work with static site generation', () => {
      // The function should work without any dynamic dependencies
      expect(() => robots()).not.toThrow();
    });

    it('should return consistent data on multiple calls', () => {
      const first = robots();
      const second = robots();

      expect(first).toEqual(second);
    });

    it('should not depend on runtime environment', () => {
      const robotsData = robots();
      const rules = getRules(robotsData);

      // Should return deterministic content
      expect(rules.userAgent).toBe('*');
      expect(rules.allow).toBe('/');
      expect(rules.disallow).toBe('/_next/');
      expect(robotsData.sitemap).toBe('https://kennethheine.com/sitemap.xml');
    });
  });

  describe('Integration with Site Configuration', () => {
    it('should match the base URL used in sitemap', () => {
      const robotsData = robots();

      // Should use same domain as sitemap
      expect(robotsData.sitemap).toContain('kennethheine.com');
    });

    it('should reference the correct sitemap endpoint', () => {
      const robotsData = robots();

      // Should point to the sitemap.xml generated by app/sitemap.ts
      expect(robotsData.sitemap).toBe('https://kennethheine.com/sitemap.xml');
    });
  });

  describe('Performance and Efficiency', () => {
    it('should execute quickly', () => {
      const start = Date.now();
      robots();
      const duration = Date.now() - start;

      // Should complete in under 10ms for a simple robots.txt
      expect(duration).toBeLessThan(10);
    });

    it('should not perform expensive operations', () => {
      // Should not make any external calls or complex computations
      const spy = jest.spyOn(console, 'log');
      robots();
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
