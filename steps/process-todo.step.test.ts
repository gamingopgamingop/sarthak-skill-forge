import { createMotiaTester } from '@motiadev/test'
import { describe, it, expect, afterAll } from 'vitest'
 
describe('ProcessTodo', () => {
  const tester = createMotiaTester()
 
  afterAll(async () => {
    await tester.close()
  })
 
  it('should process todo when todo.created is emitted', async () => {
    const watcher = await tester.watch('todo.processed')
 
    // Manually emit the event that triggers the step
    await tester.emit({
      topic: 'todo.created',
      data: { id: '123', description: 'Test todo' },
      traceId: 'test-trace'
    })
 
    await tester.waitEvents()
 
    const events = watcher.getCapturedEvents()
    expect(events).toHaveLength(1)
    expect(events[0].data).toMatchObject({
      id: '123',
      description: 'Test todo',
      processed: true
    })
  })
})