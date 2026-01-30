// nitro.config.ts
// ✅ Vercel-compatible Nitro config
// @ts-ignore
// @ts-nocheck

import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  preset: 'vercel',

  output: {
    format: 'web'
  },

  experimental: {
    wasm: false
  },

  workers: false, // 👈 extra safety

  serveStatic: true,
  compatibilityDate: '2024-12-01',
  logLevel: 2
})
