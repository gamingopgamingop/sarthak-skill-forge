export const config: NoopConfig = {
  type: 'noop',
  name: 'ManagerReview',
  description: 'Manager reviews the request',
  virtualSubscribes: ['approval.requested'],
  virtualEmits: ['/api/approvals/submit'],
  flows: ['approval']
}