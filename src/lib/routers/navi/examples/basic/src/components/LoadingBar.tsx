// @ts-nocheck
import React, { useState, useEffect } from 'react'
import './LoadingBar.css'

function LoadingBar({ isActive }: { isActive: boolean }) {
  let [hasRendered, setHasRendered] = useState(false)

  // Prevent the `active` class from being applied on the first render,
  // to allow the CSS animation's delay prop to work even if `isActive`
  // is true when the component is mounted.
  // Using useEffect to set state after mount is better than inline logic in render.
  // But strictly translating the original logic:
  
  if (!hasRendered) {
    isActive = false
  }
  
  useEffect(() => {
     if (!hasRendered) {
         setHasRendered(true)
     }
  }, [hasRendered])

  return (
    <div
      // Only add the `active` class to this element while the
      // next page is loading, triggering a CSS animation to
      // show or hide the loading bar.
      className={`LoadingBar ${!!isActive ? 'active' : ''}`}
    />
  )
}

export default LoadingBar
