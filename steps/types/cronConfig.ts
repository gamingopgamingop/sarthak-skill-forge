import type { Emit } from 'motia'
  
export interface CronConfig {
  type: 'cron'
  name: string
  description?: string
  cron: string
  emits: Emit[]
  virtualEmits?: Emit[]
  flows?: string[]
  includeFiles?: string[]
}
