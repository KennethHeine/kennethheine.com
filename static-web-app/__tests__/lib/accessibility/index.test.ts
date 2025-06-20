/**
 * @jest-environment jsdom
 */

import * as AccessibilityModule from '@/lib/accessibility';
import { hexToRgb, getContrastRatio, meetsWCAG_AA } from '@/lib/accessibility';

describe('Accessibility Module Index', () => {
  it('exports contrast utilities from index', () => {
    // Test that the main exports are available through the index
    expect(typeof AccessibilityModule.hexToRgb).toBe('function');
    expect(typeof AccessibilityModule.getContrastRatio).toBe('function');
    expect(typeof AccessibilityModule.meetsWCAG_AA).toBe('function');
    expect(typeof AccessibilityModule.getWCAGLevel).toBe('function');
    expect(typeof AccessibilityModule.testAllColorCombinations).toBe(
      'function'
    );
  });

  it('re-exports work correctly', () => {
    // Test that functions work the same when imported from index vs directly
    const directImportResult = hexToRgb('#ffffff');
    const indexImportResult = AccessibilityModule.hexToRgb('#ffffff');
    expect(directImportResult).toEqual(indexImportResult);

    const directContrastResult = getContrastRatio('#000000', '#ffffff');
    const indexContrastResult = AccessibilityModule.getContrastRatio(
      '#000000',
      '#ffffff'
    );
    expect(directContrastResult).toEqual(indexContrastResult);

    const directWCAGResult = meetsWCAG_AA('#000000', '#ffffff');
    const indexWCAGResult = AccessibilityModule.meetsWCAG_AA(
      '#000000',
      '#ffffff'
    );
    expect(directWCAGResult).toEqual(indexWCAGResult);
  });

  it('exports constants correctly', () => {
    expect(AccessibilityModule.THEME_COLORS).toBeDefined();
    expect(AccessibilityModule.COLOR_COMBINATIONS).toBeDefined();
    expect(Array.isArray(AccessibilityModule.COLOR_COMBINATIONS)).toBe(true);
  });
});
