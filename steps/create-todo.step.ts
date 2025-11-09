import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'
import { Todo } from './todo.stream'
 
export const config: ApiRouteConfig = {
  type: 'api',
  name: 'CreateTodo',
  method: 'POST',
  path: '/todo',
  bodySchema: z.object({
    description: z.string(),
    dueDate: z.string().optional()
  }),
  responseSchema: {
    200: z.object({
      id: z.string(),
      description: z.string(),
      createdAt: z.string(),
      dueDate: z.string().optional(),
      completedAt: z.string().optional()
    }),
    400: z.object({ error: z.string() })
  },
  emits: []
}
 
export const handler: Handlers['CreateTodo'] = async (req, { logger, streams }) => {
  logger.info('Creating new todo', { body: req.body })
 
  const { description, dueDate } = req.body
  const todoId = `todo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
 
  if (!description) {
    return { status: 400, body: { error: 'Description is required' } }
  }
 
  const newTodo: Todo = {
    id: todoId,
    description,
    createdAt: new Date().toISOString(),
    dueDate,
    completedAt: undefined
  }
 
  // Store in the 'inbox' group - all clients watching this group see the update!
  const todo = await streams.todo.set('inbox', todoId, newTodo)
 
  logger.info('Todo created successfully', { todoId })
 
  return { status: 200, body: todo }
}

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'CreateTodo',
  path: '/todo',
  method: 'POST',
  emits: ['todo.created'],
  bodySchema: z.object({ description: z.string() })
}
 
export const handler: Handlers['CreateTodo'] = async (req, { emit }) => {
  const todo = { id: '123', description: req.body.description }
  
  await emit({ topic: 'todo.created', data: todo })
  
  return { status: 200, body: todo }
}