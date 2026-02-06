import { useWs } from '../hooks/useWs'

const DEFAULT_MESSAGE_LENGTH_LIMIT = 200

function App() {
  const { input, messages, sendMessage, setInput } = useWs()

  return (
    <div className="w-full h-dvh flex p-4 md:p-8">
      <div className="lg:w-3/4 xl:w-1/2 w-full mx-auto h-full border p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto border p-6">
          {messages.map((message, index) => (
            <p className="break-all" key={index}>
              {message}
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
            className="border px-4 py-1 cursor-pointer bg-gray-200"
            type="submit"
            onClick={sendMessage}
          >
            Send
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
export default App
