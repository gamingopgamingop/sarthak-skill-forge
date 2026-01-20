export {}

declare global {
  const useApi: () => {
    get: (url: string) => Promise<any>
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $api: any
    $toast: (msg: string) => void
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  const content: any
  export default content
}