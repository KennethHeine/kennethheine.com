// Export all utility functions
export * from './utils';
// Export blog-related utilities with namespaces to avoid conflicts
import * as BlogNew from './blog-new';
import * as Blog from './blog';

export { BlogNew, Blog };

// Export specific functions that are used throughout the app
export { formatDate, cn } from './utils';
export { getAllPosts, getPostBySlug } from './blog';
