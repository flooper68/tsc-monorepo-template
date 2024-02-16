import staticFastify from '@fastify/static'
import { ServerFeature } from '@showcase/server-feature'
import { type AppRouter, buildTrpcRouter } from '@showcase/shared-trpc'
import {
  type CreateFastifyContextOptions,
  type FastifyTRPCPluginOptions,
  fastifyTRPCPlugin
} from '@trpc/server/adapters/fastify'
import fastify from 'fastify'
import path from 'path'

import { getConfig } from './get-config'

function createContext({ req, res }: CreateFastifyContextOptions) {
  return { req, res }
}

export type Context = Awaited<ReturnType<typeof createContext>>

async function main(): Promise<void> {
  const config = getConfig()

  const feature = new ServerFeature({
    connectionString: config.dbConnectionString
  })

  const server = fastify({
    maxParamLength: 5000
  })

  const result = new URL(import.meta.url)
  const pathname = result.pathname

  await server.register(staticFastify, {
    root: path.join(pathname, '../../public'),
    prefix: '/'
  })

  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: buildTrpcRouter(),
      createContext: () => {
        return {
          getSession: () => null,
          feature
        }
      },
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error)
      }
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions']
  })

  await server.listen({ host: '0.0.0.0', port: 3003 })

  console.log('Server is running on http://localhost:3003')
}

void main()
