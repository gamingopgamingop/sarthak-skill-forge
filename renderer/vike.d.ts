import 'vike/types'
export {}
declare global {
  namespace Vike {
    interface PageContext {
      user?: { name: string; id: number }
      initialStoreState?: { todoList: any[] }
      data?: {
        product: any ;
        user: any
      }
    }
    interface Photon {
      // Set this to your actual server framework
      server: 'express' 
    }
  }
}