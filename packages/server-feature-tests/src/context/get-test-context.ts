import { ServerFeature } from '@showcase/server-feature'

import { getTestConfig } from './get-test-config'

export function getTestContext() {
  const config = getTestConfig()

  const feature = new ServerFeature({
    connectionString: config.dbConnectionString
  })

  return {
    feature
  }
}

export type TestContext = ReturnType<typeof getTestContext>
