'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Progress } from '~/components/ui/progress'
import {
  Wifi,
  Server,
  Video,
  Mic,
  BarChart,
  Camera,
  Volume2,
  Globe,
  Users,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useConnectionStore } from '~/store/connection'
import { useInputStore } from '~/store/input'
import { useQuery } from '@tanstack/react-query'
import { obs, useObs } from '~/hooks/obs'

export function ObsWebsocketDashboard() {
  // const { data: systemStats } = useObs('GetStats')
  // const { data: version } = useObs('GetVersion')
  // const { data: inputSources } = useObs('GetInputList')
  // console.log(inputSources , 'inputSources')
  const { isConnected } = useConnectionStore()

  // const inputSources = useInputStore((state) => state.inputs)


  const conn = useConnectionStore()

  const [stats, setStats] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    freeSpace: 0,
    activeSources: 0,
  })


  const streamInfo = {
    bitrate: Math.floor(Math.random() * 5000) + 2000,
    services: [
      { name: 'Twitch', viewers: 204 },
      { name: 'YouTube', viewers: 201 },
      { name: 'Facebook', viewers: 446 },
    ],
    totalViewers: 0,
  }

  return (
    <div className='space-y-4 p-4'>
      <h1 className='text-2xl font-bold text-white'>
        OBS WebSocket Connection Dashboard
      </h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Connection Status
            </CardTitle>
            <Wifi className={isConnected ? 'text-green-500' : 'text-red-500'} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </CardContent>
        </Card>
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
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Stream Status</CardTitle>
            <Video
             className='text-red-500'
            />
          </CardHeader>
          <CardContent>
            <Badge
            variant='destructive'
            >
              Live
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Active Sources
            </CardTitle>
            <Mic className='text-neutral-500 dark:text-neutral-400' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{inputSources?.inputs.length}</div>
          </CardContent>
        </Card>
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
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <div className='mb-1 flex justify-between'>
                <div>CPU Usage</div>
                <div>{systemStats?.cpuUsage.toFixed(2)}%</div>
              </div>
              <Progress value={systemStats?.cpuUsage} />
            </div>
            <div>
              <div className='mb-1 flex justify-between'>
                <div>Memory Usage</div>
                <div>{systemStats?.memoryUsage.toFixed(2)} MB</div>
              </div>
              <Progress value={stats.memoryUsage} />
            </div>
            <div>
              <div className='mb-1 flex justify-between'>
                <div>Free Disk Space</div>
                <div>{systemStats?.availableDiskSpace.toFixed(2)} GB</div>
              </div>
              <Progress value={((systemStats?.availableDiskSpace ?? 0) / 10) * 100} />
            </div>
          </CardContent>
        </Card>
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
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Sources Monitor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {inputSources?.inputs.map(({ inputUuid, inputKind, inputName }) => (
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
    </div>
  )
}
