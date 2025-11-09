import { z } from 'zod'
 
export const config = {
  type: 'event',
  name: 'WebsiteChecker',
  description: 'Performs HTTP checks on websites and emits results',
  subscribes: ['check.requested'],
  emits: ['check.result', 'status.stream'],
  input: z.object({
    url: z.string().url('Must be a valid URL')
  }),
  flows: ['uptime-monitoring'],
}
 
export const handler = async (input, { logger, emit }) => {
  const { url } = input
  
  logger.info('Starting website check', { url })
 
  const startTime = performance.now()
  let result
 
  try {
    // Validate URL format before making request
    const urlObj = new URL(url)
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Only HTTP and HTTPS protocols are supported')
    }
 
    // Perform HTTP request with timeout handling
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
 
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Motia-Uptime-Monitor/1.0',
        'Accept': '*/*',
        'Cache-Control': 'no-cache'
      },
      redirect: 'manual'
    })
 
    clearTimeout(timeoutId)
    const endTime = performance.now()
    const responseTime = Math.round(endTime - startTime)
 
    // Determine status: 2xx and 3xx as UP, everything else as DOWN
    const status = (response.status >= 200 && response.status < 400) ? 'UP' : 'DOWN'
 
    result = {
      url,
      status,
      code: response.status,
      responseTime,
      checkedAt: new Date().toISOString(),
      error: null
    }
 
    logger.info('Website check completed', {
      url,
      status,
      code: response.status,
      responseTime
    })
 
  } catch (error) {
    const endTime = performance.now()
    const responseTime = Math.round(endTime - startTime)
 
    let errorMessage = error.message
 
    // Handle specific error types with detailed messages
    if (error.name === 'AbortError') {
      errorMessage = 'Request timeout (10s)'
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorMessage = 'Network error - unable to connect'
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'DNS resolution failed'
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused'
    }
 
    result = {
      url,
      status: 'DOWN',
      code: null,
      responseTime,
      checkedAt: new Date().toISOString(),
      error: errorMessage
    }
 
    logger.error('Website check failed', {
      url,
      error: errorMessage,
      responseTime,
      originalError: error.code || error.name
    })
  }
 
  // Emit results to both alerter and dashboard
  await emit({ topic: 'check.result', data: result })
  await emit({ topic: 'status.stream', data: result })
 
  logger.info('Check results emitted successfully', { url, status: result.status })
}