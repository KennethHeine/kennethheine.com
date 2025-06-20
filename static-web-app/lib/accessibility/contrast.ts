/**
 * Color contrast utilities for WCAG 2.1 AA compliance
 *
 * WCAG 2.1 AA Requirements:
 * - Normal text (< 18pt or < 14pt bold): 4.5:1 contrast ratio minimum
 * - Large text (≥ 18pt or ≥ 14pt bold): 3:1 contrast ratio minimum
 * - UI components and graphical objects: 3:1 contrast ratio minimum
 */

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace('#', '');

  // Support both 3 and 6 character hex codes
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char)
      .join('');
  }

  if (hex.length !== 6) {
    return null;
  }

  // Validate hex characters
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return null;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 specification
 */
export function getRelativeLuminance(rgb: {
  r: number;
  g: number;
  b: number;
}): number {
  const { r, g, b } = rgb;

  // Convert to sRGB
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  // Apply gamma correction
  const rLin =
    rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLin =
    gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLin =
    bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  // Calculate relative luminance
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    throw new Error(
      'Invalid color format. Use hex colors like #ffffff or #fff'
    );
  }

  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  // Ensure lighter color is in numerator
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG 2.1 AA standards
 */
export function meetsWCAG_AA(
  foreground: string,
  background: string,
  level: 'normal' | 'large' | 'ui' = 'normal'
): boolean {
  const ratio = getContrastRatio(foreground, background);

  switch (level) {
    case 'normal':
      return ratio >= 4.5;
    case 'large':
    case 'ui':
      return ratio >= 3.0;
    default:
      return ratio >= 4.5;
  }
}

/**
 * Get WCAG compliance level for a contrast ratio
 */
export function getWCAGLevel(ratio: number): 'AAA' | 'AA' | 'A' | 'FAIL' {
  if (ratio >= 7.0) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3.0) return 'A';
  return 'FAIL';
}

/**
 * Color palette from our theme tokens
 */
export const THEME_COLORS = {
  // Brand colors (Sky blue palette)
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0369a1', // Primary brand (WCAG 2.1 AA compliant)
    600: '#0284c7',
    700: '#0c5a87',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  // Success colors (Green)
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  },
  // Warning colors (Amber)
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
  },
  // Error colors (Red)
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
  // Gray scale (from Tailwind defaults)
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  // Base colors
  white: '#ffffff',
  black: '#000000',
} as const;

/**
 * Test color combinations used in our theme
 */
export interface ColorCombination {
  name: string;
  foreground: string;
  background: string;
  usage: string;
  textSize: 'normal' | 'large' | 'ui';
}

/**
 * Common color combinations used in the application
 */
export const COLOR_COMBINATIONS: ColorCombination[] = [
  // Light theme combinations
  {
    name: 'Primary text (light)',
    foreground: THEME_COLORS.gray[900],
    background: THEME_COLORS.white,
    usage: 'Main text on white background',
    textSize: 'normal',
  },
  {
    name: 'Secondary text (light)',
    foreground: THEME_COLORS.gray[600],
    background: THEME_COLORS.white,
    usage: 'Secondary text on white background',
    textSize: 'normal',
  },
  {
    name: 'Muted text (light)',
    foreground: THEME_COLORS.gray[500],
    background: THEME_COLORS.white,
    usage: 'Muted text on white background',
    textSize: 'normal',
  },
  {
    name: 'Brand text (light)',
    foreground: THEME_COLORS.brand[500],
    background: THEME_COLORS.white,
    usage: 'Brand colored text on white background',
    textSize: 'normal',
  },
  {
    name: 'Primary button (light)',
    foreground: THEME_COLORS.white,
    background: THEME_COLORS.brand[500],
    usage: 'White text on brand button',
    textSize: 'ui',
  },
  {
    name: 'Secondary button (light)',
    foreground: THEME_COLORS.gray[900],
    background: THEME_COLORS.gray[100],
    usage: 'Dark text on light button',
    textSize: 'ui',
  },

  // Dark theme combinations
  {
    name: 'Primary text (dark)',
    foreground: THEME_COLORS.white,
    background: THEME_COLORS.gray[900],
    usage: 'Main text on dark background',
    textSize: 'normal',
  },
  {
    name: 'Secondary text (dark)',
    foreground: THEME_COLORS.gray[300],
    background: THEME_COLORS.gray[900],
    usage: 'Secondary text on dark background',
    textSize: 'normal',
  },
  {
    name: 'Muted text (dark)',
    foreground: THEME_COLORS.gray[400],
    background: THEME_COLORS.gray[900],
    usage: 'Muted text on dark background',
    textSize: 'normal',
  },
  {
    name: 'Brand text (dark)',
    foreground: THEME_COLORS.brand[400],
    background: THEME_COLORS.gray[900],
    usage: 'Brand colored text on dark background',
    textSize: 'normal',
  },
  {
    name: 'Primary button (dark)',
    foreground: THEME_COLORS.white,
    background: THEME_COLORS.brand[950],
    usage: 'White text on dark brand button',
    textSize: 'ui',
  },
  {
    name: 'Secondary button (dark)',
    foreground: THEME_COLORS.white,
    background: THEME_COLORS.gray[800],
    usage: 'White text on dark button',
    textSize: 'ui',
  },

  // Card backgrounds
  {
    name: 'Card text (light)',
    foreground: THEME_COLORS.gray[900],
    background: THEME_COLORS.gray[50],
    usage: 'Text on light card background',
    textSize: 'normal',
  },
  {
    name: 'Card text (dark)',
    foreground: THEME_COLORS.white,
    background: THEME_COLORS.gray[800],
    usage: 'Text on dark card background',
    textSize: 'normal',
  },
];

/**
 * Test all color combinations for WCAG compliance
 */
export function testAllColorCombinations(): Array<{
  combination: ColorCombination;
  ratio: number;
  passes: boolean;
  level: string;
}> {
  return COLOR_COMBINATIONS.map(combination => {
    const ratio = getContrastRatio(
      combination.foreground,
      combination.background
    );
    const passes = meetsWCAG_AA(
      combination.foreground,
      combination.background,
      combination.textSize
    );
    const level = getWCAGLevel(ratio);

    return {
      combination,
      ratio: Math.round(ratio * 100) / 100, // Round to 2 decimal places
      passes,
      level,
    };
  });
}
