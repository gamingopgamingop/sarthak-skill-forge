import type { CronConfig } from '../types/cronConfig'

export const config: CronConfig = {
  type: 'cron',
  name: 'MyScheduledTask',
  description: 'Runs every night at midnight to clean up expired sessions',
  cron: '0 0 * * *',
  emits: [{ topic: 'sessions.expired', data: {} }],
  flows: ['maintenance'],
}

export const handler = async ({ logger, emit }) => {
  logger.info('Starting session cleanup')
  // your cleanup logic…
  await emit({ topic: 'sessions.cleaned', data: {} })
  logger.info('Session cleanup completed')
}
