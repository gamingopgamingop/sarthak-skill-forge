// Token bucket rate limiter with per-site isolation
export function createRateLimiter({ burst, windowSec }) {
  const buckets = new Map()
  const refillRate = burst / (windowSec * 1000)
 
  function consume(siteUrl) {
    const bucket = getBucket(siteUrl)
    refillBucket(bucket)
    
    if (bucket.tokens >= 1) {
      bucket.tokens -= 1
      return true
    }
    
    return false
  }
 
  function getBucket(siteUrl) {
    if (!buckets.has(siteUrl)) {
      buckets.set(siteUrl, {
        tokens: burst,
        lastRefill: Date.now()
      })
    }
    return buckets.get(siteUrl)
  }
 
  function refillBucket(bucket) {
    const now = Date.now()
    const timePassed = now - bucket.lastRefill
    
    if (timePassed > 0) {
      const tokensToAdd = timePassed * refillRate
      bucket.tokens = Math.min(burst, bucket.tokens + tokensToAdd)
      bucket.lastRefill = now
    }
  }
 
  return { consume, /* other methods */ }
}