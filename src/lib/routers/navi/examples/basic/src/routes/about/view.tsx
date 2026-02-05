import React from 'react'
import { Route } from 'navi'

export default function About({ route }: { route: Route }) {
  return <>
    <h1>{route.title}</h1>
    <p>
      This example was built with Create React App.
    </p>
  </>
}
