// +config.ts
// @ts-ignore
// @ts-nocheck

import { defineConfig } from 'vite'
import type { Config } from 'vike/types'
export const config: Config = {
      meta: {
    dataEndpointUrl: {
      env: {
        server: true,
        // Load the value of /pages/**/+dataEndpointUrl.js only on the server
        client: false
      }
    }
  },
  // ssr: true,
  // ssr: { noExternal: true },
  // target: "webworker",
  ssr: true,
  // target: "webworker",
  // noExternal: process.env.NODE_ENV === "production",
  // ssr: {
  //   // target: "webworker",
  //   noExternal: true
  // }
}satisfies Config;
