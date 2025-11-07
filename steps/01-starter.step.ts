import { z } from 'zod'
 
const bodySchema = z.object({
  data: z.record(z.unknown()).optional(),
  message: z.string().optional()
})
 
// API endpoint to start the multi-language pipeline
export const config = {
  type: 'api',
  name: 'AppStarter',
  description: 'Start the multi-language app pipeline',
 
  method: 'POST',
  path: '/start-app',
 
  bodySchema,
  responseSchema: {
    200: z.object({
      message: z.string(),
      appId: z.number(),
      traceId: z.string()
    })
  },
 
  emits: ['app.started'],
  flows: ['data-processing']
} as const
 
export const handler = async (req: any, { logger, emit, traceId }: any) => {
  logger.info('🚀 Starting multi-language app', { body: req.body, traceId })
  
  const appData = {
    id: Date.now(),
    input: req.body.data || {},
    started_at: new Date().toISOString(),
    traceId
  }
 
  // Emit to next step
  await emit({
    topic: 'app.started',
    data: appData
  })
 
  logger.info('✅ App started successfully', { 
    appId: appData.id,
    traceId 
  })
 
  return {
    status: 200,
    body: {
      message: 'Multi-language app started successfully',
      appId: appData.id,
      traceId
    }
  }
}