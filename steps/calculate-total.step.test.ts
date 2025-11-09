import { createMockContext } from '@motiadev/test'
import { handler } from './calculate-total.step'
import { describe, it, expect } from 'vitest'
 
describe('CalculateTotal Handler', () => {
  it('should calculate total correctly', async () => {
    const mockContext = createMockContext()
    
    const input = { items: [{ price: 10 }, { price: 20 }] }
    
    await handler(input, mockContext)
    
    expect(mockContext.emit).toHaveBeenCalledWith({
      topic: 'total.calculated',
      data: { total: 30 }
    })
  })
 
  it('should log calculation', async () => {
    const mockContext = createMockContext()
    
    await handler({ items: [] }, mockContext)
    
    expect(mockContext.logger.info).toHaveBeenCalledWith(
      expect.stringContaining('Calculating total')
    )
  })
})