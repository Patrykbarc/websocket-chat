import { SESSION_USERNAME_KEY } from '@repo/constants'
import type { ChatMessage } from '@repo/trpc/server'
import { useCallback, useState } from 'react'
import { trpc } from '../utils/trpc'
import { useSessionStorage } from './useSessionStorage'

export function useChat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [username] = useSessionStorage(SESSION_USERNAME_KEY)

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
    if (!input.trim() || !username) return

    sendMessageMutation.mutate(
      { data: input, username },
      {
        onSuccess: () => setInput(''),
        onError: (err) => console.error('Send error:', err)
      }
    )
  }, [input, username, sendMessageMutation])

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isSending: sendMessageMutation.isPending
  }
}
