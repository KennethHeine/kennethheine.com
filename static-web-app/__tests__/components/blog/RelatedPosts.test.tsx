/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import type { BlogPost } from '@/types/blog';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock formatDate utility
jest.mock('@/lib/utils', () => ({
  formatDate: (date: string) => `Formatted ${date}`,
}));

const mockRelatedPosts: BlogPost[] = [
  {
    slug: 'related-post-1',
    title: 'Related Post 1',
    date: '2025-01-01',
    excerpt: 'This is the first related post excerpt',
    content: 'Content here',
    tags: ['react', 'javascript', 'frontend'],
    category: 'Development',
    published: true,
  },
  {
    slug: 'related-post-2',
    title: 'Related Post 2',
    date: '2025-01-02',
    excerpt: 'This is the second related post excerpt',
    content: 'More content',
    tags: ['node', 'backend', 'api'],
    category: 'Backend',
    published: true,
  },
  {
    slug: 'related-post-3',
    title: 'Post with Many Tags',
    date: '2025-01-03',
    excerpt: 'This post has many tags to test truncation',
    content: 'Content with many tags',
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    category: 'Testing',
    published: true,
  },
];

describe('RelatedPosts Component', () => {
  it('renders related posts correctly', () => {
    render(<RelatedPosts posts={mockRelatedPosts} />);

    // Check section title
    expect(screen.getByText('Related Posts')).toBeInTheDocument();
    expect(
      screen.getByText('More articles you might find interesting')
    ).toBeInTheDocument();

    // Check that all posts are rendered
    expect(screen.getByText('Related Post 1')).toBeInTheDocument();
    expect(screen.getByText('Related Post 2')).toBeInTheDocument();
    expect(screen.getByText('Post with Many Tags')).toBeInTheDocument();
  });

  it('displays post metadata correctly', () => {
    render(<RelatedPosts posts={mockRelatedPosts} />);

    // Check categories
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Backend')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();

    // Check dates (mocked)
    expect(screen.getByText('Formatted 2025-01-01')).toBeInTheDocument();
    expect(screen.getByText('Formatted 2025-01-02')).toBeInTheDocument();
    expect(screen.getByText('Formatted 2025-01-03')).toBeInTheDocument();

    // Check excerpts
    expect(
      screen.getByText('This is the first related post excerpt')
    ).toBeInTheDocument();
    expect(
      screen.getByText('This is the second related post excerpt')
    ).toBeInTheDocument();
  });

  it('displays tags correctly with truncation', () => {
    render(<RelatedPosts posts={mockRelatedPosts} />);

    // Check that first 3 tags are shown
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('javascript')).toBeInTheDocument();
    expect(screen.getByText('frontend')).toBeInTheDocument();

    // Check that tag truncation works for posts with many tags
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
    expect(screen.getByText('+2 more')).toBeInTheDocument(); // 5 tags - 3 shown = 2 more
  });

  it('creates correct links to blog posts', () => {
    render(<RelatedPosts posts={mockRelatedPosts} />);

    const links = screen.getAllByRole('link');

    // Each post should have a link to its detail page
    expect(
      links.some(link =>
        (link as HTMLAnchorElement).href.includes('/blog/related-post-1')
      )
    ).toBe(true);
    expect(
      links.some(link =>
        (link as HTMLAnchorElement).href.includes('/blog/related-post-2')
      )
    ).toBe(true);
    expect(
      links.some(link =>
        (link as HTMLAnchorElement).href.includes('/blog/related-post-3')
      )
    ).toBe(true);
  });

  it('renders with custom title', () => {
    render(
      <RelatedPosts posts={mockRelatedPosts} title='You Might Also Like' />
    );

    expect(screen.getByText('You Might Also Like')).toBeInTheDocument();
    expect(screen.queryByText('Related Posts')).not.toBeInTheDocument();
  });

  it('renders nothing when no posts provided', () => {
    const { container } = render(<RelatedPosts posts={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it('applies custom className', () => {
    const { container } = render(
      <RelatedPosts posts={mockRelatedPosts} className='custom-class' />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles posts without categories', () => {
    const postsWithoutCategory: BlogPost[] = [
      {
        slug: 'no-category-post',
        title: 'Post Without Category',
        date: '2025-01-01',
        excerpt: 'This post has no category',
        content: 'Content',
        tags: ['test'],
        published: true,
      },
    ];

    render(<RelatedPosts posts={postsWithoutCategory} />);

    expect(screen.getByText('Post Without Category')).toBeInTheDocument();
    expect(screen.getByText('This post has no category')).toBeInTheDocument();
  });

  it('handles posts without tags', () => {
    const postsWithoutTags: BlogPost[] = [
      {
        slug: 'no-tags-post',
        title: 'Post Without Tags',
        date: '2025-01-01',
        excerpt: 'This post has no tags',
        content: 'Content',
        tags: [],
        category: 'Test',
        published: true,
      },
    ];

    render(<RelatedPosts posts={postsWithoutTags} />);

    expect(screen.getByText('Post Without Tags')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    // Tags section should not be present
    expect(screen.queryByText('+')).not.toBeInTheDocument();
  });
});
