'use client'

import { useState, useEffect } from 'react'
import {
  Mic,
  Video,
  Tv,
  Settings,
  Play,
  Square,
  Volume2,
  MonitorPlay,
  HardDrive,
  Cpu,
  MemoryStick,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Slider } from '~/components/ui/slider'
import { Switch } from '~/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Progress } from '~/components/ui/progress'

export function ObsDashboardWithStats() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [streamTime, setStreamTime] = useState(0)
  const [recordTime, setRecordTime] = useState(0)

  // New state variables for statistics
  const [streamBitrate, setStreamBitrate] = useState(0)
  const [recordBitrate, setRecordBitrate] = useState(0)
  const [diskSpace, setDiskSpace] = useState(500) // GB
  const [cpuUsage, setCpuUsage] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [frameRate, setFrameRate] = useState(0)
  const [droppedFrames, setDroppedFrames] = useState(0)

  useEffect(() => {
    let streamInterval: NodeJS.Timeout
    if (isStreaming) {
      streamInterval = setInterval(() => {
        setStreamTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(streamInterval)
  }, [isStreaming])

  useEffect(() => {
    let recordInterval: NodeJS.Timeout
    if (isRecording) {
      recordInterval = setInterval(() => {
        setRecordTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(recordInterval)
  }, [isRecording])

  // Simulating real-time updates of statistics
  useEffect(() => {
    const statsInterval = setInterval(() => {
      if (isStreaming) {
        setStreamBitrate(Math.floor(Math.random() * 1000) + 3000) // 3000-4000 kbps
        setFrameRate(Math.floor(Math.random() * 10) + 55) // 55-65 fps
        setDroppedFrames((prev) => prev + Math.floor(Math.random() * 3)) // 0-2 dropped frames per update
      }
      if (isRecording) {
        setRecordBitrate(Math.floor(Math.random() * 2000) + 10000) // 10000-12000 kbps
      }
      setDiskSpace((prev) => Math.max(0, prev - Math.random() * 0.1)) // Slowly decrease available space
      setCpuUsage(Math.floor(Math.random() * 20) + 10) // 10-30% CPU usage
      setMemoryUsage(Math.floor(Math.random() * 1000) + 2000) // 2000-3000 MB memory usage
    }, 2000)

    return () => clearInterval(statsInterval)
  }, [isStreaming, isRecording])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return [hours, minutes, remainingSeconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':')
  }

  return (
    <div className='min-h-screen w-full bg-gray-100 p-8'>
      <div className='mx-auto max-w-6xl space-y-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='col-span-full space-y-8'>
            <div className='flex flex-col gap-10 md:flex-row'>
              <div className='basis-1/2'>
                <div className='rounded-lg bg-white p-6 shadow-md'>
                  <h2 className='mb-4 text-2xl font-semibold'>Main Controls</h2>
                  <div className='flex flex-col space-y-4'>
                    <div className='flex items-center justify-between'>
                      <Button
                        size='lg'
                        className={
                          isStreaming
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        }
                        onClick={() => {
                          setIsStreaming(!isStreaming)
                          if (!isStreaming) setStreamTime(0)
                        }}
                      >
                        {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
                      </Button>
                      <div className='font-mono text-2xl'>
                        {formatTime(streamTime)}
                      </div>
                    </div>
                    <div className='flex items-center justify-between'>
                      <Button
                        size='lg'
                        variant='outline'
                        className={isRecording ? 'bg-red-100 text-red-500' : ''}
                        onClick={() => {
                          setIsRecording(!isRecording)
                          if (!isRecording) setRecordTime(0)
                        }}
                      >
                        {isRecording ? (
                          <Square className='mr-2 h-4 w-4' />
                        ) : (
                          <Play className='mr-2 h-4 w-4' />
                        )}
                        {isRecording ? 'Stop Recording' : 'Start Recording'}
                      </Button>
                      <div className='font-mono text-2xl'>
                        {formatTime(recordTime)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='basis-1/2 rounded-lg bg-white p-6 shadow-md'>
                <h2 className='mb-4 text-2xl font-semibold'>Statistics</h2>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Stream Bitrate</Label>
                    <div className='text-lg font-semibold'>
                      {streamBitrate} kbps
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label>Record Bitrate</Label>
                    <div className='text-lg font-semibold'>
                      {recordBitrate} kbps
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label>Frame Rate</Label>
                    <div className='text-lg font-semibold'>{frameRate} fps</div>
                  </div>
                  <div className='space-y-2'>
                    <Label>Dropped Frames</Label>
                    <div className='text-lg font-semibold'>{droppedFrames}</div>
                  </div>
                  <div className='col-span-2 space-y-2'>
                    <Label>Available Disk Space</Label>
                    <Progress value={diskSpace / 10} className='w-full' />
                    <div className='text-sm text-gray-600'>
                      {diskSpace.toFixed(2)} GB
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label>CPU Usage</Label>
                    <Progress value={cpuUsage} className='w-full' />
                    <div className='text-sm text-gray-600'>{cpuUsage}%</div>
                  </div>
                  <div className='space-y-2'>
                    <Label>Memory Usage</Label>
                    <Progress value={memoryUsage / 100} className='w-full' />
                    <div className='text-sm text-gray-600'>
                      {memoryUsage} MB
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <Tabs defaultValue="stream" className="bg-white p-6 rounded-lg shadow-md">
                <TabsList>
                  <TabsTrigger value="stream">Stream</TabsTrigger>
                  <TabsTrigger value="record">Record</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                </TabsList>
                <TabsContent value="stream" className="space-y-4">
                  <h3 className="text-lg font-semibold">Stream Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stream-service">Streaming Service</Label>
                      <Select>
                        <SelectTrigger id="stream-service">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="twitch">Twitch</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="facebook">Facebook Live</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stream-key">Stream Key</Label>
                      <Input id="stream-key" type="password" placeholder="Enter your stream key" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="record" className="space-y-4">
                  <h3 className="text-lg font-semibold">Recording Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="record-format">Recording Format</Label>
                      <Select>
                        <SelectTrigger id="record-format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mp4">MP4</SelectItem>
                          <SelectItem value="mov">MOV</SelectItem>
                          <SelectItem value="mkv">MKV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="record-quality">Recording Quality</Label>
                      <Select>
                        <SelectTrigger id="record-quality">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Quality, Large File Size</SelectItem>
                          <SelectItem value="medium">Medium Quality, Medium File Size</SelectItem>
                          <SelectItem value="low">Low Quality, Small File Size</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="audio" className="space-y-4">
                  <h3 className="text-lg font-semibold">Audio Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Label htmlFor="mic-volume" className="w-24">Microphone</Label>
                      <Slider id="mic-volume" max={100} step={1} className="flex-1" />
                      <span className="w-12 text-right">100%</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Label htmlFor="desktop-volume" className="w-24">Desktop Audio</Label>
                      <Slider id="desktop-volume" max={100} step={1} className="flex-1" />
                      <span className="w-12 text-right">80%</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs> */}

            {/* New Statistics Section */}
          </div>

          {/* <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Scenes</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MonitorPlay className="mr-2 h-4 w-4" /> Main Scene
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Tv className="mr-2 h-4 w-4" /> Game Capture
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="mr-2 h-4 w-4" /> Webcam Only
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mic className="mr-2 h-4 w-4" /> Audio Only
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Quick Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="low-latency">Low Latency Mode</Label>
                  <Switch id="low-latency" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="chat-overlay">Show Chat Overlay</Label>
                  <Switch id="chat-overlay" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Stream Notifications</Label>
                  <Switch id="notifications" />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
