/**
 * @fileoverview Tests for LoadingSpinner component
 * @author Kenneth Heine
 */

import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

describe('LoadingSpinner', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<LoadingSpinner />);

      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveAttribute('aria-label', 'Loading');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
    });

    it('renders with custom label', () => {
      const customLabel = 'Processing your request...';
      render(<LoadingSpinner label={customLabel} />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', customLabel);
    });

    it('renders with custom className', () => {
      render(<LoadingSpinner className='custom-class' />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('custom-class');
    });
  });

  describe('Size Variants', () => {
    it('renders small size correctly', () => {
      render(<LoadingSpinner size='sm' />);

      const spinnerIcon = screen
        .getByRole('status')
        .querySelector('div[aria-hidden="true"]');
      expect(spinnerIcon).toHaveClass('h-4', 'w-4');
    });

    it('renders medium size correctly (default)', () => {
      render(<LoadingSpinner size='md' />);

      const spinnerIcon = screen
        .getByRole('status')
        .querySelector('div[aria-hidden="true"]');
      expect(spinnerIcon).toHaveClass('h-6', 'w-6');
    });

    it('renders large size correctly', () => {
      render(<LoadingSpinner size='lg' />);

      const spinnerIcon = screen
        .getByRole('status')
        .querySelector('div[aria-hidden="true"]');
      expect(spinnerIcon).toHaveClass('h-8', 'w-8');
    });
  });

  describe('Text Display', () => {
    it('shows text when showText is true', () => {
      const label = 'Loading content...';
      render(<LoadingSpinner label={label} showText={true} />);

      expect(screen.getByText(label)).toBeInTheDocument();
      expect(screen.getByText(label)).toBeVisible();
    });

    it('hides text visually when showText is false (default)', () => {
      const label = 'Loading content...';
      render(<LoadingSpinner label={label} showText={false} />);

      // Text should be present for screen readers but visually hidden
      const hiddenText = screen.getByText(label);
      expect(hiddenText).toBeInTheDocument();
      expect(hiddenText).toHaveClass('sr-only');
    });

    it('applies correct text sizes for different spinner sizes', () => {
      const { rerender } = render(<LoadingSpinner size='sm' showText={true} />);
      expect(screen.getByText('Loading')).toHaveClass('text-sm');

      rerender(<LoadingSpinner size='md' showText={true} />);
      expect(screen.getByText('Loading')).toHaveClass('text-base');

      rerender(<LoadingSpinner size='lg' showText={true} />);
      expect(screen.getByText('Loading')).toHaveClass('text-lg');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<LoadingSpinner label='Processing' />);

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('role', 'status');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
      expect(spinner).toHaveAttribute('aria-label', 'Processing');
    });

    it('has aria-hidden on spinning icon', () => {
      render(<LoadingSpinner />);

      const spinnerIcon = screen
        .getByRole('status')
        .querySelector('div[aria-hidden="true"]');
      expect(spinnerIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('provides screen reader text when showText is false', () => {
      render(<LoadingSpinner label='Custom loading' showText={false} />);

      const screenReaderText = screen.getByText('Custom loading');
      expect(screenReaderText).toHaveClass('sr-only');
    });
  });

  describe('Animation and Styling', () => {
    it('applies animation classes to spinner', () => {
      render(<LoadingSpinner />);

      const spinnerIcon = screen
        .getByRole('status')
        .querySelector('div[aria-hidden="true"]');
      expect(spinnerIcon).toHaveClass('animate-spin');
      expect(spinnerIcon).toHaveClass('rounded-full');
    });

    it('applies theme-aware colors', () => {
      render(<LoadingSpinner />);

      const spinnerIcon = screen
        .getByRole('status')
        .querySelector('div[aria-hidden="true"]');
      expect(spinnerIcon).toHaveClass(
        'border-gray-300',
        'border-t-brand-600',
        'dark:border-gray-600',
        'dark:border-t-brand-400'
      );
    });

    it('centers content when showText is true', () => {
      render(<LoadingSpinner showText={true} />);

      const container = screen.getByRole('status');
      expect(container).toHaveClass('justify-center');
    });
  });

  describe('Integration', () => {
    it('works with different label and showText combinations', () => {
      const { rerender } = render(
        <LoadingSpinner label='Initial' showText={false} />
      );

      expect(screen.getByText('Initial')).toHaveClass('sr-only');

      rerender(<LoadingSpinner label='Updated' showText={true} />);

      expect(screen.getByText('Updated')).not.toHaveClass('sr-only');
      expect(screen.getByText('Updated')).toBeVisible();
    });

    it('maintains accessibility when props change', () => {
      const { rerender } = render(<LoadingSpinner size='sm' />);

      let spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Loading');

      rerender(<LoadingSpinner size='lg' label='New label' />);

      spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'New label');
    });
  });
});
