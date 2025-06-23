/**
 * @fileoverview Tests for LoadingBlogList component
 * @author Kenneth Heine
 */

import { render, screen } from '@testing-library/react';
import { LoadingBlogList } from '@/components/blog/LoadingBlogList';

describe('LoadingBlogList', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<LoadingBlogList />);

      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-label', 'Loading posts...');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
    });

    it('renders with custom message', () => {
      const customMessage = 'Fetching your articles...';
      render(<LoadingBlogList message={customMessage} />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', customMessage);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<LoadingBlogList className='custom-loading-class' />);

      const container = screen
        .getByText('Filtering and organizing your content')
        .closest('div');
      expect(container).toHaveClass('custom-loading-class');
    });
  });

  describe('Content Structure', () => {
    it('displays the loading spinner', () => {
      render(<LoadingBlogList />);

      // Check for loading spinner presence
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();

      // Should show the message text
      expect(screen.getByText('Loading posts...')).toBeInTheDocument();
    });

    it('displays contextual message', () => {
      render(<LoadingBlogList />);

      expect(
        screen.getByText('Filtering and organizing your content')
      ).toBeInTheDocument();
    });

    it('maintains proper layout structure', () => {
      render(<LoadingBlogList />);

      const container = screen
        .getByText('Filtering and organizing your content')
        .closest('div');
      expect(container).toHaveClass(
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'py-12',
        'space-y-4'
      );
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<LoadingBlogList />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('role', 'status');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
    });

    it('provides descriptive labels for screen readers', () => {
      const message = 'Loading your blog posts';
      render(<LoadingBlogList message={message} />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', message);
    });

    it('has visible text for screen readers and sighted users', () => {
      render(<LoadingBlogList />);

      const messageText = screen.getByText('Loading posts...');
      expect(messageText).toBeInTheDocument();
      expect(messageText).toBeVisible();
    });
  });

  describe('Visual Design', () => {
    it('applies correct spacing classes', () => {
      render(<LoadingBlogList />);

      const container = screen
        .getByText('Filtering and organizing your content')
        .closest('div');
      expect(container).toHaveClass('py-12', 'space-y-4');
    });

    it('centers content properly', () => {
      render(<LoadingBlogList />);

      const container = screen
        .getByText('Filtering and organizing your content')
        .closest('div');
      expect(container).toHaveClass('items-center', 'justify-center');
    });

    it('styles contextual text appropriately', () => {
      render(<LoadingBlogList />);

      const contextText = screen.getByText(
        'Filtering and organizing your content'
      );
      expect(contextText).toHaveClass(
        'text-sm',
        'text-gray-500',
        'dark:text-gray-400',
        'text-center',
        'max-w-md'
      );
    });
  });

  describe('Component Integration', () => {
    it('renders LoadingSpinner with correct props', () => {
      const customMessage = 'Custom loading message';
      render(<LoadingBlogList message={customMessage} />);

      // The LoadingSpinner should receive the message and be large with text shown
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', customMessage);
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('maintains layout when className is provided', () => {
      render(<LoadingBlogList className='custom-spacing' />);

      const container = screen
        .getByText('Filtering and organizing your content')
        .closest('div');
      expect(container).toHaveClass('custom-spacing');
      // Should still have base layout classes
      expect(container).toHaveClass('flex', 'flex-col', 'items-center');
    });
  });

  describe('Props Handling', () => {
    it('handles undefined props gracefully', () => {
      render(<LoadingBlogList />);

      expect(screen.getByText('Loading posts...')).toBeInTheDocument();
      expect(
        screen.getByText('Filtering and organizing your content')
      ).toBeInTheDocument();
    });

    it('respects itemCount prop even though unused', () => {
      // This prop is included for future extensibility but currently unused
      expect(() => {
        render(<LoadingBlogList itemCount={5} />);
      }).not.toThrow();
    });

    it('combines custom className with default classes', () => {
      render(<LoadingBlogList className='border-2 border-red-500' />);

      const container = screen
        .getByText('Filtering and organizing your content')
        .closest('div');
      expect(container).toHaveClass('border-2', 'border-red-500');
      expect(container).toHaveClass('flex', 'flex-col'); // Should retain base classes
    });
  });

  describe('User Experience', () => {
    it('provides meaningful loading context', () => {
      render(<LoadingBlogList />);

      // Should have both the main message and contextual information
      expect(screen.getByText('Loading posts...')).toBeInTheDocument();
      expect(
        screen.getByText('Filtering and organizing your content')
      ).toBeInTheDocument();
    });

    it('maintains visual hierarchy', () => {
      render(<LoadingBlogList />);

      const container = screen
        .getByText('Filtering and organizing your content')
        .closest('div');

      // Check that elements are structured properly
      expect(container?.children).toHaveLength(2); // Spinner + context text
    });
  });
});
