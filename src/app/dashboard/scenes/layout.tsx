'use client'

import { useId, type PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import NextImage from 'next/image'
import { AppCard, AppCardTitle } from '~/components/AppCard'
import { Card, CardContent } from '~/components/ui/card'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { useSceneStore, type SceneProps } from '~/store/sceneStore'
import { SourceProps } from '~/store/sourceStore'
import { ScenePreview } from '../../../components/scene-preview';

export const Scene = (sceneData: SourceProps) => {
  // const { sceneUuid, sceneName } = sceneData
  // console.log(sceneData.x)
  // const data = useSourceScreenshot(sceneData)

  const data = '', sceneUuid = '', base64 = ''
  const sceneName = ''

  return (
    <AppCard
    AppCard
    key={sceneUuid}
    className='w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)] xl:w-[calc(25%-0.75rem)]'
  >
    
  {/* </AppCard> */}
  </AopCard>
  )
}

export default function ScenesLayout({ children }: PropsWithChildren) {
  const id = useId()
  const isConnected = useConnectionStore((state) => state.isConnected)
  const { setScenes, setCurrent } = useSceneStore((state) => state)
  console.log(isConnected, 'isConnected!!!')

  const { data: scenes } = useQuery({
    queryKey: ['obs', 'scenes'],
    queryFn: async () => {
      const { scenes, ...current } = await obs.call('GetSceneList')
      return scenes as SceneProps[]
    },
    onSuccess: (current) =>
  })

  return (
    <div>
      {scenes?.map((scene) => (
        <Scene
          key={id}
          sceneUuid={scene.sceneUuid}
          sceneIndex={scene.sceneIndex}
          sceneName={scene.sceneName}
        />
      ))}
      {children}
    </div>
  )
}
