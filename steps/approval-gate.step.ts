import { NoopConfig } from 'motia'
 
export const config: NoopConfig = {
  type: 'noop',
  name: 'ApprovalGate',
  description: 'Manager reviews and approves',
  virtualSubscribes: ['order.created'],
  virtualEmits: ['order.approved', 'order.rejected'],
  flows: ['order-flow']
}
 
// No handler! NOOP steps don't run code