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

export function ObsRecordingDashboard() {
  const isConnected = useConnectionStore((state) => state.isConnected)

  
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [fileSize, setFileSize] = useState(0)
  const [outputPath, setOutputPath] = useState('/path/to/recordings')
  const [recordingFormat, setRecordingFormat] = useState('mp4')
  const [audioTrack, setAudioTrack] = useState('1')
  const [encoderSettings, setEncoderSettings] = useState({
    videoEncoder: 'x264',
    audioEncoder: 'AAC',
    quality: 'High',
  })
  const [diskSpace, setDiskSpace] = useState(500) // in GB
  
  useEffect(() => {
    let interval
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
        setFileSize((prev) => prev + 0.5) // Simulating file size increase
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPaused])
  
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "'0'")}:${mins.toString().padStart(2, "'0'")}:${secs.toString().padStart(2, "'0'")}`
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
  }
  
  const handlePauseRecording = () => {
    setIsPaused(true)
  }
  
  const handleResumeRecording = () => {
    setIsPaused(false)
  }
  
  const handleStopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    setRecordingTime(0)
    setFileSize(0)
  }

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
            <Badge
              variant={
                isRecording ? (isPaused ? '' : 'destructive') : 'outline'
              }
            >
              {isRecording ? (isPaused ? 'Paused' : 'Recording') : 'Stopped'}
            </Badge>
            <span className='text-2xl font-bold'>
              {formatTime(recordingTime)}
            </span>
          </div>
          <div className='space-x-2'>
            {!isRecording && (
              <Button intent='dark' onClick={handleStartRecording}>
                <Circle className='mr-2 h-4 w-4 fill-current' /> Start Recording
              </Button>
            )}
            {isRecording && !isPaused && (
              <Button intent='dark' onClick={handlePauseRecording}>
                <Pause className='mr-2 h-4 w-4' /> Pause
              </Button>
            )}
            {isRecording && isPaused && (
              <Button intent='dark' onClick={handleResumeRecording}>
                <Circle className='mr-2 h-4 w-4 fill-current' /> Resume
              </Button>
            )}
            {isRecording && (
              <Button intent='destructive' onClick={handleStopRecording}>
                <Square className='mr-2 h-4 w-4' /> Stop Recording
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Recording Settings</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Folder className='h-4 w-4' />
              <span className='font-medium'>Output Path:</span>
              <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                {outputPath}
              </span>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='recording-format'>Recording Format</Label>
              <Select
                value={recordingFormat}
                onValueChange={setRecordingFormat}
              >
                <SelectTrigger id='recording-format'>
                  <SelectValue placeholder='Select format' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='mp4'>MP4</SelectItem>
                  <SelectItem value='mov'>MOV</SelectItem>
                  <SelectItem value='mkv'>MKV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='audio-track'>Audio Track</Label>
              <Select value={audioTrack} onValueChange={setAudioTrack}>
                <SelectTrigger id='audio-track'>
                  <SelectValue placeholder='Select audio track' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>Track 1</SelectItem>
                  <SelectItem value='2'>Track 2</SelectItem>
                  <SelectItem value='3'>Track 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex items-center space-x-2'>
              <Switch id='separate-audio' />
              <Label htmlFor='separate-audio'>
                Record separate audio tracks
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Encoder Settings</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='video-encoder'>Video Encoder</Label>
              <Select
                value={encoderSettings.videoEncoder}
                onValueChange={(value) =>
                  setEncoderSettings({
                    ...encoderSettings,
                    videoEncoder: value,
                  })
                }
              >
                <SelectTrigger id='video-encoder'>
                  <SelectValue placeholder='Select video encoder' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='x264'>x264</SelectItem>
                  <SelectItem value='NVENC'>NVENC</SelectItem>
                  <SelectItem value='QuickSync'>QuickSync</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='audio-encoder'>Audio Encoder</Label>
              <Select
                value={encoderSettings.audioEncoder}
                onValueChange={(value) =>
                  setEncoderSettings({
                    ...encoderSettings,
                    audioEncoder: value,
                  })
                }
              >
                <SelectTrigger id='audio-encoder'>
                  <SelectValue placeholder='Select audio encoder' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='AAC'>AAC</SelectItem>
                  <SelectItem value='Opus'>Opus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='quality'>Quality</Label>
              <Select
                value={encoderSettings.quality}
                onValueChange={(value) =>
                  setEncoderSettings({ ...encoderSettings, quality: value })
                }
              >
                <SelectTrigger id='quality'>
                  <SelectValue placeholder='Select quality' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='High'>High</SelectItem>
                  <SelectItem value='Medium'>Medium</SelectItem>
                  <SelectItem value='Low'>Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recording Stats</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Clock className='h-4 w-4' />
              <span>Duration:</span>
            </div>
            <span className='font-medium'>{formatTime(recordingTime)}</span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <HardDrive className='h-4 w-4' />
              <span>File Size:</span>
            </div>
            <span className='font-medium'>{fileSize.toFixed(2)} MB</span>
          </div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Disk Space:</span>
              <span>{diskSpace.toFixed(2)} GB free</span>
            </div>
            <Progress value={(diskSpace / 1000) * 100} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
