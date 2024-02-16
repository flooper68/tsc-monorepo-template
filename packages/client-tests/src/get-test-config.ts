import { config } from 'dotenv'
import { z } from 'zod'

config()

export function getTestConfig() {
  const parsedConfig = z
    .object({
      APPLICATION_URL: z.string()
    })
    .safeParse(process.env)

  if (!parsedConfig.success) {
    throw new Error('Missing environment variables' + parsedConfig.error.toString())
  }

  return {
    applicationUrl: parsedConfig.data.APPLICATION_URL
  }
}

export type TestConfig = ReturnType<typeof getTestConfig>
