// pages/+onCreatePageContext.ts
// @ts-ignore
// @ts-nocheck
export { onCreatePageContext }

import type { PageContext } from 'vike/types'

async function onCreatePageContext(pageContext: PageContext) {
  pageContext.myCustomProp = { hello: 'world' }
}

declare global {
  namespace Vike {
    // Or `interface PageContextServer` if you define +onCreatePageContext.server.ts
    // Or `interface PageContextClient` if you define +onCreatePageContext.client.ts
    interface PageContext {
      // Type of pageContext.myCustomProp
      myCustomProp: {
        hello: string
      }
    }
  }
}