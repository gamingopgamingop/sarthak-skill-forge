import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
  } from '@tanstack/react-router'
  import type { ReactNode } from 'react'
  import App from '@/App.tsx'
  import { Route as BlogPageRoute } from '@/routes/posts/$postId'  
  
  export const Route = createRootRoute({
    head: () => ({
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: 'Sarthak Bansal - Python Developer & Tech Entrepreneur',
        },
      ],
    }),
    component: RootComponent,
  })
  
  function RootComponent() {
    return (
      <RootDocument>
        <Outlet />
        <BlogPageRoute />
        <App />
      </RootDocument>
    )
  }
  
  function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
      <html>
        <head>
          <HeadContent />
        </head>
        <body>
          {children}
          <Scripts />
        </body>
      </html>
    )
  }
  