import type { StateAdapter, StateItem, StateItemsInput } from '@motiadev/core'
 
export class MyStateAdapter implements StateAdapter {
  private storage: Map<string, Map<string, unknown>> = new Map()
 
  async get<T>(traceId: string, key: string): Promise<T | null> {
    const trace = this.storage.get(traceId)
    if (!trace) return null
    return (trace.get(key) as T) || null
  }
 
  async set<T>(traceId: string, key: string, value: T): Promise<T> {
    let trace = this.storage.get(traceId)
    if (!trace) {
      trace = new Map()
      this.storage.set(traceId, trace)
    }
    trace.set(key, value)
    return value
  }
 
  async delete<T>(traceId: string, key: string): Promise<T | null> {
    const trace = this.storage.get(traceId)
    if (!trace) return null
    const value = trace.get(key) as T | undefined
    if (value !== undefined) {
      trace.delete(key)
      return value
    }
    return null
  }
 
  async getGroup<T>(traceId: string): Promise<T[]> {
    const trace = this.storage.get(traceId)
    if (!trace) return []
    return Array.from(trace.values()) as T[]
  }
 
  async clear(traceId: string): Promise<void> {
    this.storage.delete(traceId)
  }
 
  async cleanup(): Promise<void> {
    this.storage.clear()
  }
 
  async keys(traceId: string): Promise<string[]> {
    const trace = this.storage.get(traceId)
    if (!trace) return []
    return Array.from(trace.keys())
  }
 
  async traceIds(): Promise<string[]> {
    return Array.from(this.storage.keys())
  }
 
  async items(input: StateItemsInput): Promise<StateItem[]> {
    const items: StateItem[] = []
    for (const [traceId, trace] of this.storage.entries()) {
      const groupId = input.groupId || traceId
      for (const [key, value] of trace.entries()) {
        items.push({
          groupId,
          key,
          type: this._inferType(value),
          value: value as any,
        })
      }
    }
    return items
  }
 
  private _inferType(value: unknown): StateItem['type'] {
    if (value === null) return 'null'
    if (Array.isArray(value)) return 'array'
    if (typeof value === 'object') return 'object'
    return typeof value as StateItem['type']
  }
}