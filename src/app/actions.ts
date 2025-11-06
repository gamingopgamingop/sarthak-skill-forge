import { cacheTag, updateTag ,revalidateTag} from 'next/cache'
 
export async function getCart() {
  'use cache'
  cacheTag('cart')
  // fetch data
}
 
export async function updateCart(itemId: string) {
  'use server'
  // write data using the itemId
  // update the user cart
  updateTag('cart')
}

export async function getPosts() {
  'use cache'
  cacheTag('posts')
  // fetch data
}
 
export async function createPost(post: FormData) {
  'use server'
  // write data using the FormData
  revalidateTag('posts', 'max')
}
