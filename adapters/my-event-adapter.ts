import type { EventAdapter, Event, SubscriptionHandle, QueueConfig } from '@motiadev/core'
import { v4 as uuidv4 } from 'uuid'
 
type Subscription = {
  topic: string
  handler: (event: Event<any>) => void | Promise<void>
  id: string
}
 
export class MyEventAdapter implements EventAdapter {
  private subscriptions: Map<string, Subscription> = new Map()
  private events: Map<string, Event<any>[]> = new Map()
 
  async emit<TData>(event: Event<TData>): Promise<void> {
    const topicEvents = this.events.get(event.topic) || []
    topicEvents.push(event)
    this.events.set(event.topic, topicEvents)
 
    for (const sub of this.subscriptions.values()) {
      if (sub.topic === event.topic) {
        await sub.handler(event)
      }
    }
  }
 
  async subscribe<TData>(
    topic: string,
    stepName: string,
    handler: (event: Event<TData>) => void | Promise<void>,
    options?: QueueConfig,
  ): Promise<SubscriptionHandle> {
    const id = uuidv4()
    this.subscriptions.set(id, { topic, handler: handler as any, id })
 
    return {
      topic,
      id,
      unsubscribe: async () => {
        await this.unsubscribe({ topic, id, unsubscribe: async () => {} })
      },
    }
  }
 
  async unsubscribe(handle: SubscriptionHandle): Promise<void> {
    this.subscriptions.delete(handle.id)
  }
 
  async shutdown(): Promise<void> {
    this.subscriptions.clear()
    this.events.clear()
  }
 
  async getSubscriptionCount(topic: string): Promise<number> {
    return Array.from(this.subscriptions.values()).filter(
      (sub) => sub.topic === topic,
    ).length
  }
 
  async listTopics(): Promise<string[]> {
    return Array.from(new Set(this.subscriptions.values().map((sub) => sub.topic)))
  }
}