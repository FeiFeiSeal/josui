/*
 * @Author:FeiFeiSeal
 * @Date:2025-03-28 17:29:51
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-04-25 18:22:19
 * @Description:
 */
import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, "prettier"],
    files: ['**/*.{ts,tsx,mjs,jsx,js,cjs, cts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 'import/order': [
      //   'error',
      //   {
      //     'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
      //     'newlines-between': 'always',
      //     'alphabetize': { 'order': 'asc', 'caseInsensitive': true },
      //     'pathGroups': [
      //       {
      //         'pattern': '@/components/ui/**',
      //         'group': 'internal',
      //         'position': 'after'
      //       }
      //     ],
      //     'pathGroupsExcludedImportTypes': ['builtin']
      //   }
      // ],
      // 'quotes': ["error", "single"],
      // "prettier/prettier": ["error", { "singleQuote": true }],
      // 'object-curly-newline': ['error', {
      //   ImportDeclaration: { multiline: true, minProperties: 2 }
      // }],
    }
  },
)
