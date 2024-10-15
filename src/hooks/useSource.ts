import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { obs } from '~/services/obs'

export const useSource = (sourceUuid: string) => {
  const [base64, setBase64] = useState<string | undefined>(undefined)
  useQuery({
    queryKey: ['base64', sourceUuid],
    refetchInterval: 1000,
    queryFn: async () => {
      const data = await obs.call('GetSourceScreenshot', {
        imageFormat: 'jpg',
        imageHeight: 150,
        imageWidth: 150,
        sourceUuid
      })

      return data.imageData
    },
    onSuccess: (data) => {
        setBase64(data)
        // console.log('Got source screenshot:', data)
    },
    onError: (err) => {
        setBase64(undefined)
        console.error('Failed to get source screenshot:', err)
    }
  })

  return base64
}
