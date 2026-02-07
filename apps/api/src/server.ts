import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import express from 'express'
import { createServer as createHttpServer } from 'http'
import morgan from 'morgan'
import { setupTRPC, setupTRPCWebSocket } from './trpc'

export const createServer = () => {
  const app = express()
  const httpServer = createHttpServer(app)

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())

  setupTRPC(app)
  setupTRPCWebSocket(httpServer)

  return httpServer
}
