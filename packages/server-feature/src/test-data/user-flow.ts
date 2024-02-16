import { type DbContext } from '@showcase/db-context'

import { type ServerFeature } from '../feature'
import { UserData } from './user-data'

interface Context {
  feature: ServerFeature
  dbContext: DbContext
}

export async function runUserFlow(context: Context): Promise<void> {
  console.log('Starting to create users...')

  await context.dbContext.withConnection(async client => {
    await client.query('DELETE FROM users')
  })

  console.log('Cleaned up existing data!')

  for (const key in UserData) {
    console.log(`Creating user ${key}`)

    const user = UserData[key as keyof typeof UserData]

    await context.feature.createUser({
      uuid: user.uuid,
      name: user.name
    })
  }

  console.log('Finished creating users!')
}
