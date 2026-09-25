import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Proxies /api/* to the real Rails backend server-side, so local dev
    // never needs shengmtaa.com's CORS config to allow localhost - the
    // browser only ever talks to this dev server, same-origin.
    proxy: {
      '/api': {
        target: 'https://shengmtaa.com',
        changeOrigin: true,
      },
    },
  },
})
