/**
 * @fileoverview Enhanced theme management hook with React 19 patterns
 * @author Kenneth Heine
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface UseThemeOptions {
  /** Storage key for theme preference */
  storageKey?: string;
  /** Default theme when no preference is stored */
  defaultTheme?: Theme;
  /** Whether to sync across browser tabs */
  syncAcrossTabs?: boolean;
}

interface UseThemeReturn {
  /** Current theme setting */
  theme: Theme;
  /** Resolved theme (light/dark) */
  resolvedTheme: ResolvedTheme;
  /** Set theme preference */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
  /** Whether component is mounted (for SSR) */
  mounted: boolean;
}

/**
 * Enhanced theme management hook with React 19 patterns
 *
 * Features:
 * - System theme detection
 * - localStorage persistence
 * - Cross-tab synchronization
 * - SSR compatibility
 * - React 19 optimized patterns
 *
 * @param options - Configuration options
 * @returns Theme state and controls
 *
 * @example
 * ```typescript
 * const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 *
 * // Set specific theme
 * setTheme('dark');
 *
 * // Toggle between light/dark
 * toggleTheme();
 * ```
 */
export function useTheme(options: UseThemeOptions = {}): UseThemeReturn {
  const {
    storageKey = 'theme',
    defaultTheme = 'system',
    syncAcrossTabs = true,
  } = options;

  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Calculate resolved theme
  const resolvedTheme: ResolvedTheme =
    theme === 'system'
      ? typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  // Set mounted after hydration
  useEffect(() => {
    setMounted(true);

    // Load theme from localStorage
    try {
      const savedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setThemeState(savedTheme);
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
  }, [storageKey]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Apply resolved theme
    root.classList.add(resolvedTheme);

    // Save to localStorage
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [theme, resolvedTheme, mounted, storageKey]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted, theme]);

  // Listen for cross-tab changes
  useEffect(() => {
    if (!mounted || !syncAcrossTabs) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (['light', 'dark', 'system'].includes(newTheme)) {
          setThemeState(newTheme);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mounted, storageKey, syncAcrossTabs]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(current => {
      switch (current) {
        case 'light':
          return 'dark';
        case 'dark':
          return 'light';
        case 'system':
          return resolvedTheme === 'light' ? 'dark' : 'light';
        default:
          return 'light';
      }
    });
  }, [resolvedTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    mounted,
  };
}
