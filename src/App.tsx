import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ROUTES } from './routes'
import { theme } from './styles/Theme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.NODE_ENV === 'production' ? 3 : false,
      refetchOnWindowFocus: false,
    },
  },
})

const router = createBrowserRouter(ROUTES, {
  future: {
    v7_normalizeFormMethod: true,
  },
})

function App() {
  return (
    <ThemeProvider overrides={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider future={{ v7_startTransition: true }} router={router} />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
