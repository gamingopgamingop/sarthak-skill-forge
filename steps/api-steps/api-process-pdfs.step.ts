import { Handlers } from 'motia'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
 
export const config = {
  type: 'api',
  name: 'api-process-pdfs',
  description: 'API endpoint to start PDF processing pipeline',
  path: '/api/rag/process-pdfs',
  method: 'POST',
  emits: ['rag.read.pdfs'],
  bodySchema: z.object({
    folderPath: z.string().min(1, 'folderPath is required'),
  }),
  flows: ['rag-workflow'],
} as const
 
export const handler: Handlers['api-process-pdfs'] = async (req, { emit, logger }) => {
  const { folderPath } = req.body
  const streamId = uuidv4()
 
  logger.info('Starting PDF processing pipeline', { folderPath, streamId })
 
  // Emit event to start the processing chain
  await emit({
    topic: 'rag.read.pdfs',
    data: { folderPath, streamId },
  })
 
  return {
    status: 200,
    body: { 
      message: 'PDF processing started',
      streamId,
      status: 'processing'
    },
  }
}