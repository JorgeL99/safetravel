import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/safetravel/' : '/',
  plugins: [react()],
  test: {
    exclude: ['tests/e2e/**', 'node_modules/**', 'dist/**'],
  },
})
