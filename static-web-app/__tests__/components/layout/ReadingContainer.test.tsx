import React from 'react';
import { render, screen } from '@testing-library/react';
import ReadingContainer from '../../../components/layout/ReadingContainer';

describe('ReadingContainer component', () => {
  describe('Basic rendering', () => {
    it('renders children correctly', () => {
      render(
        <ReadingContainer>
          <p>Test content</p>
        </ReadingContainer>
      );

      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies default classes for reading optimization', () => {
      render(
        <ReadingContainer>
          <p>Test content</p>
        </ReadingContainer>
      );

      const container = screen.getByText('Test content').parentElement;
      expect(container).toHaveClass('mx-auto', 'max-w-3xl');
    });

    it('applies mobile optimization classes by default', () => {
      render(
        <ReadingContainer>
          <p>Test content</p>
        </ReadingContainer>
      );

      const container = screen.getByText('Test content').parentElement;
      expect(container).toHaveClass('reading-width', 'px-4', 'sm:px-6');
    });

    it('accepts custom className', () => {
      render(
        <ReadingContainer className='custom-class'>
          <p>Test content</p>
        </ReadingContainer>
      );

      const container = screen.getByText('Test content').parentElement;
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Mobile optimization', () => {
    it('applies mobile optimization classes when enabled', () => {
      render(
        <ReadingContainer mobileOptimized={true}>
          <p>Test content</p>
        </ReadingContainer>
      );

      const container = screen.getByText('Test content').parentElement;
      expect(container).toHaveClass('reading-width', 'px-4', 'sm:px-6');
    });

    it('does not apply mobile optimization classes when disabled', () => {
      render(
        <ReadingContainer mobileOptimized={false}>
          <p>Test content</p>
        </ReadingContainer>
      );

      const container = screen.getByText('Test content').parentElement;
      expect(container).not.toHaveClass('reading-width');
      expect(container).not.toHaveClass('px-4');
      expect(container).not.toHaveClass('sm:px-6');
    });

    it('maintains base classes when mobile optimization is disabled', () => {
      render(
        <ReadingContainer mobileOptimized={false}>
          <p>Test content</p>
        </ReadingContainer>
      );

      const container = screen.getByText('Test content').parentElement;
      expect(container).toHaveClass('mx-auto', 'max-w-3xl');
    });
  });

  describe('Content rendering', () => {
    it('renders multiple children correctly', () => {
      render(
        <ReadingContainer>
          <h1>Title</h1>
          <p>Content paragraph</p>
          <div>Additional content</div>
        </ReadingContainer>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content paragraph')).toBeInTheDocument();
      expect(screen.getByText('Additional content')).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <ReadingContainer>
          <article>
            <header>
              <h1>Article Title</h1>
            </header>
            <section>
              <p>
                Article content with <strong>bold text</strong>
              </p>
            </section>
          </article>
        </ReadingContainer>
      );

      expect(screen.getByText('Article Title')).toBeInTheDocument();
      expect(screen.getByText(/Article content with/)).toBeInTheDocument();
      expect(screen.getByText('bold text')).toBeInTheDocument();
    });

    it('handles empty content gracefully', () => {
      render(<ReadingContainer />);

      const container = document.querySelector('.mx-auto');
      expect(container).toBeInTheDocument();
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('Accessibility and readability', () => {
    it('provides optimal reading width for accessibility', () => {
      render(
        <ReadingContainer>
          <p>
            Long content that benefits from optimized line length for better
            readability and reduced eye strain during extended reading sessions
          </p>
        </ReadingContainer>
      );

      const container = screen.getByText(/Long content/).parentElement;
      expect(container).toHaveClass('max-w-3xl');
    });

    it('supports responsive design', () => {
      render(
        <ReadingContainer>
          <p>Responsive content</p>
        </ReadingContainer>
      );

      const container = screen.getByText('Responsive content').parentElement;
      expect(container).toHaveClass('px-4', 'sm:px-6');
    });

    it('maintains semantic structure', () => {
      render(
        <ReadingContainer>
          <h1>Semantic Heading</h1>
          <p>Semantic paragraph content</p>
        </ReadingContainer>
      );

      // Check that semantic elements are preserved
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Semantic Heading'
      );
      expect(screen.getByText('Semantic paragraph content').tagName).toBe('P');
    });
  });

  describe('Performance and optimization', () => {
    it('renders efficiently with large content', () => {
      const largeContent = 'Large content text for testing performance';

      const start = performance.now();
      render(
        <ReadingContainer>
          <p>{largeContent}</p>
        </ReadingContainer>
      );
      const end = performance.now();

      expect(end - start).toBeLessThan(100); // Should render quickly
      expect(screen.getByText(largeContent)).toBeInTheDocument();
    });

    it('handles multiple re-renders efficiently', () => {
      let renderCount = 0;

      const TestComponent = ({ content }: { content: string }) => {
        renderCount++;
        return (
          <ReadingContainer>
            <p>{content}</p>
          </ReadingContainer>
        );
      };

      const { rerender } = render(<TestComponent content='Initial content' />);
      expect(renderCount).toBe(1);

      rerender(<TestComponent content='Updated content' />);
      expect(renderCount).toBe(2);
      expect(screen.getByText('Updated content')).toBeInTheDocument();
    });
  });

  describe('Integration with Typography', () => {
    it('works well with typography components', () => {
      render(
        <ReadingContainer>
          <h1 className='text-3xl font-bold'>Main Heading</h1>
          <p className='text-lg leading-relaxed'>
            Paragraph with optimized typography
          </p>
        </ReadingContainer>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      const paragraph = screen.getByText('Paragraph with optimized typography');

      expect(heading).toHaveClass('text-3xl', 'font-bold');
      expect(paragraph).toHaveClass('text-lg', 'leading-relaxed');
    });

    it('maintains text styling within reading container', () => {
      render(
        <ReadingContainer className='reading-width'>
          <div className='prose prose-lg'>
            <h2>Prose Heading</h2>
            <p>Prose content with enhanced readability</p>
          </div>
        </ReadingContainer>
      );

      const proseContainer = screen.getByText(
        'Prose content with enhanced readability'
      ).parentElement;
      expect(proseContainer).toHaveClass('prose', 'prose-lg');
    });
  });

  describe('Mobile-specific behavior', () => {
    it('applies mobile padding correctly', () => {
      render(
        <ReadingContainer mobileOptimized>
          <p>Mobile optimized content</p>
        </ReadingContainer>
      );

      const container = screen.getByText(
        'Mobile optimized content'
      ).parentElement;
      expect(container).toHaveClass('px-4', 'sm:px-6');
    });

    it('uses reading-width utility for character count optimization', () => {
      render(
        <ReadingContainer mobileOptimized>
          <p>Content optimized for character count per line</p>
        </ReadingContainer>
      );

      const container = screen.getByText(
        'Content optimized for character count per line'
      ).parentElement;
      expect(container).toHaveClass('reading-width');
    });

    it('maintains responsiveness across breakpoints', () => {
      render(
        <ReadingContainer>
          <p>Responsive content that adapts to screen size</p>
        </ReadingContainer>
      );

      const container = screen.getByText(
        'Responsive content that adapts to screen size'
      ).parentElement;
      expect(container).toHaveClass('max-w-3xl', 'mx-auto');
    });
  });
});
