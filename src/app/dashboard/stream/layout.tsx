'use client'

import React from 'react'
import { type PropsWithChildren } from 'react'
import { useConnectionStore, useSceneStore } from '~/store'

export default function StreamLayout({ children }: PropsWithChildren) {
  return (
    <div className='col-start-2 -col-end-2'>
      <div className='bg-white flex flex-col flex-wrap'>
      
      </div>
      {children}
    </div>
  )
}
