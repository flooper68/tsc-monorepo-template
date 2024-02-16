import type { Config } from 'prettier'

export const prettierrc: Config = {
  arrowParens: 'avoid',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy', 'jsx'],
  importOrder: [
    '^@application/(.*)$',
    '^@shared/(.*)$',
    '^@server/(.*)$',
    '^@client/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^[./]'
  ],
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'none'
}
