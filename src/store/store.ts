'use client'

import { create } from 'zustand'
import {
  type OBSEventTypes,
  type OBSResponseTypes,
  OBSWebSocket,
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

  useConnectionStore.subscribe(({ isConnected }) => {
    if (!isConnected) return

    obs
      .call('GetSceneList')
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

type SourceProps = {
  inputKind: string
  inputName: string
  inputUuid: string
  unversionedInputKind: string
}

// GetSourceActive
// GetSourceScreenshot
export const useInputStore = create<{
  inputs: SourceProps[]
  setInputs: (inputs: SourceProps[]) => void
}>((set) => {
  const setInputs = (inputs: SourceProps[]) => set({ inputs })

  useConnectionStore.subscribe(({ isConnected }) => {
    if (!isConnected) return

    obs
      .call('GetInputList')
      .then(async ({ inputs }) => {
        inputs = await Promise.all(
          inputs.map(async (input) => {
            const { inputSettings } = await obs.call('GetInputSettings', {
              inputUuid: input.inputUuid as string,
            })

            return { inputSettings, ...input }
          }),
        )

        setInputs(inputs as SourceProps[])
      })
      .catch((err) => console.error('ERR=>>>', err))
  })

  return {
    inputs: [],
    setInputs,
  }
})

export const useInfoStore = create<{
  version: OBSResponseTypes['GetVersion']
  setVersion: (version: OBSResponseTypes['GetVersion']) => void
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
}>((set) => {
  const setVersion = (version: OBSResponseTypes['GetVersion']) =>
    set({ version })

  useConnectionStore.subscribe(({ isConnected }) => {
    if (!isConnected) return

    obs
      .call('GetVersion')
      .then((version) => setVersion(version))
      .catch((err) => console.error('GetVersion error:', err))
  })

  return {
    version: {},
    setVersion,
  }
})
