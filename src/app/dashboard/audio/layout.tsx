'use client'

import React from 'react'
import { type PropsWithChildren } from 'react'

export default function AudioLayout({ children }: PropsWithChildren) {
  // const queryClient = useObs('CurrentProgramSceneChanged', (data) => {
  //   console.log('CurrentProgramSceneChanged1111 ', data)
  // })
  // const { setIsConected, setIdentified } = useConnectionStore()

  // console.log('store ', store)

  return (
    <div className='col-start-2 -col-end-2'>
      AUDIO
    </div>
  )
}
