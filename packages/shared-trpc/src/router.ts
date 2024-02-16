import { buildTrpcCore } from './trpc-core'

export function buildTrpcRouter() {
  const core = buildTrpcCore()

  const router = core.router

  const appRouter = router({
    userList: core.publicProcedure.query(async ({ ctx }) => {
      return await ctx.feature.getUserList()
    })
  })

  return appRouter
}

export type AppRouter = ReturnType<typeof buildTrpcRouter>
