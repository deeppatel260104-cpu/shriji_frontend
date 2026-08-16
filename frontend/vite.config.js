import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    allowedHosts: [
      'aaron-spice-ticket-distinguished.trycloudflare.com'
    ],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5500',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://127.0.0.1:5500',
        changeOrigin: true,
      },
    },
  },
})


