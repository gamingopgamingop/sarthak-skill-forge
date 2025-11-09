// src/types/apiRouteConfig.ts
import type { ZodInput } from 'zod'
import type { ApiMiddleware } from 'motia'
import type { Emit, QueryParam } from 'motia'

export interface ApiRouteConfig {
  type: 'api'
  name: string
  description?: string
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
  emits: Emit[]
  virtualEmits?: Emit[]
  virtualSubscribes?: string[]
  flows?: string[]
  middleware?: ApiMiddleware[]
  bodySchema?: ZodInput
  responseSchema?: Record<number, ZodInput>
  queryParams?: QueryParam[]
  includeFiles?: string[]
}
