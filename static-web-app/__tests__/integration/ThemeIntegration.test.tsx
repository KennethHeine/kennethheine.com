/**
 * Integration test to verify theme transitions work across components
 * This test validates task #108 implementation across the component ecosystem
 */
import { act, render, screen } from '@testing-library/react';
import {
  ThemeProvider,
  useTheme,
} from '../../components/providers/ThemeProvider';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

// Mock component that uses theme-aware styles
const MockCard = () => (
  <div
    data-testid='mock-card'
    className='card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
  >
    Card content
  </div>
);

const MockButton = () => (
  <button data-testid='mock-button' className='btn btn-primary'>
    Button
  </button>
);

const MockNavLink = () => (
  <button data-testid='mock-nav-link' className='nav-link'>
    Navigation Link
  </button>
);

// Integration test component
const IntegrationTestComponent = () => {
  const { theme } = useTheme();

  return (
    <div>
      <span data-testid='current-theme'>{theme}</span>
      <ThemeToggle data-testid='theme-toggle' />
      <MockCard />
      <MockButton />
      <MockNavLink />
    </div>
  );
};

describe('Theme Integration Across Components (Task #108)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
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

  it('applies theme classes consistently across all component types', () => {
    render(
      <ThemeProvider>
        <IntegrationTestComponent />
      </ThemeProvider>
    );

    // Should start with system theme, which defaults to light
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    expect(document.documentElement).toHaveClass('light');

    // Toggle to light theme (system -> light)
    act(() => {
      screen.getByTestId('theme-toggle').click();
    });

    // Verify light theme is applied
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement).toHaveClass('light');
    expect(document.documentElement).not.toHaveClass('dark');

    // Toggle to dark theme (light -> dark)
    act(() => {
      screen.getByTestId('theme-toggle').click();
    });

    // Verify dark theme is applied
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('light');
  });

  it('maintains theme consistency when toggling multiple times', () => {
    render(
      <ThemeProvider>
        <IntegrationTestComponent />
      </ThemeProvider>
    );

    const themeToggle = screen.getByTestId('theme-toggle');

    // Cycle through themes: system -> light -> dark -> system
    act(() => {
      themeToggle.click(); // system -> light
    });
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    act(() => {
      themeToggle.click(); // light -> dark
    });
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    act(() => {
      themeToggle.click(); // dark -> system
    });
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system');

    act(() => {
      themeToggle.click(); // system -> light
    });
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement).toHaveClass('light');
  });

  it('verifies all theme-aware components have transition classes', () => {
    render(
      <ThemeProvider>
        <IntegrationTestComponent />
      </ThemeProvider>
    );

    // Check that theme-aware components have proper transition classes
    const themeToggle = screen.getByTestId('theme-toggle');
    const button = screen.getByTestId('mock-button');
    const navLink = screen.getByTestId('mock-nav-link');

    // ThemeToggle should have theme-transition class
    expect(themeToggle).toHaveClass('theme-transition');

    // Button should have btn class which includes theme-transition
    expect(button).toHaveClass('btn', 'btn-primary');

    // Nav link should have nav-link class which includes theme-transition
    expect(navLink).toHaveClass('nav-link');
  });
});
