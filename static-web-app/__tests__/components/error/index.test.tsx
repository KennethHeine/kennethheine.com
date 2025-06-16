/**
 * Test suite for error component exports
 * Tests that all components and types are properly exported from the index file
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import all exports from index to test coverage
import {
  ErrorBoundary,
  withErrorBoundary,
  useErrorBoundary,
  ErrorFallback,
  MinimalErrorFallback,
  BlogErrorFallback,
} from '@/components/error';
import type { ErrorBoundaryProps, ErrorFallbackProps } from '@/components/error';

describe('Error components index exports', () => {
  it('exports ErrorBoundary component', () => {
    expect(ErrorBoundary).toBeDefined();
    expect(typeof ErrorBoundary).toBe('function');
  });

  it('exports withErrorBoundary HOC', () => {
    expect(withErrorBoundary).toBeDefined();
    expect(typeof withErrorBoundary).toBe('function');
  });

  it('exports useErrorBoundary hook', () => {
    expect(useErrorBoundary).toBeDefined();
    expect(typeof useErrorBoundary).toBe('function');
  });

  it('exports ErrorFallback component', () => {
    expect(ErrorFallback).toBeDefined();
    expect(typeof ErrorFallback).toBe('function');
  });

  it('exports MinimalErrorFallback component', () => {
    expect(MinimalErrorFallback).toBeDefined();
    expect(typeof MinimalErrorFallback).toBe('function');
  });

  it('exports BlogErrorFallback component', () => {
    expect(BlogErrorFallback).toBeDefined();
    expect(typeof BlogErrorFallback).toBe('function');
  });

  it('can use exported components together', () => {
    function TestComponent() {
      return <div>Test Component</div>;
    }

    const WrappedComponent = withErrorBoundary(TestComponent, {
      name: 'ExportTest',
      fallback: MinimalErrorFallback,
    });

    render(<WrappedComponent />);
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});