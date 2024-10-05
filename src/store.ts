'use client'

import { OBSWebSocket, type OBSResponseTypes } from 'obs-websocket-js'
import { create } from 'zustand'

export type GetSceneList = OBSResponseTypes['GetSceneList']['scenes']
// export type CurrentScene = Omit<GetSceneList, 'scenes'>
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

const host = 'ws://localhost:4455'

export const obs = new OBSWebSocket()

const originalEmit = obs.emit.bind(obs)
obs.emit = (event, ...args) => {
  console.log(`Event emitted: ${event}`, ...args)
  return originalEmit.apply(this, [event, ...args])
}

export const useSceneStore = create<{
  current: CurrentScene
  scenes: SceneProps[]
}>((set) => {
  obs.once('Identified', (_) => {
    obs
      .call('GetSceneList')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .then(({ scenes, ...current }) => set({ scenes, current }))
      .catch((err) => console.error('ERR=>>>', err))

    obs
      .on('CurrentProgramSceneChanged', ({ sceneName, sceneUuid }) =>
        set({
          current: {
            currentProgramSceneName: sceneName,
            currentProgramSceneUuid: sceneUuid,
          },
        }),
      )
      .on('SceneNameChanged', (data) =>
        set((state) => {
          const scenes = state.scenes.map((scene) =>
            scene.sceneUuid === data.sceneUuid
              ? { ...scene, sceneName: data.sceneName }
              : scene,
          )

          return { scenes }
        }),
      )
  })

  return {
    current: {},
    scenes: [],
  }
})

export const useConnectionStore = create<{
  isConnected?: boolean
  session?: Awaited<ReturnType<typeof obs.connect>>
  connect: () => void
  disconnect: () => void
}>((set) => {
  obs
    .on('ConnectionOpened', () => set({ isConnected: true }))
    .on('ConnectionClosed', (err) => {
      console.error('Connection closed:', err)
      set({ isConnected: false })
    })
    .on('ConnectionError', (err) => console.error('Connection error:', err))
    .on('Hello', (data) => {
      console.log('HELLO', data)
    })

  return {
    isConnected: false,
    connect: () => {
      obs
        .connect(host)
        .then((session) => set({ session }))
        .catch((err) => console.error('Connection error:', err))
    },
    disconnect: () => {
      obs.disconnect().catch((err) => console.error('Disconnect error:', err))
    },
  }
})
