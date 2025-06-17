/**
 * Centralized type exports for the application
 * This file re-exports all types from their respective modules for easier importing
 *
 * Note: Some utility types use 'any' intentionally for TypeScript type inference
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

// Blog-related types
export type {
  BlogPost,
  BlogPostFrontmatter,
  BlogPostPreview,
  PaginationInfo,
  PaginatedPosts,
  LegacyPaginatedPosts,
  BlogTag,
} from './blog';

// Common/shared types (keeping for backward compatibility)
export type {
  NavLink,
  SocialLink,
  SEOData,
  Skill,
  Project,
  ContactForm,
  APIResponse,
  Theme,
  LoadingState,
  ComponentProps,
} from './common';

// React 19 specific types
export type {
  TransitionState,
  UseTransitionReturn,
  OptimisticUpdateOptions,
  UseOptimisticReturn,
  OptimisticListItem,
  UseOptimisticListReturn,
  FormFieldErrors,
  UseOptimisticFormReturn,
  ServerComponentProps,
  ServerActionResult,
  FormActionState,
  UseFormStateReturn,
  SuspenseError,
  ErrorBoundaryState,
  AsyncComponentProps,
} from './react-19';

// UI component types
export type {
  BaseComponentProps,
  ComponentSize,
  ComponentVariant,
  ButtonProps,
  TimelineItemData,
  TimelineItemProps,
  ThemeToggleProps,
  ContainerProps,
  SkillBadgeProps,
  MobileMenuProps,
  LayoutProps,
  IconProps,
  CardProps,
  BadgeProps,
  AvatarProps,
  FormFieldProps,
  InputProps,
  TextareaProps,
  ModalProps,
  TooltipProps,
  LoadingSpinnerProps,
  SelectOption,
} from './ui';

// Theme and styling types
export type {
  ResolvedTheme,
  ThemeContextValue,
  ColorScale,
  ThemeColors,
  TypographyScale,
  ThemeTypography,
  ThemeSpacing,
  ThemeBreakpoints,
  ThemeBorderRadius,
  ThemeShadows,
  ThemeAnimations,
  ThemeConfig,
  CSSCustomProperties,
  ThemeProviderProps,
  DarkModeUtils,
  ThemeTransition,
} from './theme';

// Navigation and routing types
export type {
  NavMenuItem,
  MainNavigation,
  BreadcrumbItem,
  MobileMenuState,
  NavigationContextValue,
  RouteMetadata,
  PageNavigation,
  PaginationConfig,
  SearchConfig,
  SearchResult,
  TocItem,
  SiteConfig,
} from './navigation';

// API and data fetching types
export type {
  APIResponseMeta,
  RateLimitInfo,
  PaginationMeta,
  APIError,
  HTTPStatus,
  HTTPMethod,
  APIRequestConfig,
  ContactFormSubmission,
  ContactFormResponse,
  NewsletterSubscription,
  BlogSearchRequest,
  BlogSearchResponse,
  BlogSearchResult,
  AnalyticsEvent,
  CacheConfig,
  UseFetchConfig,
  UseFetchReturn,
} from './api';

// Re-export theme type with proper name to avoid conflicts
export type { Theme as ThemePreference } from './theme';

/**
 * Utility type for extracting array element type
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

/**
 * Utility type for making specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type for making specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * Utility type for deep partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Utility type for deep required
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Utility type for extracting function parameters
 */
export type Parameters<T> = T extends (...args: infer P) => any ? P : never;

/**
 * Utility type for extracting function return type
 */
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

/**
 * Utility type for creating a union of object values
 */
export type ValueOf<T> = T[keyof T];

/**
 * Utility type for creating a strict object type
 */
export type Exact<T, U extends T = T> = T extends any
  ? U extends T
    ? U
    : never
  : never;

/**
 * Utility type for nullable values
 */
export type Nullable<T> = T | null;

/**
 * Utility type for optional nullable values
 */
export type Maybe<T> = T | null | undefined;

/**
 * Utility type for async function return types
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * Utility type for component ref types
 */
export type ComponentRef<T> =
  T extends React.ComponentType<any> ? React.ComponentRef<T> : never;

/**
 * Utility type for HTML element props
 */
export type HTMLElementProps<T extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[T];

/**
 * Utility type for polymorphic component props
 */
export type PolymorphicProps<T = 'div'> = {
  as?: T;
} & (T extends keyof React.JSX.IntrinsicElements
  ? React.JSX.IntrinsicElements[T]
  : {});
