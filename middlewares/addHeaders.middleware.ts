// middlewares/addHeaders.middleware.ts
import type { ApiMiddleware } from 'motia'

export const addHeadersMiddleware: ApiMiddleware = async (req, ctx, next) => {
  const response = await next()
  return {
    ...response,
    headers: {
      ...(response.headers || {}),
      'X-Request-Id': ctx.traceId
    }
  }
}
