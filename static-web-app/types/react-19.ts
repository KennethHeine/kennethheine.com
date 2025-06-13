/**
 * React 19 specific type definitions
 * Contains types for new React 19 features like transitions, optimistic updates, and enhanced hooks
 */

import type { ReactNode } from 'react';

/**
 * React 19 transition state types
 */
export type TransitionState = 'idle' | 'pending' | 'success' | 'error';

/**
 * Enhanced transition hook return interface
 */
export interface UseTransitionReturn {
  /** Whether a transition is currently pending */
  isPending: boolean;
  /** Start a new transition */
  startTransition: (callback: () => void | Promise<void>) => void;
}

/**
 * Optimistic update options interface
 */
export interface OptimisticUpdateOptions<T> {
  /** Reducer function for optimistic updates */
  reducer?: (state: T, optimisticValue: Partial<T>) => T;
  /** Validation function for optimistic updates */
  validator?: (value: Partial<T>) => boolean;
  /** Rollback delay in milliseconds */
  rollbackDelay?: number;
}

/**
 * Optimistic updates hook return interface
 */
export interface UseOptimisticReturn<T> {
  /** Current optimistic state */
  optimisticState: T;
  /** Add an optimistic update */
  addOptimistic: (update: Partial<T>) => void;
  /** Whether an update is pending */
  isPending: boolean;
  /** Start a transition */
  startTransition: (action: () => void | Promise<void>) => void;
  /** Reset to original state */
  resetOptimistic: () => void;
}

/**
 * Optimistic list item interface (must have an id)
 */
export interface OptimisticListItem {
  id: string | number;
  [key: string]: any;
}

/**
 * Optimistic list operations interface
 */
export interface UseOptimisticListReturn<T extends OptimisticListItem> {
  /** Current list items */
  items: T[];
  /** Add an item optimistically */
  addItem: (item: T) => void;
  /** Update an item optimistically */
  updateItem: (id: string | number, updates: Partial<T>) => void;
  /** Remove an item optimistically */
  removeItem: (id: string | number) => void;
  /** Whether an operation is pending */
  isPending: boolean;
  /** Start a transition */
  startTransition: (action: () => void | Promise<void>) => void;
}

/**
 * Form field errors interface
 */
export type FormFieldErrors<T extends Record<string, any>> = {
  [K in keyof T]?: string;
};

/**
 * Optimistic form hook interface
 */
export interface UseOptimisticFormReturn<T extends Record<string, any>> {
  /** Current form data */
  data: T;
  /** Update a specific field */
  updateField: (field: keyof T, value: any) => void;
  /** Submit the form */
  submit: () => Promise<void>;
  /** Whether the form is submitting */
  isSubmitting: boolean;
  /** Form field errors */
  errors: FormFieldErrors<T>;
  /** Reset form to initial state */
  reset: () => void;
}

/**
 * Server component props interface
 */
export interface ServerComponentProps {
  /** Search parameters from URL */
  searchParams?: Record<string, string | string[] | undefined>;
  /** Route parameters */
  params?: Record<string, string>;
  /** Child components */
  children?: ReactNode;
}

/**
 * Server action result interface
 */
export interface ServerActionResult<T = any> {
  /** Whether the action succeeded */
  success: boolean;
  /** Result data if successful */
  data?: T;
  /** Error message if failed */
  error?: string;
  /** Field-specific errors */
  fieldErrors?: Record<string, string>;
}

/**
 * Form action state interface for useActionState
 */
export interface FormActionState<T = any> {
  /** Current form data */
  data?: T;
  /** Success status */
  success?: boolean;
  /** Error message */
  error?: string;
  /** Field-specific errors */
  fieldErrors?: Record<string, string>;
  /** Timestamp of last action */
  timestamp?: number;
}

/**
 * Enhanced form state hook return interface
 */
export interface UseFormStateReturn<T> {
  /** Current form state */
  state: FormActionState<T>;
  /** Form action function */
  formAction: (formData: FormData) => void;
  /** Whether action is pending */
  isPending: boolean;
}

/**
 * Suspense boundary error interface
 */
export interface SuspenseError {
  /** Error message */
  message: string;
  /** Error stack trace */
  stack?: string;
  /** Component name where error occurred */
  componentStack?: string;
  /** Error boundary name */
  boundaryName?: string;
}

/**
 * Error boundary state interface
 */
export interface ErrorBoundaryState {
  /** Whether there's an error */
  hasError: boolean;
  /** Error details */
  error?: SuspenseError;
  /** Error info from React */
  errorInfo?: {
    componentStack: string;
  };
}

/**
 * Async component props interface
 */
export interface AsyncComponentProps<T = any> {
  /** Promise that resolves to component data */
  promise: Promise<T>;
  /** Fallback content while loading */
  fallback?: ReactNode;
  /** Error boundary fallback */
  errorFallback?: (error: Error) => ReactNode;
}