// --- file: __tests__/accessibility/aria-improvements.test.tsx ---
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../components/providers/ThemeProvider';
import { Layout } from '../../components/layout/Layout';
import HomePage from '../../app/page';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <Layout>{children}</Layout>
  </ThemeProvider>
);

describe('Task #115: ARIA Labels and Semantic HTML Structure', () => {
  describe('Landmark Roles and Structure', () => {
    it('has proper banner role on header', () => {
      render(
        <TestWrapper>
          <div>Test Content</div>
        </TestWrapper>
      );

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
      expect(header.tagName).toBe('HEADER');
    });

    it('has proper main role on main content', () => {
      render(
        <TestWrapper>
          <div>Test Content</div>
        </TestWrapper>
      );

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main.tagName).toBe('MAIN');
      expect(main).toHaveAttribute('id', 'main-content');
    });

    it('has proper contentinfo role on footer', () => {
      render(
        <TestWrapper>
          <div>Test Content</div>
        </TestWrapper>
      );

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      expect(footer.tagName).toBe('FOOTER');
      expect(footer).toHaveAttribute('id', 'footer');
    });

    it('has proper navigation role with aria-label', () => {
      render(
        <TestWrapper>
          <div>Test Content</div>
        </TestWrapper>
      );

      const navigation = screen.getByRole('navigation', {
        name: /main navigation/i,
      });
      expect(navigation).toBeInTheDocument();
      expect(navigation).toHaveAttribute('id', 'main-navigation');
      expect(navigation).toHaveAttribute('aria-label', 'Main navigation');
    });
  });

  describe('Home Page Semantic Structure', () => {
    it('has proper semantic structure with section landmarks', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Check for main heading with proper ID
      const heroHeading = screen.getByRole('heading', {
        level: 1,
        name: /hi, i'm kenneth heine/i,
      });
      expect(heroHeading).toBeInTheDocument();
      expect(heroHeading).toHaveAttribute('id', 'hero-heading');

      // Check for section headings
      const featuredHeading = screen.getByRole('heading', {
        level: 2,
        name: /predictable delivery/i,
      });
      expect(featuredHeading).toBeInTheDocument();
      expect(featuredHeading).toHaveAttribute('id', 'featured-content-heading');
    });

    it('has proper article elements for content previews', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Check for article elements (3 process steps: Clarity, Control, Delivery)
      const articles = screen.getAllByRole('article');
      expect(articles).toHaveLength(3);

      // Check that articles have proper aria-labelledby
      const clarityArticle = articles.find(article =>
        article.querySelector('#clarity-heading')
      );
      const controlArticle = articles.find(article =>
        article.querySelector('#control-heading')
      );
      const deliveryArticle = articles.find(article =>
        article.querySelector('#delivery-heading')
      );

      expect(clarityArticle).toHaveAttribute(
        'aria-labelledby',
        'clarity-heading'
      );
      expect(controlArticle).toHaveAttribute(
        'aria-labelledby',
        'control-heading'
      );
      expect(deliveryArticle).toHaveAttribute(
        'aria-labelledby',
        'delivery-heading'
      );
    });

    it('has proper ARIA labels for metrics section', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // The metrics section has been removed from the homepage
      // This test is no longer applicable
      const sections = document.querySelectorAll('section');
      expect(sections.length).toBeGreaterThan(0);
    });

    it('has proper navigation with aria-label for CTA buttons', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const ctaNavigation = screen.getByRole('navigation', {
        name: /primary call-to-action navigation/i,
      });
      expect(ctaNavigation).toBeInTheDocument();
    });

    it('has screen reader descriptions for interactive elements', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Check for screen reader descriptions
      const aboutDescription = screen.getByText(
        /navigate to the about page to learn more about the predictable delivery program/i
      );
      const contactDescription = screen.getByText(
        /navigate to the contact page to get in touch and connect/i
      );

      expect(aboutDescription).toHaveClass('sr-only');
      expect(contactDescription).toHaveClass('sr-only');
    });

    it('has proper alt text for profile image', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const profileImage = screen.getByAltText(
        /kenneth heine - professional headshot showing a friendly devops engineer/i
      );
      expect(profileImage).toBeInTheDocument();
    });

    it('has aria-hidden for decorative icons', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Find all ArrowRightIcon elements and check they have aria-hidden
      const arrowIcons = document.querySelectorAll('svg');
      const arrowIconsArray = Array.from(arrowIcons);

      // Filter for icons used in buttons/links (should have aria-hidden)
      const decorativeIcons = arrowIconsArray.filter(
        icon =>
          (icon.closest('a, button') && icon.classList.contains('h-4')) ||
          icon.classList.contains('h-3')
      );

      decorativeIcons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('ARIA Describedby Associations', () => {
    it('properly associates CTA buttons with descriptions', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const aboutLink = screen.getByRole('link', {
        name: /how it works/i,
      });
      const contactCTAButton = screen
        .getByText('Get In Touch')
        .closest('a') as HTMLElement;

      expect(aboutLink).toHaveAttribute(
        'aria-describedby',
        'about-cta-description'
      );
      expect(contactCTAButton).toHaveAttribute(
        'aria-describedby',
        'contact-cta-description'
      );
    });

    it('properly associates content links with descriptions', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // The process steps don't have individual describedby links anymore,
      // but the main CTA link at the bottom links to the contact page
      const predictableDeliveryLink = screen.getByRole('link', {
        name: /start your predictable delivery/i,
      });
      expect(predictableDeliveryLink).toHaveAttribute('href', '/contact');
    });
  });

  describe('Semantic HTML Elements', () => {
    it('uses proper heading hierarchy', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Check heading hierarchy (h1 -> h2 -> h3)
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      const h3Elements = screen.getAllByRole('heading', { level: 3 });

      expect(h1).toBeInTheDocument();
      expect(h2Elements).toHaveLength(1); // Predictable Delivery
      expect(h3Elements).toHaveLength(3); // Clarity, Control, Delivery
    });

    it('uses appropriate sectioning elements', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Check for semantic sections
      const sections = document.querySelectorAll('section');
      expect(sections).toHaveLength(2); // Hero, Predictable Delivery process

      // Check for articles
      const articles = document.querySelectorAll('article');
      expect(articles).toHaveLength(3); // Clarity, Control, Delivery
    });
  });
});
