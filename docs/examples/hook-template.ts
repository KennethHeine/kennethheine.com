/**
 * @fileoverview Example React hooks with comprehensive documentation
 * @author Kenneth Heine
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Configuration options for localStorage hook
 */
export interface UseLocalStorageOptions {
  /** Custom serializer function */
  serializer?: {
    read: (value: string) => unknown;
    write: (value: unknown) => string;
  };
  /** Whether to sync across tabs */
  syncAcrossTabs?: boolean;
  /** Default value when key doesn't exist */
  defaultValue?: unknown;
}

/**
 * Return type for useLocalStorage hook
 */
export type UseLocalStorageReturn<T> = [
  value: T,
  setValue: (value: T | ((prev: T) => T)) => void,
  removeValue: () => void
];

/**
 * Custom hook for managing localStorage state with SSR compatibility
 * 
 * This hook provides a React state-like interface for localStorage values,
 * handling SSR compatibility, type safety, and automatic synchronization
 * across browser tabs.
 * 
 * @hook
 * @template T - Type of the stored value
 * @param key - localStorage key
 * @param initialValue - Initial value when key doesn't exist
 * @param options - Configuration options
 * @returns Tuple containing [value, setValue, removeValue]
 * 
 * @throws {Error} When localStorage is not available
 * 
 * @example
 * ```typescript
 * // Basic usage
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
 * 
 * @see {@link useSessionStorage} for session storage alternative
 * @since 1.0.0
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions = {}
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
      write: (value: unknown) => JSON.stringify(value),
    },
    syncAcrossTabs = true,
    defaultValue = initialValue,
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
      
      // Parse stored json or return initialValue
      return item ? (serializer.read(item) as T) : initialValue;
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
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        
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
    [key, storedValue, serializer]
  );

  /**
   * Removes the value from localStorage and resets to initial value
   */
  const removeValue = useCallback(() => {
    try {
      setStoredValue(defaultValue as T);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

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
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(serializer.read(e.newValue) as T);
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, serializer, syncAcrossTabs]);

  return [storedValue, setValue, removeValue];
}

/**
 * Configuration for debounced value hook
 */
export interface UseDebounceOptions {
  /** Leading edge execution */
  leading?: boolean;
  /** Trailing edge execution */
  trailing?: boolean;
}

/**
 * Custom hook that debounces a value
 * 
 * @hook
 * @template T - Type of the value to debounce
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @param options - Debounce options
 * @returns Debounced value
 * 
 * @example
 * ```typescript
 * function SearchInput() {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const debouncedSearchTerm = useDebounce(searchTerm, 300);
 * 
 *   useEffect(() => {
 *     if (debouncedSearchTerm) {
 *       // Perform search
 *       performSearch(debouncedSearchTerm);
 *     }
 *   }, [debouncedSearchTerm]);
 * 
 *   return (
 *     <input 
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *       placeholder="Search..."
 *     />
 *   );
 * }
 * ```
 */
export function useDebounce<T>(
  value: T,
  delay: number,
  options: UseDebounceOptions = {}
): T {
  const { trailing = true } = options;
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (!trailing) {
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, trailing]);

  return debouncedValue;
}

/**
 * Configuration for intersection observer hook
 */
export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Whether to freeze the observer after first intersection */
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook for using Intersection Observer API
 * 
 * @hook
 * @param options - Intersection observer options
 * @returns Tuple containing [ref, entry, isIntersecting]
 * 
 * @example
 * ```typescript
 * function LazyImage({ src, alt }: { src: string; alt: string }) {
 *   const [ref, entry, isIntersecting] = useIntersectionObserver({
 *     threshold: 0.1,
 *     freezeOnceVisible: true
 *   });
 * 
 *   return (
 *     <div ref={ref}>
 *       {isIntersecting ? (
 *         <img src={src} alt={alt} />
 *       ) : (
 *         <div className="placeholder">Loading...</div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [
  ref: (node?: Element | null) => void,
  entry: IntersectionObserverEntry | undefined,
  isIntersecting: boolean
] {
  const { freezeOnceVisible = false, ...observerOptions } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isIntersecting, setIsIntersecting] = useState(false);
  const frozen = useRef(false);

  const ref = useCallback(
    (node: Element | null) => {
      if (!node || frozen.current) return;

      const observer = new IntersectionObserver(
        ([entry]: IntersectionObserverEntry[]) => {
          setEntry(entry);
          setIsIntersecting(entry.isIntersecting);

          if (entry.isIntersecting && freezeOnceVisible) {
            frozen.current = true;
            observer.disconnect();
          }
        },
        observerOptions
      );

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    },
    [observerOptions, freezeOnceVisible]
  );

  return [ref, entry, isIntersecting];
}

/**
 * Custom hook for handling previous value
 * 
 * @hook
 * @template T - Type of the value
 * @param value - Current value
 * @returns Previous value
 * 
 * @example
 * ```typescript
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 * 
 *   return (
 *     <div>
 *       <p>Current: {count}</p>
 *       <p>Previous: {prevCount}</p>
 *       <button onClick={() => setCount(count + 1)}>
 *         Increment
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Custom hook for handling async operations with loading state
 * 
 * @hook
 * @template T - Type of the async operation result
 * @template E - Type of the error
 * @param asyncFunction - Async function to execute
 * @param immediate - Whether to execute immediately
 * @returns Object containing execute function, loading state, data, and error
 * 
 * @example
 * ```typescript
 * function UserProfile({ userId }: { userId: string }) {
 *   const {
 *     execute: fetchUser,
 *     loading,
 *     data: user,
 *     error
 *   } = useAsync<User, Error>(
 *     () => api.fetchUser(userId),
 *     true // Execute immediately
 *   );
 * 
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   if (!user) return <div>No user found</div>;
 * 
 *   return <div>Hello, {user.name}!</div>;
 * }
 * ```
 */
export function useAsync<T, E = Error>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = false
) {
  const [loading, setLoading] = useState(immediate);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  /**
   * Executes the async function
   * @returns Promise resolving to the result
   */
  const execute = useCallback(async (): Promise<T | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err as E);
      return null;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute,
    loading,
    data,
    error,
  };
}