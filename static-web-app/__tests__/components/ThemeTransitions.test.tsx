/**
 * Tests for enhanced theme transition behavior
 * Tests the improvements made for task #108
 */
import { act, render, screen } from '@testing-library/react';
import {
  ThemeProvider,
  useTheme,
} from '../../components/providers/ThemeProvider';

// Test component that renders theme-dependent styles
const ThemeTransitionTestComponent = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid='current-theme'>{theme}</span>
      <button data-testid='set-light' onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button data-testid='set-dark' onClick={() => setTheme('dark')}>
        Set Dark
      </button>
      <button data-testid='set-system' onClick={() => setTheme('system')}>
        Set System
      </button>
      {/* Test elements that should have theme-aware styles */}
      <div
        data-testid='themed-element'
        className='bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200'
      >
        Themed content
      </div>
      <div data-testid='themed-card' className='card'>
        Card content
      </div>
    </div>
  );
};

describe('Enhanced Theme Transitions (Task #108)', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset the document class
    document.documentElement.className = '';
    // Mock matchMedia for consistent testing
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false, // Default to light mode
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('applies correct theme classes immediately on theme change', () => {
    render(
      <ThemeProvider>
        <ThemeTransitionTestComponent />
      </ThemeProvider>
    );

    // Start with system (should default to light)
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    expect(document.documentElement).toHaveClass('light');

    // Switch to dark theme
    act(() => {
      screen.getByTestId('set-dark').click();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('light');
  });

  it('persists theme preference correctly', () => {
    render(
      <ThemeProvider>
        <ThemeTransitionTestComponent />
      </ThemeProvider>
    );

    // Set dark theme
    act(() => {
      screen.getByTestId('set-dark').click();
    });

    expect(localStorage.getItem('theme')).toBe('dark');

    // Set light theme
    act(() => {
      screen.getByTestId('set-light').click();
    });

    expect(localStorage.getItem('theme')).toBe('light');

    // Set system theme
    act(() => {
      screen.getByTestId('set-system').click();
    });

    expect(localStorage.getItem('theme')).toBe('system');
  });

  it('handles rapid theme switching without issues', () => {
    render(
      <ThemeProvider>
        <ThemeTransitionTestComponent />
      </ThemeProvider>
    );

    // Rapidly switch themes
    act(() => {
      screen.getByTestId('set-light').click();
    });
    act(() => {
      screen.getByTestId('set-dark').click();
    });
    act(() => {
      screen.getByTestId('set-system').click();
    });
    act(() => {
      screen.getByTestId('set-light').click();
    });

    // Should end up in light mode
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement).toHaveClass('light');
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('respects system preference when set to system theme', () => {
    // Mock dark system preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <ThemeTransitionTestComponent />
      </ThemeProvider>
    );

    // Set to system theme
    act(() => {
      screen.getByTestId('set-system').click();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('maintains theme state consistency across component re-renders', () => {
    const { rerender } = render(
      <ThemeProvider>
        <ThemeTransitionTestComponent />
      </ThemeProvider>
    );

    // Set dark theme
    act(() => {
      screen.getByTestId('set-dark').click();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    // Re-render component
    rerender(
      <ThemeProvider>
        <ThemeTransitionTestComponent />
      </ThemeProvider>
    );

    // Theme should persist
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
  });
});
