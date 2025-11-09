import type { CronConfig, Handlers } from 'motia'
 
export const config: CronConfig = {
  name: 'DailyReport',
  type: 'cron',
  cron: '0 9 * * *', // Run daily at 9 AM
  flows: ['reports'],
}
 
export const handler: Handlers['DailyReport'] = async ({ emit, logger }) => {
  logger.info('Running daily report')
  await emit({
    topic: 'report.generated',
    data: { date: new Date().toISOString() },
  })
}