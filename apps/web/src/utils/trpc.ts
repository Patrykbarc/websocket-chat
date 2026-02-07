import { createQueryClient, createTRPCClient, trpc } from '@repo/trpc/react'

const API_PORT = import.meta.env.VITE_API_PORT
const httpUrl = `http://localhost:${API_PORT}/trpc`
const wsUrl = `ws://localhost:${API_PORT}/trpc`

export const trpcClient = createTRPCClient(httpUrl, wsUrl)

export const queryClient = createQueryClient()

export { trpc }
