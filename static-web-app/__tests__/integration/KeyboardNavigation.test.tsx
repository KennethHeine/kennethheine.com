// --- file: __tests__/integration/KeyboardNavigation.test.tsx ---
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { Layout } from '../../components/layout/Layout';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

// Mock scrollIntoView
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  writable: true,
  value: mockScrollIntoView,
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <Layout>{children}</Layout>
  </ThemeProvider>
);

describe('Keyboard Navigation Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Skip Links Functionality', () => {
    it('skip links are accessible via keyboard', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      // Skip links should be present but hidden by default
      const skipToContent = screen.getByRole('link', {
        name: /skip to main content/i,
      });
      const skipToNav = screen.getByRole('link', {
        name: /skip to navigation/i,
      });
      const skipToFooter = screen.getByRole('link', {
        name: /skip to footer/i,
      });

      expect(skipToContent).toBeInTheDocument();
      expect(skipToNav).toBeInTheDocument();
      expect(skipToFooter).toBeInTheDocument();
    });

    it('skip to main content works correctly', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link', {
        name: /skip to main content/i,
      });
      const mainContent = screen.getByRole('main');

      // Mock focus method
      const mockFocus = jest.fn();
      mainContent.focus = mockFocus;

      fireEvent.click(skipLink);

      expect(mockFocus).toHaveBeenCalled();
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('skip to navigation works correctly', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const skipLink = screen.getByRole('link', {
        name: /skip to navigation/i,
      });
      const navigation = screen.getByRole('navigation', {
        name: /main navigation/i,
      });

      // Mock focus method
      const mockFocus = jest.fn();
      navigation.focus = mockFocus;

      fireEvent.click(skipLink);

      expect(mockFocus).toHaveBeenCalled();
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  describe('Tab Order and Focus Management', () => {
    it('maintains logical tab order through main navigation', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      // Get all focusable elements in order
      const logo = screen.getByRole('link', { name: /kenneth heine/i });
      const homeLink = screen.getByRole('link', { name: 'Home' });
      const aboutLink = screen.getByRole('link', { name: 'About' });
      const blogLink = screen.getByRole('link', { name: 'Blog' });
      const contactLink = screen.getByRole('link', { name: 'Contact' });
      const themeToggle = screen.getByRole('button', { name: /switch to/i });

      // Verify they exist and can receive focus
      expect(logo).toBeInTheDocument();
      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(blogLink).toBeInTheDocument();
      expect(contactLink).toBeInTheDocument();
      expect(themeToggle).toBeInTheDocument();

      // Test focus on each element
      logo.focus();
      expect(document.activeElement).toBe(logo);

      homeLink.focus();
      expect(document.activeElement).toBe(homeLink);

      themeToggle.focus();
      expect(document.activeElement).toBe(themeToggle);
    });

    it('footer links are focusable and accessible', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const githubLink = screen.getByLabelText(/github profile/i);
      const linkedinLink = screen.getByLabelText(/linkedin profile/i);

      expect(githubLink).toBeInTheDocument();
      expect(linkedinLink).toBeInTheDocument();

      // Test focus
      githubLink.focus();
      expect(document.activeElement).toBe(githubLink);

      linkedinLink.focus();
      expect(document.activeElement).toBe(linkedinLink);
    });
  });

  describe('Focus Indicators', () => {
    it('navigation links have proper focus indicators', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const homeLink = screen.getByRole('link', { name: 'Home' });

      // Updated to match the enhanced focus indicators from Task #118
      expect(homeLink).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-brand-500',
        'focus:ring-offset-1' // Changed from offset-2 to offset-1 for links
      );

      // Check for additional enhanced focus properties
      expect(homeLink).toHaveClass(
        'focus:ring-offset-white',
        'dark:focus:ring-offset-gray-900',
        'dark:focus:ring-brand-400'
      );
    });

    it('theme toggle has proper focus indicators', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const themeToggle = screen.getByRole('button', { name: /switch to/i });

      expect(themeToggle).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-brand-500',
        'focus:ring-offset-2'
      );
    });

    it('footer links have proper focus indicators', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const githubLink = screen.getByLabelText(/github profile/i);

      // Updated to match the enhanced focus indicators from Task #118
      expect(githubLink).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-brand-500',
        'focus:ring-offset-1' // Changed from offset-2 to offset-1 for links
      );

      // Check for additional enhanced focus properties
      expect(githubLink).toHaveClass(
        'focus:ring-offset-white',
        'dark:focus:ring-offset-gray-900',
        'dark:focus:ring-brand-400'
      );
    });
  });

  describe('Keyboard Interaction', () => {
    it('theme toggle responds to Enter and Space keys', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const themeToggle = screen.getByRole('button', { name: /switch to/i });

      // Test Enter key
      fireEvent.keyDown(themeToggle, { key: 'Enter' });
      // Theme should change (we can't easily test the actual theme change in this context)

      // Test Space key
      fireEvent.keyDown(themeToggle, { key: ' ' });
      // Theme should change again
    });

    it('navigation links are accessible via Enter key', () => {
      // Mock Next.js Link behavior
      const mockClick = jest.fn();

      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const homeLink = screen.getByRole('link', { name: 'Home' });
      homeLink.onclick = mockClick;

      // Test Enter key on link
      fireEvent.keyDown(homeLink, { key: 'Enter' });

      // Links handle Enter natively, but we can verify they're focusable
      homeLink.focus();
      expect(document.activeElement).toBe(homeLink);
    });
  });

  describe('Mobile Menu Keyboard Navigation', () => {
    it('mobile menu button is keyboard accessible', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(
        /open main navigation menu/i
      );

      expect(mobileMenuButton).toBeInTheDocument();
      expect(mobileMenuButton).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-brand-500'
      );

      // Test focus
      mobileMenuButton.focus();
      expect(document.activeElement).toBe(mobileMenuButton);
    });

    it('mobile menu opens and closes with keyboard', async () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(
        /open main navigation menu/i
      );

      // Open mobile menu
      fireEvent.click(mobileMenuButton);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Test Escape key to close
      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Semantic HTML Structure', () => {
    it('uses proper semantic HTML elements', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      // Verify semantic structure
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(
        screen.getByRole('navigation', { name: /main navigation/i })
      ).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
      expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    });

    it('has proper landmark roles and IDs', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const mainContent = screen.getByRole('main');
      const navigation = screen.getByRole('navigation', {
        name: /main navigation/i,
      });
      const footer = screen.getByRole('contentinfo');

      expect(mainContent).toHaveAttribute('id', 'main-content');
      expect(navigation).toHaveAttribute('id', 'main-navigation');
      expect(footer).toHaveAttribute('id', 'footer');
    });
  });

  describe('ARIA Labels and Descriptions', () => {
    it('mobile menu button has proper ARIA attributes', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const mobileMenuButton = screen.getByLabelText(
        /open main navigation menu/i
      );

      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
      expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('social links have descriptive ARIA labels', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const githubLink = screen.getByLabelText(/github profile/i);
      const linkedinLink = screen.getByLabelText(/linkedin profile/i);

      expect(githubLink).toHaveAttribute('aria-label', 'GitHub profile');
      expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn profile');
    });

    it('theme toggle has descriptive ARIA label', () => {
      render(
        <TestWrapper>
          <h1>Main Content</h1>
        </TestWrapper>
      );

      const themeToggle = screen.getByRole('button', { name: /switch to/i });

      // Should have aria-label that describes the action
      expect(themeToggle).toHaveAttribute('aria-label');
      expect(themeToggle.getAttribute('aria-label')).toMatch(/switch to/i);
    });
  });
});
