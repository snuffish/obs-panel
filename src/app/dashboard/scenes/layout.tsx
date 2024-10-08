'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, Edit2, X } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState, type PropsWithChildren } from 'react'
import Disconnected from '~/components/Disconnected'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { useSceneStore, type SceneProps } from '~/store/sceneStore'

const Scene = ({ sceneName, sceneUuid }: SceneProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const newSceneNameRef = useRef<HTMLInputElement>(null)

  const isConnected = useConnectionStore((state) => state.isConnected)
  const currentProgramSceneUuid = useSceneStore(
    (state) => state.current.currentProgramSceneUuid,
  )

  const { data: base64 } = useQuery({
    queryKey: ['base64', sceneUuid],
    queryFn: async () => {
      const res = await obs.call('GetSourceScreenshot', {
        sourceUuid: sceneUuid,
        imageFormat: 'jpg',
        imageHeight: 150,
        imageWidth: 150,
      })

      return res.imageData
    },
    enabled: isConnected,
  })

  const { mutate: changeSceneName } = useMutation({
    mutationFn: async () => {
      const newSceneName = newSceneNameRef.current?.value ?? ''

      await obs
        .call('SetSceneName', {
          sceneUuid,
          newSceneName,
        })
    },
    onSuccess: () => setIsEdit(false),
    onError: (error) => console.error('Failed to set scene name:', error),
  })

  const { mutate: activateScene } = useMutation({
    mutationFn: async () => {
      await obs.call('SetCurrentProgramScene', {
        sceneUuid,
      })
    },
    onError: (error) => console.error('Failed to activate scene:', error),
  })

  return (
    <Card className=''>
      <CardContent className='flex justify-between space-x-4 p-4'>
        <div className='flex items-center space-x-5'>
          {base64 && (
            <Image
              className='rounded-xl'
              src={base64}
              width={150}
              height={150}
              alt='snapshot'
            />
          )}
          {isEdit ? (
            <div className='flex gap-x-2'>
              <Input
                ref={newSceneNameRef}
                className='flex-grow'
                defaultValue={sceneName}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') changeSceneName()
                  if (e.key === 'Escape') setIsEdit(false)
                }}
              />
              <Button
                onClick={() => changeSceneName()}
                intent='dark'
                size='icon'
              >
                <Check className='h-4 w-4' />
              </Button>
              <Button
                onClick={() => setIsEdit(false)}
                size='icon'
                intent='outline'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          ) : (
            <span className='font-medium'>{sceneName}</span>
          )}
        </div>
        <div className='flex items-center space-x-4'>
          <Button size='icon' intent='ghost'>
            <Edit2 onClick={() => setIsEdit(true)} className='h-4 w-4' />
          </Button>
          {sceneUuid === currentProgramSceneUuid ? (
            <Button intent='dark'>Active</Button>
          ) : (
            <Button
              onClick={() => activateScene()}
              intent='outline'
            >
              Activate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ScenesLayout({ children }: PropsWithChildren) {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const scenes = useSceneStore(state => state.scenes)

  if (!isConnected) return <Disconnected />

  return (
    <div className='col-start-2 -col-end-2'>
      <div className='space-y-4 p-4'>
        {scenes.map((scene) => (
          <Scene key={scene.sceneIndex} {...scene} />
        ))}
      </div>
      {children}
    </div>
  )
}
