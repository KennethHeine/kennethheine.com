/**
 * @fileoverview Tests for blog loading states integration
 * @author Kenneth Heine
 */

import { render, screen } from '@testing-library/react';
import { BlogListWithFilters } from '@/components/blog/BlogListWithFilters';
import type { BlogPost } from '@/types/blog';

// Mock the useBlogPosts hook
jest.mock('@/hooks/useBlogPosts');

const mockUseBlogPosts = require('@/hooks/useBlogPosts')
  .useBlogPosts as jest.MockedFunction<
  typeof import('@/hooks/useBlogPosts').useBlogPosts
>;

// Sample blog post data for testing
const mockPosts: BlogPost[] = [
  {
    slug: 'test-post-1',
    title: 'Test Post 1',
    excerpt: 'This is a test post excerpt',
    content: 'Test content',
    date: '2024-01-01',
    readingTime: 5,
    category: 'Testing',
    tags: ['test', 'react'],
    published: true,
  },
  {
    slug: 'test-post-2',
    title: 'Test Post 2',
    excerpt: 'Another test post excerpt',
    content: 'More test content',
    date: '2024-01-02',
    readingTime: 3,
    category: 'Development',
    tags: ['dev', 'javascript'],
    published: true,
  },
];

describe('BlogListWithFilters Loading States', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State Display', () => {
    it('shows loading state when loading is true and no posts', () => {
      mockUseBlogPosts.mockReturnValue({
        posts: [],
        categories: [],
        tags: [],
        loading: true,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      render(<BlogListWithFilters initialPosts={mockPosts} />);

      // Should show loading component instead of posts
      expect(screen.getByText('Loading posts...')).toBeInTheDocument();
      expect(
        screen.getByText('Filtering and organizing your content')
      ).toBeInTheDocument();

      // Should not show empty state or posts
      expect(screen.queryByText('No posts found')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument();
    });

    it('shows posts when loading is false and posts exist', () => {
      mockUseBlogPosts.mockReturnValue({
        posts: mockPosts,
        categories: ['Testing', 'Development'],
        tags: ['test', 'react', 'dev', 'javascript'],
        loading: false,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      render(<BlogListWithFilters initialPosts={mockPosts} />);

      // Should show posts
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();

      // Should not show loading state
      expect(screen.queryByText('Loading posts...')).not.toBeInTheDocument();
    });

    it('shows empty state when loading is false and no posts', () => {
      mockUseBlogPosts.mockReturnValue({
        posts: [],
        categories: [],
        tags: [],
        loading: false,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      render(<BlogListWithFilters initialPosts={mockPosts} />);

      // Should show empty state
      expect(screen.getByText('No posts found')).toBeInTheDocument();
      expect(
        screen.getByText('Try adjusting your filters or search query.')
      ).toBeInTheDocument();

      // Should not show loading state
      expect(screen.queryByText('Loading posts...')).not.toBeInTheDocument();
    });
  });

  describe('Load More Button Loading State', () => {
    it('shows loading spinner in load more button when loading with posts', () => {
      mockUseBlogPosts.mockReturnValue({
        posts: mockPosts,
        categories: ['Testing'],
        tags: ['test'],
        loading: true,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: true,
        resetFilters: jest.fn(),
      });

      render(<BlogListWithFilters initialPosts={mockPosts} />);

      // Should show posts (since we have posts)
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();

      // Load more button should show loading state
      const loadMoreButton = screen.getByRole('button', { name: /loading/i });
      expect(loadMoreButton).toBeInTheDocument();
      expect(loadMoreButton).toBeDisabled();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('shows normal load more button when not loading', () => {
      mockUseBlogPosts.mockReturnValue({
        posts: mockPosts,
        categories: ['Testing'],
        tags: ['test'],
        loading: false,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: true,
        resetFilters: jest.fn(),
      });

      render(<BlogListWithFilters initialPosts={mockPosts} />);

      // Load more button should be normal
      const loadMoreButton = screen.getByRole('button', {
        name: /load more posts/i,
      });
      expect(loadMoreButton).toBeInTheDocument();
      expect(loadMoreButton).not.toBeDisabled();
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('disables load more button during loading', () => {
      mockUseBlogPosts.mockReturnValue({
        posts: mockPosts,
        categories: ['Testing'],
        tags: ['test'],
        loading: true,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: true,
        resetFilters: jest.fn(),
      });

      render(<BlogListWithFilters initialPosts={mockPosts} />);

      const loadMoreButton = screen.getByRole('button', { name: /loading/i });
      expect(loadMoreButton).toHaveAttribute('disabled');
      expect(loadMoreButton).toHaveClass(
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      );
    });
  });

  describe('Loading State Accessibility', () => {
    it('provides proper ARIA attributes for loading state', () => {
      mockUseBlogPosts.mockReturnValue({
        posts: [],
        categories: [],
        tags: [],
        loading: true,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      render(<BlogListWithFilters initialPosts={mockPosts} />);

      const loadingContainer = screen.getByRole('status');
      expect(loadingContainer).toHaveAttribute('aria-live', 'polite');
      expect(loadingContainer).toHaveAttribute(
        'aria-label',
        'Loading posts...'
      );
    });

    it('announces loading state changes to screen readers', () => {
      const { rerender } = render(
        <BlogListWithFilters initialPosts={mockPosts} />
      );

      // Initially not loading
      mockUseBlogPosts.mockReturnValue({
        posts: mockPosts,
        categories: [],
        tags: [],
        loading: false,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      rerender(<BlogListWithFilters initialPosts={mockPosts} />);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      // Now loading
      mockUseBlogPosts.mockReturnValue({
        posts: [],
        categories: [],
        tags: [],
        loading: true,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      rerender(<BlogListWithFilters initialPosts={mockPosts} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Integration with Filters', () => {
    it('maintains loading state during filter operations', () => {
      const mockSetSearchQuery = jest.fn();

      mockUseBlogPosts.mockReturnValue({
        posts: [],
        categories: ['Testing'],
        tags: ['test'],
        loading: true,
        error: null,
        searchQuery: 'test query',
        setSearchQuery: mockSetSearchQuery,
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      render(<BlogListWithFilters initialPosts={mockPosts} />);

      // Should show loading state even with filters present
      expect(screen.getByText('Loading posts...')).toBeInTheDocument();
    });
  });

  describe('User Experience', () => {
    it('provides smooth transition between loading and loaded states', () => {
      const { rerender } = render(
        <BlogListWithFilters initialPosts={mockPosts} />
      );

      // Start with loading
      mockUseBlogPosts.mockReturnValue({
        posts: [],
        categories: [],
        tags: [],
        loading: true,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      rerender(<BlogListWithFilters initialPosts={mockPosts} />);
      expect(screen.getByText('Loading posts...')).toBeInTheDocument();

      // Transition to loaded
      mockUseBlogPosts.mockReturnValue({
        posts: mockPosts,
        categories: ['Testing'],
        tags: ['test'],
        loading: false,
        error: null,
        searchQuery: '',
        setSearchQuery: jest.fn(),
        filterByTag: jest.fn(),
        currentTag: null,
        filterByCategory: jest.fn(),
        currentCategory: null,
        loadMore: jest.fn(),
        hasMore: false,
        resetFilters: jest.fn(),
      });

      rerender(<BlogListWithFilters initialPosts={mockPosts} />);
      expect(screen.queryByText('Loading posts...')).not.toBeInTheDocument();
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    });
  });
});
