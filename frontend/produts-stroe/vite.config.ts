import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const port: number = 3000;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port,
    open: `http://localhost:${port}`
  }
})
