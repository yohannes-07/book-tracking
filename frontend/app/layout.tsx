import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "@/styles/globals.css";

import ReduxProvider from '@/components/commons/ReduxProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Tracking',
  description: 'Book Tracking App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
            {children}
        </ReduxProvider>
        </body>
    </html>
  )
}