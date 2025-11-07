// types/index.ts
export interface AppData {
  id: number
  input: Record<string, unknown>
  started_at: string
  traceId: string
}
 
export interface ProcessedResult {
  original_id: number
  processed_at: string
  result: string
  confidence: number
  model_version: string
}
 
export interface PythonResult {
  id: number
  python_message: string
  processed_by: string[]
  processing_time: number
}
 
export interface NotificationData {
  id: number
  message: string
  processed_by: string[]
  sent_at: string
}
 
export interface AppSummary {
  appId: number
  status: string
  completed_at: string
  steps_executed: string[]
  result: string
}