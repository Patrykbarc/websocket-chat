import type { ChatMessage } from '@repo/trpc/server'
import { useCallback, useState } from 'react'
import { trpc } from '../utils/trpc'

export function useChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])

  trpc.onMessage.useSubscription(undefined, {
    onData: (message) => {
      setMessages((prev) => [...prev, message])
    },
    onError: (err) => {
      console.error('Subscription error:', err)
    }
  })

  const sendMessageMutation = trpc.sendMessage.useMutation()

  const sendMessage = useCallback(() => {
    if (!input.trim()) return

    sendMessageMutation.mutate(
      { data: input },
      {
        onSuccess: () => setInput(''),
        onError: (err) => console.error('Send error:', err)
      }
    )
  }, [input, sendMessageMutation])

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isSending: sendMessageMutation.isPending
  }
}
