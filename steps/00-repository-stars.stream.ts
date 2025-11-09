import { StreamConfig } from 'motia'
import { z } from 'zod'
 
const RepositoryStarsSchema = z.object({
  stars: z.number(),
  name: z.string(),
  fullName: z.string(),
  organization: z.string(),
  lastUpdated: z.string(),
})
 
export type RepositoryStars = z.infer<typeof RepositoryStarsSchema>
 
export const config: StreamConfig = {
  name: 'stars',
  schema: RepositoryStarsSchema,
  baseConfig: { storageType: 'default' },
}