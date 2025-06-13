// --- file: components/ui/index.ts ---
/**
 * Design System UI Components
 *
 * Essential reusable UI components built with Tailwind CSS v4
 * and following consistent design patterns and accessibility standards.
 */

// Core UI Components
export {
  default as Button,
  type ButtonProps,
  type ButtonSize,
  type ButtonVariant,
} from './Button';
export {
  default as Card,
  type CardProps,
  type CardSize,
  type CardVariant,
} from './Card';
export {
  default as Badge,
  type BadgeProps,
  type BadgeSize,
  type BadgeVariant,
} from './Badge';
export {
  default as Input,
  Label,
  type InputProps,
  type LabelProps,
  type InputSize,
  type InputVariant,
} from './Input';
export { default as Modal, type ModalProps, type ModalSize } from './Modal';
export {
  default as Typography,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Lead,
  Muted,
  type TypographyProps,
  type TypographyVariant,
  type TypographyElement,
} from './Typography';

// Legacy components (deprecated)
export { default as SkillBadge } from './SkillBadge';
export { ThemeToggle } from './ThemeToggle';
export { TimelineItem } from './TimelineItem';
