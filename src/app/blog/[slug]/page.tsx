// function generateStaticParams() {}
 
// export default function Page() {
//   return <h1>Hello, Blog Post Page!</h1>
// }

// export default async function Page(props: PageProps<'/blog/[slug]'>) {
//   const { slug } = await props.params
//   return <h1>Blog post: {slug}</h1>
// }

// export default async function BlogPostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>
// }) {
//   const { slug } = await params
//   const post = await getPost(slug)
 
//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//     </div>
//   )
// }

export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
 
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...
}