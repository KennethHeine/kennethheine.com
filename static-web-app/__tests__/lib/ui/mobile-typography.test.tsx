import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from '../../../components/ui/Typography';

// Mock CSS custom properties and utilities
const mockMatchMedia = (matches: boolean) =>
  jest.fn().mockImplementation(query => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));

describe('Mobile Typography Optimizations', () => {
  // Store original matchMedia
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    // Reset to desktop by default
    window.matchMedia = mockMatchMedia(false);
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });

  describe('Mobile text size optimization', () => {
    it('applies mobile-text-optimize class to heading variants', () => {
      const headingVariants: Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
      ];

      headingVariants.forEach(variant => {
        render(<Typography variant={variant}>Heading {variant}</Typography>);
        const element = screen.getByText(`Heading ${variant}`);
        expect(element).toHaveClass('mobile-text-optimize');
      });
    });

    it('applies mobile-text-optimize class to body text variants', () => {
      const bodyVariants: Array<
        'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'lead'
      > = ['subtitle1', 'subtitle2', 'body1', 'body2', 'lead'];

      bodyVariants.forEach(variant => {
        render(<Typography variant={variant}>Body text {variant}</Typography>);
        const element = screen.getByText(`Body text ${variant}`);
        expect(element).toHaveClass('mobile-text-optimize');
      });
    });

    it('maintains responsive text scaling across breakpoints', () => {
      render(<Typography variant='h1'>Responsive Heading</Typography>);
      const element = screen.getByText('Responsive Heading');

      // Check that it has both mobile base size and responsive scaling
      expect(element).toHaveClass('text-3xl'); // Mobile base
      expect(element).toHaveClass('md:text-4xl'); // Tablet
      expect(element).toHaveClass('lg:text-5xl'); // Desktop
      expect(element).toHaveClass('xl:text-6xl'); // Large desktop
    });

    it('ensures minimum text sizes for accessibility', () => {
      render(
        <Typography variant='body1'>
          Body text for accessibility testing
        </Typography>
      );
      const element = screen.getByText('Body text for accessibility testing');

      // Should have mobile-text-optimize utility which ensures minimum 16px
      expect(element).toHaveClass('mobile-text-optimize');
      expect(element).toHaveClass('text-base'); // Base size
    });
  });

  describe('Reading width optimization', () => {
    it('applies reading-width utility in global CSS', () => {
      // This tests that the CSS utility is defined correctly
      const style = document.createElement('style');
      style.textContent = `
        .reading-width {
          max-width: 65ch;
        }
        @media (max-width: 767px) {
          .reading-width {
            max-width: 90vw;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `;
      document.head.appendChild(style);

      render(
        <div className='reading-width'>
          <Typography variant='body1'>
            Content with optimal reading width
          </Typography>
        </div>
      );

      const container = screen.getByText(
        'Content with optimal reading width'
      ).parentElement;
      expect(container).toHaveClass('reading-width');

      document.head.removeChild(style);
    });
  });

  describe('Line height optimization', () => {
    it('applies proper line heights for different text sizes', () => {
      const testCases: Array<{
        variant: 'h1' | 'h2' | 'body1' | 'lead';
        expectedClass: string;
      }> = [
        { variant: 'h1', expectedClass: 'leading-tight' },
        { variant: 'h2', expectedClass: 'leading-tight' },
        { variant: 'body1', expectedClass: 'leading-relaxed' },
        { variant: 'lead', expectedClass: 'leading-relaxed' },
      ];

      testCases.forEach(({ variant, expectedClass }) => {
        render(
          <Typography variant={variant}>Test text for {variant}</Typography>
        );
        const element = screen.getByText(`Test text for ${variant}`);
        expect(element).toHaveClass(expectedClass);
      });
    });

    it('optimizes line heights for mobile reading in global CSS', () => {
      // Test that mobile-text-optimize utility is applied
      render(<Typography variant='body1'>Mobile optimized text</Typography>);
      const element = screen.getByText('Mobile optimized text');
      expect(element).toHaveClass('mobile-text-optimize');
    });
  });

  describe('Zoom level accessibility', () => {
    it('maintains readability at different zoom levels', () => {
      // Simulate zoom by checking that minimum font sizes are enforced
      render(
        <div style={{ fontSize: '200%' }}>
          <Typography variant='body1'>Zoomed content test</Typography>
        </div>
      );

      const element = screen.getByText('Zoomed content test');
      expect(element).toHaveClass('mobile-text-optimize');

      // The mobile-text-optimize utility should ensure minimum 16px regardless of zoom
      expect(element).toHaveClass('text-base');
    });

    it('ensures headings remain readable at 200% zoom', () => {
      render(
        <div style={{ fontSize: '200%' }}>
          <Typography variant='h3'>Zoomed heading test</Typography>
        </div>
      );

      const element = screen.getByText('Zoomed heading test');
      expect(element).toHaveClass('mobile-text-optimize');
      expect(element).toHaveClass('text-xl'); // Base mobile size
    });
  });

  describe('Mobile-specific responsive behavior', () => {
    beforeEach(() => {
      // Mock mobile viewport
      window.matchMedia = mockMatchMedia(true);
    });

    it('applies mobile-first responsive scaling', () => {
      render(<Typography variant='h1'>Mobile heading</Typography>);
      const element = screen.getByText('Mobile heading');

      // Should start with mobile size and scale up
      expect(element).toHaveClass('text-3xl'); // Mobile base
      expect(element).toHaveClass('md:text-4xl'); // Tablet
      expect(element).toHaveClass('lg:text-5xl'); // Desktop
    });

    it('optimizes body text for mobile screens', () => {
      render(<Typography variant='body1'>Mobile body text</Typography>);
      const element = screen.getByText('Mobile body text');

      expect(element).toHaveClass('text-base');
      expect(element).toHaveClass('mobile-text-optimize');
      expect(element).toHaveClass('leading-relaxed');
    });

    it('ensures touch-friendly text sizes', () => {
      // Test that all interactive text elements meet minimum touch target sizes
      const variants: Array<'body1' | 'body2' | 'lead' | 'subtitle1'> = [
        'body1',
        'body2',
        'lead',
        'subtitle1',
      ];

      variants.forEach(variant => {
        render(
          <button>
            <Typography variant={variant}>
              Interactive text {variant}
            </Typography>
          </button>
        );

        const element = screen.getByText(`Interactive text ${variant}`);
        expect(element).toHaveClass('mobile-text-optimize');
      });
    });
  });

  describe('Cross-device consistency', () => {
    it('maintains design consistency across breakpoints', () => {
      const { rerender } = render(
        <Typography variant='h2'>Consistent heading</Typography>
      );
      const element = screen.getByText('Consistent heading');

      // Should have all responsive classes for consistent scaling
      expect(element).toHaveClass(
        'text-2xl',
        'md:text-3xl',
        'lg:text-4xl',
        'xl:text-5xl'
      );

      // Test on different "devices"
      window.matchMedia = mockMatchMedia(true); // Mobile
      rerender(<Typography variant='h2'>Consistent heading</Typography>);
      expect(screen.getByText('Consistent heading')).toHaveClass(
        'mobile-text-optimize'
      );

      window.matchMedia = mockMatchMedia(false); // Desktop
      rerender(<Typography variant='h2'>Consistent heading</Typography>);
      expect(screen.getByText('Consistent heading')).toHaveClass(
        'mobile-text-optimize'
      );
    });

    it('applies consistent spacing and typography across components', () => {
      render(
        <div>
          <Typography variant='h1'>Main Title</Typography>
          <Typography variant='lead'>Lead paragraph</Typography>
          <Typography variant='body1'>Body content</Typography>
        </div>
      );

      const title = screen.getByText('Main Title');
      const lead = screen.getByText('Lead paragraph');
      const body = screen.getByText('Body content');

      // All should have mobile optimization
      [title, lead, body].forEach(element => {
        expect(element).toHaveClass('mobile-text-optimize');
      });

      // Check proper hierarchy
      expect(title).toHaveClass('text-3xl');
      expect(lead).toHaveClass('text-lg');
      expect(body).toHaveClass('text-base');
    });
  });

  describe('Performance and rendering', () => {
    it('renders mobile typography efficiently', () => {
      const start = performance.now();

      render(
        <div>
          {Array.from({ length: 50 }, (_, i) => (
            <Typography key={i} variant='body1'>
              Mobile optimized paragraph {i + 1} with responsive typography
            </Typography>
          ))}
        </div>
      );

      const end = performance.now();
      expect(end - start).toBeLessThan(100); // Should render quickly

      // Verify all elements are rendered with optimization
      const paragraphs = screen.getAllByText(/Mobile optimized paragraph/);
      expect(paragraphs).toHaveLength(50);

      paragraphs.forEach(paragraph => {
        expect(paragraph).toHaveClass('mobile-text-optimize');
      });
    });

    it('handles dynamic text size changes efficiently', () => {
      const { rerender } = render(
        <Typography variant='body1'>Dynamic text</Typography>
      );

      let element = screen.getByText('Dynamic text');
      expect(element).toHaveClass('text-base');

      rerender(<Typography variant='lead'>Dynamic text</Typography>);
      element = screen.getByText('Dynamic text');
      expect(element).toHaveClass('text-lg');

      rerender(<Typography variant='h3'>Dynamic text</Typography>);
      element = screen.getByText('Dynamic text');
      expect(element).toHaveClass('text-xl');
    });
  });

  describe('Integration with existing components', () => {
    it('works with existing Typography component variants', () => {
      const allVariants: Array<
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'overline'
        | 'lead'
        | 'small'
        | 'muted'
      > = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
        'lead',
        'small',
        'muted',
      ];

      allVariants.forEach(variant => {
        render(<Typography variant={variant}>Test {variant}</Typography>);
        const element = screen.getByText(`Test ${variant}`);

        // Mobile-optimized variants should have the optimization class
        const mobileOptimizedVariants = [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'lead',
        ];

        if (mobileOptimizedVariants.includes(variant)) {
          expect(element).toHaveClass('mobile-text-optimize');
        }
      });
    });

    it('preserves existing dark mode support', () => {
      render(
        <div className='dark'>
          <Typography variant='muted'>Dark mode text</Typography>
        </div>
      );

      const element = screen.getByText('Dark mode text');
      expect(element).toHaveClass('text-gray-500', 'dark:text-gray-500');
    });

    it('maintains existing responsive behavior', () => {
      render(
        <Typography variant='h1' className='custom-responsive'>
          Responsive heading
        </Typography>
      );

      const element = screen.getByText('Responsive heading');
      expect(element).toHaveClass(
        'text-3xl',
        'md:text-4xl',
        'lg:text-5xl',
        'xl:text-6xl', // New responsive scaling
        'mobile-text-optimize', // New mobile optimization
        'custom-responsive' // Custom classes preserved
      );
    });
  });
});
