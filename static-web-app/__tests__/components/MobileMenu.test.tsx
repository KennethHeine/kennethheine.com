import { fireEvent, render, screen } from '@testing-library/react';
import { MobileMenu } from '../../components/navigation/MobileMenu';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

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
      pathname='/'
      {...props}
    />
  </ThemeProvider>
);

describe('MobileMenu component', () => {
  it('renders mobile menu when open', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />);

    // Check for mobile menu container with Menu heading
    expect(screen.getByText('Menu')).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();

    // Check for close button
    expect(
      screen.getByRole('button', { name: /close navigation menu/i })
    ).toBeInTheDocument();
  });
  it('does not render mobile menu when closed', () => {
    render(<MobileMenuWithProvider isOpen={false} onClose={jest.fn()} />);

    // Mobile menu should not be visible
    expect(screen.queryByText('Menu')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<MobileMenuWithProvider isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', {
      name: /close navigation menu/i,
    });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it('calls onClose when backdrop is clicked', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <MobileMenuWithProvider isOpen={true} onClose={mockOnClose} />
    );

    // Click on the backdrop element
    const backdrop = container.querySelector('.bg-black\\/20');
    fireEvent.click(backdrop!); // eslint-disable-line @typescript-eslint/no-non-null-assertion

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it('highlights active navigation item', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />);

    // Home should be active (mocked pathname is '/')
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('text-brand-600');
  });
  it('applies correct accessibility attributes', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />);

    // Check that close button has proper aria-label
    const closeButton = screen.getByRole('button', {
      name: /close navigation menu/i,
    });
    expect(closeButton).toHaveAttribute('aria-label', 'Close navigation menu');

    // Check that navigation is properly labeled
    expect(screen.getByText('Menu')).toBeInTheDocument();

    // Check for proper dialog structure
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'mobile-menu-heading');

    // Check navigation role
    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('has proper touch target sizes for mobile', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />);

    // Check close button touch target (44px minimum)
    const closeButton = screen.getByRole('button', {
      name: /close navigation menu/i,
    });
    expect(closeButton).toHaveClass('min-w-11', 'min-h-11');

    // Check navigation items have adequate spacing
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('min-h-11', 'px-4', 'py-3');
  });

  it('implements proper focus management', () => {
    const mockOnClose = jest.fn();
    render(<MobileMenuWithProvider isOpen={true} onClose={mockOnClose} />);

    // Close button should be focused when menu opens
    const closeButton = screen.getByRole('button', {
      name: /close navigation menu/i,
    });
    expect(closeButton).toHaveFocus();
  });

  it('handles escape key to close menu', () => {
    const mockOnClose = jest.fn();
    render(<MobileMenuWithProvider isOpen={true} onClose={mockOnClose} />);

    // Press escape key
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('includes proper ARIA current state for active page', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />);

    // Home link should have aria-current="page" since pathname is "/"
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('aria-current', 'page');

    // Other links should not have aria-current
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).not.toHaveAttribute('aria-current');
  });

  it('maintains proper heading structure with labeled dialog', () => {
    render(<MobileMenuWithProvider isOpen={true} onClose={jest.fn()} />);

    const heading = screen.getByText('Menu');
    expect(heading).toHaveAttribute('id', 'mobile-menu-heading');

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'mobile-menu-heading');
  });
});
