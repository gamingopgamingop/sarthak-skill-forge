import { z } from 'zod'
import type { StreamConfig } from 'motia'
 
export const messageSchema = z.object({
  content: z.string(),
  userId: z.string(),
  timestamp: z.number(),
})
 
export type Message = z.infer<typeof messageSchema>
 
export const config: StreamConfig = {
  name: 'messages',
  schema: messageSchema,
  baseConfig: { storageType: 'default' },
}