'use client'

import { useId, type PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import NextImage from 'next/image'
import { AppCardTitle } from '~/components/AppCard'
import { Card, CardContent } from '~/components/ui/card'
import { toast } from '~/hooks/useToast'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { useSceneStore, type SceneProps } from '~/store/sceneStore'
import { SourceProps } from '~/store/sourceStore'
import { getSourceScreenshot } from '~/services/asyncFuncs'

export default function ScenesLayout({ children }: PropsWithChildren) {
  const id = useId()
  const isConnected = useConnectionStore((state) => state.isConnected)
  const { setScenes, setCurrent } = useSceneStore((state) => state)
  console.log(isConnected, 'isConnected!!!')

  const { data: scenes } = useQuery({
    queryKey: ['obs', 'scenes'],
    queryFn: async () => {
      return await obs.call('GetSceneList')    
    },
    onSuccess: (data) => {
      const { scenes, ...current } = data
      setCurrent(data)
      
      toast({
        title: 'Scenes fetched',
        description: `Fetched data: ${JSON.stringify(data)}}`,
        stay: true,
      })
    },
  })

  return <div>
    dsd
  </div>
}

const Scene = (sceneData: Omit<SourceProps, 'unversionedInputKind'>) => {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const { data: base64 } = useQuery({
    queryKey: ['base64'],
    queryFn: async () => getSourceScreenshot(),
    refetchInterval: 1000,
    enabled: isConnected,
  })
  
  return (
    <Card>
      <CardContent>
        <AppCardTitle>{sceneData.inputName}</AppCardTitle>
        <NextImage
          src={base64 ?? ''}
          alt='Image'
          className='h-full w-full rounded-xl object-cover'
        />
      </CardContent>
    </Card>
  )
}