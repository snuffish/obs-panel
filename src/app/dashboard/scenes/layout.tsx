'use client'

import { useId, type PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import NextImage from 'next/image'
import { AppCard, AppCardTitle } from '~/components/AppCard'
import { Card, CardContent } from '~/components/ui/card'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import {
  CurrentScene,
  useSceneStore,
  type SceneProps,
} from '~/store/sceneStore'
import { SourceProps } from '~/store/sourceStore'
import { fromJSON } from 'postcss'
import { errorToJSON } from 'next/dist/server/render'
import { revalidatePath } from 'next/cache'
import { ScenePreview } from '~/components/scene-preview'

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
    onSuccess: (data) => {
      console.log(data, 'data!!!')
      setCurrent(data as CurrentScene)
    },
  })

  const { data: base64 } = useQuery({
    queryKey: ['base64'],
    queryFn: async () => {
      const data = await obs.call('GetSourceScreenshot', {
        sourceUuid: '',
        imageFormat: 'jpg',
        imageHeight: 150,
        imageWidth: 150,
      })

      return data.imageData
    },
    refetchInterval: 1000,
    enabled: isConnected,
  })

  console.log(scenes, 'scenes!!!')
  {
    // return <ScenePreview key={id} sceneData={errorToJSON} ScenePreview key={id} sceneData={fromJSON} />
  }

  const Scene = (sceneData: SourceProps) => {
    console.log(sceneData, 'sceneData!!!')
    return (
      <Card>
        <CardContent>
          <AppCardTitle>{sceneData.inputName}</AppCardTitle>
          <NextImage
            src={base64 || ''}
            alt='Image'
            className='h-full w-full rounded-xl object-cover'
          />
        </CardContent>
      </Card>
    )
  }
}
// const { sceneUuid, sceneName } = sceneData
// console.log(sceneData.x)
// const data = useSourceScreenshot(sceneData)

// const data = '', sceneUuid = '', base64 = ''
// const sceneName = ''

// return (
//   <AppCard
//   AppCard
//   key={
//   className='w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)] xl:w-[calc(25%-0.75rem)]'

// {/* </AppCard> */}
// </AopCard>
