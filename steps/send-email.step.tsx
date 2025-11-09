import { EventNode, EventNodeProps } from 'motia/workbench'
import React from 'react'
 
export const Node: React.FC<EventNodeProps> = (props) => {
  return (
    <EventNode {...props}>
      <div className="flex flex-row items-start gap-2">
        <div className="text-sm text-gray-400 font-mono">{props.data.description}</div>
        <img
          style={{ width: '64px', height: '64px' }}
          src="https://www.motia.dev/icon.png"
        />
      </div>
    </EventNode>
  )
}