import { type AppRouter } from '@showcase/shared-trpc'
import { createTRPCProxyClient, httpLink, type inferRouterProxyClient } from '@trpc/client'

import { getTestConfig } from './get-test-config'

export type TrpcTestClient = inferRouterProxyClient<AppRouter>

export function getTestContext() {
  const config = getTestConfig()

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpLink({
        url: `${config.serverUrl}/trpc`
      })
    ]
  })
  return {
    client
  }
}

export type TestContext = ReturnType<typeof getTestContext>
