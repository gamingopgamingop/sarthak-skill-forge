import type { CronAdapter, CronLock, CronLockInfo } from '@motiadev/core'
import os from 'os'
import { v4 as uuidv4 } from 'uuid'
 
export class MyCronAdapter implements CronAdapter {
  private locks: Map<string, CronLock> = new Map()
  private instanceId: string
 
  constructor() {
    this.instanceId = `${os.hostname()}-${uuidv4()}`
  }
 
  async acquireLock(jobName: string, ttl: number): Promise<CronLock | null> {
    const existingLock = this.locks.get(jobName)
    if (existingLock && existingLock.expiresAt > Date.now()) {
      return null
    }
 
    const lock: CronLock = {
      jobName,
      lockId: uuidv4(),
      acquiredAt: Date.now(),
      expiresAt: Date.now() + ttl,
      instanceId: this.instanceId,
    }
 
    this.locks.set(jobName, lock)
    return lock
  }
 
  async releaseLock(lock: CronLock): Promise<void> {
    const existingLock = this.locks.get(lock.jobName)
    if (existingLock && existingLock.lockId === lock.lockId) {
      this.locks.delete(lock.jobName)
    }
  }
 
  async renewLock(lock: CronLock, ttl: number): Promise<boolean> {
    const existingLock = this.locks.get(lock.jobName)
    if (existingLock && existingLock.lockId === lock.lockId) {
      existingLock.expiresAt = Date.now() + ttl
      return true
    }
    return false
  }
 
  async isHealthy(): Promise<boolean> {
    return true
  }
 
  async shutdown(): Promise<void> {
    this.locks.clear()
  }
 
  async getActiveLocks(): Promise<CronLockInfo[]> {
    const now = Date.now()
    return Array.from(this.locks.values())
      .filter((lock) => lock.expiresAt > now)
      .map((lock) => ({
        jobName: lock.jobName,
        instanceId: lock.instanceId,
        acquiredAt: lock.acquiredAt,
        expiresAt: lock.expiresAt,
      }))
  }
}