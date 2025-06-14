// --- file: components/blog/TagFilter.tsx ---
'use client';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * TagFilter component props
 */
export interface TagFilterProps {
  /** Available tags */
  tags: string[];
  /** Currently selected tag */
  selectedTag: string | null;
  /** Tag selection handler */
  onTagSelect: (tag: string | null) => void;
  /** Additional CSS classes */
  className?: string;
  /** Maximum number of tags to show (default: 20) */
  maxTags?: number;
}

/**
 * TagFilter component for filtering blog posts by tag
 *
 * Features:
 * - Displays available tags as clickable badges
 * - Shows active state for selected tag
 * - Includes "All" option to clear tag filter
 * - Responsive layout with wrapping
 * - Optional limit on number of tags displayed
 *
 * @param tags - Array of available tag names
 * @param selectedTag - Currently selected tag (null for all)
 * @param onTagSelect - Callback when tag is selected
 * @param className - Additional CSS classes
 * @param maxTags - Maximum number of tags to display
 */
export function TagFilter({
  tags,
  selectedTag,
  onTagSelect,
  className,
  maxTags = 20,
}: TagFilterProps) {
  // Don't render if no tags
  if (tags.length === 0) {
    return null;
  }

  // Limit tags if specified
  const displayTags = tags.slice(0, maxTags);

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className='text-sm font-medium text-gray-900 dark:text-white'>
        Tags
      </h3>

      <div className='flex flex-wrap gap-2'>
        {/* All tags option */}
        <Button
          variant={selectedTag === null ? 'primary' : 'secondary'}
          size='sm'
          onClick={() => onTagSelect(null)}
          className='text-xs'
        >
          All
        </Button>

        {/* Individual tag badges */}
        {displayTags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? 'primary' : 'secondary'}
            size='sm'
            className='cursor-pointer transition-all hover:scale-105'
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
