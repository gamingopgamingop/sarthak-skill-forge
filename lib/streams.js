// File-based persistent storage for site status
import { readFileSync, writeFileSync, existsSync } from 'fs'
 
const STORE_FILE = join(process.cwd(), '.motia', 'status-store.json')
 
export function updateLastStatus(result) {
  // Validate input
  if (!result?.url || !['UP', 'DOWN'].includes(result.status)) {
    throw new Error('Invalid result object')
  }
 
  const store = loadStatusStore()
  store[result.url] = { ...result }
  saveStatusStore(store)
}
 
export function getPreviousStatus(url) {
  const store = loadStatusStore()
  const result = store[url]
  return result ? { ...result } : null
}
 
export function getSnapshot() {
  const store = loadStatusStore()
  const snapshot = {}
  
  for (const [url, result] of Object.entries(store)) {
    snapshot[url] = { ...result }
  }
  
  return snapshot
}