import { render, screen } from '@testing-library/react'
import { Layout } from '../../components/Layout'
import { ThemeProvider } from '../../components/ThemeProvider'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

const LayoutWithProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <Layout>{children}</Layout>
  </ThemeProvider>
)

describe('Layout component', () => {
  it('renders layout with navigation and footer', () => {
    render(
      <LayoutWithProvider>
        <div>Test content</div>
      </LayoutWithProvider>
    )

    // Check for navigation elements
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Kenneth Heine')).toBeInTheDocument()
    
    // Check for main navigation links
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()

    // Check for theme toggle
    expect(screen.getByRole('button', { name: /switch to/i })).toBeInTheDocument()

    // Check for content
    expect(screen.getByText('Test content')).toBeInTheDocument()    // Check for footer
    expect(screen.getByText(/© 2025 Kenneth Heine/i)).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(
      <LayoutWithProvider>
        <div>Test content</div>
      </LayoutWithProvider>
    )    // Mobile menu button should be present
    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument()
  })

  it('applies correct classes for responsive design', () => {
    const { container } = render(
      <LayoutWithProvider>
        <div>Test content</div>
      </LayoutWithProvider>
    )    // Check for responsive classes on main layout
    const layoutContainer = container.querySelector('.min-h-screen')
    expect(layoutContainer).toBeInTheDocument()
    expect(layoutContainer).toHaveClass('min-h-screen')
  })
})
