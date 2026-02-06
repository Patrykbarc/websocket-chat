import { json, urlencoded } from 'body-parser'
import cors from 'cors'
import { format } from 'date-fns'
import express from 'express'
import { createServer as createHttpServer } from 'http'
import morgan from 'morgan'
import { WebSocketServer } from 'ws'

export const createServer = () => {
  const app = express()
  const httpServer = createHttpServer(app)
  const wss = new WebSocketServer({ server: httpServer })

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())

  wss.on('connection', (ws) => {
    console.log('Client connected')

    ws.on('message', (data) => {
      console.log('Received:', data)

      const dataStr = data.toString('utf-8')
      const timestamp = format(new Date(), 'HH:mm:ss')

      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ timestamp, data: dataStr }))
        }
      })
    })

    ws.on('close', () => {
      console.log('Client disconnected')
    })
  })

  return httpServer
}
