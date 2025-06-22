/**
 * @fileoverview Tests for LoadingRelatedPosts component
 * @author Kenneth Heine
 */

import { render, screen } from '@testing-library/react';
import { LoadingRelatedPosts } from '@/components/blog/LoadingRelatedPosts';

describe('LoadingRelatedPosts', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<LoadingRelatedPosts />);

      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-label', 'Loading related posts...');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
    });

    it('renders with custom message', () => {
      const customMessage = 'Finding related articles...';
      render(<LoadingRelatedPosts message={customMessage} />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', customMessage);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      const customTitle = 'Suggested Reading';
      render(<LoadingRelatedPosts title={customTitle} />);

      expect(screen.getByText(customTitle)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        customTitle
      );
    });

    it('renders with custom className', () => {
      render(<LoadingRelatedPosts className='custom-related-class' />);

      const section = screen.getByRole('status').closest('section');
      expect(section).toHaveClass('custom-related-class');
    });
  });

  describe('Section Structure', () => {
    it('maintains proper section layout', () => {
      render(<LoadingRelatedPosts />);

      const section = screen.getByRole('status').closest('section');
      expect(section).toHaveClass('py-12');

      // Check for heading structure
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Related Posts');
      expect(heading).toHaveClass(
        'text-2xl',
        'font-bold',
        'text-gray-900',
        'dark:text-white'
      );
    });

    it('displays section description', () => {
      render(<LoadingRelatedPosts />);

      expect(
        screen.getByText('Finding articles you might enjoy')
      ).toBeInTheDocument();
    });

    it('has proper heading hierarchy', () => {
      render(<LoadingRelatedPosts title='Custom Title' />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Custom Title');
    });
  });

  describe('Loading Content', () => {
    it('displays loading spinner with correct size', () => {
      render(<LoadingRelatedPosts />);

      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();

      // Should show the loading message
      expect(screen.getByText('Loading related posts...')).toBeInTheDocument();
    });

    it('centers loading content properly', () => {
      render(<LoadingRelatedPosts />);

      const loadingContainer = screen.getByTestId('loading-container');
      expect(loadingContainer).toHaveClass(
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'py-8',
        'space-y-4'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<LoadingRelatedPosts />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('role', 'status');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
    });

    it('provides descriptive section structure', () => {
      render(<LoadingRelatedPosts />);

      // Should have a proper section with heading
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();

      // Should have descriptive text
      expect(
        screen.getByText('Finding articles you might enjoy')
      ).toBeInTheDocument();
    });

    it('maintains semantic HTML structure', () => {
      render(<LoadingRelatedPosts />);

      const section = screen.getByRole('status').closest('section');
      expect(section).toBeInTheDocument();

      // Should have proper heading structure within section
      const heading = screen.getByRole('heading', { level: 2 });
      expect(section).toContainElement(heading);
    });
  });

  describe('Visual Design', () => {
    it('applies correct section spacing', () => {
      render(<LoadingRelatedPosts />);

      const section = screen.getByRole('status').closest('section');
      expect(section).toHaveClass('py-12');
    });

    it('styles header content appropriately', () => {
      render(<LoadingRelatedPosts />);

      const description = screen.getByText('Finding articles you might enjoy');
      expect(description).toHaveClass(
        'mt-2',
        'text-gray-600',
        'dark:text-gray-400'
      );
    });

    it('applies proper loading container spacing', () => {
      render(<LoadingRelatedPosts />);

      const loadingContainer = screen.getByTestId('loading-container');
      expect(loadingContainer).toHaveClass('py-8', 'space-y-4');
    });
  });

  describe('Component Integration', () => {
    it('integrates LoadingSpinner with correct props', () => {
      const customMessage = 'Custom related posts message';
      render(<LoadingRelatedPosts message={customMessage} />);

      // The LoadingSpinner should receive the message and be medium sized with text shown
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', customMessage);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('maintains layout consistency with other components', () => {
      render(<LoadingRelatedPosts />);

      // Should follow the same pattern as RelatedPosts component structure
      const section = screen.getByRole('status').closest('section');
      expect(section).toHaveClass('py-12');

      // Header structure should match
      const headerDiv = section?.querySelector('div.mb-8');
      expect(headerDiv).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('handles all props correctly', () => {
      const props = {
        className: 'custom-class',
        message: 'Custom loading message',
        title: 'Custom Title',
      };

      render(<LoadingRelatedPosts {...props} />);

      const section = screen.getByRole('status').closest('section');
      expect(section).toHaveClass('custom-class');
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom loading message')).toBeInTheDocument();
    });

    it('combines custom className with default classes', () => {
      render(<LoadingRelatedPosts className='border-t border-gray-200' />);

      const section = screen.getByRole('status').closest('section');
      expect(section).toHaveClass('border-t', 'border-gray-200');
      expect(section).toHaveClass('py-12'); // Should retain base classes
    });
  });

  describe('User Experience', () => {
    it('provides clear loading context', () => {
      render(<LoadingRelatedPosts />);

      // Should have clear section title
      expect(screen.getByText('Related Posts')).toBeInTheDocument();

      // Should have contextual description
      expect(
        screen.getByText('Finding articles you might enjoy')
      ).toBeInTheDocument();

      // Should have loading message
      expect(screen.getByText('Loading related posts...')).toBeInTheDocument();
    });

    it('maintains visual consistency with loaded state', () => {
      render(<LoadingRelatedPosts />);

      // Should follow the same layout pattern as the actual RelatedPosts component
      const section = screen.getByRole('status').closest('section');
      const headerDiv = section?.querySelector('div.mb-8');
      const heading = screen.getByRole('heading', { level: 2 });

      expect(headerDiv).toBeInTheDocument();
      expect(heading).toHaveClass('text-2xl', 'font-bold');
    });
  });

  describe('Error Boundaries', () => {
    it('renders without crashing with minimal props', () => {
      expect(() => {
        render(<LoadingRelatedPosts />);
      }).not.toThrow();
    });

    it('handles empty strings gracefully', () => {
      expect(() => {
        render(<LoadingRelatedPosts message='' title='' />);
      }).not.toThrow();
    });
  });
});
