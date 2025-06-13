import {
  isMobile,
  isTablet,
  isDesktop,
  getCurrentBreakpoint,
} from '../../../lib/ui/responsive';

// Mock window object for testing
const mockWindow = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
};

// Store original window object
const originalWindow = global.window;

describe('Responsive utilities', () => {
  beforeEach(() => {
    // Reset window mock before each test
    global.window = originalWindow;
  });

  afterAll(() => {
    // Restore original window object
    global.window = originalWindow;
  });

  describe('isMobile', () => {
    it('returns true for mobile width (< 768px)', () => {
      mockWindow(767);
      expect(isMobile()).toBe(true);
    });

    it('returns false for tablet width (>= 768px)', () => {
      mockWindow(768);
      expect(isMobile()).toBe(false);
    });

    it('returns false for desktop width (>= 1024px)', () => {
      mockWindow(1024);
      expect(isMobile()).toBe(false);
    });

    it('accepts custom width parameter', () => {
      mockWindow(1000); // Set window width to something else
      expect(isMobile(500)).toBe(true);
      expect(isMobile(800)).toBe(false);
    });

    it('handles edge case at mobile breakpoint', () => {
      expect(isMobile(767)).toBe(true);
      expect(isMobile(768)).toBe(false);
    });

    it('handles SSR-like environment correctly', () => {
      // Test with explicit width parameters (simulates SSR where width is provided)
      expect(isMobile(400)).toBe(true);
      expect(isMobile(800)).toBe(false);
    });

    it('prioritizes custom width over window.innerWidth', () => {
      mockWindow(1200);
      expect(isMobile(400)).toBe(true);
    });
  });

  describe('isTablet', () => {
    it('returns true for tablet width (768px - 1023px)', () => {
      mockWindow(800);
      expect(isTablet()).toBe(true);
    });

    it('returns false for mobile width (< 768px)', () => {
      mockWindow(767);
      expect(isTablet()).toBe(false);
    });

    it('returns false for desktop width (>= 1024px)', () => {
      mockWindow(1024);
      expect(isTablet()).toBe(false);
    });

    it('accepts custom width parameter', () => {
      mockWindow(500); // Set window width to something else
      expect(isTablet(800)).toBe(true);
      expect(isTablet(1200)).toBe(false);
      expect(isTablet(600)).toBe(false);
    });

    it('handles edge cases at tablet breakpoints', () => {
      expect(isTablet(768)).toBe(true); // Min tablet width
      expect(isTablet(1023)).toBe(true); // Max tablet width
      expect(isTablet(767)).toBe(false); // Just below min
      expect(isTablet(1024)).toBe(false); // Just above max
    });

    it('handles SSR-like environment correctly', () => {
      // Test with explicit width parameters (simulates SSR where width is provided)
      expect(isTablet(800)).toBe(true);
      expect(isTablet(400)).toBe(false);
      expect(isTablet(1200)).toBe(false);
    });
  });

  describe('isDesktop', () => {
    it('returns true for desktop width (>= 1024px)', () => {
      mockWindow(1024);
      expect(isDesktop()).toBe(true);
    });

    it('returns false for mobile width (< 768px)', () => {
      mockWindow(767);
      expect(isDesktop()).toBe(false);
    });

    it('returns false for tablet width (768px - 1023px)', () => {
      mockWindow(800);
      expect(isDesktop()).toBe(false);
    });

    it('accepts custom width parameter', () => {
      mockWindow(500); // Set window width to something else
      expect(isDesktop(1200)).toBe(true);
      expect(isDesktop(800)).toBe(false);
    });

    it('handles edge case at desktop breakpoint', () => {
      expect(isDesktop(1023)).toBe(false);
      expect(isDesktop(1024)).toBe(true);
    });

    it('handles SSR-like environment correctly', () => {
      // In Jest, window is available, but we can test the fallback by providing width
      // Test the intended behavior: when there's no window.innerWidth, use provided width
      const desktopWidth = 1200;
      expect(isDesktop(desktopWidth)).toBe(true);
      
      const mobileWidth = 400;  
      expect(isDesktop(mobileWidth)).toBe(false);
    });

    it('handles large desktop screens', () => {
      expect(isDesktop(1920)).toBe(true);
      expect(isDesktop(2560)).toBe(true);
    });
  });

  describe('getCurrentBreakpoint', () => {
    it('returns "mobile" for mobile width (< 768px)', () => {
      mockWindow(767);
      expect(getCurrentBreakpoint()).toBe('mobile');
    });

    it('returns "tablet" for tablet width (768px - 1023px)', () => {
      mockWindow(800);
      expect(getCurrentBreakpoint()).toBe('tablet');
    });

    it('returns "desktop" for desktop width (>= 1024px)', () => {
      mockWindow(1024);
      expect(getCurrentBreakpoint()).toBe('desktop');
    });

    it('accepts custom width parameter', () => {
      mockWindow(1200); // Set window width to something else
      expect(getCurrentBreakpoint(500)).toBe('mobile');
      expect(getCurrentBreakpoint(800)).toBe('tablet');
      expect(getCurrentBreakpoint(1200)).toBe('desktop');
    });

    it('handles exact breakpoint boundaries', () => {
      expect(getCurrentBreakpoint(767)).toBe('mobile');
      expect(getCurrentBreakpoint(768)).toBe('tablet');
      expect(getCurrentBreakpoint(1023)).toBe('tablet');
      expect(getCurrentBreakpoint(1024)).toBe('desktop');
    });

    it('handles SSR-like environment correctly', () => {
      // Test with explicit width parameters (simulates SSR where width is provided)
      expect(getCurrentBreakpoint(400)).toBe('mobile');
      expect(getCurrentBreakpoint(800)).toBe('tablet');
      expect(getCurrentBreakpoint(1200)).toBe('desktop');
    });

    it('handles extreme values', () => {
      expect(getCurrentBreakpoint(0)).toBe('mobile');
      expect(getCurrentBreakpoint(10000)).toBe('desktop');
    });

    it('prioritizes custom width over window.innerWidth', () => {
      mockWindow(1200);
      expect(getCurrentBreakpoint(400)).toBe('mobile');
      expect(getCurrentBreakpoint(900)).toBe('tablet');
    });
  });

  describe('Tailwind CSS breakpoint consistency', () => {
    it('aligns with Tailwind CSS md breakpoint (768px)', () => {
      expect(isMobile(767)).toBe(true);
      expect(isMobile(768)).toBe(false);
      expect(isTablet(768)).toBe(true);
    });

    it('aligns with Tailwind CSS lg breakpoint (1024px)', () => {
      expect(isTablet(1023)).toBe(true);
      expect(isTablet(1024)).toBe(false);
      expect(isDesktop(1024)).toBe(true);
    });

    it('provides consistent breakpoint detection across functions', () => {
      const testWidths = [500, 768, 900, 1024, 1400];

      testWidths.forEach(width => {
        const breakpoint = getCurrentBreakpoint(width);
        
        if (breakpoint === 'mobile') {
          expect(isMobile(width)).toBe(true);
          expect(isTablet(width)).toBe(false);
          expect(isDesktop(width)).toBe(false);
        } else if (breakpoint === 'tablet') {
          expect(isMobile(width)).toBe(false);
          expect(isTablet(width)).toBe(true);
          expect(isDesktop(width)).toBe(false);
        } else if (breakpoint === 'desktop') {
          expect(isMobile(width)).toBe(false);
          expect(isTablet(width)).toBe(false);
          expect(isDesktop(width)).toBe(true);
        }
      });
    });
  });
});