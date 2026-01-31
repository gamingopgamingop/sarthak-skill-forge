// @ts-nocheck
// @ts-ignore
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { rateLimiter } from './middleware/rateLimiter'  
export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.status(200).json([
    {
      id: 1,
      title: 'Skill Forge',
      tech: ['React', 'Vite', 'Tailwind'],
      live: true
    },
    {
      id: 2,
      title: 'EliteResume',
      tech: ['Next.js', 'Postgres'],
      live: false
    }
  ])
}
