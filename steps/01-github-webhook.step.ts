import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'
import { verifyWebhookSignature } from '../utils/verify-webhook-signature'
import { checkUserProfile } from '../utils/check-user-profile'
 
export const config: ApiRouteConfig = {
  type: 'api',
  name: 'GitHubStarWebhook',
  description: 'Process GitHub star webhook events with signature verification',
  method: 'POST',
  path: '/webhooks/github/star',
  bodySchema: z.object({
    action: z.enum(['created', 'deleted']),
    starred_at: z.string().optional(),
    repository: z.object({
      name: z.string(),
      full_name: z.string(),
      stargazers_count: z.number(),
      owner: z.object({ login: z.string() }),
    }),
    sender: z.object({
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().optional(),
      html_url: z.string(),
      url: z.string({ description: 'API URL' }),
    }),
  }),
  responseSchema: {
    200: z.object({
      message: z.string(),
      event: z.string(),
      processed: z.boolean(),
    }),
    400: z.object({ error: z.string() }),
    401: z.object({ error: z.string() }),
    500: z.object({ error: z.string() }),
  },
  emits: [],
  flows: ['github-star-processing'],
}
 
export const handler: Handlers['GitHubStarWebhook'] = async (
  req,
  { logger, streams, state, traceId }
) => {
  try {
    // Extract and validate GitHub headers
    const githubEvent = req.headers['x-github-event'] as string
    const githubDelivery = req.headers['x-github-delivery'] as string
    const githubSignature = req.headers['x-hub-signature-256'] as string
    const githubSignatureSha1 = req.headers['x-hub-signature'] as string
 
    // Only process star events
    if (githubEvent !== 'star') {
      logger.info('Ignoring non-star event', { githubEvent, githubDelivery })
 
      return {
        status: 200,
        body: {
          message: 'Event ignored - only processing star events',
          event: githubEvent,
          processed: false,
        },
      }
    }
 
    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET
 
    if (webhookSecret) {
      logger.info('Verifying webhook signature', {
        delivery: githubDelivery,
        event: githubEvent,
      })
 
      const isValidSignature = verifyWebhookSignature({
        payload: JSON.stringify(req.body),
        signature: githubSignature || githubSignatureSha1,
        secret: webhookSecret,
        algorithm: githubSignature ? 'sha256' : 'sha1',
      })
 
      if (!isValidSignature) {
        logger.warn('Invalid webhook signature', {
          delivery: githubDelivery,
          event: githubEvent,
        })
 
        return {
          status: 401,
          body: { error: 'Invalid webhook signature' },
        }
      }
    }
 
    // Extract repository and user data
    const repository = {
      fullName: req.body.repository.full_name,
      name: req.body.repository.name,
      organization: req.body.repository.owner.login,
    }
 
    const sender = {
      name: req.body.sender.name,
      login: req.body.sender.login,
      avatarUrl: req.body.sender.avatar_url,
      url: req.body.sender.html_url,
      apiUrl: req.body.sender.url,
    }
 
    // Prepare star data for stream
    const webhookData = {
      fullName: repository.fullName,
      name: repository.name,
      organization: repository.organization,
      lastUpdated: req.body.starred_at || new Date().toISOString(),
      stars: req.body.repository.stargazers_count,
    }
 
    // Update real-time stream - this automatically propagates to all clients!
    await streams.stars.set(repository.organization, repository.name, webhookData)
 
    logger.info('GitHub star webhook processed successfully', { ...webhookData, sender })
 
    // Optional: Fetch additional user profile data
    if (sender.apiUrl) {
      try {
        logger.info('Getting GitHub user profile', { apiUrl: sender.apiUrl })
        const userProfile = await checkUserProfile(sender.apiUrl)
        await state.set(repository.fullName, traceId, userProfile)
        logger.info('GitHub user profile', { userProfile })
      } catch (error: any) {
        logger.error('Failed to get GitHub user profile', { error: error.message })
      }
    }
 
    return {
      status: 200,
      body: {
        message: 'Star webhook processed successfully',
        event: githubEvent,
        processed: true,
      },
    }
  } catch (error: any) {
    logger.error('GitHub star webhook processing failed', {
      error: error.message,
      stack: error.stack,
    })
 
    return {
      status: 500,
      body: { error: 'Star webhook processing failed' },
    }
  }
}