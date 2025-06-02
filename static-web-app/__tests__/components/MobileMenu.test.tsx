import { render, screen, fireEvent } from '@testing-library/react'
import { MobileMenu } from '../../components/MobileMenu'
import { ThemeProvider } from '../../components/ThemeProvider'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

const MobileMenuWithProvider = (props: any) => (
  <ThemeProvider>
    <MobileMenu 
      open={props.isOpen || false}
      onClose={props.onClose || jest.fn()}
      navigation={[
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
      ]}
      pathname="/"
      {...props}
    />
  </ThemeProvider>
)

describe('MobileMenu component', () => {  it('renders mobile menu when open', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />)

    // Check for mobile menu container with Menu heading
    expect(screen.getByText('Menu')).toBeInTheDocument()
    
    // Check for navigation links
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()

    // Check for close button
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
  })
  it('does not render mobile menu when closed', () => {
    render(<MobileMenuWithProvider isOpen={false} onClose={jest.fn()} />)

    // Mobile menu should not be visible
    expect(screen.queryByText('Menu')).not.toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn()
    render(<MobileMenuWithProvider isOpen={true} onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: /close menu/i })
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
  it('calls onClose when backdrop is clicked', () => {
    const mockOnClose = jest.fn()
    const { container } = render(<MobileMenuWithProvider isOpen={true} onClose={mockOnClose} />)

    // Click on the backdrop element
    const backdrop = container.querySelector('.bg-black\\/20')
    fireEvent.click(backdrop!)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
  it('highlights active navigation item', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />)

    // Home should be active (mocked pathname is '/')
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toHaveClass('text-brand-600')
  })
  it('applies correct accessibility attributes', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />)

    // Check that close button has proper aria-label
    const closeButton = screen.getByRole('button', { name: /close menu/i })
    expect(closeButton).toHaveAttribute('aria-label', 'Close menu')
    
    // Check that navigation is properly labeled
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })
})
