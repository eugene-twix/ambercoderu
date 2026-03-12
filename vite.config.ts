import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import type { Plugin } from 'vite'

function copy404Plugin(): Plugin {
  return {
    name: 'copy-404',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist')
      const index = path.join(dist, 'index.html')
      const notFound = path.join(dist, '404.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, notFound)
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), copy404Plugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: ['.ngrok-free.app'],
  },
})
