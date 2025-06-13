// --- file: components/ui/Input.tsx ---
'use client';

import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * Input size variants
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Input visual variants
 */
export type InputVariant = 'default' | 'error' | 'success';

/**
 * Input component props interface
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual variant of the input */
  variant?: InputVariant;
  /** Size of the input */
  size?: InputSize;
  /** Label for the input */
  label?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Icon to display at the start of the input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  endIcon?: React.ReactNode;
  /** Custom className for additional styling */
  className?: string;
}

/**
 * Label component props
 */
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Input variant styles mapping
 */
const inputVariants: Record<InputVariant, string> = {
  default:
    'border-gray-300 dark:border-gray-600 focus:border-brand-500 dark:focus:border-brand-400 focus:ring-brand-500 dark:focus:ring-brand-400',
  error:
    'border-error-500 dark:border-error-400 focus:border-error-500 dark:focus:border-error-400 focus:ring-error-500 dark:focus:ring-error-400',
  success:
    'border-success-500 dark:border-success-400 focus:border-success-500 dark:focus:border-success-400 focus:ring-success-500 dark:focus:ring-success-400',
};

/**
 * Input size styles mapping
 */
const inputSizes: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

/**
 * Base input styles
 */
const inputBaseStyles =
  'block w-full rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-colors';

/**
 * Label component for form inputs
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ required, className, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1',
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className='text-error-500 ml-1' aria-label='required'>
          *
        </span>
      )}
    </label>
  )
);

Label.displayName = 'Label';

/**
 * Input component for form fields
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 * />
 *
 * <Input
 *   variant="error"
 *   error="This field is required"
 *   startIcon={<MailIcon />}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      className,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const currentVariant = error ? 'error' : variant;
    const displayError = error;
    const displayHelperText = helperText && !error ? helperText : null;

    return (
      <div className='w-full'>
        {label && (
          <Label htmlFor={inputId} required={required}>
            {label}
          </Label>
        )}

        <div className='relative'>
          {startIcon && (
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <span className='text-gray-400 dark:text-gray-500'>
                {startIcon}
              </span>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              inputBaseStyles,
              inputVariants[currentVariant],
              inputSizes[size],
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              displayError
                ? `${inputId}-error`
                : displayHelperText
                  ? `${inputId}-description`
                  : undefined
            }
            {...props}
          />

          {endIcon && (
            <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
              <span className='text-gray-400 dark:text-gray-500'>
                {endIcon}
              </span>
            </div>
          )}
        </div>

        {displayError && (
          <p
            id={`${inputId}-error`}
            className='mt-1 text-sm text-error-500 dark:text-error-400'
            role='alert'
          >
            {displayError}
          </p>
        )}

        {displayHelperText && (
          <p
            id={`${inputId}-description`}
            className='mt-1 text-sm text-gray-500 dark:text-gray-400'
          >
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
