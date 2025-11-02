import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This makes process.env available to the client code, solving the "process is not defined" error.
  define: {
    'process.env': process.env
  }
})