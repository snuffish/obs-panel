import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'
import ReactQueryProvider from '~/providers/ReactQueryProvider'
import { Toaster } from '~/components/ui/toaster'

export const metadata: Metadata = {
  title: 'OBS Panel',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${GeistSans.variable}`}>
      <body className='bg-neutral-200'>
        <main>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </main>
      </body>
    </html>
  )
}
