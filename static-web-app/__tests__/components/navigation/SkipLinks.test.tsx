// --- file: __tests__/components/navigation/SkipLinks.test.tsx ---
import { render, screen, fireEvent } from '@testing-library/react';
import { SkipLinks } from '../../../components/navigation/SkipLinks';

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  writable: true,
  value: mockScrollIntoView,
});

// Mock focus
const mockFocus = jest.fn();

describe('SkipLinks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset DOM
    document.body.innerHTML = '';
  });

  afterEach(() => {
    // Clean up any added elements
    document.body.innerHTML = '';
  });

  it('renders skip links with correct accessibility attributes', () => {
    render(<SkipLinks />);

    const skipToContent = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    const skipToNav = screen.getByRole('link', { name: /skip to navigation/i });
    const skipToFooter = screen.getByRole('link', { name: /skip to footer/i });

    expect(skipToContent).toBeInTheDocument();
    expect(skipToNav).toBeInTheDocument();
    expect(skipToFooter).toBeInTheDocument();

    expect(skipToContent).toHaveAttribute('href', '#main-content');
    expect(skipToNav).toHaveAttribute('href', '#main-navigation');
    expect(skipToFooter).toHaveAttribute('href', '#footer');
  });

  it('applies correct CSS classes for accessibility', () => {
    render(<SkipLinks />);
    const container = screen.getByRole('link', {
      name: /skip to main content/i,
    }).parentElement;

    expect(container).toHaveClass('sr-only', 'focus-within:not-sr-only');
  });

  it('applies correct focus styling to skip links', () => {
    render(<SkipLinks />);
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    expect(skipLink).toHaveClass(
      'bg-brand-600',
      'text-white',
      'px-4',
      'py-2',
      'text-sm',
      'font-medium',
      'rounded-br-md',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-white'
    );
  });

  it('focuses and scrolls to target element when clicked', () => {
    // Create target element
    const targetElement = document.createElement('main');
    targetElement.id = 'main-content';
    targetElement.focus = mockFocus;
    document.body.appendChild(targetElement);

    render(<SkipLinks />);
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    fireEvent.click(skipLink);

    expect(mockFocus).toHaveBeenCalled();
    expect(mockScrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('handles missing target element gracefully', () => {
    render(<SkipLinks />);
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    // Should not throw error when target doesn't exist
    expect(() => {
      fireEvent.click(skipLink);
    }).not.toThrow();

    expect(mockFocus).not.toHaveBeenCalled();
    expect(mockScrollIntoView).not.toHaveBeenCalled();
  });

  it('prevents default link behavior when clicking', () => {
    const targetElement = document.createElement('main');
    targetElement.id = 'main-content';
    targetElement.focus = mockFocus;
    document.body.appendChild(targetElement);

    render(<SkipLinks />);
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    const clickEvent = new Event('click', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

    fireEvent(skipLink, clickEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('supports all three skip link targets', () => {
    // Create all target elements
    const mainElement = document.createElement('main');
    mainElement.id = 'main-content';
    mainElement.focus = mockFocus;

    const navElement = document.createElement('nav');
    navElement.id = 'main-navigation';
    navElement.focus = mockFocus;

    const footerElement = document.createElement('footer');
    footerElement.id = 'footer';
    footerElement.focus = mockFocus;

    document.body.appendChild(mainElement);
    document.body.appendChild(navElement);
    document.body.appendChild(footerElement);

    render(<SkipLinks />);

    // Test main content skip link
    const skipToContent = screen.getByRole('link', {
      name: /skip to main content/i,
    });
    fireEvent.click(skipToContent);
    expect(mockFocus).toHaveBeenCalledTimes(1);

    // Test navigation skip link
    const skipToNav = screen.getByRole('link', { name: /skip to navigation/i });
    fireEvent.click(skipToNav);
    expect(mockFocus).toHaveBeenCalledTimes(2);

    // Test footer skip link
    const skipToFooter = screen.getByRole('link', { name: /skip to footer/i });
    fireEvent.click(skipToFooter);
    expect(mockFocus).toHaveBeenCalledTimes(3);
  });

  it('has proper dark mode styling', () => {
    render(<SkipLinks />);
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    expect(skipLink).toHaveClass(
      'dark:bg-brand-500',
      'dark:text-white',
      'dark:hover:bg-brand-400',
      'dark:focus:bg-brand-400'
    );
  });

  it('has proper hover and focus states', () => {
    render(<SkipLinks />);
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    expect(skipLink).toHaveClass(
      'hover:bg-brand-700',
      'focus:bg-brand-700',
      'transition-transform',
      'duration-150',
      'ease-in-out'
    );
  });

  it('maintains proper z-index for visibility', () => {
    render(<SkipLinks />);
    const skipLink = screen.getByRole('link', {
      name: /skip to main content/i,
    });

    expect(skipLink).toHaveClass('z-[100]');
  });
});
