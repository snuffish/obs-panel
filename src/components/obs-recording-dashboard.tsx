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
import { useRecordStore } from '~/store/recordStore'
import Disconnected from './Disconnected'
import SystemResources from './SystemResources'

export function ObsRecordingDashboard() {
  const queryClient = useQueryClient()
  const isConnected = useConnectionStore((state) => state.isConnected)
  const active = useRecordStore((state) => state.active)

  const { data: status } = useQuery({
    queryKey: ['obs', 'recordStatus'],
    queryFn: async () => {
      const status = await obs.call('GetRecordStatus')
      return status
    },
    refetchInterval: 1000,
    enabled: active,
  })

  const { mutate: startRecord } = useMutation({
    mutationKey: ['obs', 'startRecord'],
    mutationFn: async () => {
      await obs.call('StartRecord')

      await queryClient.invalidateQueries({ queryKey: ['obs', 'recordStatus']})
    }
  })

  const { mutate: stopRecord } = useMutation({
    mutationKey: ['obs', 'stopRecord'],
    mutationFn: async () => {
      await obs.call('StopRecord')

      await queryClient.invalidateQueries({ queryKey: ['obs', 'recordStatus'] })
    }
  })

  if (!isConnected) return <Disconnected />

  const recordTime = active ? status?.outputTimecode : '0:00:00'

  return (
    <div className='space-y-4 p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Recording Status</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-between flex-col md:flex-row'>
          <div className='flex items-center space-x-2 flex-col md:flex-row'>
            {active ? (
              <Badge variant='destructive'>Recording</Badge>
            ) : (
              <Badge variant='outline'>Stopped</Badge>
            )}
            <span className='text-2xl font-bold'>{recordTime}</span>
          </div>
          <div className='space-x-2'>
            {active ? (
              <Button onClick={() => stopRecord()} intent='destructive'>
                <Circle className='mr-2 h-4 w-4 fill-current' /> Stop Recording
              </Button>
            ) : (
              <Button onClick={() => startRecord()} intent='dark'>
                <Circle className='mr-2 h-4 w-4 fill-current' /> Start Recording
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      {active && <SystemResources />}
    </div>
  )
}
