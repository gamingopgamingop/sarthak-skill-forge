const config = {
  name: 'chatMessage',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      userId: { type: 'string' },
      message: { type: 'string' },
      timestamp: { type: 'string' }
    },
    required: ['id', 'userId', 'message', 'timestamp']
  },
  baseConfig: {
    storageType: 'default'
  }
}
 
module.exports = { config }