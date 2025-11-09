const addHeadersMiddleware = async (req, ctx, next) => {
  const response = await next()
  
  return {
    ...response,
    headers: {
      ...response.headers,
      'X-Request-Id': ctx.traceId
    }
  }
}