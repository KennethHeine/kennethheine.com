/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { TagFilter } from '@/components/blog/TagFilter';

// Mock tags for testing
const mockTags = ['React', 'TypeScript', 'Azure', 'DevOps', 'AI'];

describe('TagFilter Component', () => {
  const mockOnTagSelect = jest.fn();

  beforeEach(() => {
    mockOnTagSelect.mockClear();
  });

  it('renders tag filter with all tags', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTag={null}
        onTagSelect={mockOnTagSelect}
      />
    );

    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();

    mockTags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('calls onTagSelect when All button is clicked', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTag='React'
        onTagSelect={mockOnTagSelect}
      />
    );

    fireEvent.click(screen.getByText('All'));
    expect(mockOnTagSelect).toHaveBeenCalledWith(null);
  });

  it('calls onTagSelect when tag is clicked', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTag={null}
        onTagSelect={mockOnTagSelect}
      />
    );

    fireEvent.click(screen.getByText('React'));
    expect(mockOnTagSelect).toHaveBeenCalledWith('React');
  });

  it('shows active state for selected tag', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTag='React'
        onTagSelect={mockOnTagSelect}
      />
    );

    const reactBadge = screen.getByText('React');
    expect(reactBadge).toBeInTheDocument();

    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });

  it('renders nothing when no tags provided', () => {
    const { container } = render(
      <TagFilter tags={[]} selectedTag={null} onTagSelect={mockOnTagSelect} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <TagFilter
        tags={mockTags}
        selectedTag={null}
        onTagSelect={mockOnTagSelect}
        className='custom-class'
      />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('limits tags when maxTags is provided', () => {
    const manyTags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5', 'Tag6'];
    render(
      <TagFilter
        tags={manyTags}
        selectedTag={null}
        onTagSelect={mockOnTagSelect}
        maxTags={3}
      />
    );

    // Should only show first 3 tags plus the All button
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
    expect(screen.getByText('Tag3')).toBeInTheDocument();
    expect(screen.queryByText('Tag4')).not.toBeInTheDocument();
    expect(screen.queryByText('Tag5')).not.toBeInTheDocument();
    expect(screen.queryByText('Tag6')).not.toBeInTheDocument();
  });

  it('handles hover effects on tag badges', () => {
    render(
      <TagFilter
        tags={mockTags}
        selectedTag={null}
        onTagSelect={mockOnTagSelect}
      />
    );

    const reactBadge = screen.getByText('React');
    expect(reactBadge).toHaveClass('cursor-pointer');
    expect(reactBadge).toHaveClass('transition-all');
    expect(reactBadge).toHaveClass('hover:scale-105');
  });

  it('uses default maxTags value when not provided', () => {
    const manyTags = Array.from({ length: 25 }, (_, i) => `Tag${i + 1}`);
    render(
      <TagFilter
        tags={manyTags}
        selectedTag={null}
        onTagSelect={mockOnTagSelect}
      />
    );

    // Should show first 20 tags (default maxTags)
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag20')).toBeInTheDocument();
    expect(screen.queryByText('Tag21')).not.toBeInTheDocument();
  });
});
