import { DbContext } from '@showcase/db-context'

import { ServerFeature } from '../feature'
import { runUserFlow } from '../test-data/user-flow'
import { getConfig } from './get-config'

async function main() {
  const config = getConfig()

  const dbContext = new DbContext({
    connectionString: config.dbConnectionString,
    maxConnections: 1
  })

  const feature = new ServerFeature({
    connectionString: config.dbConnectionString
  })

  await runUserFlow({ feature, dbContext })

  await feature.close()
  await dbContext.close()
}

void main()
