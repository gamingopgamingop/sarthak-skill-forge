// @/renderer/types.ts
// @ts-ignore
// @ts-nocheck

// import type { PageContextBuiltIn } from 'vike/types'
// import type { PageContextBuiltInClient } from 'vike/types'
// import type { PageContextBuiltInServer } from 'vike/types'

// export type { PageContextServer }
// export type { PageContextClient }
// export type { PageContext }
// export type { PageProps }

// import type {
//   PageContextBuiltInServer,
//   /*
//   // When using Client Routing https://vite-plugin-ssr.com/clientRouting
//   PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
//   /*/
//   // When using Server Routing
//   PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient
  
//   //*/
// } from 'vite-plugin-ssr/types'
// // import type { 
// //   PageContextBuiltInClientWithClientRouting as 
// //   PageContextBuiltInClient 
// // } from 'vike/types'

// type Page = (pageProps: PageProps) => React.ReactElement
// type PageProps = Record<string, unknown>

// export type PageContextCustom = {
//   Page: Page
//   pageProps?: PageProps
//   urlPathname: string
//   exports: {
//     documentProps?: {
//       title?: string
//       description?: string
//     }
//   }
// }

// type PageContextServer = PageContextBuiltInServer<Page> & PageContextCustom
// type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

// type PageContext = PageContextClient | PageContextServer

// Export your public types
export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps }

// Import built-in types from Vike
import type {
  PageContextBuiltInServer,
  PageContextBuiltInClientWithClientRouting,
  PageContextBuiltInClientWithServerRouting
} from 'vike/types' // <-- v1.0.0 uses 'vike/types'

// Define your page and props types
type Page = (pageProps: PageProps) => React.ReactElement
type PageProps = Record<string, unknown>

// Custom page context
export type PageContextCustom = {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

// Unified client type (supports both client and server routing)
type PageContextBuiltInClient = 
  | PageContextBuiltInClientWithClientRouting<Page>
  | PageContextBuiltInClientWithServerRouting<Page>

// Full context types
type PageContextServer = PageContextBuiltInServer<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient & PageContextCustom
type PageContext = PageContextClient | PageContextServer
