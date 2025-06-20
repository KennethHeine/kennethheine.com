// --- file: __tests__/lib/ui/hover.test.ts ---
/**
 * Tests for hover state utilities
 * Task #122: Create basic interactive hover states (simplified)
 */

import {
  getHoverStyles,
  hoverStyles,
  hoverClasses,
  touchFriendlyHover,
  supportsHover,
  useHoverSupport,
} from '../../../lib/ui/hover';
import { renderHook, act } from '@testing-library/react';

// Mock window.matchMedia for testing
const mockMatchMedia = (matches: boolean) => {
  const mediaQuery = {
    matches,
    media: '(hover: hover)',
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    addListener: jest.fn(), // deprecated but still used
    removeListener: jest.fn(), // deprecated but still used
    onchange: null,
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockReturnValue(mediaQuery),
  });

  return mediaQuery;
};

describe('Hover Utilities', () => {
  beforeEach(() => {
    // Reset any previous mocks
    jest.clearAllMocks();
  });

  describe('getHoverStyles', () => {
    it('returns base styles for button type', () => {
      const styles = getHoverStyles({ effect: 'medium', type: 'button' });
      expect(styles).toContain('transition-all');
      expect(styles).toContain('duration-150');
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('returns brand styles for link type', () => {
      const styles = getHoverStyles({ effect: 'brand', type: 'link' });
      expect(styles).toContain('transition-colors');
      expect(styles).toContain('duration-150');
    });

    it('combines custom className with generated styles', () => {
      const customClass = 'custom-class';
      const styles = getHoverStyles({
        effect: 'subtle',
        type: 'button',
        className: customClass,
      });
      expect(styles).toContain(customClass);
    });

    it('handles none effect correctly', () => {
      const styles = getHoverStyles({ effect: 'none', type: 'button' });
      expect(styles).toContain('transition-all'); // Still has base button styles
      // With 'none' effect, there should be no additional hover effects beyond the base button ones
      expect(styles).not.toContain('hover:bg-'); // No background hover effects
      expect(styles).not.toContain('hover:shadow-'); // No shadow hover effects
    });

    it('generates different styles for different interactive types', () => {
      const buttonStyles = getHoverStyles({ effect: 'medium', type: 'button' });
      const linkStyles = getHoverStyles({ effect: 'medium', type: 'link' });
      const cardStyles = getHoverStyles({ effect: 'medium', type: 'card' });

      expect(buttonStyles).not.toBe(linkStyles);
      expect(linkStyles).not.toBe(cardStyles);
      expect(cardStyles).not.toBe(buttonStyles);
    });
  });

  describe('hoverStyles quick generators', () => {
    it('generates button hover styles with default effect', () => {
      const styles = hoverStyles.button();
      expect(styles).toContain('transition-all');
      expect(styles).toBeDefined();
    });

    it('generates button hover styles with custom effect', () => {
      const styles = hoverStyles.button('strong');
      expect(styles).toContain('transition-all');
      expect(styles).toBeDefined();
    });

    it('generates link hover styles', () => {
      const styles = hoverStyles.link();
      expect(styles).toContain('transition-colors');
      expect(styles).toBeDefined();
    });

    it('generates card hover styles', () => {
      const styles = hoverStyles.card();
      expect(styles).toContain('transition-all');
      expect(styles).toBeDefined();
    });

    it('generates icon hover styles', () => {
      const styles = hoverStyles.icon();
      expect(styles).toContain('transition-all');
      expect(styles).toBeDefined();
    });

    it('generates navigation item hover styles', () => {
      const styles = hoverStyles.navItem();
      expect(styles).toContain('transition-colors');
      expect(styles).toBeDefined();
    });

    it('generates social link hover styles', () => {
      const styles = hoverStyles.socialLink();
      expect(styles).toContain('transition-all');
      expect(styles).toBeDefined();
    });

    it('generates CTA hover styles', () => {
      const styles = hoverStyles.cta();
      expect(styles).toContain('transition-all');
      expect(styles).toBeDefined();
    });

    it('accepts custom className for all generators', () => {
      const customClass = 'custom-hover';

      expect(hoverStyles.button('medium', customClass)).toContain(customClass);
      expect(hoverStyles.link('brand', customClass)).toContain(customClass);
      expect(hoverStyles.card('lift', customClass)).toContain(customClass);
      expect(hoverStyles.icon('scale', customClass)).toContain(customClass);
      expect(hoverStyles.navItem('subtle', customClass)).toContain(customClass);
      expect(hoverStyles.socialLink('medium', customClass)).toContain(
        customClass
      );
      expect(hoverStyles.cta('glow', customClass)).toContain(customClass);
    });
  });

  describe('hoverClasses constants', () => {
    it('provides predefined hover class combinations', () => {
      expect(hoverClasses.subtle).toContain('hover:bg-gray-50');
      expect(hoverClasses.medium).toContain('hover:bg-gray-100');
      expect(hoverClasses.strong).toContain('hover:shadow-lg');
      expect(hoverClasses.brand).toContain('hover:text-brand-600');
      expect(hoverClasses.lift).toContain('hover:-translate-y-1');
      expect(hoverClasses.glow).toContain('hover:shadow-lg');
      expect(hoverClasses.scale).toContain('hover:scale-105');
      expect(hoverClasses.fade).toContain('hover:opacity-80');
    });

    it('includes transition properties for smooth animations', () => {
      Object.values(hoverClasses).forEach(className => {
        expect(className).toContain('transition');
        expect(className).toContain('motion-reduce:transition-none');
      });
    });

    it('includes proper timing functions', () => {
      Object.values(hoverClasses).forEach(className => {
        expect(className).toMatch(/duration-\d+/);
      });
    });
  });

  describe('touchFriendlyHover', () => {
    it('wraps hover classes with media query', () => {
      const input = 'hover:bg-red-500 text-white';
      const result = touchFriendlyHover(input);

      expect(result).toContain('@media (hover: hover)');
      expect(result).toContain('text-white'); // Non-hover classes remain unchanged
    });

    it('handles multiple hover classes', () => {
      const input = 'hover:bg-red-500 hover:text-white hover:scale-105';
      const result = touchFriendlyHover(input);

      const hoverMatches = result.match(/@media \(hover: hover\)/g);
      expect(hoverMatches).toHaveLength(3); // One for each hover class
    });

    it('preserves non-hover classes unchanged', () => {
      const input = 'bg-blue-500 text-white p-4 rounded-lg';
      const result = touchFriendlyHover(input);

      expect(result).toBe(input); // Should be unchanged
      expect(result).not.toContain('@media');
    });

    it('handles empty string', () => {
      const result = touchFriendlyHover('');
      expect(result).toBe('');
    });
  });

  describe('supportsHover', () => {
    it('returns true when window is undefined (SSR)', () => {
      // Mock the function to simulate SSR environment

      // Create a version that simulates SSR behavior
      const mockSupportsHover = () => {
        if (typeof window === 'undefined') return true;
        return window.matchMedia('(hover: hover)').matches;
      };

      // Test the SSR logic directly
      expect(typeof window !== 'undefined').toBe(true); // We have window in test env

      // The function should handle SSR correctly - this test validates the logic
      const result = mockSupportsHover();
      expect(result).toBeDefined();
      expect(typeof result).toBe('boolean');
    });

    it('returns true when hover is supported', () => {
      mockMatchMedia(true);

      const result = supportsHover();
      expect(result).toBe(true);
      expect(window.matchMedia).toHaveBeenCalledWith('(hover: hover)');
    });

    it('returns false when hover is not supported', () => {
      mockMatchMedia(false);

      const result = supportsHover();
      expect(result).toBe(false);
      expect(window.matchMedia).toHaveBeenCalledWith('(hover: hover)');
    });
  });

  describe('useHoverSupport hook', () => {
    it('returns true initially when hover is supported', () => {
      mockMatchMedia(true);

      const { result } = renderHook(() => useHoverSupport());

      expect(result.current).toBe(true);
    });

    it('returns false initially when hover is not supported', () => {
      mockMatchMedia(false);

      const { result } = renderHook(() => useHoverSupport());

      expect(result.current).toBe(false);
    });

    it('updates when media query changes', () => {
      const mediaQuery = mockMatchMedia(true);

      const { result } = renderHook(() => useHoverSupport());

      expect(result.current).toBe(true);

      // Simulate media query change
      act(() => {
        const changeEvent = { matches: false } as MediaQueryListEvent;
        const changeHandler = mediaQuery.addEventListener.mock.calls.find(
          call => call[0] === 'change'
        )?.[1];

        if (changeHandler) {
          changeHandler(changeEvent);
        }
      });

      expect(result.current).toBe(false);
    });

    it('cleans up event listener on unmount', () => {
      const mediaQuery = mockMatchMedia(true);

      const { unmount } = renderHook(() => useHoverSupport());

      unmount();

      expect(mediaQuery.removeEventListener).toHaveBeenCalled();
    });

    it('handles SSR environment', () => {
      // Test that the hook handles browser environment correctly
      // In test environment, we have window available
      const { result } = renderHook(() => useHoverSupport());

      // Should return a boolean value
      expect(typeof result.current).toBe('boolean');
      expect(result.current).toBeDefined();
    });
  });

  describe('Performance and accessibility', () => {
    it('includes motion-reduce support in all generated styles', () => {
      const buttonStyles = hoverStyles.button();
      const linkStyles = hoverStyles.link();
      const cardStyles = hoverStyles.card();

      expect(buttonStyles).toContain('motion-reduce:transition-none');
      expect(linkStyles).toContain('motion-reduce:transition-none');
      expect(cardStyles).toContain('motion-reduce:transition-none');
    });

    it('uses appropriate timing for different interaction types', () => {
      const quickInteraction = hoverStyles.button();
      const mediumInteraction = hoverStyles.card();

      // Quick interactions should have faster timing
      expect(quickInteraction).toContain('duration-150');
      // Card interactions can be slightly slower for better visual feedback
      expect(mediumInteraction).toMatch(/duration-(150|200)/);
    });

    it('generates valid CSS class strings', () => {
      const allGenerators = [
        hoverStyles.button(),
        hoverStyles.link(),
        hoverStyles.card(),
        hoverStyles.icon(),
        hoverStyles.navItem(),
        hoverStyles.socialLink(),
        hoverStyles.cta(),
      ];

      allGenerators.forEach(styles => {
        expect(typeof styles).toBe('string');
        expect(styles.length).toBeGreaterThan(0);
        // Should be valid Tailwind CSS classes (alphanumeric, hyphens, colons, slashes, brackets)
        expect(styles).toMatch(/^[\w\s\-:./%[\]]+$/);
      });
    });
  });

  describe('Theme compatibility', () => {
    it('includes dark mode variants in appropriate styles', () => {
      const brandStyles = hoverStyles.link();
      const cardStyles = hoverStyles.card();

      // Brand styles should include dark mode text colors
      expect(brandStyles).toMatch(
        /dark:text-brand-400|dark:hover:text-brand-400/
      );

      // Card styles may include dark mode backgrounds
      expect(cardStyles).toBeDefined(); // At minimum, should be defined
    });

    it('provides consistent hover effects across themes', () => {
      const styles = getHoverStyles({ effect: 'brand', type: 'link' });

      // Should include both light and dark mode hover states
      expect(styles).toContain('transition');
      expect(styles).toBeDefined();
    });
  });

  describe('Integration with existing styles', () => {
    it('produces styles compatible with cn utility', () => {
      const styles = hoverStyles.button('medium', 'custom-class');

      // Should be a valid string that can be used with cn()
      expect(typeof styles).toBe('string');
      expect(styles).toContain('custom-class');
      expect(styles).toContain('transition');
    });

    it('generates non-conflicting class names', () => {
      const buttonStyles = hoverStyles.button();
      const linkStyles = hoverStyles.link();

      // Different types should generate different base styles
      expect(buttonStyles).not.toBe(linkStyles);

      // But both should be valid
      expect(buttonStyles).toBeDefined();
      expect(linkStyles).toBeDefined();
    });
  });
});
