export {}

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    apiSecret: string
  }

  interface PublicRuntimeConfig {
    apiBase: string
  }
}


declare const useRuntimeConfig: () => RuntimeConfig & PublicRuntimeConfig


export { useRuntimeConfig }