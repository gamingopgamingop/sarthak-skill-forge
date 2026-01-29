// +config.ts
// @ts-ignore
// @ts-nocheck
// import type { Config } from 'vike/types'
export const config = {
  meta: {
    // 1. Define the 'ssr' config property
    ssr: {
      env: { config: true } 
    },
    dataEndpointUrl: {
      env: {
        server: true,
        client: false
      }
    }
  },
  // 2. Now you can safely use it
  ssr: true,
  prerender: false,
  clientRouting: true,
  // ...
};
// export default config;