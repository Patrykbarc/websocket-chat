import { DEFAULT_MESSAGE_LENGTH_LIMIT } from '@repo/constants'
import { useCallback, useEffect, useRef } from 'react'
import { useChat } from '../../hooks/useChat'

export function Chat() {
  const { input, messages, sendMessage, setInput, isSending } = useChat()
  const containerRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)

  const handleScroll = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    isAtBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < 32
  }, [])

  useEffect(() => {
    if (isAtBottomRef.current) {
      containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight })
    }
  }, [messages])

  return (
    <>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 space-y-1.5 overflow-y-auto border p-6 divide-y divide-gray-200"
      >
        {messages.map((message) => (
          <p
            className="break-all flex items-end justify-between w-full pb-1.5"
            key={message.id}
          >
            <span>
              {message.username}: {message.data}
            </span>
            <span className="text-sm text-gray-500 break-keep ml-3">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-2 pt-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          placeholder="Type a message"
          className="border w-full h-24 p-4 resize-none"
        />
        <button
          className="border px-4 py-1 cursor-pointer bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          onClick={sendMessage}
          disabled={isSending || !input.trim()}
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
        <div className="flex justify-between">
          <p className="text-red-600">
            {input.length >= DEFAULT_MESSAGE_LENGTH_LIMIT &&
              `Message cannot exceed ${DEFAULT_MESSAGE_LENGTH_LIMIT} characters.`}
          </p>

          <p>
            {input.length}/{DEFAULT_MESSAGE_LENGTH_LIMIT}
          </p>
        </div>
      </div>
    </>
  )
}
