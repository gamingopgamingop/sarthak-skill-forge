import { NuxtApp } from '#app'

declare module '#app' {
  interface NuxtApp {
    $api: any
    $toast: (msg: string) => void
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: any
    $toast: (msg: string) => void
  }
}

export {}
