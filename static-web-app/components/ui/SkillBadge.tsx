// --- file: components/SkillBadge.tsx ---
import Badge from './Badge';

interface SkillBadgeProps {
  skill: string;
}

/**
 * Skill badge component for displaying technology skills
 * Used in the About page skills section
 *
 * @deprecated Use Badge component directly instead
 */
export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge variant='primary' size='md'>
      {skill}
    </Badge>
  );
}
