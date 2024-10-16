'use client'

import { type PropsWithChildren } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import NextImage from 'next/image'
import {
  AppCard,
  AppCardHeader,
  AppCardTitle
} from '~/components/AppCard'
import { useSource } from '~/hooks/useSource'
import { toast } from '~/hooks/useToast'
import { getSceneList } from '~/services/event-actions'
import { obs } from '~/services/obs'
import { useSceneStore, type SceneProps } from '~/store/sceneStore'

const PreviewImage = ({
  sceneUuid,
}: PropsWithChildren<{
  sceneUuid: string
}>) => {
  const base64Image = useSource(sceneUuid)

  return (
    <NextImage
      src={base64Image}
      width={150}
      height={150} 
      alt='Image'
      className='h-full w-full rounded-xl object-cover'
    />
  )
}

const Scene = ({ sceneUuid, sceneName }: SceneProps) => {
  const queryClient = useQueryClient()
  const { currentProgramSceneUuid } = useSceneStore((state) => state.current)

  const { mutate: activateScene } = useMutation({
    mutationFn: async () => {
      await obs.call('SetCurrentProgramScene', {
        sceneUuid,
      })

      await queryClient.invalidateQueries(['obs', 'scenes'])
    },
    onError: (error) => console.error('Failed to activate scene:', error),
  })

  const activeClasses =
    currentProgramSceneUuid === sceneUuid ? 'border-2 border-green-10' : ''

  return (
    <AppCard className={activeClasses} onClick={() => activateScene()}>
      <AppCardHeader>
        <PreviewImage sceneUuid={sceneUuid} />
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
      setCurrent(current)

      toast({
        title: 'Scenes fetched',
        description: JSON.stringify(data),
        stay: true,
      })
    },
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
