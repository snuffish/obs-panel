'use client'

import React from 'react'
import { type PropsWithChildren } from 'react'
import { host, obs, useObs } from '~/hooks/obs'
import { ButtonProps } from '../../../components/ui/@button'
import { Button } from '~/components/ui/button'
import { useConnectionStore } from '~/store/store'

export default function AudioLayout({ children }: PropsWithChildren) {
  const queryClient = useObs('CurrentProgramSceneChanged', (data) => {
    console.log('CurrentProgramSceneChanged1111 ', data)
  })
  const { setIsConected, setIdentified } = useConnectionStore()

  // console.log('store ', store)

  return (
    <div className='col-start-2 -col-end-2'>
      <button>
        CONNECT
      </button>
      {children}
    </div>
  )
}
