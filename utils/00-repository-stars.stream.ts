import crypto from 'crypto'
 
type Args = {
  payload: string
  signature: string
  secret: string
  algorithm: 'sha1' | 'sha256'
}
 
export function verifyWebhookSignature(args: Args): boolean {
  const { payload, signature, secret, algorithm = 'sha256' } = args
 
  try {
    if (!signature) return false
 
    // Generate expected signature using HMAC
    const expectedSignature =
      algorithm === 'sha256'
        ? `sha256=${crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex')}`
        : `sha1=${crypto.createHmac('sha1', secret).update(payload, 'utf8').digest('hex')}`
 
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
  } catch (error) {
    return false
  }
}