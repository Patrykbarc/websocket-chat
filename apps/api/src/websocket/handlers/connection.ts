import type { WebSocket } from 'ws'

export const handleConnection = (ws: WebSocket) => {
  console.log('Client connected')
}
