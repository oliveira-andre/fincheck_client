import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Router } from './Router'
import { AuthProvider } from './app/contexts/AuthContext'
import { ThemeProvider } from './app/contexts/ThemeContext'


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
      <ThemeProvider>
        <AuthProvider>
          <Router />

          <Toaster />
        </AuthProvider>
      </ThemeProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
