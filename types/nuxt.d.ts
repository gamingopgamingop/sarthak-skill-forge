/// <reference types="nuxt" />
/// <reference types="@nuxt/schema" />


declare module '#app' {
  interface NuxtApp {
    $hello(msg: string): string
  }
}