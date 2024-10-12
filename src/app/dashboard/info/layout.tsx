'use client'

import { type PropsWithChildren } from 'react'
import { Button } from '~/components/ui/button'
import { useConnect } from '~/hooks/useConnect'

export default function NewLayout({ children }: PropsWithChildren) {
  

  return (
    <>
    DASHBOARD
      {children}
    </>
  )
}
