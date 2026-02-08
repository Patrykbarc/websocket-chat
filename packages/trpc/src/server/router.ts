import { DEFAULT_MESSAGE_LENGTH_LIMIT } from '@repo/constants'
import { EventEmitter, on } from 'events'
import { z } from 'zod'
import { publicProcedure, router } from './trpc.js'

const eventEmitter = new EventEmitter()

const chatMessageSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  data: z.string().max(DEFAULT_MESSAGE_LENGTH_LIMIT),
  username: z.string().max(50)
})

export type ChatMessage = z.infer<typeof chatMessageSchema>

export const appRouter = router({
  sendMessage: publicProcedure
    .input(chatMessageSchema.pick({ data: true, username: true }))
    .mutation(({ input }) => {
      const message: ChatMessage = {
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        data: input.data,
        username: input.username
      }

      eventEmitter.emit('newMessage', message)

      return message
    }),

  onMessage: publicProcedure.subscription(async function* ({ signal }) {
    const eventIterator = signal
      ? on(eventEmitter, 'newMessage', { signal })
      : on(eventEmitter, 'newMessage')

    try {
      for await (const [data] of eventIterator) {
        yield data as ChatMessage
      }
    } catch (error) {
      if (signal?.aborted) {
        return
      }

      throw error
    }
  })
})

export type AppRouter = typeof appRouter
