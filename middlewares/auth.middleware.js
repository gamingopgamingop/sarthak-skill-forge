const authMiddleware = async (req, ctx, next) => {
  if (!req.headers.authorization) {
    return { status: 401, body: { error: 'Unauthorized' } }
  }
  return next()
}
 
const config = {
  name: 'ProtectedEndpoint',
  type: 'api',
  path: '/protected',
  method: 'GET',
  middleware: [authMiddleware]
}
 
const handler = async (req, ctx) => {
  return { status: 200, body: { message: 'Success' } }
}
 
module.exports = { config, handler }