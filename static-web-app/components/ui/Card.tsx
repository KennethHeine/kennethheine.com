// --- file: components/ui/Card.tsx ---
'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * Card size variants
 */
export type CardSize = 'sm' | 'md' | 'lg';

/**
 * Card visual variants
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'subtle';

/**
 * Card component props interface
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the card */
  variant?: CardVariant;
  /** Size/padding of the card */
  size?: CardSize;
  /** Whether the card is hoverable */
  hoverable?: boolean;
  /** Whether the card is clickable */
  clickable?: boolean;
  /** Custom className for additional styling */
  className?: string;
  /** Card content */
  children?: React.ReactNode;
}

/**
 * Card header component props
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Card body component props
 */
export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Card footer component props
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

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
const cardSizes: Record<CardSize, string> = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Card component interface with compound components
 */
interface CardComponent
  extends React.ForwardRefExoticComponent<
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
          hoverable && 'hover:shadow-lg hover:-translate-y-1',
          clickable && 'cursor-pointer transition-transform',
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
