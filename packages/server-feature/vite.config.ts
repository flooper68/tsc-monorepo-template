import { defineConfig } from 'vitest/config'

import packageJson from './package.json'

export default defineConfig({
  test: {
    reporters: ['default', 'junit'],
    outputFile: `../../test-results/${packageJson.name.replace('@showcase/', '')}.xml`
  }
})
