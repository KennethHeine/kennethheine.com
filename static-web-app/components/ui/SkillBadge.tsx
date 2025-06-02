// --- file: components/ui/SkillBadge.tsx ---
interface SkillBadgeProps {
  skill: string
}

/**
 * Skill badge component for displaying technology skills
 * Used in the About page skills section
 */
export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20 dark:bg-brand-900/20 dark:text-brand-300 dark:ring-brand-400/30">
      {skill}
    </span>
  )
}
