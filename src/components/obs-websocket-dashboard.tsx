'use client'

import { useQueries, useQuery } from '@tanstack/react-query'
import {
  Camera,
  Globe,
  Mic,
  Server,
  Users,
  Video,
  Volume2,
  Wifi,
} from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge } from  '~/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { useInfoStore } from '~/store/infoStore'
import { useRecordStore } from '~/store/recordStore'
import { SourceProps, useInputStore } from '~/store/sourceStore'
import SystemResources from './SystemResources'
import { useStreamStore } from '~/store/streamStore'

const ServerInfo = () => {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const { data: version } = useQuery({
    queryKey: ['obs', 'version'],
    queryFn: async () => {
      return await obs.call('GetVersion')
    },
    enabled: isConnected,
  })

  if (!isConnected) return null

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Server Info</CardTitle>
        <Server className='text-neutral-500 dark:text-neutral-400' />
      </CardHeader>
      <CardContent>
        <div className='text-sm'>OBS: {version?.obsVersion}</div>
        <div className='text-sm'>WebSocket: {version?.obsWebSocketVersion}</div>
      </CardContent>
    </Card>
  )
}

const RecordStatus = () => {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const recordActive = useRecordStore((state) => state.active)
  const streamActive = useStreamStore((state) => state.active)

  if (!isConnected) return null

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Video Status</CardTitle>
        <Video
          className={
            recordActive || streamActive ? 'text-red-500' : 'text-black'
          }
        />
      </CardHeader>
      <CardContent className='space-y-1'>
        <div className='flex'>
          <span className='flex-1 text-sm'>Recording</span>
          {recordActive ? (
            <Badge variant='destructive'>Running</Badge>
          ) : (
            <Badge variant='outline'>Stopped</Badge>
          )}
        </div>
        <div className='flex'>
          <span className='flex-1 text-sm'>Streaming</span>
          {streamActive ? (
            <Badge variant='destructive'>Running</Badge>
          ) : (
            <Badge variant='outline'>Stopped</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const ActiveSources = () => {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const inputSources = useInputStore((state) => state.inputs)

  if (!isConnected) return null

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Active Sources</CardTitle>
        <Mic className='text-neutral-500 dark:text-neutral-400' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{inputSources?.length}</div>
      </CardContent>
    </Card>
  )
}

const ActiveSourcesMonitor = () => {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const inputSources = useInputStore((state) => state.inputs)

  if (!isConnected) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Sources Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {inputSources.map(({ inputUuid, inputKind, inputName }) => (
            <div
              key={inputUuid}
              className='flex items-center space-x-4 rounded-md border border-neutral-200 p-2 dark:border-neutral-800'
            >
              {inputKind === 'wasapi_input_capture' ? (
                <Volume2 className='text-green-500' />
              ) : (
                <Camera className='text-blue-500' />
              )}
              <div className='flex-1'>
                <div className='font-medium'>{inputName}</div>
                <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                  {inputKind}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const StreamingServices = () => {
  const isConnected = useConnectionStore((state) => state.isConnected)

  const streamInfo = {
    services: [
      { name: 'Twitch', viewers: 0 },
      { name: 'YouTube', viewers: 0 },
      { name: 'Facebook', viewers: 0 },
    ],
  }

  if (!isConnected) return null

  return (
    <Card className='col-span-full'>
      <CardHeader>
        <CardTitle>Streaming Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {streamInfo.services.map((service, index) => (
            <div
              key={index}
              className='flex items-center space-x-4 rounded-md border border-neutral-200 p-2 dark:border-neutral-800'
            >
              <Globe className='text-blue-500' />
              <div className='flex-1'>
                <div className='font-medium'>{service.name}</div>
                <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                  <Users className='mr-1 inline' size={16} />
                  {service.viewers} viewers
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const CPUUsageHistory = () => {
  const isConnected = useConnectionStore((state) => state.isConnected)

  if (!isConnected) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>CPU Usage History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[200px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={undefined}>
              <CartesianGrid strokeDasharray='3' />
              <XAxis dataKey='time' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='usage' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

const ConnectionStatus = () => {
  const isConnected = useConnectionStore((state) => state.isConnected)

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>Connection Status</CardTitle>
        <Wifi className={isConnected ? 'text-green-500' : 'text-red-500'} />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </CardContent>
    </Card>
  )
}

export function ObsWebsocketDashboard() {
  const isConnected = useConnectionStore((state) => state.isConnected)
  const setInputs = useInputStore((state) => state.setInputs)

  const { data: inputs } = useQuery({
    queryFn: async () => {
      return await obs.call('GetInputList')
    },
    select: (data) => data.inputs
  })

  const data = useQueries({
    queries: inputs ? inputs.map((input) => {
      return {
        queryKey: ['messages', input],
        queryFn: async () => {
          const { inputSettings } = await obs.call('GetInputSettings', {
            inputUuid: input.inputUuid as string,
          })

          return { inputSettings, ...input }
        }
      }
    })
  : []
  })

  useQuery({
    queryKey: ['obs', 'inputs'],
    queryFn: async () => {
      const { inputs } = await obs.call('GetInputList')
      const parsedInputs = await Promise.all(
        inputs.map(async (input) => {
          const { inputSettings } = await obs.call('GetInputSettings', {
            inputUuid: input.inputUuid as string,
          })

          return { inputSettings, ...input }
        }),
      )

      setInputs(parsedInputs as unknown as SourceProps[])

      return parsedInputs
    },
    enabled: isConnected,
  })

  return (
    <div className='space-y-4 p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <ConnectionStatus />
        <ServerInfo />
        <RecordStatus />
        <ActiveSources />
        <StreamingServices />
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <SystemResources />
        <CPUUsageHistory />
      </div>
      <ActiveSourcesMonitor />
    </div>
  )
}
