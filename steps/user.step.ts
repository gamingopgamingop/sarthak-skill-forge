import { coreMiddleware } from '../middlewares/core.middleware'
 
export const config = {
  name: 'GetUser',
  type: 'api',
  path: '/users/:id',
  method: 'GET',
  middleware: [coreMiddleware]
}