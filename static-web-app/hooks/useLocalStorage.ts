/**
 * @fileoverview localStorage management hook with SSR compatibility
 * @author Kenneth Heine
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseLocalStorageOptions<T> {
  /** Custom serializer for complex types */
  serializer?: {
    read: (value: string) => T;
    write: (value: T) => string;
  };
  /** Whether to sync across browser tabs */
  syncAcrossTabs?: boolean;
  /** Validation function for stored values */
  validator?: (value: unknown) => value is T;
}

type UseLocalStorageReturn<T> = [
  value: T,
  setValue: (value: T | ((prev: T) => T)) => void,
  removeValue: () => void,
];

/**
 * localStorage hook with SSR compatibility and type safety
 *
 * Features:
 * - SSR safe initialization
 * - Cross-tab synchronization
 * - Custom serialization support
 * - Type validation
 * - Error handling
 *
 * @template T - Type of the stored value
 * @param key - localStorage key
 * @param initialValue - Initial value when key doesn't exist
 * @param options - Configuration options
 * @returns Tuple containing [value, setValue, removeValue]
 *
 * @example
 * ```typescript
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 *
 * // Update theme
 * setTheme('dark');
 *
 * // Remove theme (resets to initial value)
 * removeTheme();
 *
 * // With custom serializer
 * const [settings, setSettings] = useLocalStorage('settings', {}, {
 *   serializer: {
 *     read: (value) => JSON.parse(value),
 *     write: (value) => JSON.stringify(value)
 *   }
 * });
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> {
  const {
    serializer = {
      read: (value: string) => {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      },
      write: (value: T) => JSON.stringify(value),
    },
    syncAcrossTabs = true,
    validator,
  } = options;

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Check if we're in the browser
      if (typeof window === 'undefined') {
        return initialValue;
      }

      // Get from local storage by key
      const item = window.localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      // Parse stored value
      const parsed = serializer.read(item) as T;

      // Validate if validator is provided
      if (validator && !validator(parsed)) {
        console.warn(`Invalid value in localStorage for key "${key}":`, parsed);
        return initialValue;
      }

      return parsed;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Sets a new value in localStorage and state
   * @param value - New value or function that receives previous value
   */
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Validate if validator is provided
        if (validator && !validator(valueToStore)) {
          console.warn(
            `Invalid value for localStorage key "${key}":`,
            valueToStore
          );
          return;
        }

        // Save state
        setStoredValue(valueToStore);

        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer.write(valueToStore));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, serializer, validator]
  );

  /**
   * Removes the value from localStorage and resets to initial value
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for storage changes in other tabs
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === 'undefined') {
      return;
    }

    /**
     * Handles storage events from other tabs
     * @param e - Storage event
     */
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        if (e.newValue === null) {
          // Key was removed
          setStoredValue(initialValue);
        } else {
          try {
            const parsed = serializer.read(e.newValue) as T;

            // Validate if validator is provided
            if (validator && !validator(parsed)) {
              console.warn(
                `Invalid value from storage event for key "${key}":`,
                parsed
              );
              return;
            }

            setStoredValue(parsed);
          } catch (error) {
            console.warn(
              `Error parsing storage event for key "${key}":`,
              error
            );
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, initialValue, serializer, syncAcrossTabs, validator]);

  return [storedValue, setValue, removeValue];
}
