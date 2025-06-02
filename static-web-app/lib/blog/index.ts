// Export blog utility functions
export * from '../blog';
// Re-export blog-new with different names to avoid conflicts
import * as BlogNew from '../blog-new';
export { BlogNew };
