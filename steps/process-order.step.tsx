import React from 'react'
import { BaseHandle, Position } from 'motia/workbench'
import type { EventNodeProps } from 'motia/workbench'
 
export default function ProcessOrderUI({ data }: EventNodeProps) {
  // Prevent code viewer from opening when clicked
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    return false
  }
 
  return (
    <div
      onClick={handleClick}
      className="relative bg-white border-2 border-blue-500 rounded-lg py-3 px-4 shadow-md min-w-[200px]"
      style={{ pointerEvents: 'auto' }}
    >
      <BaseHandle type="target" position={Position.Top} />
      
      <div className="text-center">
        <div className="font-semibold text-blue-700">
          🍽️ Process Order
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {data.name}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Handles food orders
        </div>
      </div>
      
      <BaseHandle type="source" position={Position.Bottom} />
    </div>
  )
}