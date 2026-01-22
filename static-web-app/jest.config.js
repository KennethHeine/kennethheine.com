// --- file: jest.config.js ---
const nextJest = require('next/jest');

// Create Jest configuration with Next.js integration
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Setup files to run before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test environment
  testEnvironment: 'jsdom', // Module name mapping for path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
  },
  // Transform ignore patterns for ES modules
  transformIgnorePatterns: ['node_modules/(?!(next-mdx-remote|@mdx-js)/)'],

  // Test file patterns - exclude e2e directory (Playwright tests)
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/*.(test|spec).(ts|tsx|js|jsx)',
  ],
  // Paths to ignore during test collection
  testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/.next/'],
  // Coverage configuration
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/coverage/**',
    '!**/*.config.*',
    '!**/globals.css',
  ],
  // Coverage thresholds - maintain current high levels
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 86,
      statements: 85,
    },
    // Per-file thresholds for critical files
    './app/layout.tsx': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  // Enhanced coverage reporters
  coverageReporters: [
    'text-summary',
    'lcov',
    'html',
    'json-summary',
    'cobertura',
  ],
};

// Create and export the Jest configuration
module.exports = createJestConfig(customJestConfig);
