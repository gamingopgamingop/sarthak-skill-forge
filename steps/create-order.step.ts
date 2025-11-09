export const handler: Handlers['CreateOrder'] = async (req, { logger, traceId }) => {
  logger.info('Order started', { traceId })
  
  // traceId stays the same across all Steps in this flow
  await emit({ 
    topic: 'process.payment', 
    data: { orderId: '123' } 
  })
  
  return { status: 200, body: { traceId } }
}