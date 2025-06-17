// --- file: components/ui/Typography.tsx ---
'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import type { BaseComponentProps } from '../../types/ui';

/**
 * Typography variants for different text elements
 */
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'lead'
  | 'small'
  | 'muted';

/**
 * Typography component as different HTML elements
 */
export type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div'
  | 'small';

/**
 * Typography component props interface
 *
 * Follows consistent prop patterns:
 * - Extends BaseComponentProps for standard props (className, children, style, testId)
 * - Event handlers follow onAction naming pattern
 * - Supports forwardRef pattern for DOM access
 */
export interface TypographyProps
  extends BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLElement>, keyof BaseComponentProps> {
  /** Typography variant for styling */
  variant?: TypographyVariant;
  /** HTML element to render as */
  as?: TypographyElement;
}

/**
 * Typography variant styles mapping
 */
const typographyVariants: Record<TypographyVariant, string> = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight',
  h4: 'text-xl md:text-2xl lg:text-3xl font-semibold leading-tight',
  h5: 'text-lg md:text-xl lg:text-2xl font-medium leading-tight',
  h6: 'text-base md:text-lg lg:text-xl font-medium leading-tight',
  subtitle1: 'text-lg font-medium leading-relaxed',
  subtitle2: 'text-base font-medium leading-relaxed',
  body1: 'text-base leading-relaxed',
  body2: 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal text-gray-600 dark:text-gray-400',
  overline:
    'text-xs uppercase tracking-wide font-medium text-gray-600 dark:text-gray-400',
  lead: 'text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300',
  small: 'text-sm leading-normal text-gray-600 dark:text-gray-400',
  muted: 'text-sm leading-normal text-gray-500 dark:text-gray-500',
};

/**
 * Default HTML element mapping for each variant
 */
const defaultElements: Record<TypographyVariant, TypographyElement> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  lead: 'p',
  small: 'small',
  muted: 'p',
};

/**
 * Typography component for consistent text styling
 *
 * @example
 * ```tsx
 * <Typography variant="h1">
 *   Main Heading
 * </Typography>
 *
 * <Typography variant="body1" as="div">
 *   Body text content
 * </Typography>
 *
 * <Typography variant="caption">
 *   Small caption text
 * </Typography>
 * ```
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'body1', as, className, children, ...props }, ref) => {
    const Component = as || defaultElements[variant];

    return (
      <Component
        ref={ref as any} // eslint-disable-line @typescript-eslint/no-explicit-any
        className={cn(typographyVariants[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

/**
 * Predefined heading components for convenience
 */
export const H1 = forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant='h1' as='h1' className={className} {...props}>
    {children}
  </Typography>
));

H1.displayName = 'H1';

export const H2 = forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant='h2' as='h2' className={className} {...props}>
    {children}
  </Typography>
));

H2.displayName = 'H2';

export const H3 = forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant='h3' as='h3' className={className} {...props}>
    {children}
  </Typography>
));

H3.displayName = 'H3';

export const H4 = forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant='h4' as='h4' className={className} {...props}>
    {children}
  </Typography>
));

H4.displayName = 'H4';

export const H5 = forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant='h5' as='h5' className={className} {...props}>
    {children}
  </Typography>
));

H5.displayName = 'H5';

export const H6 = forwardRef<
  HTMLHeadingElement,
  Omit<TypographyProps, 'variant' | 'as'>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant='h6' as='h6' className={className} {...props}>
    {children}
  </Typography>
));

H6.displayName = 'H6';

/**
 * Predefined text components for convenience
 */
export const Lead = forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant' | 'as'>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant='lead' as='p' className={className} {...props}>
    {children}
  </Typography>
));

Lead.displayName = 'Lead';

export const Muted = forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, 'variant' | 'as'>
>(({ className, children, ...props }, ref) => (
  <Typography ref={ref} variant='muted' as='p' className={className} {...props}>
    {children}
  </Typography>
));

Muted.displayName = 'Muted';

export default Typography;
