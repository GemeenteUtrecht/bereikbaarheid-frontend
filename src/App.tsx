import { GlobalStyle, ThemeProvider } from '@amsterdam/asc-ui'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
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

const router = createBrowserRouter(ROUTES)

function App() {
  return (
    <ThemeProvider overrides={theme}>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
