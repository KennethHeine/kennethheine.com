// --- file: components/ui/Modal.tsx ---
'use client';

import { forwardRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import type { BaseComponentProps, ComponentSize } from '../../types/ui';

/**
 * Modal size variants extending ComponentSize with additional options
 */
export type ModalSize = ComponentSize | 'full';

/**
 * Modal component props interface
 *
 * Follows consistent prop patterns:
 * - Extends BaseComponentProps for standard props (className, children, style, testId)
 * - Uses centralized ComponentSize type with extensions
 * - Event handlers follow onAction naming pattern
 * - Supports forwardRef pattern for DOM access
 */
export interface ModalProps extends BaseComponentProps {
  /** Whether the modal is open */
  open: boolean;
  /** Function to call when the modal should be closed - follows onAction naming pattern */
  onClose: () => void;
  /** Size of the modal */
  size?: ModalSize;
  /** Whether clicking the backdrop closes the modal */
  closeOnBackdropClick?: boolean;
  /** Whether pressing escape closes the modal */
  closeOnEscape?: boolean;
}

/**
 * Modal header component props interface
 *
 * Follows consistent prop patterns for compound components
 */
export interface ModalHeaderProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {
  /** Function to call when close button is clicked - follows onAction naming pattern */
  onClose?: () => void;
  /** Whether to show the close button */
  showCloseButton?: boolean;
}

/**
 * Modal body component props interface
 *
 * Follows consistent prop patterns for compound components
 */
export interface ModalBodyProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

/**
 * Modal footer component props interface
 *
 * Follows consistent prop patterns for compound components
 */
export interface ModalFooterProps
  extends
    BaseComponentProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseComponentProps> {}

/**
 * Modal size styles mapping
 */
const modalSizes: Record<ModalSize, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

/**
 * Modal component interface with compound components
 */
interface ModalComponent extends React.ForwardRefExoticComponent<
  ModalProps & React.RefAttributes<HTMLDivElement>
> {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

/**
 * Modal component for overlay dialogs
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
 *   <Modal.Header onClose={() => setIsOpen(false)}>
 *     <h2>Modal Title</h2>
 *   </Modal.Header>
 *   <Modal.Body>
 *     <p>Modal content goes here...</p>
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onClose,
      size = 'md',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Handle escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }
    }, [open]);

    if (!open) return null;

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4'
        aria-modal='true'
        role='dialog'
        aria-labelledby='modal-title'
      >
        {/* Backdrop */}
        <div
          className='fixed inset-0 bg-black bg-opacity-50 transition-opacity'
          onClick={handleBackdropClick}
          aria-hidden='true'
        />

        {/* Modal */}
        <div
          ref={ref}
          className={cn(
            'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full',
            'transform transition-all',
            modalSizes[size],
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
) as ModalComponent;

Modal.displayName = 'Modal';

/**
 * Modal header component with optional close button
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ onClose, showCloseButton = true, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    >
      <div className='flex-1'>{children}</div>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className='ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors'
          aria-label='Close modal'
        >
          <svg
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      )}
    </div>
  )
);

ModalHeader.displayName = 'ModalHeader';

/**
 * Modal body component for main content
 */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
);

ModalBody.displayName = 'ModalBody';

/**
 * Modal footer component for actions
 */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

ModalFooter.displayName = 'ModalFooter';

// Compound component pattern
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
