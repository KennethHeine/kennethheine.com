// --- file: components/ui/Card.tsx ---
'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { hoverStyles } from '../../lib/ui/hover';
import type { BaseComponentProps, ComponentSize } from '../../types/ui';

/**
 * Card visual variants
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'subtle';

/**
 * Card component props interface
 *
 * Follows consistent prop patterns:
 * - Extends BaseComponentProps for standard props (className, children, style, testId)
 * - Uses centralized ComponentSize type
 * - Event handlers follow onAction naming pattern
 * - Supports forwardRef pattern for DOM access
 */
export interface CardProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  /** Visual variant of the card */
  variant?: CardVariant;
  /** Size/padding of the card */
  size?: ComponentSize;
  /** Whether the card is hoverable */
  hoverable?: boolean;
  /** Whether the card is clickable */
  clickable?: boolean;
  /** Card click handler - follows onAction naming pattern */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Card header component props interface
 *
 * Follows consistent prop patterns for compound components
 */
export interface CardHeaderProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

/**
 * Card body component props interface
 *
 * Follows consistent prop patterns for compound components
 */
export interface CardBodyProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

/**
 * Card footer component props interface
 *
 * Follows consistent prop patterns for compound components
 */
export interface CardFooterProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

/**
 * Base card styles using Tailwind CSS and design tokens
 */
const cardBaseStyles = 'card';

/**
 * Card variant styles mapping
 */
const cardVariants: Record<CardVariant, string> = {
  default: '',
  elevated: 'shadow-lg',
  outlined: 'border-2 shadow-none',
  subtle: 'bg-gray-50 dark:bg-gray-900/50 shadow-sm',
};

/**
 * Card size styles mapping
 */
const cardSizes: Record<ComponentSize, string> = {
  xs: 'p-2',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

/**
 * Card component interface with compound components
 */
interface CardComponent extends React.ForwardRefExoticComponent<
  CardProps & React.RefAttributes<HTMLDivElement>
> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

/**
 * Card component for content containers
 *
 * @example
 * ```tsx
 * <Card variant="elevated" size="md" hoverable>
 *   <Card.Header>
 *     <h3>Card Title</h3>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content goes here...</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      size = 'md',
      hoverable = false,
      clickable = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardBaseStyles,
          cardVariants[variant],
          cardSizes[size],
          hoverable && hoverStyles.card(),
          clickable && 'cursor-pointer',
          className
        )}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
) as CardComponent;

Card.displayName = 'Card';

/**
 * Card header component for consistent header styling
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mb-4 border-b border-gray-200 dark:border-gray-700 pb-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

/**
 * Card body component for main content area
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1', className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

/**
 * Card footer component for action areas
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mt-4 pt-3 border-t border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

// Compound component pattern
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
