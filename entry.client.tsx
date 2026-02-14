// [entry.client.js]
// @ts-nocheck
// @ts-ignore
import '@vitejs/plugin-react-swc/preamble'
// [entry.client.js]
import '@vitejs/plugin-react/preamble'
import { hydrateRoot } from 'react-dom/client'
import { RemixBrowser } from '@remix-run/react'
import { startTransition } from 'react'
import { initSentry } from '~/utils/sentry.client'
import { initAnalytics } from '~/utils/analytics'
import { initServiceWorker } from '~/utils/serviceWorker'
import { ErrorBoundary } from '~/components/ErrorBoundary'
import { ErrorPage } from '~/pages/ErrorPage'
import '@vitejs/plugin-react-swc/preamble' // or plugin-react — pick one
import { initSentry } from '~/utils/sentry.client'

initSentry()

import { hydrateRoot } from 'react-dom/client'
import { RemixBrowser } from '@remix-run/react'
import { startTransition } from 'react'
import { ErrorBoundary } from '~/components/ErrorBoundary'
import { ErrorPage } from '~/pages/ErrorPage'
import { initAnalytics } from '~/utils/analytics'
import { initServiceWorker } from '~/utils/serviceWorker'

initAnalytics()

if ('serviceWorker' in navigator) {
  initServiceWorker()
}

// Additional imports and setup
// Initialize error tracking and analytics
initSentry()
initAnalytics()

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  initServiceWorker()
}
hydrateRoot(document, <RemixBrowser />)

// Hydrate the app with error boundary
startTransition(() => {
  hydrateRoot(
    document,
    // <ErrorBoundary fallback={<ErrorPage />}>
    //   <RemixBrowser />
    // </ErrorBoundary>
    // Optional: Add error boundary
    // <ErrorBoundary fallback={<ErrorPage />}>
    //   <RemixBrowser />
    // </ErrorBoundary>
  )
})

// Optional: Add performance monitoring
if (process.env.NODE_ENV === 'development') {
  console.log('[entry.client] App hydrated')
}
if (import.meta.env.DEV) {
  console.log('[entry.client] App hydrated')
}

