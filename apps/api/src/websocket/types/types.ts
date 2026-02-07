import type { WebSocket } from 'ws'

export type ChatMessage = {
  id: string
  timestamp: string
  data: string
}

export type WSClient = WebSocket
