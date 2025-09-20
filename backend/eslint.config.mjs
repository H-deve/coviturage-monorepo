// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsEslintParser from '@typescript-eslint/parser';

export default {
  ignores: ['eslint.config.mjs'],
  ...eslint.configs.recommended,
  ...tsEslintPlugin.configs.recommendedTypeChecked,
  ...eslintPluginPrettierRecommended,
  languageOptions: {
    globals: {
      ...globals.node,
      ...globals.jest,
    },
    ecmaVersion: 5,
    sourceType: 'module',
    parser: tsEslintParser,
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
      project: './tsconfig.json',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};