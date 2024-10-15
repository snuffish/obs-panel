'use client'

import { useId, type PropsWithChildren } from 'react'

import { useQuery } from '@tanstack/react-query'
import NextImage from 'next/image'
import { AppCard, AppCardDescription, AppCardTitle } from '~/components/AppCard'
import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { toast } from '~/hooks/useToast'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { useSceneStore} from '~/store/sceneStore'
import { SourceProps } from '~/store/sourceStore'
import { getSceneList, getSourceScreenshot } from '~/services/event-actions'
import { InputProps } from '../../../components/ui/input';
import Image from '~/resources/camera-off.png'
import { useSource } from '~/hooks/useSource';
import { Button } from '@headlessui/react'
import { InfoIcon, RefreshCwIcon, Edit2Icon } from 'lucide-react'
import Image2 from '~/resources/Image2.jpg'

export default function ScenesLayout({ children }: PropsWithChildren) {
  const id = useId()
  const isConnected = useConnectionStore((state) => state.isConnected)
  const { setScenes, setCurrent } = useSceneStore((state) => state)
  const base64Image = useSource('054dde21-bcff-407a-af98-9e0ead79ebe6')
  // console.log(base64Image, 'base64Image!!!')

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
      // return <NextImage src={Image} alt='Image' />
      
      // {data.scenes.map((screen, index) => {
      //  )
      // })}
    }
  })

  return (
    <div className='flex flex-wrap justify-center'>
      <AppCard>
        <CardHeader>
          <NextImage
            src={base64Image}
            width={150}
            height={150}
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
