// Motia discovers this file because:
// 1. Filename contains '.step.'
// 2. Exports 'config' object  
// 3. Has .js extension -> uses Node.js runtime
 
export const config = {
  type: 'event',
  name: 'send-notifications',
  description: 'Send notifications via multiple channels',
  subscribes: ['data.processed'],
  emits: ['notifications.sent'],
  flows: ['user-management']
}
 
export const handler = async (input, { emit, logger }) => {
  logger.info('Sending notifications', { data: input })
  
  // Send email, SMS, push notifications, etc.
  const results = await Promise.all([
    sendEmail(input),
    sendSMS(input),
    sendPush(input)
  ])
  
  await emit({
    topic: 'notifications.sent',
    data: { 
      results,
      sent_at: new Date().toISOString() 
    }
  })
}
 
async function sendEmail(data) { /* implementation */ }
async function sendSMS(data) { /* implementation */ }  
async function sendPush(data) { /* implementation */ }