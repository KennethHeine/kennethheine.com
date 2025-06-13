/**
 * UI component type definitions
 * Contains types for component props, variants, and UI-related interfaces
 */

import type {
  ReactNode,
  CSSProperties,
  MouseEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

/**
 * Base component props that all components should extend
 */
export interface BaseComponentProps {
  /** Optional CSS class name */
  className?: string;
  /** Optional inline styles */
  style?: CSSProperties;
  /** Optional test ID for testing */
  testId?: string;
  /** Optional children elements */
  children?: ReactNode;
}

/**
 * Component size variants
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Component color variants
 */
export type ComponentVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive';

/**
 * Button component props
 */
export interface ButtonProps extends BaseComponentProps {
  /** Button click handler */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Button variant style */
  variant?: ComponentVariant;
  /** Button size */
  size?: ComponentSize;
  /** Disabled state */
  disabled?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Loading state */
  loading?: boolean;
  /** Icon to display */
  icon?: ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
}

/**
 * Timeline item data interface
 */
export interface TimelineItemData {
  /** Year or date */
  year: string;
  /** Title of the timeline item */
  title: string;
  /** Company or organization */
  company: string;
  /** Description of the role/position */
  description: string;
  /** Optional additional details */
  details?: string[];
  /** Optional URL for more information */
  url?: string;
}

/**
 * Timeline item component props
 */
export interface TimelineItemProps extends BaseComponentProps {
  /** Timeline item data */
  item: TimelineItemData;
  /** Index in the timeline (for styling alternation) */
  index: number;
}

/**
 * Theme toggle component props
 */
export interface ThemeToggleProps extends BaseComponentProps {
  /** Optional size variant */
  size?: ComponentSize;
  /** Show text label alongside icon */
  showLabel?: boolean;
}

/**
 * Container component props
 */
export interface ContainerProps extends BaseComponentProps {
  /** Maximum width variant */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
  /** Center content horizontally */
  centered?: boolean;
  /** Add padding */
  padded?: boolean;
}

/**
 * Skill badge component props
 */
export interface SkillBadgeProps extends BaseComponentProps {
  /** Skill name */
  name: string;
  /** Skill level (1-5) */
  level?: 1 | 2 | 3 | 4 | 5;
  /** Skill category */
  category?:
    | 'frontend'
    | 'backend'
    | 'database'
    | 'devops'
    | 'design'
    | 'other';
  /** Optional icon */
  icon?: ReactNode;
  /** Color variant */
  variant?: 'default' | 'primary' | 'secondary';
}

/**
 * Mobile menu component props
 */
export interface MobileMenuProps extends BaseComponentProps {
  /** Whether the menu is open */
  isOpen: boolean;
  /** Function to close the menu */
  onClose: () => void;
  /** Navigation items */
  items: Array<{
    label: string;
    href: string;
    icon?: ReactNode;
  }>;
}

/**
 * Layout component props
 */
export interface LayoutProps extends BaseComponentProps {
  /** Page title for SEO */
  title?: string;
  /** Page description for SEO */
  description?: string;
  /** Whether to show the header */
  showHeader?: boolean;
  /** Whether to show the footer */
  showFooter?: boolean;
}

/**
 * Icon component props
 */
export interface IconProps extends BaseComponentProps {
  /** Icon name or identifier */
  name?: string;
  /** Icon size */
  size?: ComponentSize | number;
  /** Icon color */
  color?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
}

/**
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  /** Card header content */
  header?: ReactNode;
  /** Card footer content */
  footer?: ReactNode;
  /** Card padding variant */
  padding?: ComponentSize;
  /** Whether the card is interactive */
  interactive?: boolean;
  /** Click handler for interactive cards */
  onClick?: () => void;
}

/**
 * Badge component props
 */
export interface BadgeProps extends BaseComponentProps {
  /** Badge content */
  content: string | number;
  /** Badge variant */
  variant?: ComponentVariant;
  /** Badge size */
  size?: ComponentSize;
  /** Badge shape */
  shape?: 'rounded' | 'pill' | 'square';
}

/**
 * Avatar component props
 */
export interface AvatarProps extends BaseComponentProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback initials */
  initials?: string;
  /** Avatar size */
  size?: ComponentSize;
  /** Avatar shape */
  shape?: 'circle' | 'square';
}

/**
 * Form field wrapper props
 */
export interface FormFieldProps extends BaseComponentProps {
  /** Field label */
  label?: string;
  /** Field description/help text */
  description?: string;
  /** Error message */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Field ID */
  id?: string;
}

/**
 * Input component props
 */
export interface InputProps
  extends BaseComponentProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  /** Input size */
  size?: ComponentSize;
  /** Error state */
  error?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Prefix icon */
  prefix?: ReactNode;
  /** Suffix icon */
  suffix?: ReactNode;
}

/**
 * Textarea component props
 */
export interface TextareaProps
  extends BaseComponentProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
  /** Number of visible rows */
  rows?: number;
  /** Error state */
  error?: boolean;
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * Modal component props
 */
export interface ModalProps extends BaseComponentProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Function to close the modal */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
}

/**
 * Tooltip component props
 */
export interface TooltipProps extends BaseComponentProps {
  /** Tooltip content */
  content: ReactNode;
  /** Tooltip position */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Trigger element */
  trigger: ReactNode;
  /** Delay before showing (ms) */
  delay?: number;
}

/**
 * Loading spinner props
 */
export interface LoadingSpinnerProps extends BaseComponentProps {
  /** Spinner size */
  size?: ComponentSize;
  /** Spinner color */
  color?: string;
  /** Loading text */
  text?: string;
}

/**
 * Generic dropdown/select option interface
 */
export interface SelectOption<T = string> {
  /** Option label */
  label: string;
  /** Option value */
  value: T;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Option description */
  description?: string;
  /** Option icon */
  icon?: ReactNode;
}
