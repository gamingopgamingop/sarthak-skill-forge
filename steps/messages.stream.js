const config = {
  name: 'messages',
  schema: {
    type: 'object',
    properties: {
      content: { type: 'string' },
      userId: { type: 'string' },
      timestamp: { type: 'number' },
    },
    required: ['content', 'userId', 'timestamp'],
  },
  baseConfig: { storageType: 'default' },
}
 
module.exports = { config }