import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'
 
// Motia discovers this file because:
// 1. Filename contains '.step.'
// 2. Exports 'config' object
// 3. Has .ts extension -> uses TypeScript runtime
export const config: ApiRouteConfig = {
  type: 'api',
  name: 'user-api',
  path: '/users',
  method: 'GET',
  emits: ['users.fetched'],
  flows: ['user-management']
}
 
export const handler: Handlers['user-api'] = async (req, { emit }) => {
  await emit({
    topic: 'users.fetched', 
    data: { users: [] }
  })
  
  return {
    status: 200,
    body: { message: 'Users retrieved' }
  }
}