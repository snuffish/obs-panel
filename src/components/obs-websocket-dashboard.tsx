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
import { useConnectionStore } from '~/store'

// @TODO
const obsVersion = '27.2.4'

const sourceTypes = [
  'Webcam',
  'Microphone',
  'Game Capture',
  'Screen Capture',
  'Browser Source',
]

export function ObsWebsocketDashboard() {
  const isConnected = useConnectionStore(state => state.isConnected)

  const [connectionStatus, setConnectionStatus] = useState('Disconnected')
  const [serverInfo, setServerInfo] = useState({
    obsVersion: '',
    websocketVersion: '',
  })
  const [stats, setStats] = useState({
    cpuUsage: 0,
    memoryUsage: 0,
    freeSpace: 0,
    activeSources: 0,
  })
  const [streamStatus, setStreamStatus] = useState('Offline')
  const [cpuHistory, setCpuHistory] = useState([])
  const [activeSources, setActiveSources] = useState([
    {
      id: 1,
      name: `OBSBOT`,
      type: 'video',
      status: 'Active',
    },
    {
      id: 2,
      name: `iPhone`,
      type: 'video',
      status: 'Active',
    },
    {
      id: 3,
      name: `Channel 1`,
      type: 'audio',
      status: 'Active',
    },
    {
      id: 3,
      name: `Channel 2`,
      type: 'audio',
      status: 'Inactive',
    },
    {
      id: 3,
      name: `Channel 3`,
      type: 'audio',
      status: 'Inactive',
    },
    {
      id: 3,
      name: `Channel 4`,
      type: 'audio',
      status: 'Inactive',
    },
  ])

  useEffect(() => {
    // Simulating connection and data updates
    const connect = setTimeout(() => {
      setConnectionStatus('Connected')
      setServerInfo({
        obsVersion: '27.2.4',
        websocketVersion: '5.0.1',
      })
    }, 2000)

    const newCpuUsage = Math.random() * 100
    setStats((prev) => ({
      cpuUsage: newCpuUsage,
      memoryUsage: Math.random() * 100,
      freeSpace: Math.random() * 1000,
      activeSources: Math.floor(Math.random() * 10) + 1,
    }))
    setCpuHistory((prev) => [
      ...prev.slice(-19),
      { time: new Date().toLocaleTimeString(), usage: newCpuUsage },
    ])
    setStreamStatus(Math.random() > 0.5 ? 'Live' : 'Offline')

    // Simulating active sources

    return () => {
      // clearTimeout(connect)
      // clearInterval(interval)
    }
  }, [])

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
            <div className='text-sm'>OBS: {obsVersion}</div>
            <div className='text-sm'>
              WebSocket:{' '}
              {/* {state?.obsWebSocketVersion ? state.obsWebSocketVersion : '?'} */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Stream Status</CardTitle>
            <Video
              className={
                streamStatus === 'Live'
                  ? 'text-red-500'
                  : 'text-neutral-500 dark:text-neutral-400'
              }
            />
          </CardHeader>
          <CardContent>
            <Badge
              variant={streamStatus === 'Live' ? 'destructive' : 'secondary'}
            >
              {streamStatus}
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
            <div className='text-2xl font-bold'>{stats.activeSources}</div>
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
                <div>{stats.cpuUsage.toFixed(1)}%</div>
              </div>
              <Progress value={stats.cpuUsage} />
            </div>
            <div>
              <div className='mb-1 flex justify-between'>
                <div>Memory Usage</div>
                <div>{stats.memoryUsage.toFixed(1)}%</div>
              </div>
              <Progress value={stats.memoryUsage} />
            </div>
            <div>
              <div className='mb-1 flex justify-between'>
                <div>Free Disk Space</div>
                <div>{stats.freeSpace.toFixed(2)} GB</div>
              </div>
              <Progress value={(stats.freeSpace / 10) * 100} />
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
                <LineChart data={cpuHistory}>
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
            {activeSources.map((source) => (
              <div
                key={source.id}
                className='flex items-center space-x-4 rounded-md border border-neutral-200 p-2 dark:border-neutral-800'
              >
                {source.type === 'video' ? (
                  <Camera className='text-blue-500' />
                ) : (
                  <Volume2 className='text-green-500' />
                )}
                <div className='flex-1'>
                  <div className='font-medium'>{source.name}</div>
                  <div className='text-sm text-neutral-500 dark:text-neutral-400'>
                    {source.type}
                  </div>
                </div>
                <Badge
                  variant={
                    source.status === 'Active' ? 'default' : 'destructive'
                  }
                >
                  {source.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
