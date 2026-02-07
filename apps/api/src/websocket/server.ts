import type { Server } from 'http'
import { WebSocketServer } from 'ws'
import { handleConnection } from './handlers/connection'
import { handleDisconnect } from './handlers/disconnect'
import { handleMessage } from './handlers/message'

export const setupWebSocket = (httpServer: Server) => {
  const wss = new WebSocketServer({ server: httpServer })

  wss.on('connection', (ws) => {
    handleConnection(ws)

    ws.on('message', (data) => {
      handleMessage(wss, data as Buffer)
    })

    ws.on('close', () => {
      handleDisconnect()
    })
  })

  return wss
}
