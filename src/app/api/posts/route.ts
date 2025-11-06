import { cacheTag } from 'next/cache'
 
async function getPosts() {
  'use cache'
  cacheTag('posts')
 
  const posts = await fetchPosts()
  return posts
}
 
export async function GET() {
  const posts = await getPosts()
  return Response.json(posts)
}