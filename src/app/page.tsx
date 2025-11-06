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

// import Modal from './ui/modal'
// import Cart from './ui/cart'
 
// export default function Page() {
//   return (
//     <Modal>
//       <Cart />
//     </Modal>
//   )
// }

import Carousel from './carousel'
import Image from 'next/image'

export default function Page() {
  return (
    <div>
      <p>View pictures</p>
      {/*  Works, since Carousel is a Client Component */}
      <Carousel />
    </div>
  )
}

export default function Page() {
  return <Image src="" alt="" />
}

export default function Page() {
  return (
    <Image
      src="/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}

export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
 
// Conflict
// `app/route.ts`
export async function POST(request: Request) {}
