// src/pages/+config.js

export default {
  ssr: true,
  prerender: false,
  clientRouting: true,

  meta: {
    dataEndpointUrl: {
      env: {
        server: true,
        client: false
      }
    }
  }
}
