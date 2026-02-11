import cors from 'cors'
import express, { json, urlencoded } from 'express'
import { createServer as createHttpServer } from 'http'
import morgan from 'morgan'
import { corsConfig } from './config/cors.config'
import { router } from './routes/routes'
import { setupTRPC, setupTRPCWebSocket } from './trpc'

export const createServer = () => {
  const app = express()
  const httpServer = createHttpServer(app)

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors(corsConfig))
    .use(router)

  setupTRPC(app)
  setupTRPCWebSocket(httpServer)

  return httpServer
}
