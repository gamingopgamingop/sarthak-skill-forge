export const config: NoopConfig = {
  type: 'noop',
  name: 'StripeWebhook',
  description: 'Waits for payment confirmation from Stripe',
  virtualSubscribes: ['payment.initiated'],
  virtualEmits: ['/api/stripe/webhook'],
  flows: ['payment']
}