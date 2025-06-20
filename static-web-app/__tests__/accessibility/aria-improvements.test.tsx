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
      const introHeading = screen.getByRole('heading', {
        level: 2,
        name: /work smarter, not harder/i,
      });
      expect(introHeading).toBeInTheDocument();
      expect(introHeading).toHaveAttribute('id', 'introduction-heading');

      const featuredHeading = screen.getByRole('heading', {
        level: 2,
        name: /what i'm up to/i,
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

      // Check for article elements
      const articles = screen.getAllByRole('article');
      expect(articles).toHaveLength(2);

      // Check that articles have proper aria-labelledby
      const blogArticle = articles.find(article =>
        article.querySelector('#blog-preview-heading')
      );
      const contactArticle = articles.find(article =>
        article.querySelector('#contact-preview-heading')
      );

      expect(blogArticle).toHaveAttribute(
        'aria-labelledby',
        'blog-preview-heading'
      );
      expect(contactArticle).toHaveAttribute(
        'aria-labelledby',
        'contact-preview-heading'
      );
    });

    it('has proper ARIA labels for metrics section', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Check for metrics group
      const metricsGroup = screen.getByRole('group', {
        name: /professional experience metrics/i,
      });
      expect(metricsGroup).toBeInTheDocument();

      // Check for individual metric labels
      const yearsMetric = screen.getByLabelText(/5 plus years of experience/i);
      const codeMetric = screen.getByLabelText(/over 100,000 lines of code/i);
      const mindsetMetric = screen.getByLabelText(/infinite learning mindset/i);

      expect(yearsMetric).toBeInTheDocument();
      expect(codeMetric).toBeInTheDocument();
      expect(mindsetMetric).toBeInTheDocument();
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
        /navigate to the about page to learn more about kenneth heine/i
      );
      const blogDescription = screen.getByText(
        /navigate to the blog page to read articles about ai/i
      );
      const contactDescription = screen.getByText(
        /navigate to the contact page to get in touch/i
      );

      expect(aboutDescription).toHaveClass('sr-only');
      expect(blogDescription).toHaveClass('sr-only');
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
        name: /learn more about me/i,
      });
      const blogLink = screen.getByRole('link', { name: /read my blog/i });

      expect(aboutLink).toHaveAttribute(
        'aria-describedby',
        'about-cta-description'
      );
      expect(blogLink).toHaveAttribute(
        'aria-describedby',
        'blog-cta-description'
      );
    });

    it('properly associates content links with descriptions', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      const viewPostsLink = screen.getByRole('link', {
        name: /view all posts/i,
      });
      const contactLink = screen.getByRole('link', { name: /get in touch/i });

      expect(viewPostsLink).toHaveAttribute(
        'aria-describedby',
        'blog-link-description'
      );
      expect(contactLink).toHaveAttribute(
        'aria-describedby',
        'contact-link-description'
      );
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
      expect(h2Elements).toHaveLength(2); // Introduction and Featured Content
      expect(h3Elements).toHaveLength(2); // Blog and Contact previews
    });

    it('uses appropriate sectioning elements', () => {
      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>
      );

      // Check for semantic sections
      const sections = document.querySelectorAll('section');
      expect(sections).toHaveLength(3); // Hero, Introduction, Featured Content

      // Check for articles
      const articles = document.querySelectorAll('article');
      expect(articles).toHaveLength(2); // Blog and Contact previews
    });
  });
});
