/**
 * @jest-environment jsdom
 */

import {
  hexToRgb,
  getRelativeLuminance,
  getContrastRatio,
  meetsWCAG_AA,
  getWCAGLevel,
  THEME_COLORS,
  COLOR_COMBINATIONS,
  testAllColorCombinations,
} from '@/lib/accessibility/contrast';

describe('Color Contrast Utilities', () => {
  describe('hexToRgb', () => {
    it('converts 6-digit hex to RGB', () => {
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#ff5500')).toEqual({ r: 255, g: 85, b: 0 });
    });

    it('converts 3-digit hex to RGB', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb('#f50')).toEqual({ r: 255, g: 85, b: 0 });
    });

    it('handles hex without # prefix', () => {
      expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('returns null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull();
      expect(hexToRgb('#xyz')).toBeNull();
      expect(hexToRgb('#12345')).toBeNull();
    });
  });

  describe('getRelativeLuminance', () => {
    it('calculates luminance for pure colors', () => {
      // White should have luminance of 1
      expect(getRelativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(
        1,
        5
      );

      // Black should have luminance of 0
      expect(getRelativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0, 5);
    });

    it('calculates luminance for gray colors', () => {
      // Medium gray should have luminance around 0.18
      const grayLuminance = getRelativeLuminance({ r: 128, g: 128, b: 128 });
      expect(grayLuminance).toBeGreaterThan(0.1);
      expect(grayLuminance).toBeLessThan(0.3);
    });

    it('calculates luminance for brand colors', () => {
      const brandRgb = hexToRgb(THEME_COLORS.brand[500]);
      expect(brandRgb).not.toBeNull();
      if (brandRgb) {
        const luminance = getRelativeLuminance(brandRgb);
        expect(luminance).toBeGreaterThan(0);
        expect(luminance).toBeLessThan(1);
      }
    });
  });

  describe('getContrastRatio', () => {
    it('calculates maximum contrast (white on black)', () => {
      const ratio = getContrastRatio('#ffffff', '#000000');
      expect(ratio).toBeCloseTo(21, 1);
    });

    it('calculates minimum contrast (same color)', () => {
      const ratio = getContrastRatio('#ffffff', '#ffffff');
      expect(ratio).toBeCloseTo(1, 1);
    });

    it('calculates brand color contrast', () => {
      const ratio = getContrastRatio(
        THEME_COLORS.brand[500],
        THEME_COLORS.white
      );
      expect(ratio).toBeGreaterThan(1);
      expect(ratio).toBeLessThan(21);
    });

    it('throws error for invalid colors', () => {
      expect(() => getContrastRatio('invalid', '#ffffff')).toThrow();
      expect(() => getContrastRatio('#ffffff', 'invalid')).toThrow();
    });

    it('handles different hex formats', () => {
      const ratio1 = getContrastRatio('#fff', '#000');
      const ratio2 = getContrastRatio('#ffffff', '#000000');
      expect(ratio1).toBeCloseTo(ratio2, 1);
    });
  });

  describe('meetsWCAG_AA', () => {
    it('validates normal text contrast (4.5:1 minimum)', () => {
      // High contrast should pass
      expect(meetsWCAG_AA('#000000', '#ffffff', 'normal')).toBe(true);

      // Low contrast should fail
      expect(meetsWCAG_AA('#cccccc', '#ffffff', 'normal')).toBe(false);
    });

    it('validates large text contrast (3:1 minimum)', () => {
      // Medium contrast should pass for large text
      const mediumContrast = getContrastRatio('#666666', '#ffffff');
      const passesLarge = mediumContrast >= 3.0;
      expect(meetsWCAG_AA('#666666', '#ffffff', 'large')).toBe(passesLarge);
    });

    it('validates UI component contrast (3:1 minimum)', () => {
      // UI components have same requirement as large text
      const uiContrast = getContrastRatio('#777777', '#ffffff');
      const passesUI = uiContrast >= 3.0;
      expect(meetsWCAG_AA('#777777', '#ffffff', 'ui')).toBe(passesUI);
    });

    it('defaults to normal text standard', () => {
      const withoutLevel = meetsWCAG_AA('#000000', '#ffffff');
      const withNormalLevel = meetsWCAG_AA('#000000', '#ffffff', 'normal');
      expect(withoutLevel).toBe(withNormalLevel);
    });
  });

  describe('getWCAGLevel', () => {
    it('identifies AAA level (7:1 or higher)', () => {
      expect(getWCAGLevel(7.0)).toBe('AAA');
      expect(getWCAGLevel(15.0)).toBe('AAA');
      expect(getWCAGLevel(21.0)).toBe('AAA');
    });

    it('identifies AA level (4.5:1 to 7:1)', () => {
      expect(getWCAGLevel(4.5)).toBe('AA');
      expect(getWCAGLevel(5.5)).toBe('AA');
      expect(getWCAGLevel(6.9)).toBe('AA');
    });

    it('identifies A level (3:1 to 4.5:1)', () => {
      expect(getWCAGLevel(3.0)).toBe('A');
      expect(getWCAGLevel(4.0)).toBe('A');
      expect(getWCAGLevel(4.4)).toBe('A');
    });

    it('identifies failure (below 3:1)', () => {
      expect(getWCAGLevel(1.0)).toBe('FAIL');
      expect(getWCAGLevel(2.5)).toBe('FAIL');
      expect(getWCAGLevel(2.9)).toBe('FAIL');
    });
  });

  describe('THEME_COLORS', () => {
    it('contains all required color palettes', () => {
      expect(THEME_COLORS.brand).toBeDefined();
      expect(THEME_COLORS.success).toBeDefined();
      expect(THEME_COLORS.warning).toBeDefined();
      expect(THEME_COLORS.error).toBeDefined();
      expect(THEME_COLORS.gray).toBeDefined();
      expect(THEME_COLORS.white).toBeDefined();
      expect(THEME_COLORS.black).toBeDefined();
    });

    it('has valid hex color values', () => {
      // Test a few key colors
      expect(hexToRgb(THEME_COLORS.brand[500])).not.toBeNull();
      expect(hexToRgb(THEME_COLORS.gray[900])).not.toBeNull();
      expect(hexToRgb(THEME_COLORS.white)).not.toBeNull();
      expect(hexToRgb(THEME_COLORS.black)).not.toBeNull();
    });

    it('has proper color scale progression', () => {
      // Darker numbers should have lower luminance (darker colors)
      const brand50Rgb = hexToRgb(THEME_COLORS.brand[50]);
      const brand500Rgb = hexToRgb(THEME_COLORS.brand[500]);
      const brand950Rgb = hexToRgb(THEME_COLORS.brand[950]);

      expect(brand50Rgb).not.toBeNull();
      expect(brand500Rgb).not.toBeNull();
      expect(brand950Rgb).not.toBeNull();

      if (brand50Rgb && brand500Rgb && brand950Rgb) {
        const brand50Lum = getRelativeLuminance(brand50Rgb);
        const brand500Lum = getRelativeLuminance(brand500Rgb);
        const brand950Lum = getRelativeLuminance(brand950Rgb);

        expect(brand50Lum).toBeGreaterThan(brand500Lum);
        expect(brand500Lum).toBeGreaterThan(brand950Lum);
      }
    });
  });

  describe('COLOR_COMBINATIONS', () => {
    it('contains combinations for both light and dark themes', () => {
      const lightCombinations = COLOR_COMBINATIONS.filter(c =>
        c.name.includes('light')
      );
      const darkCombinations = COLOR_COMBINATIONS.filter(c =>
        c.name.includes('dark')
      );

      expect(lightCombinations.length).toBeGreaterThan(0);
      expect(darkCombinations.length).toBeGreaterThan(0);
    });

    it('includes different text sizes', () => {
      const normalText = COLOR_COMBINATIONS.filter(
        c => c.textSize === 'normal'
      );
      const uiElements = COLOR_COMBINATIONS.filter(c => c.textSize === 'ui');

      expect(normalText.length).toBeGreaterThan(0);
      expect(uiElements.length).toBeGreaterThan(0);
      // Large text may be 0 since we test UI elements instead
    });

    it('has valid color values', () => {
      COLOR_COMBINATIONS.forEach(combination => {
        expect(hexToRgb(combination.foreground)).not.toBeNull();
        expect(hexToRgb(combination.background)).not.toBeNull();
      });
    });
  });

  describe('testAllColorCombinations', () => {
    let results: ReturnType<typeof testAllColorCombinations>;

    beforeAll(() => {
      results = testAllColorCombinations();
    });

    it('tests all defined color combinations', () => {
      expect(results).toHaveLength(COLOR_COMBINATIONS.length);
    });

    it('provides contrast ratio for each combination', () => {
      results.forEach(result => {
        expect(result.ratio).toBeGreaterThan(0);
        expect(result.ratio).toBeLessThanOrEqual(21);
      });
    });

    it('indicates pass/fail status for each combination', () => {
      results.forEach(result => {
        expect(typeof result.passes).toBe('boolean');
      });
    });

    it('provides WCAG level for each combination', () => {
      results.forEach(result => {
        expect(['AAA', 'AA', 'A', 'FAIL']).toContain(result.level);
      });
    });

    describe('WCAG 2.1 AA Compliance Testing', () => {
      it('primary text combinations meet AA standard', () => {
        const primaryTextLight = results.find(
          r => r.combination.name === 'Primary text (light)'
        );
        const primaryTextDark = results.find(
          r => r.combination.name === 'Primary text (dark)'
        );

        expect(primaryTextLight?.passes).toBe(true);
        expect(primaryTextDark?.passes).toBe(true);
      });

      it('brand text has sufficient contrast', () => {
        const brandTextLight = results.find(
          r => r.combination.name === 'Brand text (light)'
        );
        const brandTextDark = results.find(
          r => r.combination.name === 'Brand text (dark)'
        );

        // These should at least meet AA standard (4.5:1 for normal text)
        expect(brandTextLight?.ratio).toBeGreaterThanOrEqual(4.5);
        expect(brandTextDark?.ratio).toBeGreaterThanOrEqual(4.5);
      });

      it('button text meets UI component standards', () => {
        const primaryButtonLight = results.find(
          r => r.combination.name === 'Primary button (light)'
        );
        const primaryButtonDark = results.find(
          r => r.combination.name === 'Primary button (dark)'
        );

        // UI components need 3:1 minimum
        expect(primaryButtonLight?.ratio).toBeGreaterThanOrEqual(3.0);
        expect(primaryButtonDark?.ratio).toBeGreaterThanOrEqual(3.0);
      });

      it('secondary text maintains readability', () => {
        const secondaryTextLight = results.find(
          r => r.combination.name === 'Secondary text (light)'
        );
        const secondaryTextDark = results.find(
          r => r.combination.name === 'Secondary text (dark)'
        );

        // Secondary text should still meet AA standard
        expect(secondaryTextLight?.passes).toBe(true);
        expect(secondaryTextDark?.passes).toBe(true);
      });

      it('reports any failing combinations', () => {
        const failingCombinations = results.filter(r => !r.passes);

        // Log failing combinations for debugging
        if (failingCombinations.length > 0) {
          console.log('Failing WCAG 2.1 AA combinations:');
          failingCombinations.forEach(fail => {
            console.log(
              `  - ${fail.combination.name}: ${fail.ratio}:1 (needs ${fail.combination.textSize === 'normal' ? '4.5' : '3.0'}:1)`
            );
          });
        }

        // All combinations should pass for WCAG 2.1 AA compliance
        expect(failingCombinations).toHaveLength(0);
      });

      it('provides detailed contrast documentation', () => {
        // This test documents all contrast ratios for reference
        console.log('\n=== WCAG 2.1 AA Contrast Analysis ===');

        const lightTheme = results.filter(r =>
          r.combination.name.includes('light')
        );
        const darkTheme = results.filter(r =>
          r.combination.name.includes('dark')
        );

        console.log('\nLight Theme:');
        lightTheme.forEach(result => {
          const status = result.passes ? '✅' : '❌';
          console.log(
            `  ${status} ${result.combination.name}: ${result.ratio}:1 (${result.level})`
          );
        });

        console.log('\nDark Theme:');
        darkTheme.forEach(result => {
          const status = result.passes ? '✅' : '❌';
          console.log(
            `  ${status} ${result.combination.name}: ${result.ratio}:1 (${result.level})`
          );
        });

        console.log('\n=== End Contrast Analysis ===\n');

        // This test always passes - it's for documentation
        expect(true).toBe(true);
      });
    });
  });
});
