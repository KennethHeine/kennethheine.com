// --- file: components/ThemeProvider.tsx ---
'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Theme provider component for managing dark/light mode
 * Features:
 * - Persists theme preference in localStorage
 * - Supports system preference detection
 * - Prevents hydration mismatches
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after hydration to prevent SSR mismatches
  useEffect(() => {
    setMounted(true);

    // Load theme from localStorage or default to system
    try {
      const savedTheme = localStorage.getItem('theme');
      if (
        savedTheme === 'light' ||
        savedTheme === 'dark' ||
        savedTheme === 'system'
      ) {
        setTheme(savedTheme);
      }
    } catch {
      // Storage can be blocked by browser privacy settings. Use system theme.
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Determine effective theme
    let effectiveTheme: 'light' | 'dark' = 'light';

    if (theme === 'system') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      effectiveTheme = theme;
    }

    // Apply theme class
    root.classList.add(effectiveTheme);

    // Save to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Theme switching still works when the preference cannot be persisted.
    }
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Keep the provider mounted so hydration does not remount the page tree.
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // During SSR or before ThemeProvider is mounted, return default values
    return {
      theme: 'system' as Theme,
      setTheme: () => {},
    };
  }
  return context;
}
