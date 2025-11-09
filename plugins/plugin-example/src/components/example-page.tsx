import { Badge, Button, Card } from '@motiadev/ui'
import { Sparkles } from 'lucide-react'
import type React from 'react'
 
export const ExamplePage: React.FC = () => {
  return (
    <div className="h-full w-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Example Plugin</h1>
          <Badge variant="info">v1.0.0</Badge>
        </div>
 
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
          <p className="text-muted-foreground">
            This is your custom plugin content.
          </p>
        </Card>
      </div>
    </div>
  )
}