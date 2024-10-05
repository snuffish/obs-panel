'use client'

import { Check, Edit2, X } from 'lucide-react'
import { useRef, useState, type PropsWithChildren } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { obs, type SceneProps, useSceneStore } from '~/store'

const Scene = ({ sceneName, sceneUuid }: SceneProps) => {
  const { currentProgramSceneUuid } = useSceneStore((state) => state.current)
  const [isEdit, setIsEdit] = useState(false)
  const newSceneNameRef = useRef<HTMLInputElement>(null)

  return (
    <Card className=''>
      <CardContent className='flex justify-between space-x-4 p-4'>
        <div className='flex items-center space-x-5'>
          <div className='aspect-square w-20 rounded-xl bg-slate-500/50 opacity-50' />
          {isEdit ? (
            <div className='flex gap-x-2'>
              <Input
                ref={newSceneNameRef}
                className='flex-grow'
                defaultValue={sceneName}
              />
              <Button
                onClick={() => {
                  const newSceneName = newSceneNameRef.current?.value ?? ''
                  obs
                    .call('SetSceneName', {
                      sceneUuid: sceneUuid,
                      newSceneName: newSceneName,
                    })
                    .catch((error) =>
                      console.error('Failed to set scene name:', error),
                    )

                    setIsEdit(false)
                }}
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
  const scenes = useSceneStore((state) => state.scenes)

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
