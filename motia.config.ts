import { config } from '@motiadev/core'
const statesPlugin = require('@motiadev/plugin-states/plugin')
const endpointPlugin = require('@motiadev/plugin-endpoint/plugin')
const logsPlugin = require('@motiadev/plugin-logs/plugin')
const observabilityPlugin = require('@motiadev/plugin-observability/plugin')
import { RedisStateAdapter } from '@motiadev/adapter-redis-state'
import { RedisStreamAdapter } from '@motiadev/adapter-redis-streams'
import { RabbitMQEventAdapter } from '@motiadev/adapter-rabbitmq-events'
import { RedisCronAdapter } from '@motiadev/adapter-redis-cron'

export default config({
  plugins: [observabilityPlugin, statesPlugin, endpointPlugin, logsPlugin],
  adapters: {
    state: new RedisStateAdapter({
      host: process.env.REDIS_HOST,
      port: 6379,
    }),
    streams: new RedisStreamAdapter({
      host: process.env.REDIS_HOST,
      port: 6379,
    }),
    events: new RabbitMQEventAdapter({
      url: process.env.RABBITMQ_URL,
    }),
    cron: new RedisCronAdapter({
      host: process.env.REDIS_HOST,
      port: 6379,
    }),
  },

})
