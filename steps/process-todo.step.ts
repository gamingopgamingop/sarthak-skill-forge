export const config: EventConfig = {
  type: 'event',
  name: 'ProcessTodo',
  subscribes: ['todo.created'],
  emits: ['todo.processed'],
  input: z.object({ id: z.string(), description: z.string() })
}
 
export const handler: Handlers['ProcessTodo'] = async (input, { emit, logger }) => {
  logger.info('Processing todo', { id: input.id })
  
  // Do some processing
  const processed = { ...input, processed: true }
  
  await emit({ topic: 'todo.processed', data: processed })
}