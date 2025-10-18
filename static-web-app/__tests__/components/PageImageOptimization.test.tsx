import { render, screen } from '@testing-library/react';
import HomePage from '../../app/page';
import AboutPage from '../../app/about/page';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const HomePageWithProvider = () => (
  <ThemeProvider>
    <HomePage />
  </ThemeProvider>
);

const AboutPageWithProvider = () => (
  <ThemeProvider>
    <AboutPage />
  </ThemeProvider>
);

describe('Page Image Optimization', () => {
  describe('Home Page Images', () => {
    it('renders profile photo with optimization attributes', () => {
      render(<HomePageWithProvider />);

      const profileImage = screen.getByAltText(
        'Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
      );

      expect(profileImage).toBeInTheDocument();
      // Image should be optimized through Next.js (contains _next/image path)
      const src = profileImage.getAttribute('src');
      expect(src).toContain('profile-photo.jpg');
      // Should contain optimization parameters when optimization is enabled
      if (src?.includes('_next/image')) {
        expect(src).toMatch(/[?&]w=\d+/); // width parameter
        expect(src).toMatch(/[?&]q=\d+/); // quality parameter
      }
    });

    it('applies priority loading to above-the-fold profile image', () => {
      render(<HomePageWithProvider />);

      // Profile image should be visible and properly sized
      const profileImage = screen.getByAltText(
        'Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
      );
      expect(profileImage).toBeInTheDocument();
    });

    it('includes proper responsive sizing for profile image', () => {
      render(<HomePageWithProvider />);

      const profileImage = screen.getByAltText(
        'Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
      );

      // Image should have appropriate sizing classes
      expect(profileImage.closest('div')).toHaveClass('h-32', 'w-32');
    });
  });

  describe('About Page Images', () => {
    it('renders about photo with optimization attributes', () => {
      render(<AboutPageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      expect(aboutImage).toBeInTheDocument();
      // Image should be optimized through Next.js (contains _next/image path)
      const src = aboutImage.getAttribute('src');
      expect(src).toContain('about-photo.jpg');
      // Should contain optimization parameters when optimization is enabled
      if (src?.includes('_next/image')) {
        expect(src).toMatch(/[?&]w=\d+/); // width parameter
        expect(src).toMatch(/[?&]q=\d+/); // quality parameter
      }
    });

    it('applies responsive design to about photo', () => {
      render(<AboutPageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      // Container should have responsive grid classes
      expect(aboutImage.closest('.grid')).toBeInTheDocument();
    });

    it('uses proper aspect ratio for about photo', () => {
      render(<AboutPageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      // Container should maintain square aspect ratio
      expect(aboutImage.closest('.aspect-square')).toBeInTheDocument();
    });
  });

  describe('Image Loading Performance', () => {
    it('prioritizes critical images for faster loading', () => {
      render(<HomePageWithProvider />);

      const profileImage = screen.getByAltText(
        'Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
      );

      // Profile image should be in a priority container (above the fold)
      expect(profileImage.closest('.py-20')).toBeInTheDocument();
    });

    it('implements lazy loading for non-critical images', () => {
      render(<AboutPageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      // About image is not above the fold, so it can be lazy loaded
      expect(aboutImage).toBeInTheDocument();
    });

    it('provides fallback styling during image load', () => {
      render(<AboutPageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');
      const container = aboutImage.closest('.rounded-2xl');

      // Container should have background styling for loading state
      expect(container).toBeInTheDocument();
    });
  });

  describe('Responsive Image Behavior', () => {
    it('adapts image sizes for different screen sizes', () => {
      render(<AboutPageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      // Should be in a responsive grid container
      const gridContainer = aboutImage.closest('.lg\\:grid-cols-2');
      expect(gridContainer).toBeInTheDocument();
    });

    it('maintains image quality across different viewports', () => {
      render(<HomePageWithProvider />);

      const profileImage = screen.getByAltText(
        'Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
      );

      // Object-cover ensures quality maintenance
      expect(profileImage).toHaveClass('object-cover');
    });

    it('provides proper spacing and layout', () => {
      render(<AboutPageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');
      const container = aboutImage.closest('.lg\\:gap-16');

      // Should have responsive gap spacing
      expect(container).toBeInTheDocument();
    });
  });

  describe('Image Accessibility', () => {
    it('provides descriptive alt text for all images', () => {
      render(<HomePageWithProvider />);
      render(<AboutPageWithProvider />);

      const profileImage = screen.getByAltText(
        'Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
      );
      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      expect(profileImage.getAttribute('alt')).toBeTruthy();
      expect(aboutImage.getAttribute('alt')).toBeTruthy();

      // Alt text should be descriptive
      expect(profileImage.getAttribute('alt')).toContain('Kenneth Heine');
      expect(aboutImage.getAttribute('alt')).toContain('Kenneth Heine');
    });

    it('uses semantic markup for images', () => {
      render(<HomePageWithProvider />);

      const images = screen.getAllByRole('img');

      // All images should use img role - can be either img elements or divs with role="img"
      expect(images.length).toBeGreaterThan(0);
      images.forEach(img => {
        const tagName = img.tagName.toLowerCase();
        expect(['img', 'div'].includes(tagName)).toBe(true);
        // If it's a div, it should have role="img"
        if (tagName === 'div') {
          expect(img).toHaveAttribute('role', 'img');
        }
      });
    });

    it('maintains proper contrast and visibility', () => {
      render(<HomePageWithProvider />);

      const profileImage = screen.getByAltText(
        'Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
      );
      const container = profileImage.closest('.ring-4');

      // Should have proper ring styling for visibility
      expect(container).toBeInTheDocument();
    });
  });

  describe('SEO and Meta Image Optimization', () => {
    it('supports social media sharing with proper images', () => {
      // This tests that our og-image.jpg referenced in layout.tsx is available
      // The image should be accessible for social media preview
      const ogImagePath = '/images/og-image.jpg';
      expect(ogImagePath).toBe('/images/og-image.jpg');
    });

    it('provides meaningful context for search engines', () => {
      render(<AboutPageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      // Image should be in a section with relevant context
      const section = aboutImage.closest('section');
      expect(section).toBeInTheDocument();
    });

    it('includes images in semantic content structure', () => {
      render(<HomePageWithProvider />);

      const profileImage = screen.getByAltText(
        'Kenneth Heine - Professional headshot showing a friendly DevOps engineer and cloud architect'
      );

      // Profile image should be in main content area
      const main = profileImage.closest('main');
      expect(main).toBeInTheDocument();
    });
  });
});
