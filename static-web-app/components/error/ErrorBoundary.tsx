/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */

'use client';

import React from 'react';
import type { ErrorBoundaryState, SuspenseError } from '@/types/react-19';
import { ErrorFallback } from './ErrorFallback';

export interface ErrorBoundaryProps {
  /** Child components to wrap with error boundary */
  children: React.ReactNode;
  /** Custom fallback component */
  fallback?: React.ComponentType<ErrorFallbackProps>;
  /** Error boundary name for debugging */
  name?: string;
  /** Whether to show detailed error info in development */
  showDetails?: boolean;
  /** Custom error handler */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export interface ErrorFallbackProps {
  /** The error that occurred */
  error: Error;
  /** React error information */
  errorInfo?: React.ErrorInfo;
  /** Function to retry/reset the error boundary */
  resetError: () => void;
  /** Error boundary name */
  boundaryName?: string;
  /** Whether to show detailed error info */
  showDetails?: boolean;
}

/**
 * Error Boundary Class Component
 * Uses React's error boundary pattern to catch and handle errors
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  /**
   * Static method to update state when an error occurs
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const suspenseError: SuspenseError = {
      message: error.message,
      stack: error.stack,
    };

    return {
      hasError: true,
      error: suspenseError,
    };
  }

  /**
   * Component lifecycle method called when an error occurs
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const suspenseError: SuspenseError = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack || undefined,
      boundaryName: this.props.name,
    };

    // Update state with detailed error information
    this.setState({
      hasError: true,
      error: suspenseError,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 Error Boundary: ${this.props.name || 'Unknown'}`);
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }
  }

  /**
   * Reset error boundary state
   */
  resetError = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const {
      children,
      fallback: CustomFallback,
      name,
      showDetails,
    } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided, otherwise use default
      const FallbackComponent = CustomFallback || ErrorFallback;

      return (
        <FallbackComponent
          error={new Error(error.message)}
          errorInfo={errorInfo}
          resetError={this.resetError}
          boundaryName={name}
          showDetails={showDetails}
        />
      );
    }

    return children;
  }
}

/**
 * Higher-order component to wrap components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

/**
 * Hook to provide error boundary functionality to functional components
 */
export function useErrorBoundary() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  // Throw error to trigger parent error boundary
  if (error) {
    throw error;
  }

  return {
    captureError,
    resetError,
  };
}
