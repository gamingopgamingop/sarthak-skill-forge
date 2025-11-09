import { createMotiaTester } from '@motiadev/test'
import { describe, it, expect, afterAll } from 'vitest'
 
describe('CreateTodo', () => {
  const tester = createMotiaTester()
 
  afterAll(async () => {
    await tester.close()
  })
 
  it('should create a todo and return 200', async () => {
    const response = await tester.post('/todo', {
      body: { description: 'Buy milk' }
    })
 
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      id: expect.any(String),
      description: 'Buy milk'
    })
  })
 
  it('should emit todo.created event', async () => {
    const watcher = await tester.watch('todo.created')
 
    await tester.post('/todo', {
      body: { description: 'Buy bread' }
    })
 
    await tester.waitEvents()
 
    const events = watcher.getCapturedEvents()
    expect(events).toHaveLength(1)
    expect(events[0].data).toMatchObject({
      description: 'Buy bread'
    })
  })
})