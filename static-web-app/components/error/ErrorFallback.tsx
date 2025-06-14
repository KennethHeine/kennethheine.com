/**
 * Error Fallback Component
 * User-friendly error UI that displays when an error boundary catches an error
 */

'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { ErrorFallbackProps } from './ErrorBoundary';

/**
 * Default error fallback component
 * Displays a user-friendly error message with retry functionality
 */
export function ErrorFallback({
  error,
  errorInfo,
  resetError,
  boundaryName,
  showDetails = false,
}: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const showErrorDetails = showDetails || isDevelopment;

  const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else if (typeof window !== 'undefined') {
      window.location.assign('/');
    }
  };

  return (
    <div className='flex min-h-[400px] items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <div className='p-6 text-center'>
          {/* Error Icon */}
          <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20'>
            <svg
              className='h-6 w-6 text-red-600 dark:text-red-400'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
              />
            </svg>
          </div>

          {/* Error Title */}
          <h2 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
            Something went wrong
          </h2>

          {/* Error Description */}
          <p className='mb-6 text-sm text-gray-600 dark:text-gray-400'>
            {boundaryName === 'BlogContent'
              ? 'There was an error loading the blog post content. This might be due to a formatting issue or missing content.'
              : boundaryName === 'RelatedPosts'
                ? 'There was an error loading related posts. The main content is still available.'
                : 'An unexpected error occurred while loading this content.'}
          </p>

          {/* Action Buttons */}
          <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
            <Button onClick={resetError} variant='primary' size='sm'>
              Try Again
            </Button>
            <Button onClick={handleReload} variant='secondary' size='sm'>
              Reload Page
            </Button>
            <Button onClick={handleGoBack} variant='outline' size='sm'>
              Go Back
            </Button>
          </div>

          {/* Error Details (Development/Debug Mode) */}
          {showErrorDetails && (
            <details className='mt-6 text-left'>
              <summary className='cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'>
                Technical Details
              </summary>
              <div className='mt-3 rounded-md bg-gray-50 p-3 dark:bg-gray-800'>
                <div className='text-xs text-gray-600 dark:text-gray-400'>
                  <div className='mb-2'>
                    <strong>Error:</strong> {error.message}
                  </div>
                  {boundaryName && (
                    <div className='mb-2'>
                      <strong>Boundary:</strong> {boundaryName}
                    </div>
                  )}
                  {error.stack && (
                    <div className='mb-2'>
                      <strong>Stack:</strong>
                      <pre className='mt-1 overflow-x-auto whitespace-pre-wrap'>
                        {error.stack}
                      </pre>
                    </div>
                  )}
                  {errorInfo?.componentStack && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className='mt-1 overflow-x-auto whitespace-pre-wrap'>
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </details>
          )}
        </div>
      </Card>
    </div>
  );
}

/**
 * Minimal error fallback for inline components
 * Used when space is limited or error needs to be subtle
 */
export function MinimalErrorFallback({
  error: _error,
  resetError,
  boundaryName,
}: ErrorFallbackProps) {
  return (
    <div className='rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20'>
      <div className='flex items-start'>
        <div className='flex-shrink-0'>
          <svg
            className='h-5 w-5 text-red-400'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        <div className='ml-3 flex-1'>
          <h3 className='text-sm font-medium text-red-800 dark:text-red-200'>
            Failed to load {boundaryName?.toLowerCase() || 'content'}
          </h3>
          <div className='mt-2'>
            <button
              type='button'
              onClick={resetError}
              className='text-sm font-medium text-red-800 underline hover:text-red-600 dark:text-red-200 dark:hover:text-red-400'
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Blog-specific error fallback
 * Optimized for blog content errors with contextual messaging
 */
export function BlogErrorFallback({
  error: _error,
  resetError,
  boundaryName,
}: ErrorFallbackProps) {
  const handleGoToBlog = () => {
    if (typeof window !== 'undefined') {
      window.location.assign('/blog');
    }
  };

  return (
    <div className='rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800'>
      {/* Blog Error Icon */}
      <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20'>
        <svg
          className='h-8 w-8 text-yellow-600 dark:text-yellow-400'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-4.5B4.875 8.25 1.5 11.625 1.5 15v2.625c0 .621.504 1.125 1.125 1.125h13.5c.621 0 1.125-.504 1.125-1.125v-2.625z'
          />
        </svg>
      </div>

      <h3 className='mb-2 text-lg font-semibold text-gray-900 dark:text-white'>
        Content Unavailable
      </h3>

      <p className='mb-6 text-gray-600 dark:text-gray-400'>
        {boundaryName === 'BlogContent'
          ? 'This blog post content could not be loaded. There might be an issue with the formatting or the content file.'
          : boundaryName === 'RelatedPosts'
            ? 'Related posts could not be loaded at this time.'
            : 'The requested content is temporarily unavailable.'}
      </p>

      <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
        <Button onClick={resetError} variant='primary' size='sm'>
          Retry Loading
        </Button>
        <Button onClick={handleGoToBlog} variant='secondary' size='sm'>
          Browse All Posts
        </Button>
      </div>
    </div>
  );
}
