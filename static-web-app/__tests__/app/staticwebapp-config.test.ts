/**
 * Tests for Azure Static Web App configuration and security headers
 */

import * as fs from 'fs';
import * as path from 'path';

// Load the staticwebapp.config.json file
const configPath = path.join(__dirname, '../../staticwebapp.config.json');
const configContent = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configContent);

describe('Static Web App Configuration', () => {
  describe('Configuration File Structure', () => {
    it('should have valid JSON structure', () => {
      expect(() => JSON.parse(configContent)).not.toThrow();
    });

    it('should contain required configuration sections', () => {
      expect(config).toHaveProperty('navigationFallback');
      expect(config).toHaveProperty('responseOverrides');
      expect(config).toHaveProperty('globalHeaders');
      expect(config).toHaveProperty('routes');
    });

    it('should have valid navigation fallback configuration', () => {
      expect(config.navigationFallback).toHaveProperty('rewrite');
      expect(config.navigationFallback).toHaveProperty('exclude');
      expect(config.navigationFallback.rewrite).toBe('/404.html');
      expect(Array.isArray(config.navigationFallback.exclude)).toBe(true);
    });

    it('should have 404 response override', () => {
      expect(config.responseOverrides).toHaveProperty('404');
      expect(config.responseOverrides['404'].rewrite).toBe('/404.html');
    });
  });

  describe('Security Headers Configuration', () => {
    it('should have globalHeaders section', () => {
      expect(config).toHaveProperty('globalHeaders');
      expect(typeof config.globalHeaders).toBe('object');
    });

    it('should configure HSTS (Strict-Transport-Security)', () => {
      expect(config.globalHeaders).toHaveProperty('Strict-Transport-Security');
      expect(config.globalHeaders['Strict-Transport-Security']).toBe(
        'max-age=31536000; includeSubDomains'
      );
    });

    it('should configure X-Content-Type-Options', () => {
      expect(config.globalHeaders).toHaveProperty('X-Content-Type-Options');
      expect(config.globalHeaders['X-Content-Type-Options']).toBe('nosniff');
    });

    it('should configure X-Frame-Options', () => {
      expect(config.globalHeaders).toHaveProperty('X-Frame-Options');
      expect(config.globalHeaders['X-Frame-Options']).toBe('DENY');
    });

    it('should configure X-XSS-Protection', () => {
      expect(config.globalHeaders).toHaveProperty('X-XSS-Protection');
      expect(config.globalHeaders['X-XSS-Protection']).toBe('1; mode=block');
    });

    it('should configure Referrer-Policy', () => {
      expect(config.globalHeaders).toHaveProperty('Referrer-Policy');
      expect(config.globalHeaders['Referrer-Policy']).toBe(
        'strict-origin-when-cross-origin'
      );
    });
  });

  describe('Security Headers Validation', () => {
    describe('HSTS Configuration', () => {
      it('should have HSTS max-age of 1 year', () => {
        const hsts = config.globalHeaders['Strict-Transport-Security'];
        expect(hsts).toContain('max-age=31536000');
      });

      it('should include subdomains in HSTS', () => {
        const hsts = config.globalHeaders['Strict-Transport-Security'];
        expect(hsts).toContain('includeSubDomains');
      });

      it('should have valid HSTS format', () => {
        const hsts = config.globalHeaders['Strict-Transport-Security'];
        expect(hsts).toMatch(/^max-age=\d+;\s*includeSubDomains$/);
      });
    });

    describe('Content Security Headers', () => {
      it('should prevent MIME type sniffing', () => {
        expect(config.globalHeaders['X-Content-Type-Options']).toBe('nosniff');
      });

      it('should prevent framing attacks', () => {
        expect(config.globalHeaders['X-Frame-Options']).toBe('DENY');
      });

      it('should enable XSS protection with blocking', () => {
        const xssProtection = config.globalHeaders['X-XSS-Protection'];
        expect(xssProtection).toBe('1; mode=block');
      });
    });

    describe('Referrer Policy', () => {
      it('should use strict-origin-when-cross-origin policy', () => {
        expect(config.globalHeaders['Referrer-Policy']).toBe(
          'strict-origin-when-cross-origin'
        );
      });

      it('should be a valid referrer policy value', () => {
        const validPolicies = [
          'no-referrer',
          'no-referrer-when-downgrade',
          'origin',
          'origin-when-cross-origin',
          'same-origin',
          'strict-origin',
          'strict-origin-when-cross-origin',
          'unsafe-url',
        ];
        expect(validPolicies).toContain(
          config.globalHeaders['Referrer-Policy']
        );
      });
    });
  });

  describe('Cache Control Configuration', () => {
    it('should have cache-control in global headers', () => {
      expect(config.globalHeaders).toHaveProperty('cache-control');
      expect(config.globalHeaders['cache-control']).toBe('no-cache');
    });

    it('should configure image caching for performance', () => {
      const imageRoute = config.routes.find(
        (route: any) => route.route === '/images/*'
      );
      expect(imageRoute).toBeDefined();
      expect(imageRoute.headers).toHaveProperty('cache-control');
      expect(imageRoute.headers['cache-control']).toBe(
        'public, max-age=604800'
      );
    });
  });

  describe('Navigation and Routing', () => {
    it('should exclude static assets from navigation fallback', () => {
      const excludePaths = config.navigationFallback.exclude;
      expect(excludePaths).toContain('/images/*');
      expect(excludePaths).toContain('/favicon.svg');
      expect(excludePaths).toContain('/_next/*');
      expect(excludePaths).toContain('/css/*');
      expect(excludePaths).toContain('/js/*');
    });

    it('should have proper fallback for 404 errors', () => {
      expect(config.navigationFallback.rewrite).toBe('/404.html');
      expect(config.responseOverrides['404'].rewrite).toBe('/404.html');
    });
  });

  describe('Security Best Practices Validation', () => {
    it('should implement defense in depth', () => {
      // Multiple layers of security headers should be configured
      const securityHeaders = [
        'Strict-Transport-Security',
        'X-Content-Type-Options',
        'X-Frame-Options',
        'X-XSS-Protection',
        'Referrer-Policy',
      ];

      securityHeaders.forEach(header => {
        expect(config.globalHeaders).toHaveProperty(header);
        expect(config.globalHeaders[header]).toBeTruthy();
      });
    });

    it('should follow security header best practices', () => {
      // HSTS should be long-term
      expect(config.globalHeaders['Strict-Transport-Security']).toContain(
        'max-age=31536000'
      );

      // X-Frame-Options should be restrictive
      expect(['DENY', 'SAMEORIGIN']).toContain(
        config.globalHeaders['X-Frame-Options']
      );

      // Content type options should prevent sniffing
      expect(config.globalHeaders['X-Content-Type-Options']).toBe('nosniff');

      // XSS protection should be enabled and blocking
      expect(config.globalHeaders['X-XSS-Protection']).toContain('1');
      expect(config.globalHeaders['X-XSS-Protection']).toContain('mode=block');
    });

    it('should not expose sensitive information', () => {
      const configString = JSON.stringify(config);

      // Should not contain any sensitive data patterns
      expect(configString).not.toMatch(/password|secret|key|token/i);
      expect(configString).not.toMatch(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/); // IP addresses
    });
  });

  describe('Performance Optimization', () => {
    it('should cache static assets appropriately', () => {
      const imageRoute = config.routes.find(
        (route: any) => route.route === '/images/*'
      );
      expect(imageRoute.headers['cache-control']).toContain('public');
      expect(imageRoute.headers['cache-control']).toContain('max-age=604800');
    });

    it('should not cache dynamic content by default', () => {
      expect(config.globalHeaders['cache-control']).toBe('no-cache');
    });
  });

  describe('Azure Static Web Apps Compatibility', () => {
    it('should use supported Azure SWA configuration properties', () => {
      const supportedProperties = [
        'navigationFallback',
        'responseOverrides',
        'globalHeaders',
        'routes',
      ];

      Object.keys(config).forEach(property => {
        expect(supportedProperties).toContain(property);
      });
    });

    it('should have valid route configurations', () => {
      expect(Array.isArray(config.routes)).toBe(true);

      config.routes.forEach((route: any) => {
        expect(route).toHaveProperty('route');
        expect(typeof route.route).toBe('string');

        if (route.headers) {
          expect(typeof route.headers).toBe('object');
        }
      });
    });
  });

  describe('Task #125 Compliance', () => {
    it('should meet all acceptance criteria from phase-6-security.md', () => {
      // Security headers configured in staticwebapp.config.json ✅
      expect(config.globalHeaders).toHaveProperty('Strict-Transport-Security');
      expect(config.globalHeaders).toHaveProperty('X-Content-Type-Options');
      expect(config.globalHeaders).toHaveProperty('X-Frame-Options');
      expect(config.globalHeaders).toHaveProperty('X-XSS-Protection');
      expect(config.globalHeaders).toHaveProperty('Referrer-Policy');

      // Headers should be production-ready for Mozilla Observatory evaluation
      expect(config.globalHeaders['Strict-Transport-Security']).toBe(
        'max-age=31536000; includeSubDomains'
      );
      expect(config.globalHeaders['X-Content-Type-Options']).toBe('nosniff');
      expect(config.globalHeaders['X-Frame-Options']).toBe('DENY');
      expect(config.globalHeaders['X-XSS-Protection']).toBe('1; mode=block');
      expect(config.globalHeaders['Referrer-Policy']).toBe(
        'strict-origin-when-cross-origin'
      );
    });

    it('should implement security headers from task requirements', () => {
      // All required headers from the task description
      const requiredHeaders = {
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      };

      Object.entries(requiredHeaders).forEach(([header, value]) => {
        expect(config.globalHeaders[header]).toBe(value);
      });
    });
  });

  describe('Security Header Standards Compliance', () => {
    it('should comply with OWASP security headers recommendations', () => {
      // OWASP recommended security headers
      expect(config.globalHeaders['X-Content-Type-Options']).toBe('nosniff');
      expect(config.globalHeaders['X-Frame-Options']).toBe('DENY');
      expect(config.globalHeaders['Strict-Transport-Security']).toBeTruthy();
      expect(config.globalHeaders['Referrer-Policy']).toBeTruthy();
    });

    it('should be ready for security scanner evaluation', () => {
      // Configuration should score well on security scanners like Mozilla Observatory
      const headers = config.globalHeaders;

      // Critical security headers are present
      expect(headers['Strict-Transport-Security']).toBeTruthy();
      expect(headers['X-Content-Type-Options']).toBeTruthy();
      expect(headers['X-Frame-Options']).toBeTruthy();
      expect(headers['Referrer-Policy']).toBeTruthy();

      // Headers have secure values
      expect(headers['X-Frame-Options']).toBe('DENY');
      expect(headers['X-Content-Type-Options']).toBe('nosniff');
      expect(headers['Strict-Transport-Security']).toContain('max-age=');
    });
  });
});
