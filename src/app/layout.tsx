import '~/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OBS Panel',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={`${GeistSans.variable}`}>
      <body className='bg-slate-950/90'>
        <main className='grid grid-cols-[minmax(40px,1fr)_repeat(10,_minmax(0,_12rem))_minmax(40px,1fr)]'>
          {children}
        </main>
      </body>
    </html>
  )
}
