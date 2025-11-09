import { ApiMiddleware } from 'motia'
 
const authMiddleware: ApiMiddleware = async (req, ctx, next) => {
  if (!req.headers.authorization) {
    return { status: 401, body: { error: 'Unauthorized' } }
  }
  return next()
}
 
export const config = {
  name: 'ProtectedEndpoint',
  type: 'api',
  path: '/protected',
  method: 'GET',
  middleware: [authMiddleware]
}
 
export const handler = async (req, ctx) => {
  return { status: 200, body: { message: 'Success' } }
}