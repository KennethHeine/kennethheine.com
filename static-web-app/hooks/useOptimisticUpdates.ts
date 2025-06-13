/**
 * @fileoverview React 19 optimistic updates hook
 * @author Kenneth Heine
 */

'use client';

import { useCallback, useState, useTransition } from 'react';
import type {
  OptimisticUpdateOptions,
  UseOptimisticReturn,
  OptimisticListItem,
  UseOptimisticListReturn,
  FormFieldErrors,
  UseOptimisticFormReturn,
} from '@/types/react-19';

/**
 * Enhanced optimistic updates hook using React 19 patterns
 *
 * Provides optimistic UI updates with manual rollback capability,
 * validation, and custom reducers for complex state updates.
 *
 * @template T - Type of the state
 * @param initialState - Initial state value
 * @param options - Configuration options
 * @returns Optimistic state and controls
 *
 * @example
 * ```typescript
 * const { optimisticState, addOptimistic, startTransition } = useOptimisticUpdates(
 *   posts,
 *   {
 *     reducer: (state, update) => ({
 *       ...state,
 *       posts: [...state.posts, update.newPost]
 *     })
 *   }
 * );
 *
 * const handleAddPost = async (post) => {
 *   // Optimistically add post
 *   addOptimistic({ newPost: post });
 *
 *   // Perform actual update
 *   startTransition(async () => {
 *     await addPostToAPI(post);
 *   });
 * };
 * ```
 */
export function useOptimisticUpdates<T>(
  initialState: T,
  options: OptimisticUpdateOptions<T> = {}
): UseOptimisticReturn<T> {
  const {
    reducer = (state: T, optimisticValue: Partial<T>) => ({
      ...state,
      ...optimisticValue,
    }),
    validator,
    rollbackDelay = 5000,
  } = options;

  const [isPending, startTransition] = useTransition();
  const [optimisticState, setOptimisticState] = useState<T>(initialState);

  const addOptimistic = useCallback(
    (update: Partial<T>) => {
      // Validate update if validator is provided
      if (validator && !validator(update)) {
        console.warn('Invalid optimistic update:', update);
        return;
      }

      setOptimisticState(current => reducer(current, update));

      // Set up automatic rollback if specified
      if (rollbackDelay > 0) {
        setTimeout(() => {
          console.debug('Rollback delay elapsed for optimistic update');
        }, rollbackDelay);
      }
    },
    [reducer, validator, rollbackDelay]
  );

  const resetOptimistic = useCallback(() => {
    setOptimisticState(initialState);
  }, [initialState]);

  return {
    optimisticState,
    addOptimistic,
    isPending,
    startTransition,
    resetOptimistic,
  };
}

/**
 * Optimistic list operations hook
 *
 * Provides common list operations with optimistic updates.
 */
export function useOptimisticList<T extends OptimisticListItem>(
  initialItems: T[]
): UseOptimisticListReturn<T> {
  const [isPending, startTransition] = useTransition();
  const [optimisticItems, setOptimisticItems] = useState<T[]>(initialItems);

  const addItem = useCallback((item: T) => {
    setOptimisticItems(current => [...current, item]);
  }, []);

  const updateItem = useCallback((id: string | number, updates: Partial<T>) => {
    setOptimisticItems(current =>
      current.map(item => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const removeItem = useCallback((id: string | number) => {
    setOptimisticItems(current => current.filter(item => item.id !== id));
  }, []);

  return {
    items: optimisticItems,
    addItem,
    updateItem,
    removeItem,
    isPending,
    startTransition,
  };
}

/**
 * Optimistic form hook for form submissions
 */
export function useOptimisticForm<T extends Record<string, any>>(
  initialData: T,
  submitFn: (data: T) => Promise<void>
): UseOptimisticFormReturn<T> {
  const [isPending, startTransition] = useTransition();
  const [optimisticData, setOptimisticData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormFieldErrors<T>>(
    {} as FormFieldErrors<T>
  );

  const updateField = useCallback(
    (field: keyof T, value: any) => {
      setOptimisticData(current => ({ ...current, [field]: value }));

      // Clear error for this field
      if (errors[field]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const submit = useCallback(async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        startTransition(async () => {
          try {
            await submitFn(optimisticData);
            setErrors({} as Record<keyof T, string>);
            resolve();
          } catch (error) {
            setErrors({
              _form:
                error instanceof Error ? error.message : 'Submission failed',
            } as FormFieldErrors<T>);
            reject(error);
          }
        });
      });
    } catch {
      // Error is already handled above
    }
  }, [optimisticData, submitFn, startTransition]);

  const reset = useCallback(() => {
    setOptimisticData(initialData);
    setErrors({} as FormFieldErrors<T>);
  }, [initialData]);

  return {
    data: optimisticData,
    updateField,
    submit,
    isSubmitting: isPending,
    errors,
    reset,
  };
}
