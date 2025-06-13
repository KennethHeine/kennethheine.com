import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.nyc_output/**',
      '*.log',
      '*.json', // Exclude all JSON files
      'src/**', // Exclude legacy src directory if it exists
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly',
        console: 'readonly',
        process: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        Buffer: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      prettier,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js 13+
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/no-unescaped-entities': 'error',
      'react/display-name': 'off',

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',

      // Import rules (basic ones that work reliably)
      'import/no-duplicates': 'error',

      // General code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': 'off', // Using TypeScript version
      'no-undef': 'off', // TypeScript handles this
      'eqeqeq': 'error',
      'curly': 'error',
      'complexity': 'off', // Too many violations in existing code
      'no-magic-numbers': 'off', // Too many violations in existing code 
      'no-prototype-builtins': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/__tests__/**/*', '**/*.test.*', '**/*.spec.*', '**/jest.setup.*'],
    rules: {
      // Relax rules for test files
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'complexity': 'off',
      'no-console': 'off',
      'react/display-name': 'off',
      'no-constant-binary-expression': 'off', // Allow for testing boolean conditions
    },
  },
  {
    files: ['**/*.config.*', '**/next.config.*', 'postcss.config.*'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      // Relax rules for config files
      'no-console': 'off',
      'no-magic-numbers': 'off',
    },
  },
  prettierConfig, // This disables ESLint rules that conflict with Prettier
];