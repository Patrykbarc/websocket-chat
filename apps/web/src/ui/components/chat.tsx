import { DEFAULT_MESSAGE_LENGTH_LIMIT } from '@repo/constants'
import { useChat } from '../../hooks/useChat'

export function Chat() {
  const { input, messages, sendMessage, setInput, isSending } = useChat()

  return (
    <div className="w-full h-dvh flex p-4 md:p-8">
      <div className="lg:w-3/4 xl:w-1/2 w-full mx-auto h-full border p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto border p-6">
          {messages.map((message) => (
            <p className="break-all" key={message.id}>
              <span className="text-gray-500 text-sm mr-2">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
              {message.data}
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
      </div>
    </div>
  )
}
