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