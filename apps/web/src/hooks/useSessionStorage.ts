import { useState } from 'react'
import { SessionStorageManager } from '../utils/SessionStorageManager'

export function useSessionStorage(key: string) {
  const manager = new SessionStorageManager(key)
  const [value, setValue] = useState<string | null>(manager.getValue())

  const set = (newValue: string) => {
    manager.setValue(newValue)
    setValue(newValue)
  }

  const remove = () => {
    manager.removeValue()
    setValue(null)
  }

  return [value, set, remove] as const
}
