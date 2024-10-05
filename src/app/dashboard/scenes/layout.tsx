'use client'

import { Edit2 } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { $obs } from '~/providers/connection'
import { type SceneProps, useScenes } from '~/providers/scene'

const Scene = ({ sceneName, sceneUuid }: SceneProps) => {
  const { current } = useScenes()

  const activateScene = () => {
    $obs
      .call('SetCurrentProgramScene', {
        sceneUuid,
      })
      .catch((err) => console.log('ERR=>', err))
  }

  return (
    <Card className=''>
      <CardContent className='flex justify-between space-x-4 p-4'>
        <div className='flex items-center space-x-5'>
          <div className='aspect-square w-20 rounded-xl bg-slate-500/50 opacity-50' />
          <span className='font-medium'>{sceneName}</span>
        </div>
        <div className='flex items-center space-x-4'>
          <Button size='icon' intent='ghost'>
            <Edit2 className='h-4 w-4' />
          </Button>
          {sceneUuid === current?.currentProgramSceneUuid ? (
            <Button intent='dark'>Active</Button>
          ) : (
            <Button onClick={activateScene} intent='outline'>
              Activate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ScenesLayout({ children }: PropsWithChildren) {
  const { scenes } = useScenes()

  return (
    <div className='col-start-2 -col-end-2'>
      <div className='space-y-4 p-4'>
        {scenes?.map((scene) => <Scene key={scene.sceneIndex} {...scene} />)}
      </div>
      {children}
    </div>
  )
}
