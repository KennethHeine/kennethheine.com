// --- file: __tests__/app/not-found.test.tsx ---
import NotFound, { metadata } from '@/app/not-found';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock Link component
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe('Not Found Page', () => {
  describe('Component Rendering', () => {
    it('renders 404 number prominently', () => {
      render(<NotFound />);

      const heading404 = screen.getByText('404');
      expect(heading404).toBeInTheDocument();
      expect(heading404).toHaveClass('text-6xl', 'font-bold', 'text-brand-500');
    });

    it('renders error message and description', () => {
      render(<NotFound />);

      expect(
        screen.getByRole('heading', { name: /page not found/i })
      ).toBeInTheDocument();
      expect(
        screen.getByText(/sorry, the page you're looking for doesn't exist/i)
      ).toBeInTheDocument();
    });

    it('renders primary navigation buttons', () => {
      render(<NotFound />);

      const homeLink = screen.getByRole('link', { name: /back to home/i });
      const blogLink = screen.getByRole('link', { name: /read blog posts/i });

      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');

      expect(blogLink).toBeInTheDocument();
      expect(blogLink).toHaveAttribute('href', '/blog');
    });

    it('renders secondary navigation links', () => {
      render(<NotFound />);

      const aboutLink = screen.getByRole('link', { name: /about me/i });
      const contactLink = screen.getByRole('link', { name: /contact/i });

      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute('href', '/about');

      expect(contactLink).toBeInTheDocument();
      expect(contactLink).toHaveAttribute('href', '/contact');
    });
  });

  describe('User Interactions', () => {
    it('allows navigation via primary buttons', () => {
      render(<NotFound />);

      const homeLink = screen.getByRole('link', { name: /back to home/i });
      const blogLink = screen.getByRole('link', { name: /read blog posts/i });

      fireEvent.click(homeLink);
      fireEvent.click(blogLink);

      // Links should be clickable (no errors thrown)
      expect(homeLink).toBeInTheDocument();
      expect(blogLink).toBeInTheDocument();
    });

    it('allows navigation via secondary links', () => {
      render(<NotFound />);

      const aboutLink = screen.getByRole('link', { name: /about me/i });
      const contactLink = screen.getByRole('link', { name: /contact/i });

      fireEvent.click(aboutLink);
      fireEvent.click(contactLink);

      // Links should be clickable (no errors thrown)
      expect(aboutLink).toBeInTheDocument();
      expect(contactLink).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<NotFound />);

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('Page Not Found');
    });

    it('has accessible link text', () => {
      render(<NotFound />);

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('uses semantic HTML structure', () => {
      render(<NotFound />);

      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
  });

  describe('Visual Design', () => {
    it('applies consistent styling classes', () => {
      render(<NotFound />);

      const container = screen.getByRole('main');
      expect(container).toBeInTheDocument();

      // Check for brand color usage
      const errorNumber = screen.getByText('404');
      expect(errorNumber).toHaveClass('text-brand-500');
    });

    it('has responsive design classes', () => {
      render(<NotFound />);

      const errorNumber = screen.getByText('404');
      expect(errorNumber).toHaveClass('sm:text-8xl');

      const heading = screen.getByRole('heading', { name: /page not found/i });
      expect(heading).toHaveClass('sm:text-3xl');
    });
  });

  describe('SEO Metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toBe('Page Not Found');
    });

    it('has appropriate description', () => {
      expect(metadata.description).toContain(
        'The page you are looking for could not be found'
      );
      expect(metadata.description).toContain('Kenneth Heine');
    });

    it('has Open Graph metadata', () => {
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe(
        '404 - Page Not Found | Kenneth Heine'
      );
      expect(metadata.openGraph?.url).toBe('https://kennethheine.com/404');
    });

    it('has canonical URL', () => {
      expect(metadata.alternates?.canonical).toBe(
        'https://kennethheine.com/404'
      );
    });

    it('has proper image metadata', () => {
      const images = metadata.openGraph?.images as any[];
      expect(images).toHaveLength(1);
      expect(images[0]).toMatchObject({
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '404 - Page Not Found | Kenneth Heine',
      });
    });
  });
});
