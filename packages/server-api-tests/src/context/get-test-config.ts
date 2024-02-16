import { config } from 'dotenv'
import { z } from 'zod'

config()

export function getTestConfig() {
  const parsedConfig = z
    .object({
      SERVER_URL: z.string()
    })
    .safeParse(process.env)

  if (!parsedConfig.success) {
    throw new Error('Missing environment variables' + parsedConfig.error.toString())
  }

  return {
    serverUrl: parsedConfig.data.SERVER_URL
  }
}

export type TestConfig = ReturnType<typeof getTestConfig>
