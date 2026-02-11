import { SESSION_USERNAME_KEY } from '@repo/constants'
import { lazy } from 'react'
import { useSessionStorage } from '../hooks/useSessionStorage'

const Chat = lazy(() =>
  import('../ui/components/chat').then((module) => ({ default: module.Chat }))
)
const UsernamePrompt = lazy(() =>
  import('../ui/components/username-prompt').then((module) => ({
    default: module.UsernamePrompt
  }))
)

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
