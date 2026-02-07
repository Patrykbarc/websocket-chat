import { format } from 'date-fns'
import type { WebSocketServer } from 'ws'
import type { ChatMessage } from '../types/types'

export const handleMessage = (wss: WebSocketServer, data: Buffer) => {
  console.log('Received:', data)

  const dataStr = data.toString('utf-8')
  const timestamp = format(new Date(), 'HH:mm:ss')

  const message: ChatMessage = {
    id: crypto.randomUUID(),
    timestamp,
    data: dataStr
  }

  broadcastMessage(wss, message)
}

const broadcastMessage = (wss: WebSocketServer, message: ChatMessage) => {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(message))
    }
  })
}
