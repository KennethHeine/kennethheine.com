/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { BlogFilters } from '@/components/blog/BlogFilters';

// Mock the ui components
jest.mock('@/components/ui/Input', () => ({
  Input: ({ value, onChange, ...props }: any) => (
    <input
      value={value}
      onChange={onChange}
      data-testid="search-input"
      {...props}
    />
  ),
}));

jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} data-testid="button" {...props}>
      {children}
    </button>
  ),
}));

// Mock the child filter components
jest.mock('@/components/blog/CategoryFilter', () => ({
  CategoryFilter: ({ categories, selectedCategory, onCategorySelect }: any) => (
    <div data-testid="category-filter">
      <div>Categories: {categories.length}</div>
      <div>Selected: {selectedCategory || 'None'}</div>
      <button onClick={() => onCategorySelect('test-category')}>
        Select Test Category
      </button>
    </div>
  ),
}));

jest.mock('@/components/blog/TagFilter', () => ({
  TagFilter: ({ tags, selectedTag, onTagSelect }: any) => (
    <div data-testid="tag-filter">
      <div>Tags: {tags.length}</div>
      <div>Selected: {selectedTag || 'None'}</div>
      <button onClick={() => onTagSelect('test-tag')}>
        Select Test Tag
      </button>
    </div>
  ),
}));

// Mock categories and tags for testing
const mockCategories = ['AI & Development', 'Cloud Architecture', 'DevOps'];
const mockTags = ['React', 'TypeScript', 'Azure', 'DevOps', 'AI'];

describe('BlogFilters Component', () => {
  const mockProps = {
    categories: mockCategories,
    tags: mockTags,
    searchQuery: '',
    selectedCategory: null,
    selectedTag: null,
    onSearchChange: jest.fn(),
    onCategorySelect: jest.fn(),
    onTagSelect: jest.fn(),
    onResetFilters: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter components', () => {
    render(<BlogFilters {...mockProps} />);

    expect(screen.getByText('Filter Posts')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('category-filter')).toBeInTheDocument();
    expect(screen.getByTestId('tag-filter')).toBeInTheDocument();
  });

  it('calls onSearchChange when search input changes', () => {
    render(<BlogFilters {...mockProps} />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(mockProps.onSearchChange).toHaveBeenCalledWith('test search');
  });

  it('shows reset filters button when filters are active', () => {
    const propsWithFilters = {
      ...mockProps,
      searchQuery: 'test',
      selectedCategory: 'DevOps',
    };

    render(<BlogFilters {...propsWithFilters} />);

    expect(screen.getByText('Reset Filters')).toBeInTheDocument();
  });

  it('hides reset filters button when no filters are active', () => {
    render(<BlogFilters {...mockProps} />);

    expect(screen.queryByText('Reset Filters')).not.toBeInTheDocument();
  });

  it('calls onResetFilters when reset button is clicked', () => {
    const propsWithFilters = {
      ...mockProps,
      searchQuery: 'test',
    };

    render(<BlogFilters {...propsWithFilters} />);

    const resetButton = screen.getByText('Reset Filters');
    fireEvent.click(resetButton);

    expect(mockProps.onResetFilters).toHaveBeenCalled();
  });

  it('shows active filters summary when filters are applied', () => {
    const propsWithFilters = {
      ...mockProps,
      searchQuery: 'test query',
      selectedCategory: 'DevOps',
      selectedTag: 'React',
    };

    render(<BlogFilters {...propsWithFilters} />);

    expect(screen.getByText('Active Filters:')).toBeInTheDocument();
    expect(screen.getByText((content, node) => {
      // Handle text spanning multiple elements
      return content.includes('Search:') && content.includes('test query');
    })).toBeInTheDocument();
    expect(screen.getByText((content, node) => {
      return content.includes('Category:') && content.includes('DevOps');
    })).toBeInTheDocument();
    expect(screen.getByText((content, node) => {
      return content.includes('Tag:') && content.includes('React');
    })).toBeInTheDocument();
  });

  it('hides active filters summary when no filters are applied', () => {
    render(<BlogFilters {...mockProps} />);

    expect(screen.queryByText('Active Filters:')).not.toBeInTheDocument();
  });

  it('does not render category filter when no categories provided', () => {
    const propsWithoutCategories = {
      ...mockProps,
      categories: [],
    };

    render(<BlogFilters {...propsWithoutCategories} />);

    expect(screen.queryByTestId('category-filter')).not.toBeInTheDocument();
  });

  it('does not render tag filter when no tags provided', () => {
    const propsWithoutTags = {
      ...mockProps,
      tags: [],
    };

    render(<BlogFilters {...propsWithoutTags} />);

    expect(screen.queryByTestId('tag-filter')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <BlogFilters {...mockProps} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('shows active filters summary only for search query with trimmed whitespace', () => {
    const propsWithWhitespace = {
      ...mockProps,
      searchQuery: '   test   ',
    };

    render(<BlogFilters {...propsWithWhitespace} />);

    expect(screen.getByText('Active Filters:')).toBeInTheDocument();
    expect(screen.getByText((content, node) => {
      return content.includes('Search:') && content.includes('test');
    })).toBeInTheDocument();
  });

  it('does not show active filters summary for empty search query with only whitespace', () => {
    const propsWithWhitespace = {
      ...mockProps,
      searchQuery: '   ',
    };

    render(<BlogFilters {...propsWithWhitespace} />);

    expect(screen.queryByText('Active Filters:')).not.toBeInTheDocument();
  });
});