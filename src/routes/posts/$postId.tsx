import BlogPage from '@/pages/BlogPage'
import { createFileRoute } from '@tanstack/react-router-dom'
import SEO from '@/components/SEO.tsx'

export const Route = createFileRoute('/posts/$postId')({
    component: BlogPage,
  beforeLoad: async ({ params }) => {
    const post = await BlogPage(params.postId)
    const SEO = await SEO()
    return { post, SEO: SEO() }
  },
  beforeError: async ({ error }) => {
    return { error }
  },
  afterError: async ({ error }) => {
    return { error }
  },
})

export default Route