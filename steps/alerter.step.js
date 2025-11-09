// import { z } from 'zod'
// import { getPreviousStatus } from '../lib/streams.js'
// import { createRateLimiter } from '../lib/rate-limiter.js'
// import { config as envConfig } from '../lib/env.js'
 
// // Create a rate limiter instance for Discord alerts
// const rateLimiter = createRateLimiter({
//   burst: envConfig.alertBurst,
//   windowSec: envConfig.alertWindowSec
// })
 
// export const config = {
//   type: 'event',
//   name: 'DiscordAlerter',
//   description: 'Sends Discord notifications when website status changes',
//   subscribes: ['check.result'],
//   emits: [],
//   input: z.object({
//     url: z.string().url(),
//     status: z.enum(['UP', 'DOWN']),
//     code: z.number().nullable(),
//     responseTime: z.number(),
//     checkedAt: z.string(),
//     error: z.string().nullable()
//   }),
//   flows: ['uptime-monitoring'],
// }
 
// function createDiscordMessage(result, previousStatus) {
//   const { url, status, code, responseTime, checkedAt, error } = result
 
//   const isUp = status === 'UP'
//   const emoji = isUp ? '🟢' : '🔴'
//   const color = isUp ? 0x00ff00 : 0xff0000
 
//   const content = `${emoji} ${url} is ${status}${code ? ` (${code})` : ''}`
 
//   const fields = [
//     {
//       name: 'Response Time',
//       value: `${responseTime}ms`,
//       inline: true
//     }
//   ]
 
//   if (code !== null) {
//     fields.push({
//       name: 'Status Code',
//       value: code.toString(),
//       inline: true
//     })
//   }
 
//   if (error) {
//     fields.push({
//       name: 'Error',
//       value: error,
//       inline: false
//     })
//   }
 
//   fields.push({
//     name: 'Previous Status',
//     value: previousStatus,
//     inline: true
//   })
 
//   return {
//     content,
//     embeds: [{
//       title: `Website Status Change: ${status}`,
//       description: `${url} changed from ${previousStatus} to ${status}`,
//       color,
//       timestamp: checkedAt,
//       fields
//     }]
//   }
// }
 
// export const handler = async (input, { logger }) => {
//   const { url, status } = input
 
//   // Get the previous status for comparison
//   const previousResult = getPreviousStatus(url)
 
//   // Handle first-time checks
//   if (!previousResult) {
//     logger.info('First-time check for site, no alert needed', { url, status })
//     const { updateLastStatus } = await import('../lib/streams.js')
//     updateLastStatus(input)
//     return
//   }
 
//   const previousStatus = previousResult.status
 
//   // Only trigger alerts when status actually changes
//   if (status === previousStatus) {
//     logger.debug('Status unchanged, no alert needed', { url, status, previousStatus })
//     const { updateLastStatus } = await import('../lib/streams.js')
//     updateLastStatus(input)
//     return
//   }
 
//   // Status has changed - check rate limiting
//   logger.info('Status change detected', {
//     url,
//     previousStatus,
//     newStatus: status,
//     transition: `${previousStatus} → ${status}`
//   })
 
//   if (!rateLimiter.consume(url)) {
//     const timeUntilNext = rateLimiter.getTimeUntilNextToken(url)
//     logger.warn('Alert rate limited', {
//       url,
//       status,
//       previousStatus,
//       timeUntilNextMs: timeUntilNext,
//       tokensRemaining: rateLimiter.getTokenCount(url)
//     })
//     return
//   }
 
//   // Send Discord notification
//   const message = createDiscordMessage(input, previousStatus)
  
//   try {
//     const response = await fetch(envConfig.discordWebhook, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': 'Motia-Uptime-Monitor/1.0'
//       },
//       body: JSON.stringify(message)
//     })
 
//     if (response.ok) {
//       logger.info('Discord alert sent successfully', { url, status, previousStatus })
//     } else {
//       const errorText = await response.text().catch(() => 'Unknown error')
//       logger.error('Discord webhook failed', {
//         status: response.status,
//         error: errorText
//       })
//     }
//   } catch (error) {
//     logger.error('Failed to send Discord webhook', {
//       error: error.message
//     })
//   }
 
//   // Update status store after sending alert
//   const { updateLastStatus } = await import('../lib/streams.js')
//   updateLastStatus(input)
// }

function createDiscordMessage(result, previousStatus) {
  const { url, status, code, responseTime } = result
  
  // Custom colors for your brand
  const color = status === 'UP' ? 0x2ecc71 : 0xe74c3c
  
  // Custom emoji and formatting
  const emoji = status === 'UP' ? '✅' : '❌'
  const urgency = responseTime > 5000 ? '🐌 SLOW' : '⚡ FAST'
  
  return {
    content: `${emoji} **${url}** is ${status}`,
    embeds: [{
      title: `${urgency} Website ${status}`,
      description: `**${url}** changed from ${previousStatus} to ${status}`,
      color,
      timestamp: result.checkedAt,
      fields: [
        {
          name: '⏱️ Response Time',
          value: `${responseTime}ms`,
          inline: true
        },
        {
          name: '📊 Status Code', 
          value: code?.toString() || 'N/A',
          inline: true
        }
      ]
    }]
  }
}