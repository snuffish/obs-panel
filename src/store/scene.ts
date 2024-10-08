import { type OBSResponseTypes } from 'obs-websocket-js'
import { create } from 'zustand'
import { obs } from './connection'

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
