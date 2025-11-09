// // middlewares/error.middleware.ts
// import type { ApiMiddleware } from 'motia';

// export const errorMiddleware: ApiMiddleware = async (req, ctx, next) => {
//   try {
//     return await next();
//   } catch (err: any) {
//     ctx.logger.error('Unhandled error', { error: err.message });
//     return { status: 500, body: { error: 'Internal Server Error' } };
//   }
// };
\
import { ZodError } from 'zod'
import type { ApiMiddleware } from 'motia'

export const errorMiddleware: ApiMiddleware = async (req, ctx, next) => {
  try {
    return await next()
  } catch (error: any) {
    if (error instanceof ZodError) {
      ctx.logger.error('Validation error', { errors: error.errors })
      return { status: 400, body: { error: 'Validation failed' } }
    }

    ctx.logger.error('Unexpected error', { error: error.message })
    return { status: 500, body: { error: 'Internal server error' } }
  }
}
