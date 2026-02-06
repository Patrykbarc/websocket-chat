import { useCallback, useEffect, useState } from 'react'

const websocketUrl = 'localhost:5001'
const protocol = 'ws'

export function useWs() {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    const websocket = new WebSocket(`${protocol}://${websocketUrl}`)
    setWs(websocket)

    websocket.onopen = () => console.log('Connected to WebSocket server')
    websocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data])
    }
    websocket.onclose = () => console.log('Disconnected from WebSocket server')

    return () => websocket.close()
  }, [])

  const sendMessage = useCallback(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(input)
      setInput('')
    }
  }, [ws, input])

  return { messages, ws, input, setInput, sendMessage }
}
