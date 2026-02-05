import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'navi': resolve('../../packages/navi/src/index.ts'),
      'react-navi': resolve('../../packages/react-navi/src/index.tsx'),
      'react-navi-helmet': resolve('../../packages/react-navi-helmet/src/index.tsx'),
    },
  },
  server: {
    fs: {
      allow: ['../..']
    }
  }
})
