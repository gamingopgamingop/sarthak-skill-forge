// 'use client'
 
// import { useSearchParams } from 'next/navigation'
 
// export default function SortProducts() {
//   const searchParams = useSearchParams()
 
//   function updateSorting(sortOrder: string) {
//     const params = new URLSearchParams(searchParams.toString())
//     params.set('sort', sortOrder)
//     window.history.pushState(null, '', `?${params.toString()}`)
//   }
 
//   return (
//     <>
//       <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
//       <button onClick={() => updateSorting('desc')}>Sort Descending</button>
//     </>
//   )
// }

'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function SortProducts() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
      <button onClick={() => updateSorting('desc')}>Sort Descending</button>
    </div>
  )
}
