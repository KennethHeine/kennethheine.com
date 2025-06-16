/**
 * Test suite for ErrorBoundary component
 * Tests error boundary functionality, error handling, and recovery mechanisms
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  ErrorBoundary,
  withErrorBoundary,
  useErrorBoundary,
} from '@/components/error/ErrorBoundary';
import type { ErrorFallbackProps } from '@/components/error/ErrorBoundary';

// Mock console methods to test error logging
const originalConsoleError = console.error;
const originalConsoleGroup = console.group;
const originalConsoleGroupEnd = console.groupEnd;

beforeEach(() => {
  console.error = jest.fn();
  console.group = jest.fn();
  console.groupEnd = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
  console.group = originalConsoleGroup;
  console.groupEnd = originalConsoleGroupEnd;
  jest.clearAllMocks();
});

// Component that throws an error
function ThrowError({ shouldThrow = false }: { shouldThrow?: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
}

// Custom fallback component for testing
function TestFallback({ error, resetError, boundaryName }: ErrorFallbackProps) {
  return (
    <div>
      <p>Custom fallback: {error.message}</p>
      <p>Boundary: {boundaryName}</p>
      <button onClick={resetError}>Reset</button>
    </div>
  );
}

describe('ErrorBoundary component', () => {
  describe('Normal operation', () => {
    it('renders children normally when no error occurs', () => {
      render(
        <ErrorBoundary name='TestBoundary'>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('passes through children props correctly', () => {
      render(
        <ErrorBoundary>
          <div data-testid='test-child'>Test content</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });

  describe('Error handling', () => {
    it('catches and displays error with default fallback', () => {
      render(
        <ErrorBoundary name='TestBoundary'>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('uses custom fallback component when provided', () => {
      render(
        <ErrorBoundary name='TestBoundary' fallback={TestFallback}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(
        screen.getByText('Custom fallback: Test error message')
      ).toBeInTheDocument();
      expect(screen.getByText('Boundary: TestBoundary')).toBeInTheDocument();
    });

    it('displays error details in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(
        <ErrorBoundary name='TestBoundary' showDetails={true}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Technical Details')).toBeInTheDocument();

      process.env.NODE_ENV = originalEnv;
    });

    it('logs error information in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(
        <ErrorBoundary name='TestBoundary'>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(console.group).toHaveBeenCalledWith(
        '🚨 Error Boundary: TestBoundary'
      );
      expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
      expect(console.groupEnd).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it('calls custom error handler when provided', () => {
      const mockErrorHandler = jest.fn();

      render(
        <ErrorBoundary name='TestBoundary' onError={mockErrorHandler}>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(mockErrorHandler).toHaveBeenCalledWith(
        expect.any(Error),
        expect.objectContaining({
          componentStack: expect.any(String),
        })
      );
    });
  });

  describe('Error recovery', () => {
    it('resets error state when resetError is called', () => {
      let shouldThrow = true;

      function DynamicErrorComponent() {
        if (shouldThrow) {
          throw new Error('Test error message');
        }
        return <div>No error</div>;
      }

      const { rerender } = render(
        <ErrorBoundary name='TestBoundary' fallback={TestFallback}>
          <DynamicErrorComponent />
        </ErrorBoundary>
      );

      // Error state should be displayed
      expect(
        screen.getByText('Custom fallback: Test error message')
      ).toBeInTheDocument();

      // Click reset button and change component to not throw
      shouldThrow = false;
      fireEvent.click(screen.getByText('Reset'));

      // Re-render the component
      rerender(
        <ErrorBoundary name='TestBoundary' fallback={TestFallback}>
          <DynamicErrorComponent />
        </ErrorBoundary>
      );

      // Should show normal content
      expect(screen.getByText('No error')).toBeInTheDocument();
    });

    it('provides retry functionality through default fallback', () => {
      render(
        <ErrorBoundary name='TestBoundary'>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Try Again')).toBeInTheDocument();
      expect(screen.getByText('Reload Page')).toBeInTheDocument();
      expect(screen.getByText('Go Back')).toBeInTheDocument();
    });
  });

  describe('Blog-specific error messages', () => {
    it('displays blog-specific error message for BlogContent boundary', () => {
      render(
        <ErrorBoundary name='BlogContent'>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(
        screen.getByText(/There was an error loading the blog post content/)
      ).toBeInTheDocument();
    });

    it('displays related posts error message for RelatedPosts boundary', () => {
      render(
        <ErrorBoundary name='RelatedPosts'>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(
        screen.getByText(/There was an error loading related posts/)
      ).toBeInTheDocument();
    });
  });
});

describe('withErrorBoundary HOC', () => {
  function TestComponent({ message }: { message: string }) {
    return <div>{message}</div>;
  }

  it('wraps component with error boundary', () => {
    const WrappedComponent = withErrorBoundary(TestComponent, {
      name: 'HOCTest',
    });

    render(<WrappedComponent message='Test message' />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('sets correct display name', () => {
    const WrappedComponent = withErrorBoundary(TestComponent, {
      name: 'HOCTest',
    });

    expect(WrappedComponent.displayName).toBe(
      'withErrorBoundary(TestComponent)'
    );
  });

  it('handles errors in wrapped component', () => {
    function ErrorComponent() {
      throw new Error('HOC test error');
    }

    const WrappedComponent = withErrorBoundary(ErrorComponent, {
      name: 'HOCTest',
    });

    render(<WrappedComponent />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

describe('useErrorBoundary hook', () => {
  function TestHookComponent({
    shouldCaptureError = false,
  }: {
    shouldCaptureError?: boolean;
  }) {
    const { captureError, resetError } = useErrorBoundary();

    React.useEffect(() => {
      if (shouldCaptureError) {
        captureError(new Error('Hook test error'));
      }
    }, [shouldCaptureError, captureError]);

    return (
      <div>
        <p>Hook component</p>
        <button onClick={() => resetError()}>Reset</button>
      </div>
    );
  }

  it('provides error capturing functionality', () => {
    expect(() => {
      render(
        <ErrorBoundary name='HookTest'>
          <TestHookComponent shouldCaptureError={true} />
        </ErrorBoundary>
      );
    }).not.toThrow();

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('allows manual error capturing', () => {
    function ManualErrorComponent() {
      const { captureError } = useErrorBoundary();

      return (
        <button onClick={() => captureError(new Error('Manual error'))}>
          Trigger Error
        </button>
      );
    }

    render(
      <ErrorBoundary name='ManualTest'>
        <ManualErrorComponent />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Trigger Error'));
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('provides resetError functionality that can be called', () => {
    function TestResetComponent() {
      const { resetError } = useErrorBoundary();

      return (
        <div>
          <p>Test component</p>
          <button onClick={() => resetError()}>Reset Error</button>
        </div>
      );
    }

    render(
      <ErrorBoundary name='ResetTest'>
        <TestResetComponent />
      </ErrorBoundary>
    );

    // Should render normally and not throw when resetError is called
    expect(screen.getByText('Test component')).toBeInTheDocument();
    
    const resetButton = screen.getByText('Reset Error');
    expect(() => fireEvent.click(resetButton)).not.toThrow();
    
    // Component should still be there after reset
    expect(screen.getByText('Test component')).toBeInTheDocument();
  });
});

describe('Error boundary integration', () => {
  it('handles nested error boundaries correctly', () => {
    function InnerComponent({
      shouldThrow = false,
    }: {
      shouldThrow?: boolean;
    }) {
      if (shouldThrow) {
        throw new Error('Inner error');
      }
      return <div>Inner content</div>;
    }

    render(
      <ErrorBoundary name='Outer'>
        <div>Outer content</div>
        <ErrorBoundary name='Inner' fallback={TestFallback}>
          <InnerComponent shouldThrow={true} />
        </ErrorBoundary>
      </ErrorBoundary>
    );

    // Inner error boundary should catch the error
    expect(
      screen.getByText('Custom fallback: Inner error')
    ).toBeInTheDocument();
    expect(screen.getByText('Boundary: Inner')).toBeInTheDocument();
    // Outer content should still be visible
    expect(screen.getByText('Outer content')).toBeInTheDocument();
  });

  it('handles multiple error boundaries independently', () => {
    render(
      <div>
        <ErrorBoundary name='First'>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
        <ErrorBoundary name='Second'>
          <div>Second boundary content</div>
        </ErrorBoundary>
      </div>
    );

    // First boundary should show error
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    // Second boundary should show normal content
    expect(screen.getByText('Second boundary content')).toBeInTheDocument();
  });
});
