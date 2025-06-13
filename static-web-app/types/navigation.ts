/**
 * Navigation and routing type definitions
 * Contains types for navigation states, menu items, and routing utilities
 */

import type { ReactNode } from 'react';

/**
 * Basic navigation link interface
 */
export interface NavLink {
  /** Display text for the link */
  label: string;
  /** URL path or external link */
  href: string;
  /** Whether this link should open in a new tab */
  external?: boolean;
  /** Optional icon name or component */
  icon?: ReactNode;
  /** Whether this link is currently active */
  active?: boolean;
  /** Optional description for accessibility */
  description?: string;
  /** Optional keyboard shortcut */
  shortcut?: string;
}

/**
 * Navigation menu item with potential children
 */
export interface NavMenuItem extends NavLink {
  /** Child navigation items */
  children?: NavMenuItem[];
  /** Whether this item is expanded (for multi-level nav) */
  expanded?: boolean;
  /** Item type */
  type?: 'link' | 'button' | 'divider';
  /** Badge content */
  badge?: string | number;
  /** Whether item is disabled */
  disabled?: boolean;
}

/**
 * Main navigation configuration
 */
export interface MainNavigation {
  /** Primary navigation items */
  primary: NavMenuItem[];
  /** Secondary navigation items */
  secondary?: NavMenuItem[];
  /** Footer navigation items */
  footer?: NavMenuItem[];
  /** Social media links */
  social?: SocialLink[];
}

/**
 * Social media link interface
 */
export interface SocialLink {
  /** Platform name (e.g., 'twitter', 'linkedin', 'github') */
  platform: string;
  /** Display label */
  label: string;
  /** Full URL to profile */
  url: string;
  /** Optional icon component or class name */
  icon?: ReactNode;
  /** Platform brand color (hex) */
  color?: string;
  /** Username/handle */
  username?: string;
}

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /** Display text */
  label: string;
  /** Link URL (optional for current page) */
  href?: string;
  /** Whether this is the current page */
  current?: boolean;
  /** Optional icon */
  icon?: ReactNode;
}

/**
 * Mobile menu state interface
 */
export interface MobileMenuState {
  /** Whether the menu is open */
  isOpen: boolean;
  /** Function to open the menu */
  open: () => void;
  /** Function to close the menu */
  close: () => void;
  /** Function to toggle the menu */
  toggle: () => void;
  /** Currently active submenu */
  activeSubmenu?: string;
  /** Function to set active submenu */
  setActiveSubmenu: (id?: string) => void;
}

/**
 * Navigation context interface
 */
export interface NavigationContextValue {
  /** Current navigation state */
  currentPath: string;
  /** Main navigation items */
  navigation: MainNavigation;
  /** Mobile menu state */
  mobileMenu: MobileMenuState;
  /** Function to navigate programmatically */
  navigate: (href: string) => void;
  /** Function to check if path is active */
  isActive: (href: string) => boolean;
  /** Function to check if path matches pattern */
  matches: (pattern: string) => boolean;
}

/**
 * Route metadata interface
 */
export interface RouteMetadata {
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Keywords for SEO */
  keywords?: string[];
  /** Whether to index in search engines */
  noIndex?: boolean;
  /** Canonical URL */
  canonical?: string;
  /** Open Graph data */
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
  };
  /** Twitter card data */
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    image?: string;
  };
}

/**
 * Page navigation (prev/next) interface
 */
export interface PageNavigation {
  /** Previous page */
  previous?: {
    title: string;
    href: string;
    description?: string;
  };
  /** Next page */
  next?: {
    title: string;
    href: string;
    description?: string;
  };
}

/**
 * Pagination interface
 */
export interface PaginationConfig {
  /** Current page number (1-based) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items */
  totalItems: number;
  /** Items per page */
  itemsPerPage: number;
  /** Whether there's a previous page */
  hasPrevious: boolean;
  /** Whether there's a next page */
  hasNext: boolean;
  /** Base URL for pagination links */
  baseUrl: string;
  /** URL parameter name for page number */
  pageParam?: string;
}

/**
 * Search functionality interface
 */
export interface SearchConfig {
  /** Search query */
  query: string;
  /** Search results */
  results: SearchResult[];
  /** Whether search is loading */
  loading: boolean;
  /** Search error */
  error?: string;
  /** Function to perform search */
  search: (query: string) => void;
  /** Function to clear search */
  clear: () => void;
  /** Total number of results */
  totalResults: number;
}

/**
 * Search result interface
 */
export interface SearchResult {
  /** Unique identifier */
  id: string;
  /** Result title */
  title: string;
  /** Result description/excerpt */
  description: string;
  /** URL to the result */
  url: string;
  /** Result type */
  type: 'page' | 'post' | 'project' | 'other';
  /** Relevance score */
  score?: number;
  /** Highlighted text snippets */
  highlights?: string[];
  /** Additional metadata */
  metadata?: Record<string, any>;
}

/**
 * Table of contents item interface
 */
export interface TocItem {
  /** Heading text */
  title: string;
  /** Anchor link ID */
  id: string;
  /** Nesting level (1-6) */
  level: number;
  /** Child headings */
  children?: TocItem[];
  /** Whether this heading is currently active */
  active?: boolean;
}

/**
 * Site navigation configuration
 */
export interface SiteConfig {
  /** Site name */
  name: string;
  /** Site description */
  description: string;
  /** Base URL */
  url: string;
  /** Logo configuration */
  logo?: {
    text?: string;
    image?: string;
    width?: number;
    height?: number;
  };
  /** Main navigation */
  navigation: MainNavigation;
  /** Site metadata */
  metadata: RouteMetadata;
  /** Contact information */
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}