import React from 'react'
import { Route } from 'navi'

export default function Home({ route }: { route: Route }) {
  return <>
    <h1>{route.title}</h1>
    <p>
      Welcome to the basic example!
    </p>
  </>
}
