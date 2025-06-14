// --- file: components/blog/BlogFilters.tsx ---
'use client';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CategoryFilter } from './CategoryFilter';
import { TagFilter } from './TagFilter';
import { cn } from '@/lib/utils';

/**
 * BlogFilters component props
 */
export interface BlogFiltersProps {
  /** Available categories */
  categories: string[];
  /** Available tags */
  tags: string[];
  /** Current search query */
  searchQuery: string;
  /** Currently selected category */
  selectedCategory: string | null;
  /** Currently selected tag */
  selectedTag: string | null;
  /** Search query change handler */
  onSearchChange: (query: string) => void;
  /** Category selection handler */
  onCategorySelect: (category: string | null) => void;
  /** Tag selection handler */
  onTagSelect: (tag: string | null) => void;
  /** Reset all filters handler */
  onResetFilters: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * BlogFilters component that combines search, category, and tag filtering
 *
 * Features:
 * - Search input for text-based filtering
 * - Category filtering with visual selection
 * - Tag filtering with visual selection
 * - Reset all filters button
 * - Responsive layout that stacks on mobile
 * - Clean separation of filter types
 *
 * @param categories - Array of available category names
 * @param tags - Array of available tag names
 * @param searchQuery - Current search query text
 * @param selectedCategory - Currently selected category (null for all)
 * @param selectedTag - Currently selected tag (null for all)
 * @param onSearchChange - Callback when search query changes
 * @param onCategorySelect - Callback when category is selected
 * @param onTagSelect - Callback when tag is selected
 * @param onResetFilters - Callback to reset all filters
 * @param className - Additional CSS classes
 */
export function BlogFilters({
  categories,
  tags,
  searchQuery,
  selectedCategory,
  selectedTag,
  onSearchChange,
  onCategorySelect,
  onTagSelect,
  onResetFilters,
  className,
}: BlogFiltersProps) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== null ||
    selectedTag !== null;

  return (
    <div
      className={cn(
        'space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      {/* Header with reset button */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
          Filter Posts
        </h2>
        {hasActiveFilters && (
          <Button
            variant='secondary'
            size='sm'
            onClick={onResetFilters}
            className='text-xs'
          >
            Reset Filters
          </Button>
        )}
      </div>

      {/* Search input */}
      <div className='space-y-2'>
        <label
          htmlFor='blog-search'
          className='text-sm font-medium text-gray-900 dark:text-white'
        >
          Search
        </label>
        <Input
          id='blog-search'
          type='text'
          placeholder='Search posts...'
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className='w-full'
        />
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={onCategorySelect}
        />
      )}

      {/* Tag filter */}
      {tags.length > 0 && (
        <TagFilter
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={onTagSelect}
          maxTags={15} // Limit tags to keep UI manageable
        />
      )}

      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className='rounded-md bg-gray-50 p-3 dark:bg-gray-700/50'>
          <h4 className='text-xs font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Active Filters:
          </h4>
          <div className='flex flex-wrap gap-1 text-xs text-gray-600 dark:text-gray-400'>
            {searchQuery.trim() && (
              <span className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-600'>
                Search: &ldquo;{searchQuery.trim()}&rdquo;
              </span>
            )}
            {selectedCategory && (
              <span className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-600'>
                Category: {selectedCategory}
              </span>
            )}
            {selectedTag && (
              <span className='rounded bg-gray-200 px-2 py-1 dark:bg-gray-600'>
                Tag: {selectedTag}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
