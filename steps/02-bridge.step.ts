import { z } from 'zod'
 
// Bridge step to connect app starter to Python processing
export const config = {
  type: 'event',
  name: 'AppBridge',
  description: 'Bridge between app start and Python processing',
  subscribes: ['app.started'],
  emits: ['data.processed'],
  input: z.object({
    id: z.number(),
    input: z.record(z.unknown()),
    started_at: z.string(),
    traceId: z.string()
  }),
  flows: ['data-processing']
} as const
 
export const handler = async (input: any, { logger, emit }: any) => {
  logger.info('🌉 Processing app data and sending to Python', { appId: input.id })
  
  // Process data for Python step
  const processedResult = {
    original_id: input.id,
    processed_at: input.started_at,
    result: `Processed: ${JSON.stringify(input.input)}`,
    confidence: 0.95,
    model_version: '1.0'
  }
 
  // Send to Python processing
  await emit({
    topic: 'data.processed', 
    data: processedResult
  })
 
  logger.info('✅ Data sent to Python processing', { 
    originalId: input.id
  })
}