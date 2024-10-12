'use client'

import { type PropsWithChildren } from 'react'
import Image1 from '~/resources/image.png'
import Image2 from '~/resources/Image2.jpg'

import NextImage from 'next/image'

import Image from '~/resources/image.png'
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/Card'
import { Button } from '~/components/ui/button'
import { Edit2Icon, InfoIcon, RefreshCwIcon } from 'lucide-react'
import { ScenePreview } from '~/components/scene-preview'



export default function ScenesLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ScenePreview />
        

      {children}
    </>
  )
}
