import { obs } from "./obs"

export const getSourceScreenshot = async () => {
    const data = await obs.call('GetSourceScreenshot', {
        sourceUuid: '',
        imageFormat: 'jpg',
        imageHeight: 150,
        imageWidth: 150,
      })

      return data.imageData
}

export const getSceneList = async () => {
  return await obs.call('GetSceneList')    
}
