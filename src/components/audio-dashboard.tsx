'use client'

import React, { useState } from 'react'
import { Slider } from '~/components/ui/slider'
import { Switch } from '~/components/ui/switch'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  Mic as MicrophoneIcon,
  Speaker as SpeakerIcon,
  VolumeX as VolumeXIcon,
  Volume2 as Volume2Icon,
} from 'lucide-react'

// Mock audio sources data
const initialAudioSources = [
  { id: 1, name: 'Microphone', volume: 75, muted: false },
  { id: 2, name: 'Desktop Audio', volume: 80, muted: false },
  { id: 3, name: 'Browser Source', volume: 60, muted: false },
  { id: 4, name: 'Music', volume: 40, muted: true },
]

export function AudioDashboardComponent() {
  const [audioSources, setAudioSources] = useState(initialAudioSources)
  const [masterVolume, setMasterVolume] = useState(100)

  const handleVolumeChange = (id: number, newVolume: number) => {
    setAudioSources((sources) =>
      sources.map((source) =>
        source.id === id ? { ...source, volume: newVolume } : source,
      ),
    )
  }

  const handleMuteToggle = (id: number) => {
    setAudioSources((sources) =>
      sources.map((source) =>
        source.id === id ? { ...source, muted: !source.muted } : source,
      ),
    )
  }

  const muteAll = () => {
    setAudioSources((sources) =>
      sources.map((source) => ({ ...source, muted: true })),
    )
  }

  const unmuteAll = () => {
    setAudioSources((sources) =>
      sources.map((source) => ({ ...source, muted: false })),
    )
  }

  return (
    <div className='mx-auto max-w-4xl p-6'>
      <h1 className='mb-6 text-3xl font-bold'>OBS Audio Dashboard</h1>
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Master Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-4'>
            <VolumeXIcon className='h-6 w-6' />
            <Slider
              value={[masterVolume]}
              // onValueChange={([value]) => setMasterVolume(value)}
              max={100}
              step={1}
              className='flex-grow'
            />
            <Volume2Icon className='h-6 w-6' />
            <span className='w-12 text-right'>{masterVolume}%</span>
          </div>
        </CardContent>
      </Card>

      <div className='mb-6 grid gap-6'>
        {audioSources.map((source) => (
          <Card key={source.id}>
            <CardContent className='pt-6'>
              <div className='mb-2 flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>{source.name}</h3>
                <Switch
                  checked={!source.muted}
                  onCheckedChange={() => handleMuteToggle(source.id)}
                />
              </div>
              <div className='flex items-center space-x-4'>
                <VolumeXIcon className='h-6 w-6' />
                <Slider
                  value={[source.volume]}
                  onValueChange={([value]) => {
                    if (value !== undefined) {
                      handleVolumeChange(source.id, value)
                    }
                  }}
                  max={100}
                  step={1}
                  className='flex-grow'
                  disabled={source.muted}
                />
                <Volume2Icon className='h-6 w-6' />
                <span className='w-12 text-right'>{source.volume}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className='mb-6'>
        <CardHeader>
          <CardTitle>Audio Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-semibold'>Peak Level:</p>
              <p>-3.5 dB</p>
            </div>
            <div>
              <p className='font-semibold'>Average Level:</p>
              <p>-12.8 dB</p>
            </div>
            <div>
              <p className='font-semibold'>Clipping:</p>
              <p>None</p>
            </div>
            <div>
              <p className='font-semibold'>Sample Rate:</p>
              <p>48000 Hz</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex space-x-4'>
        <Button onClick={muteAll} className='flex-1'>
          <MicrophoneIcon className='mr-2 h-4 w-4' />
          Mute All
        </Button>
        <Button onClick={unmuteAll} className='flex-1'>
          <SpeakerIcon className='mr-2 h-4 w-4' />
          Unmute All
        </Button>
      </div>
    </div>
  )
}
