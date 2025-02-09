import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/online-budgeting-tool/',  // Make sure this is set to your repo's name
  build: {
    outDir: 'build',
  },
})