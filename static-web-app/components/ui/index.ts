// --- file: components/ui/index.ts ---
/**
 * Design System UI Components
 *
 * Essential reusable UI components built with Tailwind CSS v4
 * and following consistent design patterns and accessibility standards.
 *
 * All components follow standardized prop patterns:
 * - Extend BaseComponentProps for consistent props (className, children, style, testId)
 * - Use centralized ComponentSize and ComponentVariant types
 * - Event handlers follow onAction naming pattern
 * - Support forwardRef pattern for DOM access
 */

// Core UI Components
export { default as Button, type ButtonProps } from './Button';
export { default as Card, type CardProps, type CardVariant } from './Card';
export { default as Badge, type BadgeProps, type BadgeVariant } from './Badge';
export {
  default as Input,
  Label,
  type InputProps,
  type LabelProps,
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

// Specialized components
export { ThemeToggle, type ThemeToggleProps } from './ThemeToggle';
export { TimelineItem, type TimelineItemData } from './TimelineItem';

// Legacy components (deprecated)
export { default as SkillBadge } from './SkillBadge';

// Centralized types (re-exported from types/ui.ts)
export type {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
} from '../../types/ui';
