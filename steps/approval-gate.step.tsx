import React from 'react'
import { BaseHandle, Position } from 'motia/workbench'
 
export default function ApprovalGate() {
  return (
    <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-400">
      <BaseHandle type="target" position={Position.Top} />
      
      <div className="text-center">
        <div className="text-lg">⏸️</div>
        <div className="font-medium">Waiting for approval</div>
        <div className="text-xs text-gray-600">Manager review required</div>
      </div>
      
      <BaseHandle type="source" position={Position.Bottom} />
    </div>
  )
}