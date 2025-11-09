// daily-report.step.ts

import { Handlers } from './types'

// This handler generates a daily business report and sends it to a stream or dashboard
export const handler: Handlers['DailyReport'] = async (req, { state, streams, emit, logger }) => {
  logger.info('📊 Generating daily report...')

  // 1️⃣ Fetch orders, messages, and analytics data from state
  const orders = await state.list('orders')
  const messages = await streams.messages.list('chat-analytics')

  // 2️⃣ Process data — count totals, averages, etc.
  const totalOrders = orders.length
  const totalMessages = messages.length
  const avgMessagesPerOrder = totalOrders > 0 ? (totalMessages / totalOrders).toFixed(2) : 0

  // 3️⃣ Create a summary report object
  const report = {
    date: new Date().toISOString().split('T')[0],
    totalOrders,
    totalMessages,
    avgMessagesPerOrder,
  }

  // 4️⃣ Save to state or external dashboard stream
  await state.set('reports', `report-${report.date}`, report)
  await streams.reports.set('daily', `report-${report.date}`, report)

  // 5️⃣ Emit event for analytics/dashboard sync
  await emit({ topic: 'report.daily.generated', data: report })

  logger.info(`✅ Daily report generated for ${report.date}`)
}
