import { TRPCError, initTRPC } from '@trpc/server'

import type { TrpcContext } from './trpc-context'

export function buildTrpcCore() {
  const t = initTRPC.context<TrpcContext>().create({
    errorFormatter({ shape }) {
      return shape
    }
  })

  const router = t.router

  const publicProcedure = t.procedure

  const withAuth = t.middleware(async request => {
    const { ctx, next } = request

    const session = ctx.getSession()

    if (session == null) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    return await next({
      ctx: {
        ...ctx,
        session
      } as const
    })
  })

  const authenticatedProcedure = t.procedure.use(withAuth)

  return {
    router,
    publicProcedure,
    authenticatedProcedure
  }
}

export type TrpcCore = ReturnType<typeof buildTrpcCore>
