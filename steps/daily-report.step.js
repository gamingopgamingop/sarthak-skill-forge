const config = {
  name: 'DailyReport',
  type: 'cron',
  cron: '0 9 * * *', // Run daily at 9 AM
  flows: ['reports'],
}
 
const handler = async ({ emit, logger }) => {
  logger.info('Running daily report')
  await emit({
    topic: 'report.generated',
    data: { date: new Date().toISOString() },
  })
}
 
module.exports = { config, handler }