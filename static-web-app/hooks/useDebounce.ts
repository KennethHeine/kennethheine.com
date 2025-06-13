/**
 * @fileoverview Debounced value hook for performance optimization
 * @author Kenneth Heine
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseDebounceOptions {
  /** Debounce delay in milliseconds */
  delay?: number;
  /** Whether to call immediately on first invocation */
  leading?: boolean;
  /** Whether to call on the trailing edge */
  trailing?: boolean;
  /** Maximum wait time */
  maxWait?: number;
}

/**
 * Hook that debounces a value
 *
 * Useful for search inputs, API calls, and other expensive operations
 * that shouldn't be triggered on every change.
 *
 * @template T - Type of the debounced value
 * @param value - Value to debounce
 * @param options - Debounce configuration
 * @returns Debounced value
 *
 * @example
 * ```typescript
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, { delay: 300 });
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebounce<T>(value: T, options: UseDebounceOptions = {}): T {
  const { delay = 300, leading = false, trailing = true } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Handle leading edge
    if (leading && !initializedRef.current) {
      setDebouncedValue(value);
      initializedRef.current = true;
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Handle trailing edge
    if (trailing) {
      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    }

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, leading, trailing]);

  return debouncedValue;
}

interface UseDebouncedCallbackOptions extends UseDebounceOptions {
  /** Dependencies array for the callback */
  deps?: React.DependencyList;
}

/**
 * Hook that debounces a callback function
 *
 * @param callback - Function to debounce
 * @param options - Debounce configuration
 * @returns Debounced callback function
 *
 * @example
 * ```typescript
 * const debouncedSave = useDebouncedCallback(
 *   (data) => saveToAPI(data),
 *   { delay: 500 }
 * );
 *
 * // Usage
 * debouncedSave(formData);
 * ```
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  options: UseDebouncedCallbackOptions = {}
): T {
  const { delay = 300, leading = false, trailing = true, deps = [] } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);
  const argsRef = useRef<Parameters<T> | null>(null);
  const initializedRef = useRef(false);

  // Update callback ref when dependencies change
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...deps]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      argsRef.current = args;

      // Handle leading edge
      if (leading && !initializedRef.current) {
        initializedRef.current = true;
        return callbackRef.current(...args);
      }

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Handle trailing edge
      if (trailing) {
        timeoutRef.current = setTimeout(() => {
          if (argsRef.current) {
            callbackRef.current(...argsRef.current);
          }
        }, delay);
      }
    },
    [delay, leading, trailing]
  ) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook that provides a cancel function for debounced operations
 *
 * @param value - Value to debounce
 * @param options - Debounce configuration
 * @returns Object with debounced value and cancel function
 *
 * @example
 * ```typescript
 * const { debouncedValue, cancel, isPending } = useDebouncedValue(searchTerm, {
 *   delay: 300
 * });
 *
 * // Cancel pending debounce
 * const handleCancel = () => {
 *   cancel();
 * };
 * ```
 */
export function useDebouncedValue<T>(
  value: T,
  options: UseDebounceOptions = {}
): {
  debouncedValue: T;
  cancel: () => void;
  isPending: boolean;
} {
  const { delay = 300 } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value !== debouncedValue) {
      setIsPending(true);

      timeoutRef.current = setTimeout(() => {
        setDebouncedValue(value);
        setIsPending(false);
      }, delay);
    } else {
      setIsPending(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, debouncedValue]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setIsPending(false);
    }
  }, []);

  return {
    debouncedValue,
    cancel,
    isPending,
  };
}
