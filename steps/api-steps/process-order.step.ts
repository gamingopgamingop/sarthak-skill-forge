import type { Handlers } from '@motiadev/core'

// Step: Process Order
export const handler: Handlers['ProcessOrder'] = async (req, { state, streams, emit }) => {
  const { orderId, items, userId } = req.body || {}

  if (!orderId || !items || !userId) {
    return { error: 'Missing order details' }
  }

  // 1️⃣ Store the new order in Redis state
  const orderData = {
    orderId,
    userId,
    items,
    status: 'processing',
    createdAt: new Date().toISOString(),
  }

  await state.set('orders', orderId, orderData)

  // 2️⃣ Add a processing message to Redis streams (useful for dashboards)
  await streams.messages.set('orders-stream', orderId, {
    text: `Order ${orderId} is being processed`,
    timestamp: Date.now(),
  })

  // 3️⃣ Emit an event for other microservices
  await emit({
    topic: 'order.processed',
    data: {
      orderId,
      userId,
      status: 'processed',
    },
  })

  // 4️⃣ Update the order status in Redis
  await state.set('orders', orderId, {
    ...orderData,
    status: 'processed',
    processedAt: new Date().toISOString(),
  })

  return { message: `Order ${orderId} processed successfully`, orderId }
}
