/// <reference types="vite/client" />
import "@tanstack/react-query"

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError
  }
}
