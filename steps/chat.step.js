const handler = async (req, { streams }) => {
  // Set a stream item
  await streams.messages.set('chat-123', 'msg-1', {
    content: 'Hello!',
    userId: 'user-1',
    timestamp: Date.now(),
  })
 
  // Get a stream item
  const message = await streams.messages.get('chat-123', 'msg-1')
 
  // Get all items in a group
  const allMessages = await streams.messages.getGroup('chat-123')
 
  // Delete a stream item
  await streams.messages.delete('chat-123', 'msg-1')
 
  return { status: 200, body: { messages: allMessages } }
}
 
module.exports = { handler }