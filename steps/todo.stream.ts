import { StreamConfig } from 'motia'
import { z } from 'zod'
 
const todoSchema = z.object({
  id: z.string(),
  description: z.string(),
  createdAt: z.string(),
  dueDate: z.string().optional(),
  completedAt: z.string().optional()
})
 
export const config: StreamConfig = {
  name: 'todo',
  schema: todoSchema,
  baseConfig: { storageType: 'default' }
}
 
export type Todo = z.infer<typeof todoSchema>