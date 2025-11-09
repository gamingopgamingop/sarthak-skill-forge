import type { Handlers } from '@motiadev/core'

// Works with both File and Redis adapters
export const handler: Handlers['MyStep'] = async (req, { state, streams, emit }) => {
  // Save order data
  await state.set('orders', 'order-123', { id: 'order-123', status: 'pending' })

  // Add chat message to stream
  await streams.messages.set('chat-123', 'msg-1', { text: 'Order received!' })

  // Emit event to RabbitMQ
  await emit({
    topic: 'order.created',
    data: { orderId: 'order-123', message: 'Order successfully created' },
  })
}
