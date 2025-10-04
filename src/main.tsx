import { StrictMode, useEffect } from 'react'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ParallaxProvider>
          <AOSInit />
          <RouterProvider router={routes} />
          <SpeedInsights />
          <ReactQueryDevtools initialIsOpen={false} />
        </ParallaxProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </StrictMode>,
)