import type { Handlers } from 'motia'
 
export const handler: Handlers['Processor'] = async (req, { state, traceId }) => {
  // Set a value
  await state.set(traceId, 'userCount', 42)
 
  // Get a value
  const count = await state.get<number>(traceId, 'userCount')
 
  // Get all keys for a trace
  const keys = await state.keys(traceId)
 
  // Delete a value
  await state.delete(traceId, 'userCount')
 
  // Clear all state for a trace
  await state.clear(traceId)
 
  return { status: 200, body: { count } }
}