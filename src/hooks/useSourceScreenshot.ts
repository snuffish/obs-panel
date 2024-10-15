import { useQuery } from '@tanstack/react-query'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { type SourceProps } from '~/store/sourceStore'

export const useSourceScreenshot = (scene: SourceProps) => {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const { data: base64 } = useQuery({
    queryKey: ['base64', scene.inputUuid],
    queryFn: async () => {
      const data = await obs.call('GetSourceScreenshot', {
        sourceUuid: sceneUuid,
        imageFormat: 'jpg',
        imageHeight: 150,
        imageWidth: 150,
      })

      console.log('JAAA')

      return data.imageData
    },
    refetchInterval: 1000,
    enabled: isConnected,
  })
}
