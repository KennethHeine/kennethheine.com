import { render, screen } from '@testing-library/react';
import Page from '../../app/_blog/page';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/blog',
}));

// Mock the blog utilities
jest.mock('../../lib/blog', () => ({
  getAllPosts: jest.fn(() => [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2024-01-15',
      excerpt: 'This is a test post excerpt',
      tags: ['test', 'demo'],
      published: true,
      author: 'Kenneth Heine',
      content: 'Test content',
    },
    {
      slug: 'test-post-2',
      title: 'Azure Best Practices',
      date: '2024-01-10',
      excerpt: 'Learn about Azure best practices',
      tags: ['azure', 'cloud'],
      published: true,
      author: 'Kenneth Heine',
      content: 'Azure content',
    },
  ]),
}));

const PageWithProvider = () => (
  <ThemeProvider>
    <Page />
  </ThemeProvider>
);

describe('Blog Page', () => {
  it('renders main heading', () => {
    render(<PageWithProvider />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByText(/AI, DevOps & Cloud Architecture Insights/i)
    ).toBeInTheDocument();
  });

  it('renders blog post list', () => {
    render(<PageWithProvider />);

    // Check for blog posts
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Azure Best Practices')).toBeInTheDocument();
  });

  it('displays blog post excerpts', () => {
    render(<PageWithProvider />);

    expect(screen.getByText('This is a test post excerpt')).toBeInTheDocument();
    expect(
      screen.getByText('Learn about Azure best practices')
    ).toBeInTheDocument();
  });

  it('shows publication dates', () => {
    render(<PageWithProvider />);

    // Check for formatted dates
    expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument();
    expect(screen.getByText(/January 10, 2024/)).toBeInTheDocument();
  });

  it('displays tags for each post', () => {
    render(<PageWithProvider />);

    // Check for tags (using getAllByText since tags appear in multiple places - filter and posts)
    expect(screen.getAllByText('test')).toHaveLength(2); // One in filter, one in post
    expect(screen.getAllByText('demo')).toHaveLength(2); // One in filter, one in post
    expect(screen.getAllByText('azure')).toHaveLength(2); // One in filter, one in post
    expect(screen.getAllByText('cloud')).toHaveLength(2); // One in filter, one in post
  });
  it('includes read more links', () => {
    render(<PageWithProvider />);

    const readMoreLinks = screen.getAllByText(/read article/i);
    expect(readMoreLinks.length).toBeGreaterThan(0);

    // Check that links point to the correct post slugs
    const postLinks = screen.getAllByRole('link', {
      name: /Test Post|Azure Best Practices/,
    });
    expect(postLinks.length).toBeGreaterThan(0);
  });
  it('applies responsive design classes', () => {
    const { container } = render(<PageWithProvider />);

    // Check that the blog list has responsive classes
    const sectionsWithContainer = container.querySelectorAll('section');
    const hasContainerClasses = Array.from(sectionsWithContainer).some(
      section =>
        section.querySelector('.mx-auto.max-w-7xl') ||
        section.querySelector('.mx-auto.max-w-4xl')
    );
    expect(hasContainerClasses).toBe(true);
  });

  it('orders posts by date (newest first)', () => {
    render(<PageWithProvider />);

    // Look for post titles specifically (not all h2 headings which include filters)
    const testPost1 = screen.getByText('Test Post 1');
    const azurePost = screen.getByText('Azure Best Practices');

    expect(testPost1).toBeInTheDocument();
    expect(azurePost).toBeInTheDocument();

    // Check that Test Post 1 appears before Azure Best Practices in the DOM
    const allText = document.body.textContent || '';
    const testPost1Index = allText.indexOf('Test Post 1');
    const azurePostIndex = allText.indexOf('Azure Best Practices');
    expect(testPost1Index).toBeLessThan(azurePostIndex);
  });

  it('includes blog description or introduction', () => {
    render(<PageWithProvider />);

    // Look for blog introduction text
    expect(
      screen.getByText(/AI, DevOps & Cloud Architecture Insights/i)
    ).toBeInTheDocument();
  });

  it('has proper SEO structure', () => {
    render(<PageWithProvider />);

    // Check for proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2s = screen.getAllByRole('heading', { level: 2 });

    expect(h1).toBeInTheDocument();
    expect(h2s.length).toBeGreaterThan(0);
  });
});
