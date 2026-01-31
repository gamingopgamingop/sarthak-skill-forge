// nitro.config.ts
// ✅ Vercel-compatible Nitro config
// @ts-ignore
// @ts-nocheck

import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  preset: 'vercel',

  output: {
    format: ['web', 'worker', 'cloudflare', 'vercel', 'node'],
    serverDir: './dist/server',
    publicDir: './dist/public'
  },

  experimental: {
    wasm: false
  },

  workers: false, // 👈 extra safety

  serveStatic: true,
  compatibilityDate: '2024-12-01',
  logLevel: 2
})
