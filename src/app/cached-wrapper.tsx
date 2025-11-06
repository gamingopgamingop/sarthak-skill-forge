import type { ReactNode } from 'react'
import { setTimeout } from 'node:timers/promises'
 
async function getSiteTitle() {
  // Simulate a slow database or API call
  await setTimeout(1000) // from 'node:timers/promises'
  return 'My Website'
}
 
export async function CachedWrapper({ children }: { children: ReactNode }) {
  'use cache'
  const title = await getSiteTitle()
 
  // Don't introspect children, just pass it through
  return (
    <div className="wrapper">
      <h1>{title}</h1>
      {children}
    </div>
  )
}