// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   )
// }

// Client Component
// import Search from './search'
// // Server Component
// import Logo from './logo'
 
// // Layout is a Server Component by default
// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <nav>
//         <Logo />
//         <Search />
//       </nav>
//       <main>{children}</main>
//     </>
//   )
// }

import ThemeProvider from './theme-provider'
import './global.css'
import { Geist , Roboto} from 'next/font/google'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

 
const geist = Geist({
  subsets: ['latin'],
})
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}

const geist = Geist({
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>{children}</body>
    </html>
  )
}

