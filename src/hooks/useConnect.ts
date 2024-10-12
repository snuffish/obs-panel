import { useMutation } from '@tanstack/react-query'
import { useServerSettings } from '~/hooks/useServerSettings'
import { toast } from '~/hooks/useToast'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'

export const useConnect = () => {
  const { isConnected, setIsConnected, setIdentified } = useConnectionStore()
  const { settings } = useServerSettings()

  const wsEndpoint = `ws://${settings.host}:${settings.port}`

  const { mutate: connect } = useMutation({
    mutationFn: async () => {
        const socket = obs.connect(wsEndpoint)
        return await socket
    },
    onSuccess: (session) => {
      setIsConnected(true)
      setIdentified(session)

      toast({
        variant: 'success',
        title: 'Connected!',
      })
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Failed to connect',
        description: `Failed to connect to OBS WebSocket: ${wsEndpoint}`,
      })

      throw err
    },
  })

  const { mutate: disconnect } = useMutation({
    mutationFn: async () => {
      return await obs.disconnect()
    },
    onSuccess() {
      setIsConnected(false)
      setIdentified(undefined)

      toast({
        variant: 'destructive',
        title: 'Disconnected!',
      })
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Failed to disconnect',
      })

      throw err
    },
  })

  const invoke = async () => {
    if (!isConnected) {
      connect()
    }

    if (isConnected) {
      disconnect()
    }
  }

  return {
    isConnected,
    invoke,
  }
}
