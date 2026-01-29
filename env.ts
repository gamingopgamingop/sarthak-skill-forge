// env.ts (or env.js)
// @ts-nocheck
// @ts-ignore
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config({ quiet: true }) // suppress logs

// Use all three imports
const env = createEnv({
  server: {
    // Define your environment variables schema here using z
  },
  client: {
    // Define client-side environment variables schema here using z
  },
  clientPrefix: 'PUBLIC_', // Example prefix for client variables
  runtimeEnv: process.env, // Pass the environment variables
})

// Export the validated environment variables
export { env }
