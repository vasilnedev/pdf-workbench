import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['localhost','bim-app.laptop'], // allow access from localhost and the specified hostname
    port: 5501
  }
})
