'use client'

import { create } from 'zustand'
import {
  type OBSEventTypes,
  OBSWebSocket
} from 'obs-websocket-js'

export const host = 'ws://localhost:4455'

export const obs = new OBSWebSocket()

const originalEmit = obs.emit.bind(obs)
obs.emit = (event, ...args) => {
  console.log(`Event emitted: ${event}`, ...args)
  return originalEmit.apply(this, [event, ...args])
}

type ConnectionState = {
  isConnected: boolean
  setIsConected: (isConnected: boolean) => void
  setIdentified: (identified: unknown) => void
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  isConnected: false,
  identified: {},
  setIsConected: (isConnected: boolean) => set({ isConnected }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setIdentified: (identified: unknown) => set({ identified }),
}))

export type CurrentScene = {
  currentProgramSceneName?: string
  currentProgramSceneUuid?: string
  currentPreviewSceneName?: string
  currentPreviewSceneUuid?: string
}
export type SceneProps = {
  sceneIndex: number
  sceneName: string
  sceneUuid: string
}

export const useSceneStore = create<{
  current: CurrentScene
  scenes: SceneProps[]
  setCurrent: (current: CurrentScene) => void
  setScenes: (scenes: SceneProps[]) => void
}>((set, get) => {
  const setCurrent = (current: CurrentScene) => set({ current })
  const setScenes = (scenes: SceneProps[]) => set({ scenes })

  obs.once('Identified', (_) => {
    obs.call('GetSceneList')
    .then(({ scenes, ...current }) => {
      setCurrent(current)
      setScenes(scenes as SceneProps[])
    })
    .catch((err) => console.error('ERR=>>>', err))

    obs
    .on('CurrentProgramSceneChanged', ({ sceneName, sceneUuid }) => {
      setCurrent({
        currentProgramSceneName: sceneName,
        currentProgramSceneUuid: sceneUuid,
      })
    })
    .on('SceneNameChanged', (data) => {
      const scenes = get().scenes.map((scene) =>
        scene.sceneUuid === data.sceneUuid
          ? { ...scene, sceneName: data.sceneName }
          : scene,
      )

      setScenes(scenes)
    })
  })

  return {
    current: {},
    scenes: [],
    setCurrent,
    setScenes: (scenes: SceneProps[]) => set({ scenes }),
  }
})