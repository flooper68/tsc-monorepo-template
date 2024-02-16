// @ts-expect-error - no types
import tsParser from '@typescript-eslint/parser'
import { type Linter } from 'eslint'
import tscStandard from 'eslint-config-standard-with-typescript'
// @ts-expect-error missing type
import * as pluginImport from 'eslint-plugin-import'
// @ts-expect-error missing type
import pluginN from 'eslint-plugin-n'
// @ts-expect-error missing type
import pluginPromise from 'eslint-plugin-promise'
// @ts-expect-error missing type
import react from 'eslint-plugin-react'
// @ts-expect-error missing type
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
// @ts-expect-error - no types
import tseslint from 'typescript-eslint'

const commonRules: Linter.RulesRecord = {
  ...tscStandard.rules,
  '@typescript-eslint/space-before-function-paren': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/member-delimiter-style': 'off'
}

export const eslintrc: Linter.FlatConfig[] = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['dist/**/*', 'node_modules/**/*'],
    plugins: {
      n: pluginN,
      promise: pluginPromise,
      import: pluginImport,
      '@typescript-eslint': tseslint.plugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true },
        ecmaVersion: 'latest',
        project: true
      },
      globals: {
        ...globals.es2021,
        console: 'readonly'
      }
    },
    rules: { ...commonRules }
  }
]

export const eslintrcReact = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['dist/**/*', 'node_modules/**/*'],
    plugins: {
      n: pluginN,
      promise: pluginPromise,
      import: pluginImport,
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { modules: true, jsx: true },
        ecmaVersion: 'latest',
        project: true
      },
      globals: {
        ...globals.es2021,
        ...globals.browser
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...commonRules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off'
    }
  }
]
