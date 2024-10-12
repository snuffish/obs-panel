import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, X, Edit2 } from 'lucide-react'
import { useState, useRef } from 'react'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { type SceneProps, useSceneStore } from '~/store/sceneStore'
import { Disconnected } from './Disconnected'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Input } from './ui/input'

const Scene = ({ sceneName, sceneUuid }: SceneProps) => {
  const queryClient = useQueryClient()
  const [isEdit, setIsEdit] = useState(false)
  const newSceneNameRef = useRef<HTMLInputElement>(null)

  const isConnected = useConnectionStore((state) => state.isConnected)
  const currentProgramSceneUuid = useSceneStore(
    (state) => state.current.currentProgramSceneUuid,
  )

  const { data: base64 } = useQuery({
    queryKey: ['base64', sceneUuid],
    queryFn: async () => {
      const data = await obs.call('GetSourceScreenshot', {
        sourceUuid: sceneUuid,
        imageFormat: 'jpg',
        imageHeight: 150,
        imageWidth: 150,
      })

      return data.imageData
    },
    refetchInterval: 1000,
    enabled: isConnected,
  })

  const { mutate: changeSceneName } = useMutation({
    mutationFn: async () => {
      const newSceneName = newSceneNameRef.current?.value ?? ''

      await obs.call('SetSceneName', {
        sceneUuid,
        newSceneName,
      })
    },
    onSuccess: async () => {
        setIsEdit(false)

        await queryClient.invalidateQueries({ queryKey: ['obs', 'scenes'] })
    },
    onError: (error) => console.error('Failed to set scene name:', error),
  })

  const { mutate: activateScene } = useMutation({
    mutationFn: async () => {
      await obs.call('SetCurrentProgramScene', {
        sceneUuid,
      })
    },
    onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ['obs', 'scenes'] })
    },
    onError: (error) => console.error('Failed to activate scene:', error),
  })

  return (
    <Card className={sceneUuid === currentProgramSceneUuid ? 'bg-white/50' : ''} onClick={() => activateScene()}>
      <CardContent className='md:flex justify-between p-4'>
        <div className='flex items-center space-x-5 flex-col md:flex-row'>
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
        <div className='hidden md:flex md:items-center md:space-x-4'>
          <Button size='icon' intent='ghost'>
            <Edit2 onClick={() => setIsEdit(true)} className='h-4 w-4' />
          </Button>
          {sceneUuid === currentProgramSceneUuid ? (
            <Button intent='dark'>Active</Button>
          ) : (
            <Button onClick={() => activateScene()} intent='outline'>
              Activate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ScenesDashboard() {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const { setScenes, setCurrent } = useSceneStore((state) => state)

  const { data: scenes } = useQuery({
    queryKey: ['obs', 'scenes'],
    queryFn: async () => {
      const { scenes, ...current } = await obs.call('GetSceneList')

      setCurrent(current)
      setScenes(scenes as SceneProps[])

      return scenes as SceneProps[]
    },
    enabled: isConnected,
  })

  if (!isConnected) return <Disconnected />

  return scenes ? (
    scenes.map((scene) => <Scene key={scene.sceneUuid} {...scene} />)
  ) : (
    <div>ERROR</div>
  )
}
