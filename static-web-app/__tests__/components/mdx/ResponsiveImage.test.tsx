import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResponsiveImage } from '../../../components/mdx/ResponsiveImage';

// Mock next/image
jest.mock('next/image', () => {
  const MockedImage = ({
    src,
    alt,
    fill,
    priority,
    sizes,
    className,
    quality,
    ...props
  }: any) => {
    return (
      <img
        src={src}
        alt={alt}
        data-fill={fill?.toString()}
        data-priority={priority?.toString()}
        data-sizes={sizes}
        data-quality={quality?.toString()}
        className={className}
        {...props}
      />
    );
  };
  return MockedImage;
});

describe('ResponsiveImage', () => {
  const defaultProps = {
    src: '/images/blog/test-image.jpg',
    alt: 'Test image description',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders image with basic props', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const image = screen.getByAltText('Test image description');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/blog/test-image.jpg');
  });

  it('renders figure element as container', () => {
    render(<ResponsiveImage {...defaultProps} testId='test-image' />);

    const figure = screen.getByTestId('test-image');
    expect(figure.tagName.toLowerCase()).toBe('figure');
  });

  it('applies default responsive sizes', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const image = screen.getByAltText('Test image description');
    const expectedSizes =
      '(min-width: 1024px) 800px, (min-width: 768px) 100vw, 100vw';
    expect(image).toHaveAttribute('data-sizes', expectedSizes);
  });

  it('sets fill prop to true by default', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const image = screen.getByAltText('Test image description');
    expect(image).toHaveAttribute('data-fill', 'true');
  });

  it('sets quality to 90 by default', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const image = screen.getByAltText('Test image description');
    expect(image).toHaveAttribute('data-quality', '90');
  });

  it('applies priority loading when specified', () => {
    render(<ResponsiveImage {...defaultProps} priority />);

    const image = screen.getByAltText('Test image description');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  it('does not apply priority loading by default', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const image = screen.getByAltText('Test image description');
    expect(image).toHaveAttribute('data-priority', 'false');
  });

  it('renders caption when provided', () => {
    const caption = 'Figure 1: Example architecture diagram';
    render(<ResponsiveImage {...defaultProps} caption={caption} />);

    const captionElement = screen.getByText(caption);
    expect(captionElement).toBeInTheDocument();
    expect(captionElement.tagName.toLowerCase()).toBe('figcaption');
  });

  it('does not render caption when not provided', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const figcaption = document.querySelector('figcaption');
    expect(figcaption).not.toBeInTheDocument();
  });

  it('applies custom width and height for aspect ratio', () => {
    render(<ResponsiveImage {...defaultProps} width={1200} height={600} />);

    const container = screen
      .getByAltText('Test image description')
      .closest('div');
    expect(container).toHaveStyle({ aspectRatio: '1200 / 600' });
  });

  it('applies default aspect ratio when dimensions not specified', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const container = screen
      .getByAltText('Test image description')
      .closest('div');
    expect(container).toHaveStyle({ aspectRatio: '800 / 400' });
  });

  it('applies custom className to figure element', () => {
    render(<ResponsiveImage {...defaultProps} className='custom-class' />);

    const figure = screen
      .getByAltText('Test image description')
      .closest('figure');
    expect(figure).toHaveClass('custom-class');
  });

  it('applies default styling classes', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const figure = screen
      .getByAltText('Test image description')
      .closest('figure');
    expect(figure).toHaveClass('my-8');

    const container = screen
      .getByAltText('Test image description')
      .closest('div');
    expect(container).toHaveClass(
      'relative',
      'w-full',
      'overflow-hidden',
      'rounded-lg',
      'bg-gray-100',
      'dark:bg-gray-800'
    );
  });

  it('applies image styling classes', () => {
    render(<ResponsiveImage {...defaultProps} />);

    const image = screen.getByAltText('Test image description');
    expect(image).toHaveClass(
      'object-cover',
      'transition-opacity',
      'duration-300'
    );
  });

  it('passes through additional props to figure element', () => {
    render(
      <ResponsiveImage
        {...defaultProps}
        data-custom='test-value'
        aria-describedby='image-description'
      />
    );

    const figure = screen
      .getByAltText('Test image description')
      .closest('figure');
    expect(figure).toHaveAttribute('data-custom', 'test-value');
    expect(figure).toHaveAttribute('aria-describedby', 'image-description');
  });

  describe('Mobile Optimization', () => {
    it('uses mobile-first responsive sizing', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const image = screen.getByAltText('Test image description');
      const sizes = image.getAttribute('data-sizes');

      // Should prioritize smaller sizes first (mobile-first)
      expect(sizes).toContain('100vw');
      expect(sizes).toContain('(min-width: 768px)');
      expect(sizes).toContain('(min-width: 1024px) 800px');
    });

    it('provides loading placeholder with background color', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const container = screen
        .getByAltText('Test image description')
        .closest('div');
      expect(container).toHaveClass('bg-gray-100', 'dark:bg-gray-800');
    });

    it('uses rounded corners for mobile-friendly design', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const container = screen
        .getByAltText('Test image description')
        .closest('div');
      expect(container).toHaveClass('rounded-lg');
    });

    it('includes smooth transition for loading states', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const image = screen.getByAltText('Test image description');
      expect(image).toHaveClass('transition-opacity', 'duration-300');
    });
  });

  describe('Accessibility', () => {
    it('provides semantic figure structure', () => {
      render(<ResponsiveImage {...defaultProps} caption='Test caption' />);

      const figure = screen.getByRole('img').closest('figure');
      const figcaption = screen.getByText('Test caption');

      expect(figure).toBeInTheDocument();
      expect(figcaption.tagName.toLowerCase()).toBe('figcaption');
    });

    it('requires alt text for accessibility', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'Test image description');
      expect(image.getAttribute('alt')).not.toBe('');
    });

    it('supports testId for component testing', () => {
      render(<ResponsiveImage {...defaultProps} testId='responsive-image' />);

      const figure = screen.getByTestId('responsive-image');
      expect(figure).toBeInTheDocument();
    });

    it('caption has appropriate styling for readability', () => {
      render(<ResponsiveImage {...defaultProps} caption='Test caption' />);

      const caption = screen.getByText('Test caption');
      expect(caption).toHaveClass(
        'mt-3',
        'text-center',
        'text-sm',
        'text-gray-600',
        'dark:text-gray-400'
      );
    });
  });

  describe('Performance', () => {
    it('uses high quality setting for sharp images', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const image = screen.getByAltText('Test image description');
      expect(image).toHaveAttribute('data-quality', '90');
    });

    it('supports priority loading for critical images', () => {
      render(<ResponsiveImage {...defaultProps} priority />);

      const image = screen.getByAltText('Test image description');
      expect(image).toHaveAttribute('data-priority', 'true');
    });

    it('uses lazy loading by default for performance', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const image = screen.getByAltText('Test image description');
      expect(image).toHaveAttribute('data-priority', 'false');
    });

    it('maintains aspect ratio to prevent layout shift', () => {
      render(<ResponsiveImage {...defaultProps} width={1600} height={800} />);

      const container = screen
        .getByAltText('Test image description')
        .closest('div');
      expect(container).toHaveStyle({ aspectRatio: '1600 / 800' });
    });
  });

  describe('Theme Support', () => {
    it('provides dark mode background color', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const container = screen
        .getByAltText('Test image description')
        .closest('div');
      expect(container).toHaveClass('dark:bg-gray-800');
    });

    it('provides light mode background color', () => {
      render(<ResponsiveImage {...defaultProps} />);

      const container = screen
        .getByAltText('Test image description')
        .closest('div');
      expect(container).toHaveClass('bg-gray-100');
    });

    it('caption supports dark mode text color', () => {
      render(<ResponsiveImage {...defaultProps} caption='Test caption' />);

      const caption = screen.getByText('Test caption');
      expect(caption).toHaveClass('dark:text-gray-400');
    });
  });
});
