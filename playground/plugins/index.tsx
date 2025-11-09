import { Badge, Button, cn } from '@motiadev/ui'
import { AlertCircle, CheckCircle2, Clock, RefreshCw, Server } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
 
interface PluginData {
  message: string
  timestamp: string
  environment: string
  status: 'active' | 'inactive'
}
 
export const Plugin = () => {
  const [data, setData] = useState<PluginData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
 
  const fetchData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/__motia/local-plugin-example')
      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Failed to fetch data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])
 
  useEffect(() => {
    fetchData()
  }, [fetchData])
 
  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
          <Server className="w-5 h-5 text-accent-1000" />
          <h1 className="text-xl font-semibold">Local Plugin Example</h1>
        </div>
        <Button onClick={fetchData} disabled={isLoading}>
          <RefreshCw className={cn('w-4 h-4', isLoading && 'animate-spin')} />
          Refresh
        </Button>
      </div>
      
      {data && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-card">
            <Badge variant={data.status === 'active' ? 'default' : 'secondary'}>
              {data.status}
            </Badge>
            <p className="text-2xl font-semibold mt-2">{data.message}</p>
          </div>
        </div>
      )}
    </div>
  )
}