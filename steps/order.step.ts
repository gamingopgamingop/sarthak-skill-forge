import type { Handlers } from 'motia'
 
export const handler: Handlers['Order'] = async (req, { emit }) => {
  await emit({
    topic: 'order.created',
    data: { orderId: '123', amount: 99.99 },
  })
 
  return { status: 200, body: { success: true } }
}