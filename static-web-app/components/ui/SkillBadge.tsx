// --- file: components/SkillBadge.tsx ---

interface SkillBadgeProps {
  skill: string;
}

/**
 * Skill badge component for displaying technology skills
 * Modern design with hover effects and animations
 */
export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className='group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-50 to-blue-50 px-4 py-2 text-sm font-medium text-brand-700 ring-1 ring-brand-200/50 transition-all duration-300 hover:scale-105 hover:shadow-md hover:ring-brand-300 dark:from-brand-900/30 dark:to-blue-900/30 dark:text-brand-300 dark:ring-brand-700/50 dark:hover:ring-brand-600'>
      <span className='h-1.5 w-1.5 rounded-full bg-brand-500 transition-transform duration-300 group-hover:scale-150 dark:bg-brand-400' />
      {skill}
    </span>
  );
}
