// function generateStaticParams() {}
 
// export default function Page() {
//   return <h1>Hello, Blog Post Page!</h1>
// }

export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  return <h1>Blog post: {slug}</h1>
}