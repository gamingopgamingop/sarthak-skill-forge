// middlewares/logging.middleware.ts
import type { ApiMiddleware } from 'motia';

export const loggingMiddleware: ApiMiddleware = async (req, ctx, next) => {
  ctx.logger.info('Incoming request', { path: req.path, method: req.method });
  const response = await next();
  ctx.logger.info('Outgoing response', { status: response.status });
  return response;
};
