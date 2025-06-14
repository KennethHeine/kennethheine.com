// --- file: components/blog/CategoryFilter.tsx ---
'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * CategoryFilter component props
 */
export interface CategoryFilterProps {
  /** Available categories */
  categories: string[];
  /** Currently selected category */
  selectedCategory: string | null;
  /** Category selection handler */
  onCategorySelect: (category: string | null) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CategoryFilter component for filtering blog posts by category
 *
 * Features:
 * - Displays all available categories as clickable badges
 * - Shows active state for selected category
 * - Includes "All" option to clear category filter
 * - Responsive layout with proper spacing
 *
 * @param categories - Array of available category names
 * @param selectedCategory - Currently selected category (null for all)
 * @param onCategorySelect - Callback when category is selected
 * @param className - Additional CSS classes
 */
export function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
  className,
}: CategoryFilterProps) {
  // Don't render if no categories
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
        Categories
      </h3>

      <div className='flex flex-wrap gap-2'>
        {/* All categories option */}
        <Button
          variant={selectedCategory === null ? 'primary' : 'secondary'}
          size='sm'
          onClick={() => onCategorySelect(null)}
          className='text-xs'
        >
          All
        </Button>

        {/* Individual category badges */}
        {categories.map(category => (
          <Badge
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            size='sm'
            className='cursor-pointer transition-all hover:scale-105'
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
}
