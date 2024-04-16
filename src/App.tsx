import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routes } from "./routes/routes"
import { NotificationProvider } from "./contexts/notificationContext/NotificationContext"
import { NotificationContainer } from "./contexts/notificationContext/NotificationContainer"

function App() {
  const router = createBrowserRouter(routes)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            retry: false,
            networkMode: "always",
          },
        },
      })
  )
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <NotificationContainer />
          <RouterProvider router={router} />
        </NotificationProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
