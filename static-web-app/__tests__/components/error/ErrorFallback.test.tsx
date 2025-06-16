/**
 * Test suite for ErrorFallback components
 * Tests different fallback UI variations and user interactions
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ErrorFallback,
  MinimalErrorFallback,
  BlogErrorFallback,
} from '@/components/error/ErrorFallback';
import type { ErrorFallbackProps } from '@/components/error/ErrorBoundary';

const mockError = new Error('Test error message');
const mockResetError = jest.fn();

const defaultProps: ErrorFallbackProps = {
  error: mockError,
  resetError: mockResetError,
};

describe('ErrorFallback component', () => {
  beforeEach(() => {
    mockResetError.mockClear();
  });

  it('renders error message and action buttons', () => {
    render(<ErrorFallback {...defaultProps} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Try Again')).toBeInTheDocument();
    expect(screen.getByText('Reload Page')).toBeInTheDocument();
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('displays default error description', () => {
    render(<ErrorFallback {...defaultProps} />);

    expect(
      screen.getByText(/An unexpected error occurred/)
    ).toBeInTheDocument();
  });

  it('displays blog-specific error message for BlogContent boundary', () => {
    render(<ErrorFallback {...defaultProps} boundaryName='BlogContent' />);

    expect(
      screen.getByText(/There was an error loading the blog post content/)
    ).toBeInTheDocument();
  });

  it('displays related posts error message for RelatedPosts boundary', () => {
    render(<ErrorFallback {...defaultProps} boundaryName='RelatedPosts' />);

    expect(
      screen.getByText(/There was an error loading related posts/)
    ).toBeInTheDocument();
  });

  it('calls resetError when Try Again button is clicked', () => {
    render(<ErrorFallback {...defaultProps} />);

    fireEvent.click(screen.getByText('Try Again'));
    expect(mockResetError).toHaveBeenCalledTimes(1);
  });

  it('handles reload page button click', () => {
    // Test that clicking the button doesn't throw an error
    render(<ErrorFallback {...defaultProps} />);

    const reloadButton = screen.getByText('Reload Page');
    expect(reloadButton).toBeInTheDocument();

    // Just test that the button exists and is clickable
    expect(() => fireEvent.click(reloadButton)).not.toThrow();
  });

  it('handles go back button click', () => {
    render(<ErrorFallback {...defaultProps} />);

    const goBackButton = screen.getByText('Go Back');
    expect(goBackButton).toBeInTheDocument();

    // Just test that the button exists and is clickable
    expect(() => fireEvent.click(goBackButton)).not.toThrow();
  });

  it('handles navigation when Go Back is clicked with history', () => {
    // Mock window.history.back
    const mockBack = jest.fn();
    const originalHistory = window.history;
    
    Object.defineProperty(window, 'history', {
      value: {
        ...originalHistory,
        length: 2,
        back: mockBack,
      },
      writable: true,
      configurable: true,
    });

    render(<ErrorFallback {...defaultProps} />);

    const goBackButton = screen.getByText('Go Back');
    fireEvent.click(goBackButton);

    expect(mockBack).toHaveBeenCalled();

    // Restore original history
    Object.defineProperty(window, 'history', {
      value: originalHistory,
      writable: true,
      configurable: true,
    });
  });

  it('handles navigation when Go Back is clicked without history', () => {
    render(<ErrorFallback {...defaultProps} />);

    const goBackButton = screen.getByText('Go Back');
    expect(goBackButton).toBeInTheDocument();

    // Test that the button is functional without throwing
    expect(() => fireEvent.click(goBackButton)).not.toThrow();
  });

  describe('Error details', () => {
    it('shows technical details when showDetails is true', () => {
      render(<ErrorFallback {...defaultProps} showDetails={true} />);

      expect(screen.getByText('Technical Details')).toBeInTheDocument();
    });

    it('shows technical details in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(<ErrorFallback {...defaultProps} />);

      expect(screen.getByText('Technical Details')).toBeInTheDocument();

      process.env.NODE_ENV = originalEnv;
    });

    it('does not show technical details in production by default', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      render(<ErrorFallback {...defaultProps} />);

      expect(screen.queryByText('Technical Details')).not.toBeInTheDocument();

      process.env.NODE_ENV = originalEnv;
    });

    it('displays error message in technical details', () => {
      render(<ErrorFallback {...defaultProps} showDetails={true} />);

      // Click to expand details
      fireEvent.click(screen.getByText('Technical Details'));

      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('displays boundary name in technical details', () => {
      render(
        <ErrorFallback
          {...defaultProps}
          boundaryName='TestBoundary'
          showDetails={true}
        />
      );

      // Click to expand details
      fireEvent.click(screen.getByText('Technical Details'));

      expect(screen.getByText('TestBoundary')).toBeInTheDocument();
    });

    it('displays error stack when available', () => {
      const errorWithStack = new Error('Test error with stack');
      errorWithStack.stack = 'Error: Test error with stack\n  at TestFunction\n  at AnotherFunction';

      render(
        <ErrorFallback
          {...defaultProps}
          error={errorWithStack}
          showDetails={true}
        />
      );

      // Click to expand details
      fireEvent.click(screen.getByText('Technical Details'));

      expect(screen.getByText(/at TestFunction/)).toBeInTheDocument();
    });

    it('displays component stack when errorInfo is provided', () => {
      const mockErrorInfo = {
        componentStack: '\n    in TestComponent (at TestFile.tsx:10:5)\n    in ErrorBoundary (at App.tsx:15:3)',
      };

      render(
        <ErrorFallback
          {...defaultProps}
          errorInfo={mockErrorInfo}
          showDetails={true}
        />
      );

      // Click to expand details
      fireEvent.click(screen.getByText('Technical Details'));

      expect(screen.getByText(/in TestComponent/)).toBeInTheDocument();
    });
  });
});

describe('MinimalErrorFallback component', () => {
  beforeEach(() => {
    mockResetError.mockClear();
  });

  it('renders minimal error UI', () => {
    render(<MinimalErrorFallback {...defaultProps} />);

    expect(screen.getByText('Failed to load content')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });

  it('displays specific content type when boundaryName is provided', () => {
    render(<MinimalErrorFallback {...defaultProps} boundaryName='BlogPost' />);

    expect(screen.getByText('Failed to load blogpost')).toBeInTheDocument();
  });

  it('calls resetError when try again link is clicked', () => {
    render(<MinimalErrorFallback {...defaultProps} />);

    fireEvent.click(screen.getByText('Try again'));
    expect(mockResetError).toHaveBeenCalledTimes(1);
  });
});

describe('BlogErrorFallback component', () => {
  beforeEach(() => {
    mockResetError.mockClear();
  });

  it('renders blog-specific error UI', () => {
    render(<BlogErrorFallback {...defaultProps} />);

    expect(screen.getByText('Content Unavailable')).toBeInTheDocument();
    expect(screen.getByText('Retry Loading')).toBeInTheDocument();
    expect(screen.getByText('Browse All Posts')).toBeInTheDocument();
  });

  it('displays blog content specific message for BlogContent boundary', () => {
    render(<BlogErrorFallback {...defaultProps} boundaryName='BlogContent' />);

    expect(
      screen.getByText(/This blog post content could not be loaded/)
    ).toBeInTheDocument();
  });

  it('displays related posts specific message for RelatedPosts boundary', () => {
    render(<BlogErrorFallback {...defaultProps} boundaryName='RelatedPosts' />);

    expect(
      screen.getByText(/Related posts could not be loaded/)
    ).toBeInTheDocument();
  });

  it('calls resetError when Retry Loading button is clicked', () => {
    render(<BlogErrorFallback {...defaultProps} />);

    fireEvent.click(screen.getByText('Retry Loading'));
    expect(mockResetError).toHaveBeenCalledTimes(1);
  });

  it('handles navigation to blog page when Browse All Posts is clicked', () => {
    render(<BlogErrorFallback {...defaultProps} />);

    const browseButton = screen.getByText('Browse All Posts');
    expect(browseButton).toBeInTheDocument();

    // Test that the button is functional without throwing
    expect(() => fireEvent.click(browseButton)).not.toThrow();
  });

  it('handles navigation when window is not available', () => {
    // Test the typeof window check by temporarily removing it
    const originalWindow = window;
    
    // Mock the typeof window check to return undefined
    const originalDescriptor = Object.getOwnPropertyDescriptor(global, 'window');
    delete (global as any).window;

    render(<BlogErrorFallback {...defaultProps} />);

    const browseButton = screen.getByText('Browse All Posts');
    
    // Should not throw when window is not available
    expect(() => fireEvent.click(browseButton)).not.toThrow();

    // Restore original window
    (global as any).window = originalWindow;
    if (originalDescriptor) {
      Object.defineProperty(global, 'window', originalDescriptor);
    }
  });
});

describe('Error fallback accessibility', () => {
  it('provides proper ARIA labels and roles', () => {
    render(<ErrorFallback {...defaultProps} />);

    // Buttons should be accessible
    const tryAgainButton = screen.getByRole('button', { name: 'Try Again' });
    const reloadButton = screen.getByRole('button', { name: 'Reload Page' });
    const goBackButton = screen.getByRole('button', { name: 'Go Back' });

    expect(tryAgainButton).toBeInTheDocument();
    expect(reloadButton).toBeInTheDocument();
    expect(goBackButton).toBeInTheDocument();
  });

  it('provides semantic HTML structure', () => {
    render(<ErrorFallback {...defaultProps} />);

    // Should have proper heading structure
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
