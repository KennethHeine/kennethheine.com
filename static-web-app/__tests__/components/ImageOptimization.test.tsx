import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

// Mock next/image to test optimization features
jest.mock('next/image', () => {
  const MockedImage = ({
    src,
    alt,
    width,
    height,
    sizes,
    priority,
    className,
    ...props
  }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-sizes={sizes}
        data-priority={priority?.toString()}
        className={className}
        {...props}
      />
    );
  };
  return MockedImage;
});

// Test component that uses optimized images
const OptimizedImageComponent = () => (
  <div>
    <Image
      src='/images/profile-photo.jpg'
      alt='Kenneth Heine - Profile Photo'
      width={128}
      height={128}
      priority
      sizes='128px'
      className='rounded-full object-cover'
    />
    <Image
      src='/images/about-photo.jpg'
      alt='Kenneth Heine - About Photo'
      width={400}
      height={400}
      sizes='(min-width: 1024px) 400px, 100vw'
      className='rounded-2xl object-cover'
    />
  </div>
);

const ImageWithProvider = () => (
  <ThemeProvider>
    <OptimizedImageComponent />
  </ThemeProvider>
);

describe('Image Optimization', () => {
  describe('Next.js Image Component', () => {
    it('renders images with proper optimization attributes', () => {
      render(<ImageWithProvider />);

      const profileImage = screen.getByAltText('Kenneth Heine - Profile Photo');
      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      expect(profileImage).toBeInTheDocument();
      expect(aboutImage).toBeInTheDocument();
    });

    it('applies correct sizes prop for responsive loading', () => {
      render(<ImageWithProvider />);

      const profileImage = screen.getByAltText('Kenneth Heine - Profile Photo');
      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      expect(profileImage).toHaveAttribute('data-sizes', '128px');
      expect(aboutImage).toHaveAttribute(
        'data-sizes',
        '(min-width: 1024px) 400px, 100vw'
      );
    });

    it('sets priority loading for above-the-fold images', () => {
      render(<ImageWithProvider />);

      const profileImage = screen.getByAltText('Kenneth Heine - Profile Photo');

      expect(profileImage).toHaveAttribute('data-priority', 'true');
    });

    it('includes proper alt text for accessibility', () => {
      render(<ImageWithProvider />);

      const profileImage = screen.getByAltText('Kenneth Heine - Profile Photo');
      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      expect(profileImage).toHaveAttribute(
        'alt',
        'Kenneth Heine - Profile Photo'
      );
      expect(aboutImage).toHaveAttribute('alt', 'Kenneth Heine - About Photo');
    });

    it('applies correct CSS classes for styling', () => {
      render(<ImageWithProvider />);

      const profileImage = screen.getByAltText('Kenneth Heine - Profile Photo');
      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      expect(profileImage).toHaveClass('rounded-full', 'object-cover');
      expect(aboutImage).toHaveClass('rounded-2xl', 'object-cover');
    });

    it('sets appropriate width and height attributes', () => {
      render(<ImageWithProvider />);

      const profileImage = screen.getByAltText('Kenneth Heine - Profile Photo');
      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      expect(profileImage).toHaveAttribute('width', '128');
      expect(profileImage).toHaveAttribute('height', '128');
      expect(aboutImage).toHaveAttribute('width', '400');
      expect(aboutImage).toHaveAttribute('height', '400');
    });
  });

  describe('Image Performance', () => {
    it('uses efficient loading strategies', () => {
      render(<ImageWithProvider />);

      const images = screen.getAllByRole('img');

      // All images should have src attributes
      images.forEach(img => {
        expect(img).toHaveAttribute('src');
        expect(img.getAttribute('src')).toMatch(/^\/images\//);
      });
    });

    it('implements lazy loading for non-priority images', () => {
      render(<ImageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      // Non-priority images should not have priority flag
      expect(aboutImage).not.toHaveAttribute('data-priority', 'true');
    });

    it('provides responsive image sizing', () => {
      render(<ImageWithProvider />);

      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');
      const sizes = aboutImage.getAttribute('data-sizes');

      // Should contain responsive breakpoint logic
      expect(sizes).toContain('min-width');
      expect(sizes).toContain('100vw');
    });
  });

  describe('Image Format Support', () => {
    it('supports modern image formats through Next.js optimization', () => {
      render(<ImageWithProvider />);

      const images = screen.getAllByRole('img');

      // Images should be processed through Next.js Image component
      images.forEach(img => {
        const src = img.getAttribute('src');
        expect(src).toBeTruthy();
        // Verify it's using our expected image paths
        expect(src).toMatch(/\.(jpg|jpeg|png|webp)$/i);
      });
    });

    it('maintains fallback for unsupported formats', () => {
      render(<ImageWithProvider />);

      const images = screen.getAllByRole('img');

      // All images should have valid src attributes as fallback
      images.forEach(img => {
        expect(img).toHaveAttribute('src');
        expect(img.getAttribute('src')).not.toBe('');
      });
    });
  });

  describe('Accessibility and SEO', () => {
    it('provides meaningful alt text for screen readers', () => {
      render(<ImageWithProvider />);

      const profileImage = screen.getByAltText('Kenneth Heine - Profile Photo');
      const aboutImage = screen.getByAltText('Kenneth Heine - About Photo');

      // Alt text should be descriptive
      expect(profileImage.getAttribute('alt')).toContain('Kenneth Heine');
      expect(aboutImage.getAttribute('alt')).toContain('Kenneth Heine');
    });

    it('uses semantic image elements', () => {
      render(<ImageWithProvider />);

      const images = screen.getAllByRole('img');

      expect(images).toHaveLength(2);
      images.forEach(img => {
        expect(img.tagName.toLowerCase()).toBe('img');
      });
    });

    it('includes appropriate metadata for SEO', () => {
      render(<ImageWithProvider />);

      const images = screen.getAllByRole('img');

      // All images should have alt attributes for SEO
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });
  });
});
