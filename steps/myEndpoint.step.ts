// steps/myEndpoint.step.ts
import { loggingMiddleware } from '../middlewares/logging.middleware';
import { authMiddleware }    from '../middlewares/auth.middleware';
import { errorMiddleware }   from '../middlewares/error.middleware';

export const config = {
  name:   'MyEndpoint',
  type:   'api',
  path:   '/endpoint',
  method: 'POST',
  middleware: [
    loggingMiddleware,  // Runs first
    authMiddleware,     // Runs second
    errorMiddleware     // Runs third
  ]
};

export const handler = async (req, ctx) => {
  // your business logic here
  return { status: 200, body: { message: 'Success' } };
};
