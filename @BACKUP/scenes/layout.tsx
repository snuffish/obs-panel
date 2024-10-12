'use client'

import { PropsWithChildren } from "react"
import ScenesDashboard from "~/components/obs-scenes-dashboard"

export default function ScenesLayout({ children }: PropsWithChildren) {
  return (
    <div className='col-start-2 -col-end-2'>
      <div className='space-y-4 p-4'>
        <ScenesDashboard />
      </div>
      {children}
    </div>
  )
}
