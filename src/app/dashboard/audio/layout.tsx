'use client'

import { type PropsWithChildren } from 'react'
import { Button } from '~/components/ui/button'
import { useConnect } from '~/hooks/useConnect'

export default function ScenesLayout({ children }: PropsWithChildren) {
  

  return (
    <>
        AUDIO
      {children}
    </>
  )
}
