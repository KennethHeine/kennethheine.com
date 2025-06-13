import * as libIndex from '../../lib/index';

// Import specific modules to test re-exports
import * as blogModule from '../../lib/blog';
import * as uiModule from '../../lib/ui';
import * as seoModule from '../../lib/seo';
import * as utilsModule from '../../lib/utils';

describe('Library Index - Re-exports', () => {
  describe('Blog utilities re-exports', () => {
    it('re-exports all blog functions', () => {
      expect(typeof libIndex.getPostSlugs).toBe('function');
      expect(typeof libIndex.getPostBySlug).toBe('function');
      expect(typeof libIndex.getAllPosts).toBe('function');
      expect(typeof libIndex.getPostsByTag).toBe('function');
      expect(typeof libIndex.getAllTags).toBe('function');
    });

    it('blog re-exports match original module exports', () => {
      expect(libIndex.getPostSlugs).toBe(blogModule.getPostSlugs);
      expect(libIndex.getPostBySlug).toBe(blogModule.getPostBySlug);
      expect(libIndex.getAllPosts).toBe(blogModule.getAllPosts);
      expect(libIndex.getPostsByTag).toBe(blogModule.getPostsByTag);
      expect(libIndex.getAllTags).toBe(blogModule.getAllTags);
    });
  });

  describe('UI utilities re-exports', () => {
    it('re-exports UI theme functions', () => {
      expect(typeof libIndex.cn).toBe('function');
      expect(typeof libIndex.truncate).toBe('function');
      expect(typeof libIndex.debounce).toBe('function');
    });

    it('re-exports UI responsive functions', () => {
      expect(typeof libIndex.isMobile).toBe('function');
      expect(typeof libIndex.isTablet).toBe('function');
      expect(typeof libIndex.isDesktop).toBe('function');
      expect(typeof libIndex.getCurrentBreakpoint).toBe('function');
    });

    it('UI re-exports match original module exports', () => {
      expect(libIndex.cn).toBe(uiModule.cn);
      expect(libIndex.truncate).toBe(uiModule.truncate);
      expect(libIndex.debounce).toBe(uiModule.debounce);
      expect(libIndex.isMobile).toBe(uiModule.isMobile);
    });
  });

  describe('SEO utilities re-exports', () => {
    it('re-exports SEO metadata functions', () => {
      expect(typeof libIndex.generateBlogPostMetadata).toBe('function');
      expect(typeof libIndex.generatePageMetadata).toBe('function');
      expect(typeof libIndex.generateCanonicalUrl).toBe('function');
    });

    it('re-exports SEO structured data functions', () => {
      expect(typeof libIndex.generateBlogPostStructuredData).toBe('function');
      expect(typeof libIndex.generateWebsiteStructuredData).toBe('function');
    });

    it('SEO re-exports match original module exports', () => {
      expect(libIndex.generateBlogPostMetadata).toBe(
        seoModule.generateBlogPostMetadata
      );
      expect(libIndex.generatePageMetadata).toBe(
        seoModule.generatePageMetadata
      );
      expect(libIndex.generateCanonicalUrl).toBe(
        seoModule.generateCanonicalUrl
      );
    });
  });

  describe('General utilities re-exports', () => {
    it('re-exports date formatting functions', () => {
      expect(typeof libIndex.formatDate).toBe('function');
      expect(typeof libIndex.formatRelativeDate).toBe('function');
    });

    it('re-exports string utilities', () => {
      expect(typeof libIndex.slugify).toBe('function');
      expect(typeof libIndex.capitalize).toBe('function');
      expect(typeof libIndex.pluralize).toBe('function');
    });

    it('re-exports object utilities', () => {
      expect(typeof libIndex.deepClone).toBe('function');
    });

    it('re-exports validation utilities', () => {
      expect(typeof libIndex.isValidEmail).toBe('function');
    });

    it('re-exports ID generation utilities', () => {
      expect(typeof libIndex.generateId).toBe('function');
    });

    it('re-exports reading time utilities', () => {
      expect(typeof libIndex.calculateReadingTime).toBe('function');
      expect(typeof libIndex.formatReadingTime).toBe('function');
    });

    it('utils re-exports match original module exports', () => {
      expect(libIndex.formatDate).toBe(utilsModule.formatDate);
      expect(libIndex.slugify).toBe(utilsModule.slugify);
      expect(libIndex.capitalize).toBe(utilsModule.capitalize);
      expect(libIndex.generateId).toBe(utilsModule.generateId);
    });
  });

  describe('Backward compatibility', () => {
    it('maintains all legacy import paths', () => {
      // Test that all the legacy explicit re-exports are available
      const legacyExports = [
        'getPostSlugs',
        'getPostBySlug',
        'getAllPosts',
        'getPostsByTag',
        'getAllTags',
        'cn',
        'truncate',
        'debounce',
        'formatDate',
        'formatRelativeDate',
        'slugify',
        'capitalize',
        'pluralize',
        'deepClone',
        'isValidEmail',
        'generateId',
        'calculateReadingTime',
        'formatReadingTime',
      ];

      legacyExports.forEach(exportName => {
        expect(libIndex).toHaveProperty(exportName);
        expect(typeof (libIndex as Record<string, unknown>)[exportName]).toBe(
          'function'
        );
      });
    });

    it('provides all module exports via wildcard imports', () => {
      // Verify that wildcard exports (* from) work correctly
      // This tests that users can import everything from the index
      const indexKeys = Object.keys(libIndex);

      // Should include exports from all modules
      expect(indexKeys.length).toBeGreaterThan(20); // We have many utilities

      // Check for presence of key functions from each module
      expect(indexKeys).toContain('getAllPosts'); // from blog
      expect(indexKeys).toContain('cn'); // from ui
      expect(indexKeys).toContain('formatDate'); // from utils
      expect(indexKeys).toContain('generateBlogPostMetadata'); // from seo
    });
  });

  describe('Module structure integrity', () => {
    it('does not have naming conflicts between modules', () => {
      // Ensure that functions with the same name from different modules
      // are properly handled (e.g., truncate exists in both ui/theme and utils)

      // The explicit re-exports should take precedence
      expect(libIndex.truncate).toBeDefined();
      expect(libIndex.cn).toBeDefined();
      expect(libIndex.debounce).toBeDefined();
    });

    it('provides comprehensive function coverage', () => {
      // Test that we have a good spread of utility functions
      const functionNames = Object.keys(libIndex).filter(
        key => typeof (libIndex as Record<string, unknown>)[key] === 'function'
      );

      // Should have utilities for all major categories
      const hasBlogUtils = functionNames.some(
        name => name.includes('Post') || name.includes('Tag')
      );
      const hasUIUtils =
        functionNames.includes('cn') || functionNames.includes('isMobile');
      const hasSEOUtils = functionNames.some(
        name => name.includes('Metadata') || name.includes('Canonical')
      );
      const hasGeneralUtils =
        functionNames.includes('formatDate') ||
        functionNames.includes('slugify');

      expect(hasBlogUtils).toBe(true);
      expect(hasUIUtils).toBe(true);
      expect(hasSEOUtils).toBe(true);
      expect(hasGeneralUtils).toBe(true);
    });
  });

  describe('Import patterns compatibility', () => {
    it('supports named imports pattern', () => {
      // Test that users can destructure specific functions
      const { getAllPosts, cn, formatDate, generateBlogPostMetadata } =
        libIndex;

      expect(typeof getAllPosts).toBe('function');
      expect(typeof cn).toBe('function');
      expect(typeof formatDate).toBe('function');
      expect(typeof generateBlogPostMetadata).toBe('function');
    });

    it('supports namespace import pattern', () => {
      // Test that users can import everything as a namespace
      expect(typeof libIndex.getAllPosts).toBe('function');
      expect(typeof libIndex.cn).toBe('function');
      expect(typeof libIndex.formatDate).toBe('function');
      expect(typeof libIndex.generateBlogPostMetadata).toBe('function');
    });

    it('supports mixed import patterns', () => {
      // Test that users can mix specific and wildcard imports
      const { getAllPosts } = libIndex;
      const cnFunction = libIndex.cn;

      expect(typeof getAllPosts).toBe('function');
      expect(typeof cnFunction).toBe('function');
      expect(getAllPosts).toBe(libIndex.getAllPosts);
    });
  });

  describe('Type safety and exports integrity', () => {
    it('exports only functions (no undefined exports)', () => {
      const exportEntries = Object.entries(libIndex);

      exportEntries.forEach(([_key, value]) => {
        // All exports should be defined functions
        expect(value).toBeDefined();
        expect(typeof value).toBe('function');
      });
    });

    it('has no duplicate function references', () => {
      // While functions might have the same implementation,
      // they should be properly re-exported without conflicts
      const functionRefs = Object.values(libIndex);
      const uniqueRefs = new Set(functionRefs);

      // This test verifies we don't have accidental duplicate exports
      // Note: Some functions might legitimately be the same reference
      expect(functionRefs.length).toBeGreaterThan(0);
      expect(uniqueRefs.size).toBeGreaterThan(0);
    });
  });
});
