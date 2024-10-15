'use client'

import { useId, type PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import NextImage from 'next/image'
import { AppCardTitle } from '~/components/AppCard'
import { Card, CardContent } from '~/components/ui/card'
import { toast } from '~/hooks/useToast'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { useSceneStore} from '~/store/sceneStore'
import { SourceProps } from '~/store/sourceStore'
import { getSceneList, getSourceScreenshot } from '~/services/event-actions'
import { InputProps } from '../../../components/ui/input';
import Image from '~/resources/camera-off.png'
import { useSource } from '~/hooks/useSource';

export default function ScenesLayout({ children }: PropsWithChildren) {
  const id = useId()
  const isConnected = useConnectionStore((state) => state.isConnected)
  const { setScenes, setCurrent } = useSceneStore((state) => state)
  const base64Image = useSource('054dde21-bcff-407a-af98-9e0ead79ebe6')
  console.log(isConnected, 'isConnected!!!')

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

      return (
        <div className='flex flex-wrap justify-center'>
          dasdas
        </div>
      )
      // return <NextImage src={Image} alt='Image' />
      
      // {data.scenes.map((screen, index) => {
      //  )
      // })}
    }
  })
}
