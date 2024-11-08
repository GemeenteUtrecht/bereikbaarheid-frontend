import eslint from '@eslint/js'
import globals from 'globals'
import prettierEslintConfigRecommended from 'eslint-plugin-prettier/recommended'
import reactHooksEslint from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import testingLibraryPlugin from 'eslint-plugin-testing-library'
import typeScriptEslint from 'typescript-eslint'
import typeScriptParser from '@typescript-eslint/parser'

export default [
  eslint.configs.recommended,
  ...typeScriptEslint.configs.recommended,
  prettierEslintConfigRecommended,
  {
    ignores: ['build', 'public'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: typeScriptParser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    plugins: {
      'react-hooks': reactHooksEslint,
      'react-refresh': reactRefresh,
      'typescript-eslint': typeScriptEslint,
    },
    rules: {
      ...reactHooksEslint.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },
  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    plugins: {
      'testing-library': testingLibraryPlugin,
    },
    rules: testingLibraryPlugin.configs['flat/react'].rules,
  },
]
