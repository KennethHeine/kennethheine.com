// --- file: hooks/useFocusManagement.ts ---
'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { focusUtils, getFocusStyles } from '../lib/accessibility/focus';

/**
 * Options for focus management hook
 */
interface UseFocusManagementOptions {
  /** Whether to trap focus within the element */
  trapFocus?: boolean;
  /** Whether to restore focus when unmounting */
  restoreFocus?: boolean;
  /** Element to restore focus to (defaults to previously focused element) */
  restoreElement?: HTMLElement;
  /** Whether to auto-focus the element on mount */
  autoFocus?: boolean;
  /** Callback when escape key is pressed */
  onEscape?: () => void;
}

/**
 * Custom hook for enhanced focus management
 * Provides focus trapping, restoration, and keyboard navigation utilities
 *
 * @param options - Configuration options for focus management
 * @returns Object with ref and focus utility functions
 */
export function useFocusManagement(options: UseFocusManagementOptions = {}) {
  const {
    trapFocus = false,
    restoreFocus = false,
    restoreElement,
    autoFocus = false,
    onEscape,
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const cleanupFocusTrapRef = useRef<(() => void) | null>(null);

  // Store the previously focused element when component mounts
  useEffect(() => {
    if (restoreFocus && !restoreElement) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
    }
  }, [restoreFocus, restoreElement]);

  // Setup focus trap if enabled
  useEffect(() => {
    if (trapFocus && elementRef.current) {
      cleanupFocusTrapRef.current = focusUtils.trapFocus(elementRef.current);
    }

    return () => {
      if (cleanupFocusTrapRef.current) {
        cleanupFocusTrapRef.current();
        cleanupFocusTrapRef.current = null;
      }
    };
  }, [trapFocus]);

  // Auto-focus if enabled
  useEffect(() => {
    if (autoFocus && elementRef.current) {
      elementRef.current.focus();
    }
  }, [autoFocus]);

  // Handle escape key
  useEffect(() => {
    if (!onEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onEscape]);

  // Cleanup and restore focus on unmount
  useEffect(() => {
    return () => {
      if (restoreFocus) {
        const elementToRestore =
          restoreElement || previousActiveElementRef.current;
        if (elementToRestore && typeof elementToRestore.focus === 'function') {
          setTimeout(() => {
            elementToRestore.focus();
          }, 0);
        }
      }
    };
  }, [restoreFocus, restoreElement]);

  // Focus utility functions
  const focusFirst = useCallback(() => {
    if (!elementRef.current) return;
    const focusableElements = focusUtils.getFocusableElements(
      elementRef.current
    );
    focusableElements[0]?.focus();
  }, []);

  const focusLast = useCallback(() => {
    if (!elementRef.current) return;
    const focusableElements = focusUtils.getFocusableElements(
      elementRef.current
    );
    focusableElements[focusableElements.length - 1]?.focus();
  }, []);

  const moveFocusNext = useCallback(() => {
    focusUtils.moveFocus('next', elementRef.current || undefined);
  }, []);

  const moveFocusPrevious = useCallback(() => {
    focusUtils.moveFocus('previous', elementRef.current || undefined);
  }, []);

  const restorePreviousFocus = useCallback(() => {
    const elementToRestore = restoreElement || previousActiveElementRef.current;
    if (elementToRestore && typeof elementToRestore.focus === 'function') {
      elementToRestore.focus();
    }
  }, [restoreElement]);

  return {
    ref: elementRef,
    focusFirst,
    focusLast,
    moveFocusNext,
    moveFocusPrevious,
    restorePreviousFocus,
  };
}

/**
 * Hook for getting focus styles based on component type and user preferences
 *
 * @param type - Type of focus indicator
 * @param customOptions - Custom styling options
 * @returns Focus style classes
 */
export function useFocusStyles(
  type: 'base' | 'enhanced' | 'button' | 'link' | 'input' | 'skipLink' = 'base',
  customOptions?: {
    customRing?: string;
    customOffset?: string;
  }
) {
  return getFocusStyles(type, customOptions);
}

/**
 * Hook for managing focus visible state based on user interaction
 * Helps distinguish between mouse and keyboard focus
 *
 * @returns Object with focus visible state and handlers
 */
export function useFocusVisible() {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsUsingKeyboard(true);
      }
    };

    const handleMouseDown = () => {
      setIsUsingKeyboard(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const getFocusProps = useCallback(
    (baseClassName: string = '') => {
      return {
        className: baseClassName,
        onFocus: (event: React.FocusEvent) => {
          if (isUsingKeyboard) {
            event.currentTarget.setAttribute('data-focus-visible', 'true');
          }
        },
        onBlur: (event: React.FocusEvent) => {
          event.currentTarget.removeAttribute('data-focus-visible');
        },
      };
    },
    [isUsingKeyboard]
  );

  return {
    getFocusProps,
    isUsingKeyboard: () => isUsingKeyboard,
  };
}

export default {
  useFocusManagement,
  useFocusStyles,
  useFocusVisible,
};
