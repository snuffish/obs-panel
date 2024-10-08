'use client'

import {
  InfoIcon,
  MonitorIcon,
  PlugIcon,
  PodcastIcon,
  UnplugIcon,
  VideoIcon,
  Volume2Icon,
} from 'lucide-react'
import Link from 'next/link'
import { type PropsWithChildren } from 'react'
import { Button, type ButtonProps } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { useServerSettings } from '~/hooks/useServerSettings'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'

const ConnectButton = () => {
  const { isConnected, setIsConnected, setIdentified } = useConnectionStore()
  const { settings } = useServerSettings()

  const { mutate: connect } = useMutation({
    mutationFn: async () => {
      const session = await obs.connect(`ws://${settings.host}:${settings.port}`)

      setIsConnected(true)
      setIdentified(session)
    },
    onError: (error) => console.error('Failed to connect:', error),
  })

  const { mutate: disconnect } = useMutation({
    mutationFn: async () => {
      await obs.disconnect()

      setIsConnected(false)
      setIdentified(undefined)
    },
    onError: (error) => console.error('Failed to disconnect:', error),
  })

  return (
    <Button
      intent={isConnected ? 'destructive' : 'primary'}
      onClick={() => (!isConnected ? connect() : disconnect())}
    >
      {isConnected ? <UnplugIcon /> : <PlugIcon />}
      {isConnected ? 'Disconnect' : 'Connect'}
    </Button>
  )
}

const SectionButton = ({
  children,
  href = '',
  ...props
}: PropsWithChildren<
  ButtonProps & {
    href?: string
  }
>) => {
  return (
    <Link href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  )
}

const Header = () => {
  return (
    <div className='space-x-4 rounded-b-2xl bg-gray-800 p-4'>
      <ConnectButton />

      <SectionButton intent='outline' href='/dashboard/info'>
        <InfoIcon />
        Info
      </SectionButton>

      <SectionButton intent='outline' href='/dashboard/scenes'>
        <MonitorIcon />
        Scenes
      </SectionButton>

      <SectionButton intent='outline' href='/dashboard/record'>
        <VideoIcon />
        Record
      </SectionButton>

      <SectionButton intent='outline' href='/dashboard/stream'>
        <PodcastIcon />
        Stream
      </SectionButton>

      <SectionButton intent='outline' href='/dashboard/audio'>
        <Volume2Icon />
        Audio
      </SectionButton>
    </div>
  )
}

export default Header
