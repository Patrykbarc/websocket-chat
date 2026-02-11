import { ChatMessage } from '@repo/trpc/server'

export const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    username: 'Alice',
    data: 'Hello, everyone!'
  },
  {
    id: '2',
    timestamp: new Date().toISOString(),
    username: 'Bob',
    data: 'Hi, Alice!'
  },
  {
    id: '3',
    timestamp: new Date().toISOString(),
    username: 'Charlie',
    data: 'Good morning!'
  },
  {
    id: '4',
    timestamp: new Date().toISOString(),
    username: 'Diana',
    data: 'How is everyone doing?'
  },
  {
    id: '5',
    timestamp: new Date().toISOString(),
    username: 'Eve',
    data: 'Great to see you all!'
  },
  {
    id: '6',
    timestamp: new Date().toISOString(),
    username: 'Frank',
    data: 'Looking forward to chatting here'
  },
  {
    id: '7',
    timestamp: new Date().toISOString(),
    username: 'Alice',
    data: 'This is an awesome chat app!'
  }
] as const
