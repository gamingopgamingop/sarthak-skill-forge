import { StrictMode, useEffect, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import { ClerkProvider } from '@clerk/clerk-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'simplebar-react/dist/simplebar.min.css'
import './index.css'
import routes from './routes.tsx'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ErrorBoundary } from 'react-error-boundary'


const VITE_CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}


const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex flex-col items-center justify-center h-screen text-center text-red-500">
    <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong 😬</h1>
    <pre className="text-sm bg-black/10 p-3 rounded">{error.message}</pre>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
    >
      Reload Page
    </button>
  </div>
)


// Initialize AOS
const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
      offset: 100,
    });
  }, []);
  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

// Professional loading component matching your portfolio style
const AppLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
    <div className="text-center space-y-4">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto"></div>
        <div className="animate-ping absolute inset-0 rounded-full h-16 w-16 border-4 border-primary/30 mx-auto"></div>
      </div>
      <div className="space-y-2">
        <p className="text-foreground text-lg font-semibold animate-pulse">Loading Portfolio</p>
        <div className="flex gap-1 justify-center">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  </div>
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/">
    <ConvexProvider client={convex}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ParallaxProvider>
            <AOSInit />
            <Suspense fallback={<AppLoader />}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <RouterProvider router={routes} />
              </ErrorBoundary>
            </Suspense>
            <SpeedInsights />
            <ReactQueryDevtools initialIsOpen={false} />
          </ParallaxProvider>
        </HelmetProvider>
      </QueryClientProvider>
      </ConvexProvider>
    </ClerkProvider>
  </StrictMode>,
)
