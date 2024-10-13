'use client'

import { type PropsWithChildren } from 'react'

import NextImage from 'next/image'

import Image from '~/resources/image.png'
import { AppCard, AppCardTitle, AppCardDescription } from '~/components/AppCard'
0
import { ScenePreview } from '~/components/scene-preview'
import { Edit2Icon, InfoIcon, RefreshCwIcon } from 'lucide-react'

import Image1 from '~/resources/image.png'
import Image2 from '~/resources/Image2.jpg'
import { Button } from '~/components/ui/button'
import { CardHeader } from '~/components/ui/card'
import { getSceneList } from '~/services/asyncFuncs'
import { useQuery } from '@tanstack/react-query'
import { toast } from '~/hooks/useToast'

const Scene = () => {
  return (
    <div className='flex flex-wrap gap-4 p-4'>
      <AppCard>
        <CardHeader>
          <NextImage
            src={Image2}
            alt='Image'
            className='h-full w-full rounded-xl object-cover'
          />
        </CardHeader>
        <div className='flex flex-1 flex-col p-5'>
          <div className='mb-5 border-b border-gray-200 pb-5'>
            <AppCardTitle>Scene 1</AppCardTitle>
            <AppCardDescription>Descriptdion</AppCardDescription>
          </div>
        </div>
        <div className='ml-auto flex w-full items-center justify-between'>
          <div>
            <Button variant='ghost' size='icon'>
              <InfoIcon />
            </Button>
            <Button variant='ghost' size='icon'>
              <RefreshCwIcon />
            </Button>
          </div>

          <div className='flex items-center gap-x-1'>
            <Button variant='ghost' size='icon'>
              <Edit2Icon />
            </Button>
          </div>
        </div>
      </AppCard>
    </div>
  )
}

export default function NewLayout({ children }: PropsWithChildren) {
  const { data } = useQuery({
    queryKey:  ['obs', 'record'],
    queryFn: () => getSceneList(),
    onSuccess: (data) => {
      toast({
         title: 'Get Scenes',
         description: `Fetched datxxx: ${JSON.stringify(data)}`
      })
    }
  })

  console.log(data, "DATA!!!")

  return (
    <div className='flex justify-center flex-wrap'>
      {data?.scenes.map((scene, index) => {
        return <Scene key={index} {...scene} />
      })}
      <Scene />
      <Scene />
      <Scene />
      <Scene />
      <Scene />
      {children}
    </div>
  )
}
