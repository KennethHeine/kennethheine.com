/**
 * Theme and styling type definitions
 * Contains types for theme configuration, CSS variables, and styling system
 */

/**
 * Theme preference options
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Resolved theme (actual theme being used)
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme context interface
 */
export interface ThemeContextValue {
  /** Current theme preference */
  theme: Theme;
  /** Resolved theme (light/dark) */
  resolvedTheme: ResolvedTheme;
  /** Function to set theme */
  setTheme: (theme: Theme) => void;
  /** Function to toggle between light/dark */
  toggleTheme: () => void;
  /** Whether theme is being loaded */
  isLoading: boolean;
}

/**
 * CSS color scale interface
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Theme color palette interface
 */
export interface ThemeColors {
  /** Primary brand color */
  primary: ColorScale;
  /** Secondary accent color */
  secondary: ColorScale;
  /** Neutral gray colors */
  gray: ColorScale;
  /** Success/positive colors */
  success: ColorScale;
  /** Warning colors */
  warning: ColorScale;
  /** Error/danger colors */
  error: ColorScale;
  /** Info colors */
  info: ColorScale;
}

/**
 * Typography scale interface
 */
export interface TypographyScale {
  /** Font size in rem */
  fontSize: string;
  /** Line height */
  lineHeight: string;
  /** Letter spacing */
  letterSpacing?: string;
  /** Font weight */
  fontWeight?: string;
}

/**
 * Typography configuration interface
 */
export interface ThemeTypography {
  /** Font families */
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  /** Typography scales */
  scale: {
    xs: TypographyScale;
    sm: TypographyScale;
    base: TypographyScale;
    lg: TypographyScale;
    xl: TypographyScale;
    '2xl': TypographyScale;
    '3xl': TypographyScale;
    '4xl': TypographyScale;
    '5xl': TypographyScale;
    '6xl': TypographyScale;
    '7xl': TypographyScale;
    '8xl': TypographyScale;
    '9xl': TypographyScale;
  };
  /** Font weights */
  fontWeight: {
    thin: string;
    extralight: string;
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    extrabold: string;
    black: string;
  };
}

/**
 * Spacing scale interface
 */
export interface ThemeSpacing {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

/**
 * Breakpoint configuration interface
 */
export interface ThemeBreakpoints {
  /** Small screens (mobile) */
  sm: string;
  /** Medium screens (tablet) */
  md: string;
  /** Large screens (desktop) */
  lg: string;
  /** Extra large screens */
  xl: string;
  /** 2X large screens */
  '2xl': string;
}

/**
 * Border radius configuration interface
 */
export interface ThemeBorderRadius {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

/**
 * Shadow configuration interface
 */
export interface ThemeShadows {
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

/**
 * Animation configuration interface
 */
export interface ThemeAnimations {
  /** Animation durations */
  duration: {
    75: string;
    100: string;
    150: string;
    200: string;
    300: string;
    500: string;
    700: string;
    1000: string;
  };
  /** Timing functions */
  timingFunction: {
    linear: string;
    in: string;
    out: string;
    'in-out': string;
  };
}

/**
 * Complete theme configuration interface
 */
export interface ThemeConfig {
  /** Color palette */
  colors: ThemeColors;
  /** Typography settings */
  typography: ThemeTypography;
  /** Spacing scale */
  spacing: ThemeSpacing;
  /** Responsive breakpoints */
  breakpoints: ThemeBreakpoints;
  /** Border radius values */
  borderRadius: ThemeBorderRadius;
  /** Shadow definitions */
  shadows: ThemeShadows;
  /** Animation settings */
  animations: ThemeAnimations;
}

/**
 * CSS custom properties (CSS variables) interface
 */
export interface CSSCustomProperties {
  /** Primary color variables */
  '--color-primary': string;
  '--color-primary-50': string;
  '--color-primary-100': string;
  '--color-primary-200': string;
  '--color-primary-300': string;
  '--color-primary-400': string;
  '--color-primary-500': string;
  '--color-primary-600': string;
  '--color-primary-700': string;
  '--color-primary-800': string;
  '--color-primary-900': string;
  '--color-primary-950': string;
  
  /** Background color variables */
  '--color-background': string;
  '--color-foreground': string;
  '--color-surface': string;
  '--color-surface-secondary': string;
  
  /** Text color variables */
  '--color-text': string;
  '--color-text-secondary': string;
  '--color-text-muted': string;
  
  /** Border color variables */
  '--color-border': string;
  '--color-border-secondary': string;
  
  /** Additional custom properties */
  [key: `--${string}`]: string;
}

/**
 * Theme provider props interface
 */
export interface ThemeProviderProps {
  /** Child components */
  children: React.ReactNode;
  /** Default theme */
  defaultTheme?: Theme;
  /** Storage key for persistence */
  storageKey?: string;
  /** Disable transitions on theme change */
  disableTransitions?: boolean;
  /** Custom theme configuration */
  themes?: Partial<Record<ResolvedTheme, Partial<ThemeConfig>>>;
}

/**
 * Dark mode detection utilities
 */
export interface DarkModeUtils {
  /** Check if system prefers dark mode */
  prefersDark: () => boolean;
  /** Check if system prefers reduced motion */
  prefersReducedMotion: () => boolean;
  /** Check if system prefers high contrast */
  prefersHighContrast: () => boolean;
}

/**
 * Theme transition configuration
 */
export interface ThemeTransition {
  /** Transition duration */
  duration: string;
  /** Transition timing function */
  timingFunction: string;
  /** Properties to transition */
  properties: string[];
  /** Whether to disable transitions */
  disabled: boolean;
}