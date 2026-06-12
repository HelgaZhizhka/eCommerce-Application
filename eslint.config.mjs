import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules', 'build', 'coverage', 'test-results', 'playwright-report', 'public', '.netlify'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    settings: { react: { version: 'detect' } },
    rules: {
      'react/prop-types': 'off',
      // parity with the old airbnb setup, which did not flag caught errors;
      // the offending catch blocks die with the stores in phase 3
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],
      // legit smells flagged by react-hooks v7, but every hit is in legacy
      // store-driven components replaced in phases 3-5 — keep visible as warn
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/use-memo': 'warn',
      // real a11y debt in legacy carousels/cards — phase 6 a11y pass owns it
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      // Formik's Field is the control inside registration labels
      'jsx-a11y/label-has-associated-control': ['error', { controlComponents: ['Field'] }],
    },
  },
  prettier
);
