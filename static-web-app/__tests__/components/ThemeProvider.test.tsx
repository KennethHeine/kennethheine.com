import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../components/ThemeProvider'

// Test component to access theme context
const TestComponent = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme(theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system')}>
        Toggle Theme
      </button>
    </div>
  )
}

describe('ThemeProvider component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset the document class
    document.documentElement.className = ''
  })
  it('provides default system theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
    // System theme should not force dark class - it depends on system preference
  })

  it('loads theme from localStorage', () => {
    // Set theme in localStorage
    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('respects system preference when no localStorage value', () => {
    // Mock matchMedia to return dark preference
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
    })

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('system')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('updates theme when setTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )    // Initial state should be system
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system')

    // Toggle to dark theme
    act(() => {
      screen.getByText('Toggle Theme').click()
    })

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('removes dark class when switching to light theme', () => {
    // Start with dark theme
    localStorage.setItem('theme', 'dark')

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    // Should start with dark theme
    expect(document.documentElement).toHaveClass('dark')

    // Toggle to light theme
    act(() => {
      screen.getByText('Toggle Theme').click()
    })

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('theme')).toBe('light')
  })
  it('returns default values when useTheme is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(<TestComponent />)
    
    // Should return system theme as default instead of throwing
    expect(screen.getByTestId('current-theme')).toHaveTextContent('system')

    consoleSpy.mockRestore()
  })
})
