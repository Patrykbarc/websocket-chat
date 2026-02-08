import { SESSION_USERNAME_KEY } from '@repo/constants'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { Chat } from '../ui/components/chat'
import { UsernamePrompt } from '../ui/components/username-prompt'

function App() {
  const [isUsernameSet] = useSessionStorage(SESSION_USERNAME_KEY)

  return (
    <div className="w-full h-dvh flex p-4 md:p-8">
      <div className="lg:w-3/4 xl:w-1/2 w-full mx-auto h-full border p-4 flex flex-col">
        {isUsernameSet ? <Chat /> : <UsernamePrompt />}
      </div>
    </div>
  )
}
export default App
