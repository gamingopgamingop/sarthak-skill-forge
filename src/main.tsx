import { StrictMode, useEffect, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'simplebar-react/dist/simplebar.min.css'
import './index.css'
import routes from './routes.tsx'

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
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ParallaxProvider>
          <AOSInit />
          <Suspense fallback={<AppLoader />}>
            <RouterProvider router={routes} />
          </Suspense>
          <SpeedInsights />
          <ReactQueryDevtools initialIsOpen={false} />
        </ParallaxProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
)
