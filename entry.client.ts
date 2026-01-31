// [entry.client.js]
// @ts-nocheck
// @ts-ignore
import '@vitejs/plugin-react-swc/preamble'
// [entry.client.js]
// @ts-ignore
import '@vitejs/plugin-react/preamble'
import { hydrateRoot } from 'react-dom/client'
import { RemixBrowser } from '@remix-run/react'
import { startTransition } from 'react'
import { initSentry } from '~/utils/sentry.client'
import { initAnalytics } from '~/utils/analytics'
import { initServiceWorker } from '~/utils/serviceWorker'

// Additional imports and setup
// Initialize error tracking and analytics
initSentry()
initAnalytics()

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  initServiceWorker()
}

// Hydrate the app with error boundary
startTransition(() => {
  hydrateRoot(
    document,
    <RemixBrowser />
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
