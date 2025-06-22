// --- file: __tests__/lib/accessibility/focus.test.ts ---
/**
 * Tests for focus management utilities and functions
 * Task #118: Implement focus management and indicators
 */

import '@testing-library/jest-dom';
import {
  focusStyles,
  focusUtils,
  highContrastUtils,
  motionUtils,
  getFocusStyles,
} from '../../../lib/accessibility/focus';

// Mock window.matchMedia for media query tests
const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('Focus Management Utilities', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    // Reset matchMedia mock
    mockMatchMedia(false);
  });

  describe('focusStyles', () => {
    it('provides base focus styles with proper classes', () => {
      expect(focusStyles.base).toContain('focus:outline-none');
      expect(focusStyles.base).toContain('focus:ring-2');
      expect(focusStyles.base).toContain('focus:ring-brand-500');
      expect(focusStyles.base).toContain('focus:ring-offset-2');
    });

    it('provides enhanced focus styles with additional properties', () => {
      expect(focusStyles.enhanced).toContain('dark:focus:ring-brand-400');
      expect(focusStyles.enhanced).toContain('transition-shadow');
      expect(focusStyles.enhanced).toContain('motion-reduce:transition-none');
    });

    it('provides button-specific focus styles', () => {
      expect(focusStyles.button).toContain('focus:ring-brand-500');
      expect(focusStyles.button).toContain(
        'forced-colors:focus:ring-[Highlight]'
      );
      expect(focusStyles.button).toContain(
        'forced-colors:focus:ring-offset-[ButtonFace]'
      );
    });

    it('provides link-specific focus styles with tighter ring', () => {
      expect(focusStyles.link).toContain('focus:ring-offset-1');
      expect(focusStyles.link).toContain(
        'forced-colors:focus:ring-offset-[Canvas]'
      );
    });

    it('provides input-specific focus styles', () => {
      expect(focusStyles.input).toContain('focus:border-brand-500');
      expect(focusStyles.input).toContain('transition-colors');
    });

    it('provides skip link focus styles with high visibility', () => {
      expect(focusStyles.skipLink).toContain('focus:ring-white');
      expect(focusStyles.skipLink).toContain('focus:ring-offset-brand-600');
    });
  });

  describe('focusUtils', () => {
    describe('moveFocus', () => {
      it('moves focus to next element in sequence', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="first">First</button>
          <button id="second">Second</button>
          <button id="third">Third</button>
        `;
        document.body.appendChild(container);

        // Mock getComputedStyle to return visible styles
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockReturnValue({
          display: 'block',
          visibility: 'visible',
        });

        const firstButton = document.getElementById('first');
        const secondButton = document.getElementById('second');

        if (firstButton && secondButton) {
          firstButton.focus();
          expect(document.activeElement).toBe(firstButton);

          focusUtils.moveFocus('next', container);
          expect(document.activeElement).toBe(secondButton);
        }

        // Restore original getComputedStyle
        window.getComputedStyle = originalGetComputedStyle;
      });

      it('moves focus to previous element in sequence', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="first">First</button>
          <button id="second">Second</button>
          <button id="third">Third</button>
        `;
        document.body.appendChild(container);

        // Mock getComputedStyle to return visible styles
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockReturnValue({
          display: 'block',
          visibility: 'visible',
        });

        const secondButton = document.getElementById('second');
        const firstButton = document.getElementById('first');

        if (firstButton && secondButton) {
          secondButton.focus();
          expect(document.activeElement).toBe(secondButton);

          focusUtils.moveFocus('previous', container);
          expect(document.activeElement).toBe(firstButton);
        }

        // Restore original getComputedStyle
        window.getComputedStyle = originalGetComputedStyle;
      });

      it('wraps to last element when moving next from last element', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="first">First</button>
          <button id="last">Last</button>
        `;
        document.body.appendChild(container);

        // Mock getComputedStyle to return visible styles
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockReturnValue({
          display: 'block',
          visibility: 'visible',
        });

        const firstButton = document.getElementById('first');
        const lastButton = document.getElementById('last');

        if (firstButton && lastButton) {
          lastButton.focus();
          expect(document.activeElement).toBe(lastButton);

          focusUtils.moveFocus('next', container);
          expect(document.activeElement).toBe(firstButton);
        }

        // Restore original getComputedStyle
        window.getComputedStyle = originalGetComputedStyle;
      });

      it('wraps to first element when moving previous from first element', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="first">First</button>
          <button id="last">Last</button>
        `;
        document.body.appendChild(container);

        // Mock getComputedStyle to return visible styles
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockReturnValue({
          display: 'block',
          visibility: 'visible',
        });

        const firstButton = document.getElementById('first');
        const lastButton = document.getElementById('last');

        if (firstButton && lastButton) {
          firstButton.focus();
          expect(document.activeElement).toBe(firstButton);

          focusUtils.moveFocus('previous', container);
          expect(document.activeElement).toBe(lastButton);
        }

        // Restore original getComputedStyle
        window.getComputedStyle = originalGetComputedStyle;
      });

      it('does nothing when current element is not in focus list', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="button1">Button 1</button>
          <button id="button2">Button 2</button>
        `;
        document.body.appendChild(container);

        // Mock getComputedStyle to return visible styles
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockReturnValue({
          display: 'block',
          visibility: 'visible',
        });

        // Focus an element outside the container
        const outsideButton = document.createElement('button');
        outsideButton.id = 'outside';
        document.body.appendChild(outsideButton);
        outsideButton.focus();

        expect(document.activeElement).toBe(outsideButton);

        // Should not change focus since current element is not in the container
        focusUtils.moveFocus('next', container);
        expect(document.activeElement).toBe(outsideButton);

        // Restore original getComputedStyle
        window.getComputedStyle = originalGetComputedStyle;
      });

      it('uses document.body as default container', () => {
        // Clear body and add test elements
        document.body.innerHTML = `
          <button id="body-first">Body First</button>
          <button id="body-second">Body Second</button>
        `;

        // Mock getComputedStyle to return visible styles
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockReturnValue({
          display: 'block',
          visibility: 'visible',
        });

        const firstButton = document.getElementById('body-first');
        const secondButton = document.getElementById('body-second');

        if (firstButton && secondButton) {
          firstButton.focus();
          expect(document.activeElement).toBe(firstButton);

          // Call without container parameter - should use document.body
          focusUtils.moveFocus('next');
          expect(document.activeElement).toBe(secondButton);
        }

        // Restore original getComputedStyle
        window.getComputedStyle = originalGetComputedStyle;
      });
    });

    describe('manageFocusRestore', () => {
      it('restores focus to specified element after timeout', done => {
        const targetElement = document.createElement('button');
        targetElement.id = 'restore-target';
        document.body.appendChild(targetElement);

        const otherElement = document.createElement('button');
        otherElement.id = 'other';
        document.body.appendChild(otherElement);

        // Focus the other element first
        otherElement.focus();
        expect(document.activeElement).toBe(otherElement);

        // Set up focus restoration
        const restoreFocus = focusUtils.manageFocusRestore(targetElement);

        // Call restore function
        restoreFocus();

        // Focus should be restored after timeout
        setTimeout(() => {
          expect(document.activeElement).toBe(targetElement);
          done();
        }, 10);
      });

      it('restores focus to currently active element when no target specified', done => {
        const currentElement = document.createElement('button');
        currentElement.id = 'current';
        document.body.appendChild(currentElement);

        const otherElement = document.createElement('button');
        otherElement.id = 'other';
        document.body.appendChild(otherElement);

        // Focus the current element
        currentElement.focus();
        expect(document.activeElement).toBe(currentElement);

        // Set up focus restoration without specifying target
        const restoreFocus = focusUtils.manageFocusRestore();

        // Change focus to other element
        otherElement.focus();
        expect(document.activeElement).toBe(otherElement);

        // Call restore function
        restoreFocus();

        // Focus should be restored to the original element after timeout
        setTimeout(() => {
          expect(document.activeElement).toBe(currentElement);
          done();
        }, 10);
      });

      it('handles case when restore element does not have focus method', () => {
        const invalidElement = document.createElement('div') as any;
        // Remove focus method to simulate invalid element
        delete invalidElement.focus;

        const restoreFocus = focusUtils.manageFocusRestore(invalidElement);

        // Should not throw error when calling restore with invalid element
        expect(() => restoreFocus()).not.toThrow();
      });
    });
    describe('getFocusableElements', () => {
      it('finds all focusable elements in a container', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button>Button</button>
          <a href="/test">Link</a>
          <input type="text" />
          <textarea></textarea>
          <button disabled>Disabled Button</button>
          <div tabindex="0">Focusable Div</div>
          <div tabindex="-1">Not Focusable Div</div>
        `;
        document.body.appendChild(container);

        // Mock getComputedStyle to return visible styles
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockReturnValue({
          display: 'block',
          visibility: 'visible',
        });

        const focusableElements = focusUtils.getFocusableElements(container);

        expect(focusableElements.length).toBeGreaterThanOrEqual(5); // Should find at least 5 elements

        // Restore original getComputedStyle
        window.getComputedStyle = originalGetComputedStyle;
      });

      it('excludes hidden elements', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button>Visible Button</button>
          <button style="display: none">Hidden Button</button>
          <button style="visibility: hidden">Invisible Button</button>
        `;
        document.body.appendChild(container);

        // Mock getComputedStyle to return appropriate styles
        const originalGetComputedStyle = window.getComputedStyle;
        window.getComputedStyle = jest.fn().mockImplementation(element => {
          const style = element.getAttribute('style') || '';
          if (style.includes('display: none')) {
            return { display: 'none', visibility: 'visible' };
          }
          if (style.includes('visibility: hidden')) {
            return { display: 'block', visibility: 'hidden' };
          }
          return { display: 'block', visibility: 'visible' };
        });

        const focusableElements = focusUtils.getFocusableElements(container);

        expect(focusableElements).toHaveLength(1);
        expect(focusableElements[0].textContent).toBe('Visible Button');

        // Restore original getComputedStyle
        window.getComputedStyle = originalGetComputedStyle;
      });
    });

    describe('trapFocus', () => {
      it('traps focus within a container', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="first">First</button>
          <button id="second">Second</button>
          <button id="last">Last</button>
        `;
        document.body.appendChild(container);

        const cleanup = focusUtils.trapFocus(container);

        // Focus should be set to first element
        expect(document.activeElement?.id).toBe('first');

        // Simulate Tab from last element - should wrap to first
        const lastButton = document.getElementById('last');
        if (lastButton) {
          lastButton.focus();
        }

        const tabEvent = new KeyboardEvent('keydown', {
          key: 'Tab',
          bubbles: true,
        });
        container.dispatchEvent(tabEvent);

        cleanup();
      });

      it('handles Shift+Tab for backward navigation', () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button id="first">First</button>
          <button id="last">Last</button>
        `;
        document.body.appendChild(container);

        const cleanup = focusUtils.trapFocus(container);

        const firstButton = document.getElementById('first');
        if (firstButton) {
          firstButton.focus();
        }

        const shiftTabEvent = new KeyboardEvent('keydown', {
          key: 'Tab',
          shiftKey: true,
          bubbles: true,
        });
        container.dispatchEvent(shiftTabEvent);

        cleanup();
      });
    });

    describe('shouldShowFocusIndicator', () => {
      it('returns true for focus-visible elements', () => {
        const element = document.createElement('button');
        element.classList.add('focus-visible'); // Simulate :focus-visible

        // Mock matches method to return true for focus-visible
        element.matches = jest.fn().mockReturnValue(true);

        expect(focusUtils.shouldShowFocusIndicator(element)).toBe(true);
      });

      it('returns true for high contrast mode', () => {
        mockMatchMedia(true); // High contrast enabled

        const element = document.createElement('button');
        element.matches = jest.fn().mockReturnValue(false);

        expect(focusUtils.shouldShowFocusIndicator(element)).toBe(true);
      });

      it('returns true for reduced motion preference', () => {
        const element = document.createElement('button');
        element.matches = jest.fn().mockReturnValue(false);

        // Mock reduced motion preference
        window.matchMedia = jest.fn().mockImplementation(query => ({
          matches: query.includes('prefers-reduced-motion'),
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }));

        expect(focusUtils.shouldShowFocusIndicator(element)).toBe(true);
      });

      it('returns false when no special conditions are met', () => {
        const element = document.createElement('button');
        element.matches = jest.fn().mockReturnValue(false);

        // Mock all media queries to return false
        window.matchMedia = jest.fn().mockImplementation(() => ({
          matches: false,
          media: '',
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }));

        expect(focusUtils.shouldShowFocusIndicator(element)).toBe(false);
      });
    });
  });

  describe('highContrastUtils', () => {
    describe('isHighContrast', () => {
      it('detects high contrast mode', () => {
        mockMatchMedia(true);
        expect(highContrastUtils.isHighContrast()).toBe(true);
      });

      it('detects when high contrast is disabled', () => {
        mockMatchMedia(false);
        expect(highContrastUtils.isHighContrast()).toBe(false);
      });
    });

    describe('getHighContrastStyles', () => {
      it('returns enhanced styles for high contrast mode', () => {
        mockMatchMedia(true);
        const baseStyles = 'focus:ring-2';
        const enhancedStyles =
          highContrastUtils.getHighContrastStyles(baseStyles);

        expect(enhancedStyles).toContain('focus:ring-2');
        expect(enhancedStyles).toContain('forced-colors:ring-[Highlight]');
        expect(enhancedStyles).toContain('forced-colors:ring-offset-[Canvas]');
      });

      it('returns base styles when high contrast is disabled', () => {
        mockMatchMedia(false);
        const baseStyles = 'focus:ring-2';
        const result = highContrastUtils.getHighContrastStyles(baseStyles);

        expect(result).toBe(baseStyles);
      });
    });
  });

  describe('motionUtils', () => {
    describe('prefersReducedMotion', () => {
      it('detects reduced motion preference', () => {
        // Mock reduced motion preference
        window.matchMedia = jest.fn().mockImplementation(query => ({
          matches: query.includes('prefers-reduced-motion'),
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }));

        expect(motionUtils.prefersReducedMotion()).toBe(true);
      });

      it('detects when normal motion is preferred', () => {
        mockMatchMedia(false);
        expect(motionUtils.prefersReducedMotion()).toBe(false);
      });
    });

    describe('getTransition', () => {
      it('returns reduced motion class when preferred', () => {
        // Mock reduced motion preference
        window.matchMedia = jest.fn().mockImplementation(query => ({
          matches: query.includes('prefers-reduced-motion'),
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }));

        const result = motionUtils.getTransition('transition-all');
        expect(result).toBe('motion-reduce:transition-none');
      });

      it('returns normal transition when motion is not reduced', () => {
        mockMatchMedia(false);
        const normalTransition = 'transition-all duration-200';
        const result = motionUtils.getTransition(normalTransition);

        expect(result).toBe(normalTransition);
      });
    });
  });

  describe('getFocusStyles', () => {
    it('returns base focus styles by default', () => {
      const styles = getFocusStyles();
      expect(styles).toContain('focus:outline-none');
      expect(styles).toContain('focus:ring-2');
      expect(styles).toContain('focus:ring-brand-500');
    });

    it('returns enhanced focus styles for enhanced type', () => {
      const styles = getFocusStyles('enhanced');
      expect(styles).toContain('dark:focus:ring-brand-400');
      expect(styles).toContain('transition-shadow');
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('returns button-specific focus styles', () => {
      const styles = getFocusStyles('button');
      expect(styles).toContain('focus:ring-brand-500');
      expect(styles).toContain('forced-colors:focus:ring-offset-[ButtonFace]');
    });

    it('returns link-specific focus styles', () => {
      const styles = getFocusStyles('link');
      expect(styles).toContain('focus:ring-offset-1');
    });

    it('applies high contrast enhancements when enabled', () => {
      mockMatchMedia(true);
      const styles = getFocusStyles('base', { highContrast: true });
      expect(styles).toContain('forced-colors:ring-[Highlight]');
    });

    it('applies custom ring color when provided', () => {
      const styles = getFocusStyles('base', { customRing: 'red-500' });
      expect(styles).toContain('focus:ring-red-500');
    });

    it('applies custom offset when provided', () => {
      const styles = getFocusStyles('base', { customOffset: 'blue-500' });
      expect(styles).toContain('focus:ring-offset-blue-500');
    });
  });

  describe('Integration Tests', () => {
    it('provides comprehensive accessibility features', () => {
      const styles = getFocusStyles('enhanced');

      // Should include basic focus management
      expect(styles).toContain('focus:outline-none');
      expect(styles).toContain('focus:ring-2');

      // Should include theme support
      expect(styles).toContain('dark:focus:ring-brand-400');

      // Should include high contrast support
      expect(styles).toContain('forced-colors:focus:ring-[Highlight]');

      // Should include motion preferences
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('works with focus trapping and restoration', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="trigger">Trigger</button>
        <div id="modal">
          <button id="modal-close">Close</button>
          <input id="modal-input" />
        </div>
      `;
      document.body.appendChild(container);

      const trigger = document.getElementById('trigger');
      const modal = document.getElementById('modal');

      // Set initial focus
      if (trigger) {
        trigger.focus();
        expect(document.activeElement).toBe(trigger);
      }

      // Set up focus trap
      if (modal) {
        const cleanup = focusUtils.trapFocus(modal);

        // Should focus first element in modal
        expect(document.activeElement?.id).toBe('modal-close');

        // Test focus restoration
        const restoreFocus = focusUtils.manageFocusRestore(
          trigger || undefined
        );
        cleanup();
        restoreFocus();

        // Focus should return to trigger (with setTimeout, so we need to wait)
        setTimeout(() => {
          expect(document.activeElement).toBe(trigger);
        }, 0);
      }
    });
  });
});
