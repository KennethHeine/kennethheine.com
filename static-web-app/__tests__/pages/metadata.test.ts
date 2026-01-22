import { metadata as homeMetadata } from '../../app/page';
import { metadata as aboutMetadata } from '../../app/about/page';
import { metadata as blogMetadata } from '../../app/_blog/page';
import { metadata as contactMetadata } from '../../app/contact/page';

// Helper to cast OpenGraph type for testing
type OpenGraphWithType = {
  type?: string;
  title?: string;
  url?: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
};

describe('Page Metadata', () => {
  describe('Home Page Metadata', () => {
    it('has complete metadata structure', () => {
      expect(homeMetadata).toBeDefined();
      expect(homeMetadata.title).toBe('Home');
      expect(homeMetadata.description).toContain('Kenneth Heine');
      expect(homeMetadata.description).toContain('AI');
      expect(homeMetadata.description).toContain('automation');
    });

    it('has OpenGraph metadata', () => {
      expect(homeMetadata.openGraph).toBeDefined();
      const og = homeMetadata.openGraph as OpenGraphWithType;
      expect(og?.title).toBe('Kenneth Heine - AI & Automation for Developers');
      expect(og?.type).toBe('website');
      expect(og?.url).toBe('https://kennethheine.com');
      expect(og?.images).toEqual([
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Kenneth Heine - AI & Automation for Developers',
        },
      ]);
    });
  });

  describe('About Page Metadata', () => {
    it('has complete metadata structure', () => {
      expect(aboutMetadata).toBeDefined();
      expect(aboutMetadata.title).toBe('About');
      expect(aboutMetadata.description).toContain('Kenneth Heine');
      expect(aboutMetadata.description).toContain('DevOps');
      expect(aboutMetadata.description).toContain('cloud architect');
    });

    it('has OpenGraph metadata', () => {
      expect(aboutMetadata.openGraph).toBeDefined();
      const og = aboutMetadata.openGraph as OpenGraphWithType;
      expect(og?.title).toBe(
        'About Kenneth Heine - DevOps Engineer & Cloud Architect'
      );
      expect(og?.type).toBe('website');
      expect(og?.url).toBe('https://kennethheine.com/about');
      expect(og?.images).toEqual([
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'About Kenneth Heine - DevOps Engineer & Cloud Architect',
        },
      ]);
    });
  });

  describe('Blog Page Metadata', () => {
    it('has complete metadata structure', () => {
      expect(blogMetadata).toBeDefined();
      expect(blogMetadata.title).toBe('Blog');
      expect(blogMetadata.description).toContain('AI automation');
      expect(blogMetadata.description).toContain('DevOps');
      expect(blogMetadata.description).toContain('Azure');
    });

    it('has OpenGraph metadata', () => {
      expect(blogMetadata.openGraph).toBeDefined();
      const og = blogMetadata.openGraph as OpenGraphWithType;
      expect(og?.title).toBe('Blog - AI, DevOps & Cloud Architecture Insights');
      expect(og?.type).toBe('website');
      expect(og?.url).toBe('https://kennethheine.com/blog');
      expect(og?.images).toEqual([
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Blog - AI, DevOps & Cloud Architecture Insights',
        },
      ]);
    });
  });

  describe('Contact Page Metadata', () => {
    it('has complete metadata structure', () => {
      expect(contactMetadata).toBeDefined();
      expect(contactMetadata.title).toBe('Contact');
      expect(contactMetadata.description).toContain('Kenneth Heine');
      expect(contactMetadata.description).toContain('AI automation');
      expect(contactMetadata.description).toContain('DevOps consulting');
    });

    it('has OpenGraph metadata', () => {
      expect(contactMetadata.openGraph).toBeDefined();
      const og = contactMetadata.openGraph as OpenGraphWithType;
      expect(og?.title).toBe(
        'Contact Kenneth Heine - AI, DevOps & Cloud Consulting'
      );
      expect(og?.type).toBe('website');
      expect(og?.url).toBe('https://kennethheine.com/contact');
      expect(og?.images).toEqual([
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Contact Kenneth Heine - AI, DevOps & Cloud Consulting',
        },
      ]);
    });
  });

  describe('Metadata Consistency', () => {
    it('all pages use the same OG image', () => {
      const expectedImage = '/images/og-image.jpg';
      const homeOg = homeMetadata.openGraph as OpenGraphWithType;
      const aboutOg = aboutMetadata.openGraph as OpenGraphWithType;
      const blogOg = blogMetadata.openGraph as OpenGraphWithType;
      const contactOg = contactMetadata.openGraph as OpenGraphWithType;

      expect(homeOg?.images?.[0]?.url).toBe(expectedImage);
      expect(aboutOg?.images?.[0]?.url).toBe(expectedImage);
      expect(blogOg?.images?.[0]?.url).toBe(expectedImage);
      expect(contactOg?.images?.[0]?.url).toBe(expectedImage);
    });

    it('all pages have consistent image dimensions', () => {
      const expectedDimensions = { width: 1200, height: 630 };
      const homeOg = homeMetadata.openGraph as OpenGraphWithType;
      const aboutOg = aboutMetadata.openGraph as OpenGraphWithType;
      const blogOg = blogMetadata.openGraph as OpenGraphWithType;
      const contactOg = contactMetadata.openGraph as OpenGraphWithType;

      expect(homeOg?.images?.[0]).toMatchObject(expectedDimensions);
      expect(aboutOg?.images?.[0]).toMatchObject(expectedDimensions);
      expect(blogOg?.images?.[0]).toMatchObject(expectedDimensions);
      expect(contactOg?.images?.[0]).toMatchObject(expectedDimensions);
    });

    it('all pages have proper URL structure', () => {
      const homeOg = homeMetadata.openGraph as OpenGraphWithType;
      const aboutOg = aboutMetadata.openGraph as OpenGraphWithType;
      const blogOg = blogMetadata.openGraph as OpenGraphWithType;
      const contactOg = contactMetadata.openGraph as OpenGraphWithType;
      expect(homeOg?.url).toBe('https://kennethheine.com');
      expect(aboutOg?.url).toBe('https://kennethheine.com/about');
      expect(blogOg?.url).toBe('https://kennethheine.com/blog');
      expect(contactOg?.url).toBe('https://kennethheine.com/contact');
    });

    it('all pages contain relevant SEO keywords', () => {
      // Check for consistent use of key terms
      const keyTerms = ['Kenneth Heine', 'AI', 'DevOps', 'cloud'];

      const allDescriptions = [
        homeMetadata.description,
        aboutMetadata.description,
        blogMetadata.description,
        contactMetadata.description,
      ];

      keyTerms.forEach(term => {
        const descriptionsWithTerm = allDescriptions.filter(desc =>
          desc?.toLowerCase().includes(term.toLowerCase())
        );
        expect(descriptionsWithTerm.length).toBeGreaterThan(0);
      });
    });
  });
});
