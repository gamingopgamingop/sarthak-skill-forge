import type { ZodInput } from 'zod'
import type { Emit } from 'motia'

export interface EventConfig {
  type: 'event'
  name: string
  description?: string
  subscribes: string[]
  emits: Emit[]
  virtualEmits?: Emit[]
  input: ZodInput
  flows?: string[]
  includeFiles?: string[]
}
