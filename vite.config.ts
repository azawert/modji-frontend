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
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0]
            }
            if (id.includes("src/pages")) {
              return "pages"
            }
          },
        },
      },
    },
  }
})
