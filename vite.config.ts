import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import * as path from "path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    define: {
      __VITE_BACKEND_BASE_URL__: JSON.stringify(env.VITE_BACKEND_BASE_URL),
    },
  }
})
