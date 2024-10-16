import { obs } from "./obs"

export type SceneListResponse = Awaited<ReturnType<typeof getSceneList>>

export const getSceneList = async () => {
  return await obs.call('GetSceneList')
}
