import { defineConfig } from 'vitest/config'

import packageJson from './package.json'

const name = packageJson.name.split('/').pop()

export default defineConfig({
  test: {
    reporters: ['default', 'junit'],
    outputFile: `../../test-results/${name}.xml`
  }
})
