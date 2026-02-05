import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Router, View } from 'react-navi'
// @ts-ignore
import HelmetProvider from 'react-navi-helmet'
import Layout from './components/AppLayout'
import './index.css'
import routes from './routes'
// @ts-ignore
import * as serviceWorker from './serviceWorker'

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(
    <HelmetProvider>
      <Router hashScrollBehavior="smooth" routes={routes}>
        <Layout>
          <Suspense fallback={null}>
            <View />
          </Suspense>
        </Layout>
      </Router>
    </HelmetProvider>
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
