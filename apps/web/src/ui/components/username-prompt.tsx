import { SESSION_USERNAME_KEY } from '@repo/constants'
import { KeyboardEvent } from 'react'
import { useSessionStorage } from '../../hooks/useSessionStorage'

export function UsernamePrompt() {
  const [_, setUsername] = useSessionStorage(SESSION_USERNAME_KEY)

  const handleUsername = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const name = (e.target as HTMLInputElement).value
      setUsername(name)
      window.location.reload()
    }
  }

  return (
    <input
      className="border px-2 py-1 size-fit mx-auto my-auto"
      type="text"
      placeholder="Enter your username"
      onKeyDown={handleUsername}
    />
  )
}
