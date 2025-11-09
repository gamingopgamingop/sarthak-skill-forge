import { config } from '@motiadev/core'
const statesPlugin = require('@motiadev/plugin-states/plugin')
const endpointPlugin = require('@motiadev/plugin-endpoint/plugin')
const logsPlugin = require('@motiadev/plugin-logs/plugin')
const observabilityPlugin = require('@motiadev/plugin-observability/plugin')

import { RedisStateAdapter } from '@motiadev/adapter-redis-state'
import { RedisStreamAdapterManager } from '@motiadev/adapter-redis-streams'
import { RabbitMQEventAdapter } from '@motiadev/adapter-rabbitmq-events'
import { RedisCronAdapter } from '@motiadev/adapter-redis-cron'

export default config({
  plugins: [
    observabilityPlugin,
    statesPlugin,
    endpointPlugin,
    logsPlugin,
  ],

  adapters: {
    state: new RedisStateAdapter({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      database: parseInt(process.env.REDIS_DATABASE || '0'),
      keyPrefix: process.env.STATE_KEY_PREFIX || 'motia:state:',
      ttl: parseInt(process.env.STATE_TTL || '3600'),
      socket: {
        connectTimeout: 10000,
        reconnectStrategy: (retries) => {
          if (retries > 20) return new Error('Too many retries')
          return Math.min(retries * 50, 2000)
        },
      },
    }),

    streams: new RedisStreamAdapterManager({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      database: parseInt(process.env.REDIS_DATABASE || '0'),
      keyPrefix: process.env.STREAM_KEY_PREFIX || 'motia:stream:',
      socket: {
        connectTimeout: 10000,
        reconnectStrategy: (retries) => {
          if (retries > 20) return new Error('Too many retries')
          return Math.min(retries * 50, 2000)
        },
      },
    }),

    events: new RabbitMQEventAdapter({
      url: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
      exchangeName: process.env.RABBITMQ_EXCHANGE || 'motia.events',
      exchangeType: 'topic',
      durable: true,
      autoDelete: false,
      connectionTimeout: 10000,
      reconnectDelay: 5000,
      prefetch: 10,
    }),

    cron: new RedisCronAdapter({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME,
      database: parseInt(process.env.REDIS_DATABASE || '0'),
      keyPrefix: process.env.CRON_KEY_PREFIX || 'motia:cron:lock:',
      lockTTL: parseInt(process.env.CRON_LOCK_TTL || '300000'),
      lockRetryDelay: 1000,
      lockRetryAttempts: 0,
      instanceId: process.env.INSTANCE_ID,
      enableHealthCheck: true,
      socket: {
        connectTimeout: 10000,
        reconnectStrategy: (retries) => {
          if (retries > 20) {
            return new Error('Too many retries')
          }
          return Math.min(retries * 50, 2000)
        },
      },
    }),
  },
})
