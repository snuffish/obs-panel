'use client'

import { type PropsWithChildren } from 'react'
import { Footer } from '~/components/footer'
import { Navbar } from '~/components/navbar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='col-start-2 -col-end-2'>
      <Navbar />
      <Footer />
      {children}
    </div>
  )
}
