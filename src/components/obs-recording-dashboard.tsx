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
import { useMutation, useQuery } from '@tanstack/react-query'
import { obs } from '~/services/obs'
import { useRecordStore } from '~/store/recordStore'

export function ObsRecordingDashboard() {
  const isConnected = useConnectionStore((state) => state.isConnected)

  const { data: status } = useQuery({
    queryFn: async () => {
      const status = await obs.call('GetRecordStatus')
      return status
    },
    enabled: isConnected,
  })

  const { mutate: startRecord } = useMutation({
    mutationFn: async () => {
      await obs.call('StartRecord')
    }
  })

  if (!isConnected) return <Disconnected />

  return (
    <div className='space-y-4 p-4'>
      <h1 className='text-2xl font-bold text-white'>OBS Recording Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Recording Status</CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Badge variant='outline'>Stopped</Badge>
            <span className='text-2xl font-bold'>{'0:00:00'}</span>
          </div>
          <div className='space-x-2'>
            <Button onClick={() => startRecord()} intent='dark'>
              <Circle className='mr-2 h-4 w-4 fill-current' /> Start Recording
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
