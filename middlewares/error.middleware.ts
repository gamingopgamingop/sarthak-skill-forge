// middlewares/error.middleware.ts
import type { ApiMiddleware } from 'motia';

export const errorMiddleware: ApiMiddleware = async (req, ctx, next) => {
  try {
    return await next();
  } catch (err: any) {
    ctx.logger.error('Unhandled error', { error: err.message });
    return { status: 500, body: { error: 'Internal Server Error' } };
  }
};
