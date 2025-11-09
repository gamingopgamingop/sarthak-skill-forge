import { StreamConfig } from 'motia'
import { z } from 'zod'
 
export const config: StreamConfig = {
  name: 'chatMessage',
  schema: z.object({
    id: z.string(),
    userId: z.string(),
    message: z.string(),
    timestamp: z.string()
  }),
  baseConfig: {
    storageType: 'default'
  }
}