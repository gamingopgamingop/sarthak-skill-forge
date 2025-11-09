export const coreMiddleware = async (req, ctx, next) => {
  try {
    return await next()
  } catch (error) {
    ctx.logger.error('Error', { error })
    return { status: 500, body: { error: 'Internal server error' } }
  }
}