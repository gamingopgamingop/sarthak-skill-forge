// pages/product/@id/+data.ts
// @ts-ignore
// @ts-nocheck
import type { PageContextServer } from 'vike/types'

export type Data = Awaited<ReturnType<typeof data>>
export async function data(pageContext: PageContextServer) {
  // Common built-in properties
  pageContext.urlParsed.pathname // /product/42
  pageContext.routeParams.id // 42
  pageContext.headers // { cookie: 'user-id=1337', ... }

  // Common custom properties
  pageContext.user // { name: 'John', id: 1337 }
  pageContext.initialStoreState // { todoList: [{ id: 1718872184291, text: 'Buy milk' }] }
}