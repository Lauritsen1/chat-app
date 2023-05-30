import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import DrawerProvider from './context/DrawerProvider'

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chat App',
  description: 'Real time chat app built with Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en' data-theme='dark'>
        <body className={inter.className}>
          <DrawerProvider>{children}</DrawerProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
