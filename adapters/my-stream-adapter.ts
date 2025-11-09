import { StreamAdapter } from '@motiadev/core'
import type { BaseStreamItem } from '@motiadev/core'
 
export class MyStreamAdapter<TData> extends StreamAdapter<TData> {
  private storage: Map<string, TData> = new Map()
 
  constructor(streamName: string) {
    super(streamName)
  }
 
  async get(groupId: string, id: string): Promise<BaseStreamItem<TData> | null> {
    const key = `${groupId}:${id}`
    const data = this.storage.get(key)
    return data ? { ...data, id } as BaseStreamItem<TData> : null
  }
 
  async set(groupId: string, id: string, data: TData): Promise<BaseStreamItem<TData>> {
    const key = `${groupId}:${id}`
    this.storage.set(key, data)
    return { ...data, id } as BaseStreamItem<TData>
  }
 
  async delete(groupId: string, id: string): Promise<BaseStreamItem<TData> | null> {
    const key = `${groupId}:${id}`
    const item = await this.get(groupId, id)
    if (item) {
      this.storage.delete(key)
    }
    return item
  }
 
  async getGroup(groupId: string): Promise<BaseStreamItem<TData>[]> {
    const items: BaseStreamItem<TData>[] = []
    for (const [key, value] of this.storage.entries()) {
      if (key.startsWith(`${groupId}:`)) {
        const id = key.split(':').pop()!
        items.push({ ...value, id } as BaseStreamItem<TData>)
      }
    }
    return items
  }
}