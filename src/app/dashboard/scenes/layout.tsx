'use client'

import { useId, type PropsWithChildren } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Edit2Icon, InfoIcon, RefreshCwIcon } from 'lucide-react'
import NextImage from 'next/image'
import { AppCard, AppCardDescription, AppCardHeader, AppCardTitle } from '~/components/AppCard'
import { useSource } from '~/hooks/useSource'
import { toast } from '~/hooks/useToast'
import { getSceneList } from '~/services/event-actions'
import { type SceneProps, useSceneStore } from '~/store/sceneStore'
import { Button } from '~/components/ui/button'
import { obs } from '~/services/obs'

const Scene = ({ sceneUuid, sceneName }: SceneProps) => {
  const base64Image = useSource(sceneUuid)
  const { currentProgramSceneUuid } = useSceneStore((state) => state.current)

  const { mutate: activateScene } = useMutation({
    mutationFn: async () => {
      await obs.call('SetCurrentProgramScene', {
        sceneUuid,
      })
    },
    onError: (error) => console.error('Failed to activate scene:', error),
  })

  const activeClasses = currentProgramSceneUuid === sceneUuid ? 'border-2 border-green-10' : ''

  return (
      <AppCard className={activeClasses} onClick={() => activateScene()}>
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
            <AppCardTitle>{sceneName}</AppCardTitle>
        </div>
      </AppCard>
  )
}

export default function ScenesLayout({ children }: PropsWithChildren) {
  const { setCurrent } = useSceneStore((state) => state)

  const { data } = useQuery({
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

  const scenes = data?.scenes as SceneProps[]

  return (
    <div className='flex flex-wrap justify-center gap-4 p-4'>
      {scenes?.map((scene, index) => {
        return <Scene key={index} {...scene} />
      })}
    </div>
  )
}
