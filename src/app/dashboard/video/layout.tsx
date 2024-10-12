'use client'

import { type PropsWithChildren } from 'react'
import { ObsDashboardWithStats } from '~/components/obs-dashboard-with-stats'
import { Button } from '~/components/ui/button'
import { useConnect } from '~/hooks/useConnect'

export default function ScenesLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex pb-10'>
      <ObsDashboardWithStats />
      {children}
    </div>
  )
}
