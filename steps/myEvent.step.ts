import type { EventConfig } from '../types/eventConfig'

export const config: EventConfig = {
  type: 'event',
  name: 'MyEventHandler',
  subscribes: ['some.topic'],
  emits: [{ topic: 'another.topic', data: {/* … */} }],
  input: z.object({ /* schema here */ }),
  flows: ['workflow-name']
}

export const handler = async (input, { logger }) => {
  logger.info('Received event', input)
  // your logic here
}
