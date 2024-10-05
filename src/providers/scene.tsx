'use client'

import { $obs } from './connection'
import { createContext, type PropsWithChildren, useContext, useState } from 'react'
import { type OBSResponseTypes } from 'obs-websocket-js'

export type GetSceneList = OBSResponseTypes['GetSceneList']
// export type CurrentScene = Omit<GetSceneList, 'scenes'>
export type CurrentScene = {
  currentProgramSceneName: string | undefined
  currentProgramSceneUuid: string | undefined
  currentPreviewSceneName: string | undefined
  currentPreviewSceneUuid: string | undefined
}
export type SceneProps = {
  sceneIndex: number
  sceneName: string
  sceneUuid: string
}

const ScenesContext = createContext<{
    current: CurrentScene,
    scenes: SceneProps[] | undefined
} | undefined>(undefined)

export const useScenes = () => {
  const context = useContext(ScenesContext)

  if (context === undefined) {
    throw new Error('useSceneContext must be used within a SceneProvider')
  }

  return context
}

const useSceneList = () => {
  const [scenes, setScenes] = useState<SceneProps[]>()
  const [currentProgramSceneName, setCurrentProgramSceneName] =
    useState<string>()
  const [currentProgramSceneUuid, setCurrentProgramSceneUuid] =
    useState<string>()
  const [currentPreviewSceneName, setCurrentPreviewSceneName] =
    useState<string>()
  const [currentPreviewSceneUuid, setCurrentPreviewSceneUuid] =
    useState<string>()

  $obs.once('Identified', (_) => {
    $obs
      .call('GetSceneList')
      .then(({ scenes, ...current }) => {
        setScenes(scenes as SceneProps[])
        setCurrentProgramSceneName(current.currentProgramSceneName)
        setCurrentProgramSceneUuid(current.currentProgramSceneUuid)
        setCurrentPreviewSceneName(current.currentPreviewSceneName)
        setCurrentPreviewSceneUuid(current.currentPreviewSceneUuid)
      })
      .catch((err) => console.log('ERR=>', err))

    $obs.on('CurrentProgramSceneChanged', ({ sceneName, sceneUuid }) => {
      setCurrentProgramSceneName(sceneName)
      setCurrentProgramSceneUuid(sceneUuid)
    })
  })

  return {
    scenes,
    current: {
      currentProgramSceneName,
      currentProgramSceneUuid,
      currentPreviewSceneName,
      currentPreviewSceneUuid,
    },
  }
}

export const ScenesProvider = ({ children }: PropsWithChildren) => {
  const { scenes, current } = useSceneList()

  return (
    <ScenesContext.Provider
      value={{
        current,
        scenes
      }}
    >
      {children}
    </ScenesContext.Provider>
  )
}
