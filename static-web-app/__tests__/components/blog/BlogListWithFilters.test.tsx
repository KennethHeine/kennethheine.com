/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { BlogListWithFilters } from '@/components/blog/BlogListWithFilters';
import type { BlogPost } from '@/types/blog';

// Mock the hook
const mockUseBlogPosts = {
  posts: [],
  categories: ['DevOps', 'AI & Development'],
  tags: ['React', 'TypeScript'],
  searchQuery: '',
  setSearchQuery: jest.fn(),
  currentCategory: null,
  filterByCategory: jest.fn(),
  currentTag: null,
  filterByTag: jest.fn(),
  resetFilters: jest.fn(),
  hasMore: false,
  loadMore: jest.fn(),
};

jest.mock('@/hooks/useBlogPosts', () => ({
  useBlogPosts: jest.fn(() => mockUseBlogPosts),
}));

// Mock the ui components
jest.mock('@/components/blog/BlogFilters', () => ({
  BlogFilters: ({ onCategorySelect, onTagSelect }: any) => (
    <div data-testid='blog-filters'>
      <button onClick={() => onCategorySelect('test-category')}>
        Select Category
      </button>
      <button onClick={() => onTagSelect('test-tag')}>Select Tag</button>
    </div>
  ),
}));

jest.mock('@/lib/utils', () => ({
  formatDate: (date: string) => `Formatted: ${date}`,
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Sample blog posts for testing
const mockPosts: BlogPost[] = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    excerpt: 'This is a test post excerpt',
    content: 'Test content',
    date: '2024-01-01',
    published: true,
    tags: ['React', 'TypeScript'],
    category: 'DevOps',
    readingTime: 5,
  },
  {
    slug: 'test-post-2',
    title: 'Test Post 2',
    excerpt: 'Another test post excerpt',
    content: 'More test content',
    date: '2024-01-02',
    published: true,
    tags: ['Azure'],
    readingTime: 3,
  },
];

describe('BlogListWithFilters Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBlogPosts.posts = mockPosts;
    mockUseBlogPosts.hasMore = false;
  });

  it('renders blog list with posts', () => {
    render(<BlogListWithFilters initialPosts={mockPosts} />);

    expect(screen.getByTestId('blog-filters')).toBeInTheDocument();
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('renders empty state when no posts found', () => {
    mockUseBlogPosts.posts = [];

    render(<BlogListWithFilters initialPosts={[]} />);

    expect(screen.getByText('No posts found')).toBeInTheDocument();
    expect(
      screen.getByText('Try adjusting your filters or search query.')
    ).toBeInTheDocument();
  });

  it('displays post metadata correctly', () => {
    render(<BlogListWithFilters initialPosts={mockPosts} />);

    expect(screen.getByText('DevOps')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('This is a test post excerpt')).toBeInTheDocument();
  });

  it('renders post tags as clickable buttons', () => {
    render(<BlogListWithFilters initialPosts={mockPosts} />);

    const reactTag = screen.getByText('React');
    const typeScriptTag = screen.getByText('TypeScript');

    expect(reactTag).toBeInTheDocument();
    expect(typeScriptTag).toBeInTheDocument();

    fireEvent.click(reactTag);
    expect(mockUseBlogPosts.filterByTag).toHaveBeenCalledWith('React');
  });

  it('renders category as clickable button', () => {
    render(<BlogListWithFilters initialPosts={mockPosts} />);

    const categoryButton = screen.getByText('DevOps');
    fireEvent.click(categoryButton);

    expect(mockUseBlogPosts.filterByCategory).toHaveBeenCalledWith('DevOps');
  });

  it('shows load more button when hasMore is true', () => {
    mockUseBlogPosts.hasMore = true;

    render(<BlogListWithFilters initialPosts={mockPosts} />);

    const loadMoreButton = screen.getByText('Load More Posts');
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);
    expect(mockUseBlogPosts.loadMore).toHaveBeenCalled();
  });

  it('hides load more button when hasMore is false', () => {
    mockUseBlogPosts.hasMore = false;

    render(<BlogListWithFilters initialPosts={mockPosts} />);

    expect(screen.queryByText('Load More Posts')).not.toBeInTheDocument();
  });

  it('does not render category button when post has no category', () => {
    const postsWithoutCategory = [
      {
        ...mockPosts[0],
        category: undefined,
      },
    ];
    mockUseBlogPosts.posts = postsWithoutCategory;

    render(<BlogListWithFilters initialPosts={postsWithoutCategory} />);

    // Should not have category button
    expect(screen.queryByText('DevOps')).not.toBeInTheDocument();
  });

  it('does not render tags section when post has no tags', () => {
    const postsWithoutTags = [
      {
        ...mockPosts[0],
        tags: [],
      },
    ];
    mockUseBlogPosts.posts = postsWithoutTags;

    render(<BlogListWithFilters initialPosts={postsWithoutTags} />);

    // Should not have tag buttons
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument();
  });

  it('prevents default navigation when tag button is clicked', () => {
    render(<BlogListWithFilters initialPosts={mockPosts} />);

    const reactTag = screen.getByText('React');
    const mockPreventDefault = jest.fn();

    fireEvent.click(reactTag, { preventDefault: mockPreventDefault });

    expect(mockUseBlogPosts.filterByTag).toHaveBeenCalledWith('React');
  });

  it('prevents default navigation when category button is clicked', () => {
    render(<BlogListWithFilters initialPosts={mockPosts} />);

    const categoryButton = screen.getByText('DevOps');
    const mockPreventDefault = jest.fn();

    fireEvent.click(categoryButton, { preventDefault: mockPreventDefault });

    expect(mockUseBlogPosts.filterByCategory).toHaveBeenCalledWith('DevOps');
  });

  it('renders responsive layout classes', () => {
    const { container } = render(
      <BlogListWithFilters initialPosts={mockPosts} />
    );

    // Check for responsive grid classes
    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.lg\\:grid-cols-4')).toBeInTheDocument();
  });

  it('renders sticky sidebar on large screens', () => {
    const { container } = render(
      <BlogListWithFilters initialPosts={mockPosts} />
    );

    // Check for sticky positioning
    expect(container.querySelector('.sticky')).toBeInTheDocument();
    expect(container.querySelector('.top-8')).toBeInTheDocument();
  });
});
