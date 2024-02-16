import { config } from 'dotenv'
import { z } from 'zod'

config()

export function getTestConfig() {
  const parsedConfig = z
    .object({
      DB_CONNECTION_STRING: z.string()
    })
    .safeParse(process.env)

  if (!parsedConfig.success) {
    throw new Error('Missing environment variables' + parsedConfig.error.toString())
  }

  return {
    dbConnectionString: parsedConfig.data.DB_CONNECTION_STRING
  }
}

export type TestConfig = ReturnType<typeof getTestConfig>
