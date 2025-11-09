import { z } from 'zod'
import { getSnapshot } from '../lib/streams.js'
import { config as envConfig } from '../lib/env.js'
 
export const config = {
  type: 'api',
  name: 'HealthCheck',
  description: 'Provides system health status endpoint',
  method: 'GET',
  path: '/healthz',
  emits: [],
  responseSchema: {
    200: z.object({
      status: z.literal('ok'),
      sitesConfigured: z.number(),
      lastKnown: z.record(z.any()),
      now: z.string()
    })
  },
  flows: ['uptime-monitoring'],
}
 
export const handler = async (_, { logger }) => {
  logger.info('Health check endpoint accessed')
  
  try {
    const now = new Date().toISOString()
    const sitesConfigured = envConfig.sites.length
    const lastKnown = getSnapshot()
    
    const response = {
      status: 'ok',
      sitesConfigured,
      lastKnown,
      now
    }
    
    logger.info('Health check completed successfully', { 
      sitesConfigured,
      sitesWithStatus: Object.keys(lastKnown).length
    })
    
    return {
      status: 200,
      body: response
    }
    
  } catch (error) {
    logger.error('Health check failed', { 
      error: error.message,
      stack: error.stack
    })
    
    return {
      status: 200,
      body: {
        status: 'ok',
        sitesConfigured: 0,
        lastKnown: {},
        now: new Date().toISOString(),
        error: error.message
      }
    }
  }
}