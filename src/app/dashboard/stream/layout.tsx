'use client'

import React from 'react'
import { type PropsWithChildren } from 'react'

// GetStreamStatus
// ToggleStream
// StartStream
// StopStream
// StreamStateChanged
export default function StreamLayout({ children }: PropsWithChildren) {
  return (
    <div className='col-start-2 -col-end-2'>
      <div className='bg-white flex flex-col flex-wrap'>
      
      </div>
      {children}
    </div>
  )
}
