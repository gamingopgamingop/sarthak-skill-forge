import { z } from 'zod'
 
export const config = {
  type: 'event',
  name: 'NotificationHandler',
  description: 'Send notifications after Python processing',
  subscribes: ['python.done'],
  emits: ['notification.sent'],
  input: z.object({
    id: z.number(),
    python_message: z.string(),
    processed_by: z.array(z.string()),
    processing_time: z.number(),
    analysis: z.record(z.unknown()).optional()
  }),
  flows: ['data-processing']
} as const
 
export const handler = async (input: any, { logger, emit }: any) => {
  logger.info('📧 Sending notifications after Python processing', { id: input.id })
  
  // Simulate sending notifications (email, slack, etc.)
  const notification = {
    id: input.id,
    message: `Notification: ${input.python_message}`,
    processed_by: input.processed_by,
    sent_at: new Date().toISOString()
  }
 
  // Send notification data to final step
  await emit({
    topic: 'notification.sent',
    data: {
      ...notification,
      processing_time: input.processing_time
    }
  })
 
  logger.info('✅ Notifications sent successfully', { id: input.id })
}