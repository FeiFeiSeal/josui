/*
 * @Author:FeiFeiSeal
 * @Date:2025-03-28 17:29:51
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-04-21 16:00:05
 * @Description:
 */
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'
import path from "path"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Example for React
          // Add other libraries or modules you want to separate
        }
      }
    }
  }
})
