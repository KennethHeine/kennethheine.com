// --- file: components/SkillBadge.tsx ---

interface SkillBadgeProps {
  skill: string;
}

/**
 * Skill badge component for displaying technology skills
 * "Signal & Ledger" styling: sharp-cornered bordered chip with a signal tick
 */
export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className='group inline-flex items-center gap-2 border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors duration-200 hover:border-brand-500 hover:text-brand-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-brand-400 dark:hover:text-brand-400 motion-reduce:transition-none'>
      <span
        className='h-1.5 w-1.5 bg-brand-500 transition-transform duration-200 group-hover:scale-150 dark:bg-brand-400 motion-reduce:transition-none'
        aria-hidden='true'
      />
      {skill}
    </span>
  );
}
