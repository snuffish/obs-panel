'use client'

import { type PropsWithChildren } from 'react'
import { Button } from '~/components/ui/button'
import { useConnect } from '~/hooks/useConnect'
import { AudioDashboardComponent } from '../../../components/audio-dashboard';

export default function ScenesLayout({ children }: PropsWithChildren) {
  

  return (
    <>
        <AudioDashboardComponent />
      {children}
    </>
  )
}
