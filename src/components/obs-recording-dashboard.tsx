'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Progress } from '~/components/ui/progress'
import { Badge } from '~/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { Label } from '~/components/ui/label'
import {
  Circle,
  Pause,
  Square,
  Folder,
  HardDrive,
  Clock,
  Film,
} from 'lucide-react'
import Disconnected from './Disconnected'
import { useConnectionStore } from '~/store/connectionStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { obs } from '~/services/obs'
import { useRecordStore } from '~/store/recordStore'

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
    mutationFn: async () => {
      await obs.call('StartRecord')

      await queryClient.invalidateQueries(['obs', 'recordStatus'])
    },
  })

  const { mutate: stopRecord } = useMutation({
    mutationFn: async () => {
      await obs.call('StopRecord')

      await queryClient.invalidateQueries(['obs', 'recordStatus'])
    },
  })

  if (!isConnected) return <Disconnected />

  const recordTime = active ? status?.outputTimecode : '0:00:00'

  return (
    <div className='space-y-4 p-4'>
      <h1 className='text-2xl font-bold text-white'>OBS Recording Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recording Status</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
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
    </div>
  )
}
