import { metadata as homeMetadata } from '../../app/page';
import { metadata as aboutMetadata } from '../../app/about/page';
import { metadata as blogMetadata } from '../../app/_blog/page';
import { metadata as contactMetadata } from '../../app/contact/page';

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
      expect(homeMetadata.openGraph?.title).toBe(
        'Kenneth Heine - AI & Automation for Developers'
      );
      expect(homeMetadata.openGraph?.url).toBe('https://kennethheine.com');
      expect(homeMetadata.openGraph?.images).toEqual([
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
      expect(aboutMetadata.openGraph?.title).toBe(
        'About Kenneth Heine - DevOps Engineer & Cloud Architect'
      );
      expect(aboutMetadata.openGraph?.url).toBe(
        'https://kennethheine.com/about'
      );
      expect(aboutMetadata.openGraph?.images).toEqual([
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
      expect(blogMetadata.openGraph?.title).toBe(
        'Blog - AI, DevOps & Cloud Architecture Insights'
      );
      expect(blogMetadata.openGraph?.url).toBe('https://kennethheine.com/blog');
      expect(blogMetadata.openGraph?.images).toEqual([
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
      expect(contactMetadata.openGraph?.title).toBe(
        'Contact Kenneth Heine - AI, DevOps & Cloud Consulting'
      );
      expect(contactMetadata.openGraph?.url).toBe(
        'https://kennethheine.com/contact'
      );
      expect(contactMetadata.openGraph?.images).toEqual([
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

      const homeImages = homeMetadata.openGraph?.images;
      const aboutImages = aboutMetadata.openGraph?.images;
      const blogImages = blogMetadata.openGraph?.images;
      const contactImages = contactMetadata.openGraph?.images;

      expect(
        Array.isArray(homeImages) ? homeImages[0]?.url : homeImages?.url
      ).toBe(expectedImage);
      expect(
        Array.isArray(aboutImages) ? aboutImages[0]?.url : aboutImages?.url
      ).toBe(expectedImage);
      expect(
        Array.isArray(blogImages) ? blogImages[0]?.url : blogImages?.url
      ).toBe(expectedImage);
      expect(
        Array.isArray(contactImages)
          ? contactImages[0]?.url
          : contactImages?.url
      ).toBe(expectedImage);
    });

    it('all pages have consistent image dimensions', () => {
      const expectedDimensions = { width: 1200, height: 630 };

      const homeImages = homeMetadata.openGraph?.images;
      const aboutImages = aboutMetadata.openGraph?.images;
      const blogImages = blogMetadata.openGraph?.images;
      const contactImages = contactMetadata.openGraph?.images;

      expect(
        Array.isArray(homeImages) ? homeImages[0] : homeImages
      ).toMatchObject(expectedDimensions);
      expect(
        Array.isArray(aboutImages) ? aboutImages[0] : aboutImages
      ).toMatchObject(expectedDimensions);
      expect(
        Array.isArray(blogImages) ? blogImages[0] : blogImages
      ).toMatchObject(expectedDimensions);
      expect(
        Array.isArray(contactImages) ? contactImages[0] : contactImages
      ).toMatchObject(expectedDimensions);
    });

    it('all pages have proper URL structure', () => {
      expect(homeMetadata.openGraph?.url).toBe('https://kennethheine.com');
      expect(aboutMetadata.openGraph?.url).toBe(
        'https://kennethheine.com/about'
      );
      expect(blogMetadata.openGraph?.url).toBe('https://kennethheine.com/blog');
      expect(contactMetadata.openGraph?.url).toBe(
        'https://kennethheine.com/contact'
      );
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
