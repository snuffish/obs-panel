'use client'

import { type PropsWithChildren } from 'react'


import NextImage from 'next/image'

import Image from '~/resources/image.png'
import { Card } from '~/components/card'

const Scene = () => {
  return (
    <div className='flex gap-x-10 py-20'>
      <Card/>




    </div>
  )
}

export default function NewLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className='flex justify-center'>
        <Scene />
      </div>

      {children}
    </>
  )
}
