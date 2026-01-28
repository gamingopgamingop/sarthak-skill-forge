// +config.ts
// @ts-ignore
// @ts-nocheck

import { defineConfig } from 'vite'
import type { Config } from 'vike/types'
export const config: Config = {
  ssr: true,
  // target: "webworker",
  // noExternal: process.env.NODE_ENV === "production",
  // ssr: {
  //   // target: "webworker",
  //   noExternal: true
  // }
}satisfies Config;
