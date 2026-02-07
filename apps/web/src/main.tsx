import { QueryClientProvider } from '@repo/trpc/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import './index.css'
import { queryClient, trpc, trpcClient } from './utils/trpc'

const el = document.getElementById('root')
if (el) {
  const root = createRoot(el)
  root.render(
    <React.StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </trpc.Provider>
    </React.StrictMode>
  )
} else {
  throw new Error('Could not find root element')
}
