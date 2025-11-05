// export default function Page() {
//   return <h1>Hello, Next.js!</h1>
// }

// export default async function Page({
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }) {
//   const filters = (await searchParams).filters
// }

import Modal from './ui/modal'
import Cart from './ui/cart'
 
export default function Page() {
  return (
    <Modal>
      <Cart />
    </Modal>
  )
}