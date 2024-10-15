'use client'

import { type PropsWithChildren } from 'react'

import NextImage from 'next/image'

import { Edit2Icon, InfoIcon, RefreshCwIcon } from 'lucide-react'
import { AppCard, AppCardDescription, AppCardTitle } from '~/components/AppCard'

import { useQuery } from '@tanstack/react-query'
import { Button } from '~/components/ui/button'
import { CardHeader } from '~/components/ui/card'
import { toast } from '~/hooks/useToast'
import Image2 from '~/resources/Image2.jpg'
import { getSceneList, type SceneListResponse } from '~/services/event-actions'

const H1 = (x: SceneListResponse) => {
  H1.return(
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
    </div>,
  )
}

export default function InfoLayout({ children }: PropsWithChildren) {
  const { data } = useQuery({
    queryKey: ['obs', 'record'],
    queryFn: () => getSceneList(),
    onSuccess: (data) => {
      toast({
        title: 'Get Scenes',
        description: JSON.stringify(data),
      })
    },
  })

  console.log(data, 'DATA!!!')

  return (
    <div className='flex flex-wrap justify-center'>
      {data?.scenes.map((scene, index) => {
        // eslint-disable-next-line react/jsx-no-undef
        return <Scene key={index} {...scene} />
      })}
      {children}
    </div>
  )
}

const Scene = () => {
  return <></>
}
