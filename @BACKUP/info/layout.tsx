'use client'

import { type PropsWithChildren } from 'react'
import { ObsWebsocketDashboard } from '~/components/obs-websocket-dashboard'
import {  toast } from '~/hooks/useToast'

export default function InfoLayout({ children }: PropsWithChildren) {
  return (
    <div className='col-start-2 -col-end-2'>
      {/* <LogWindowComponent /> */}

      <ObsWebsocketDashboard />

      {children}
    </div>
  )
}
