import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Router } from './Router'
import { AuthProvider } from './app/contexts/AuthContext'


export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />

        <Toaster />
      </AuthProvider>

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}

export default App
