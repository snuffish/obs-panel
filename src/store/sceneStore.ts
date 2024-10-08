import { create } from "zustand"
import { useConnectionStore } from "./connectionStore"
import { obs } from "~/services/obs"

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