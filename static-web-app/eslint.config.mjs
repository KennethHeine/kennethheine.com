import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      '**/*.d.ts',
      'coverage/**',
      'dist/**',
      'build/**',
      'src/js/**', // Legacy JS files
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'prettier' // Must be last to override other configs
  ).map(config => {
    // Disable problematic import resolver that has native binding issues
    if (config.settings?.['import/resolver']) {
      const newConfig = { ...config };
      delete newConfig.settings['import/resolver'];
      return newConfig;
    }
    return config;
  }),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',

      // Documentation rules (relaxed)
      // Note: 'require-jsdoc' and 'valid-jsdoc' rules were removed in ESLint 9

      // General JavaScript/ES6+ rules
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
      'no-unused-expressions': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],

      // React specific rules
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-key': 'error',
      'react/no-unescaped-entities': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-uses-react': 'off', // Not needed with React 17+ JSX transform
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform
      'react/prop-types': 'off', // Using TypeScript for prop validation

      // Next.js specific rules
      '@next/next/no-img-element': 'error',
      '@next/next/no-html-link-for-pages': 'error',

      // Code quality rules
      complexity: ['warn', 10],
      'max-depth': ['warn', 4],
      'max-lines-per-function': ['warn', 100],
      'no-magic-numbers': [
        'warn',
        {
          ignore: [-1, 0, 1, 2],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
        },
      ],

      // Import/export rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    // Configuration for test files
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/__tests__/**/*'],
    rules: {
      'no-magic-numbers': 'off',
      'max-lines-per-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'import/order': 'off', // Relax import order for test files
    },
  },
];

export default eslintConfig;
