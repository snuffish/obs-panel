'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Circle
} from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import Disconnected from './Disconnected'
import SystemResources from './SystemResources'
import { useStreamStore } from '~/store/streamStore'

export function ObsStreamingDashboard() {
  const queryClient = useQueryClient()
  const isConnected = useConnectionStore((state) => state.isConnected)
  const active = useStreamStore((state) => state.active)

  const { data: status } = useQuery({
    queryKey: ['obs', 'streamStatus'],
    queryFn: async () => {
      const status = await obs.call('GetStreamStatus')
      return status
    },
    refetchInterval: 1000,
    enabled: active,
  })

  const { mutate: startStream } = useMutation({
    mutationFn: async () => {
      await obs.call('StartStream')

      await queryClient.invalidateQueries({ queryKey: ['obs', 'streamStatus'] })
    },
  })

  const { mutate: stopStream } = useMutation({
    mutationFn: async () => {
      await obs.call('StopStream')

      await queryClient.invalidateQueries({ queryKey: ['obs', 'streamStatus'] })
    },
  })

  if (!isConnected) return <Disconnected />

  const streamTime = active ? status?.outputTimecode : '0:00:00'

  return (
    <div className='space-y-4 p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Streaming Status</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-between flex-col md:flex-row'>
          <div className='flex items-center space-x-2 flex-col md:flex-row'>
            {active ? (
              <Badge variant='destructive'>Streaming</Badge>
            ) : (
              <Badge variant='outline'>Stopped</Badge>
            )}
            <span className='text-2xl font-bold'>{streamTime}</span>
          </div>
          <div className='space-x-2'>
            {active ? (
              <Button onClick={() => stopStream()} intent='destructive'>
                <Circle className='mr-2 h-4 w-4 fill-current' /> Stop Streaming
              </Button>
            ) : (
              <Button onClick={() => startStream()} intent='dark'>
                <Circle className='mr-2 h-4 w-4 fill-current' /> Start Streaming
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {active && <SystemResources />}
    </div>
  )
}
