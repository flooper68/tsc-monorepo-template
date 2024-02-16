import { devices } from '@playwright/test'
import type { PlaywrightTestConfig } from '@playwright/test'

import { getTestConfig } from './src/get-test-config'

const testEnv = getTestConfig()

/**
 * See https://playwright.dev/docs/test-configuration
 */
const config: PlaywrightTestConfig = {
  testDir: './src',
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [['html', { outputFolder: '../../test-results/client' }]],
  use: {
    baseURL: testEnv.applicationUrl,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    testIdAttribute: 'data-qa'
  },
  projects: [
    {
      name: 'Chrome logged in',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
}

export default config
