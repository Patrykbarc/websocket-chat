import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

type Context = {}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  }
})

const router = t.router
const publicProcedure = t.procedure
const createCallerFactory = t.createCallerFactory
const middleware = t.middleware

export { createCallerFactory, middleware, publicProcedure, router }
export type { Context }
