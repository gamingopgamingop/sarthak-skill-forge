export const config: EventConfig = {
  type: 'event',
  name: 'ProcessFoodOrder',
  subscribes: ['process-food-order'],
  emits: ['notification'],
  flows: ['basic-tutorial']
}

export const handler: Handlers['ProcessOrder'] = async (input, { logger }) => {
  // Simple message
  logger.info('Processing order')
 
  // With context data
  logger.info('Order created', {
    orderId: input.id,
    total: input.total
  })

  
 
  // Errors
  try {
    await chargeCard(input.paymentMethod)
  } catch (error) {
    logger.error('Payment failed', {
      error: error.message,
      orderId: input.id
    })
  }
 
  // Warnings for unusual situations
  if (input.total > 1000) {
    logger.warn('Large order', {
      total: input.total,
      threshold: 1000
    })
  }
 
  // Debug info (only shows with --debug flag)
  logger.debug('Raw input', { input })
}