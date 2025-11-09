export const config: NoopConfig = {
  type: 'noop',
  name: 'GitHubWebhook',
  description: 'Waits for repo events from GitHub',
  virtualSubscribes: ['repo.watched'],
  virtualEmits: ['/api/github/webhook'],
  flows: ['ci-cd']
}