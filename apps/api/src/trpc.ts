import type { Context } from '@repo/trpc/server'
import { appRouter } from '@repo/trpc/server'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { applyWSSHandler } from '@trpc/server/adapters/ws'
import type { Express } from 'express'
import type { Server } from 'http'
import { WebSocketServer } from 'ws'

export function createContext(): Context {
  return {}
}

export function setupTRPC(app: Express) {
  app.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  )
}

export function setupTRPCWebSocket(httpServer: Server) {
  const wss = new WebSocketServer({ server: httpServer })

  applyWSSHandler({
    wss,
    router: appRouter,
    createContext
  })

  console.log('✅ tRPC WebSocket server started')

  return wss
}
