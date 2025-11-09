export const config = {
  type: 'api',
  name: 'chat-with-ai',
  path: '/chat',
  method: 'POST'
}
 
export const handler = async (req, { logger }) => {
  // Use environment variables with process.env
  const apiKey = process.env.OPENAI_API_KEY
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  
  if (!apiKey) {
    return { status: 400, body: { error: 'Missing API key' } }
  }
  
  logger.info('Using OpenAI API', { hasKey: !!apiKey })
  
  // Your logic here...
  return { status: 200, body: { message: 'Success!' } }
}