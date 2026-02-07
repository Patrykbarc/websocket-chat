import { QueryClient } from '@tanstack/react-query'
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client'
import { createTRPCReact, type CreateTRPCReact } from '@trpc/react-query'
import superjson from 'superjson'
import type { AppRouter } from '../server/router.js'

export const trpc: CreateTRPCReact<AppRouter, unknown> =
  createTRPCReact<AppRouter>()

export function createTRPCClient(httpUrl: string, wsUrl: string) {
  const wsClient = createWSClient({
    url: wsUrl
  })

  return trpc.createClient({
    links: [
      splitLink({
        condition: (op) => op.type === 'subscription',
        true: wsLink({
          client: wsClient,
          transformer: superjson
        }),
        false: httpBatchLink({
          url: httpUrl,
          transformer: superjson
        })
      })
    ]
  })
}

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  })
}

export { QueryClientProvider } from '@tanstack/react-query'
export type { AppRouter }
