import React from 'react'
import { type PropsWithChildren } from 'react'
import { ObsScenesDashboard } from '~/components/obs-scenes-dashboard'

export default function ScenesLayout({ children }: PropsWithChildren) {
  return (
    <div className='col-start-2 -col-end-2'>
      <ObsScenesDashboard />
      {children}
    </div>
  )
}
