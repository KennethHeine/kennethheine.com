import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '../components/ThemeToggle'
import { ThemeProvider } from '../components/ThemeProvider'

// Mock the theme context
const mockSetTheme = jest.fn()

jest.mock('../components/ThemeProvider', () => ({
  ...jest.requireActual('../components/ThemeProvider'),
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}))

describe('ThemeToggle component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toBeInTheDocument()
  })
  it('calls toggleTheme when clicked', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    fireEvent.click(button)
    
    expect(mockSetTheme).toHaveBeenCalledTimes(1)
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode')
  })
})
