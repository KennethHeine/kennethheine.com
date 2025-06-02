// --- file: types/common.ts ---
/**
 * Common type definitions used across the application
 * These types provide reusable interfaces for consistent data structures
 */

// Navigation link interface
export interface NavLink {
  /** Display text for the link */
  label: string
  
  /** URL path or external link */
  href: string
  
  /** Whether this link should open in a new tab */
  external?: boolean
  
  /** Optional icon name or component */
  icon?: string
  
  /** Whether this link is currently active */
  active?: boolean
}

// Social media link interface
export interface SocialLink {
  /** Platform name (e.g., 'twitter', 'linkedin', 'github') */
  platform: string
  
  /** Display label */
  label: string
  
  /** Full URL to profile */
  url: string
  
  /** Optional icon component or class name */
  icon?: string
  
  /** Platform brand color (hex) */
  color?: string
}

// SEO metadata interface
export interface SEOData {
  /** Page title */
  title: string
  
  /** Meta description */
  description: string
  
  /** Canonical URL */
  canonical?: string
  
  /** Open Graph image URL */
  image?: string
  
  /** Open Graph type */
  type?: 'website' | 'article' | 'profile'
  
  /** Article specific data */
  article?: {
    author?: string
    publishedTime?: string
    modifiedTime?: string
    tags?: string[]
  }
  
  /** Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  
  /** Additional meta tags */
  additionalMetaTags?: Array<{
    name?: string
    property?: string
    content: string
  }>
}

// Skill/Technology interface
export interface Skill {
  /** Skill name */
  name: string
  
  /** Skill category */
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'other'
  
  /** Proficiency level (1-5) */
  level: 1 | 2 | 3 | 4 | 5
  
  /** Optional icon or logo */
  icon?: string
  
  /** Optional description */
  description?: string
  
  /** Years of experience */
  experience?: number
}

// Project interface
export interface Project {
  /** Unique project identifier */
  id: string
  
  /** Project title */
  title: string
  
  /** Project description */
  description: string
  
  /** Array of technologies used */
  technologies: string[]
  
  /** Live demo URL */
  demoUrl?: string
  
  /** Source code URL */
  sourceUrl?: string
  
  /** Project image/screenshot */
  image?: string
  
  /** Project category */
  category: 'web' | 'mobile' | 'desktop' | 'library' | 'other'
  
  /** Project status */
  status: 'planning' | 'in-progress' | 'completed' | 'archived'
  
  /** Whether to feature this project */
  featured?: boolean
  
  /** Project start date */
  startDate?: string
  
  /** Project completion date */
  endDate?: string
}

// Contact form data interface
export interface ContactForm {
  /** Sender's name */
  name: string
  
  /** Sender's email */
  email: string
  
  /** Message subject */
  subject: string
  
  /** Message content */
  message: string
  
  /** Optional company/organization */
  company?: string
  
  /** Optional phone number */
  phone?: string
}

// API response interface
export interface APIResponse<T = unknown> {
  /** Whether the request was successful */
  success: boolean
  
  /** Response data */
  data?: T
  
  /** Error message if request failed */
  error?: string
  
  /** Additional metadata */
  meta?: {
    timestamp: string
    requestId?: string
    [key: string]: unknown
  }
}

// Loading state type
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Generic component props interface
export interface ComponentProps {
  /** Optional CSS class name */
  className?: string
  
  /** Optional inline styles */
  style?: React.CSSProperties
  
  /** Optional test ID for testing */
  testId?: string
  
  /** Optional children elements */
  children?: React.ReactNode
}
