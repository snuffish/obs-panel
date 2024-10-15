'use client'

import { useId, type PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import { Edit2Icon, InfoIcon, RefreshCwIcon } from 'lucide-react'
import NextImage from 'next/image'
import { AppCard, AppCardDescription, AppCardHeader, AppCardTitle } from '~/components/AppCard'
import { useSource } from '~/hooks/useSource'
import { toast } from '~/hooks/useToast'
import { getSceneList } from '~/services/event-actions'
import { type SceneProps, useSceneStore } from '~/store/sceneStore'
import { Button } from '~/components/ui/button'

const Scene = ({ sceneUuid, sceneName }: SceneProps) => {
  const base64Image = useSource(sceneUuid)

  return (
      <AppCard>
        <AppCardHeader>
          <NextImage
            src={base64Image}
            width={150}
            height={150}
            alt='Image'
            className='h-full w-full rounded-xl object-cover'
          />
        </AppCardHeader>
        <div className='flex flex-1 flex-col p-5'>
          <div className='mb-5 border-b border-gray-200 pb-5'>
            <AppCardTitle>{sceneName}</AppCardTitle>
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
  )
}

export default function ScenesLayout({ children }: PropsWithChildren) {
  const { setCurrent } = useSceneStore((state) => state)

  const { data: scenes } = useQuery({
    queryKey: ['obs', 'scenes'],
    queryFn: () => getSceneList(),
    onSuccess: (data) => {
      const { scenes, ...current } = data
      setCurrent(data)
      
      toast({
        title: 'Scenes fetched',
        description: JSON.stringify(data),
        stay: true,
      })
    }
  })

  return (
    <div className='flex flex-wrap justify-center gap-4 p-4'>
      {scenes?.scenes?.map((scene, index) => {
        return <Scene key={index} {...scene} />
      })}
    </div>
  )
}
