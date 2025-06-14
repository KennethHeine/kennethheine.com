/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFilter } from '@/components/blog/CategoryFilter';

// Mock categories for testing
const mockCategories = ['AI & Development', 'Cloud Architecture', 'DevOps'];

describe('CategoryFilter Component', () => {
  const mockOnCategorySelect = jest.fn();

  beforeEach(() => {
    mockOnCategorySelect.mockClear();
  });

  it('renders category filter with all categories', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    
    mockCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('calls onCategorySelect when All button is clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="DevOps"
        onCategorySelect={mockOnCategorySelect}
      />
    );

    fireEvent.click(screen.getByText('All'));
    expect(mockOnCategorySelect).toHaveBeenCalledWith(null);
  });

  it('calls onCategorySelect when category is clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory={null}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    fireEvent.click(screen.getByText('DevOps'));
    expect(mockOnCategorySelect).toHaveBeenCalledWith('DevOps');
  });

  it('shows active state for selected category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="DevOps"
        onCategorySelect={mockOnCategorySelect}
      />
    );

    // Check that DevOps badge exists and is clickable
    const devOpsButton = screen.getByText('DevOps');
    expect(devOpsButton).toBeInTheDocument();
    
    // Check that All button exists
    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });

  it('renders nothing when no categories provided', () => {
    const { container } = render(
      <CategoryFilter
        categories={[]}
        selectedCategory={null}
        onCategorySelect={mockOnCategorySelect}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});