// Handles "openai.negativeSentiment"
import { Handlers } from 'motia'
import { z } from 'zod'
 
export const config = {
  type: 'event',
  name: 'handleNegative',
  description: 'Handles negative or unknown sentiment responses.',
  subscribes: ['openai.negativeSentiment'],
  emits: [],
  input: z.object({
    sentiment: z.string(),
    analysis: z.string().optional(),
  }),
  flows: ['sentiment-demo'],
} as const
 
export const handler: Handlers['handleNegative'] = async (input, { logger }) => {
  logger.info('[Negative Responder] The sentiment is negative or unknown.', { analysis: input.analysis })
  // Could escalate to a service, or respond gently, etc.
}