'use client'

import { useQuery } from '@tanstack/react-query'
import { Check, Edit2, Terminal, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useRef, useState, type PropsWithChildren } from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { obs, type SceneProps, useConnectionStore, useSceneStore } from '~/store/store'

const Scene = ({ sceneName, sceneUuid }: SceneProps) => {
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

  const [isEdit, setIsEdit] = useState(false)
  const newSceneNameRef = useRef<HTMLInputElement>(null)

  const editSceneNameHandler = () => {
    const newSceneName = newSceneNameRef.current?.value ?? ''
    obs
      .call('SetSceneName', {
        sceneUuid: sceneUuid,
        newSceneName: newSceneName,
      })
      .catch((error) => console.error('Failed to set scene name:', error))

    setIsEdit(false)
  }

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
                  if (e.key === 'Enter') editSceneNameHandler()
                  if (e.key === 'Escape') setIsEdit(false)
                }}
              />
              {/* <Button onClick={editSceneNameHandler} intent='dark' size='icon'> */}
              <Button intent='dark' size='icon'>
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
          {/* <Button size='icon' intent='ghost'>
            <Edit2 onClick={() => setIsEdit(true)} className='h-4 w-4' />
          </Button> */}
          {sceneUuid === currentProgramSceneUuid ? (
            <Button intent='dark'>Active</Button>
          ) : (
            <Button
              onClick={() =>
                obs.call('SetCurrentProgramScene', {
                  sceneUuid,
                })
              }
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
  const { scenes } = useSceneStore()

  if (!isConnected)
    return (
      <Alert>
        <Terminal className='h-4 w-4' />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Disconnected</AlertDescription>
      </Alert>
    )

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

  return <>TEST</>
}
