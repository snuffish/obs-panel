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
import { toast } from '~/hooks/useToast'

const ConnectButton = () => {
  const { isConnected, setIsConnected, setIdentified } = useConnectionStore()
  const { settings } = useServerSettings()
  const wsEndpoint = `ws://${settings.host}:${settings.port}`

  const { mutate: connect } = useMutation({
    mutationFn: async () => {
      return await obs.connect(wsEndpoint)
    },
    onSuccess: (session) => {
      setIsConnected(true)
      setIdentified(session)

      toast({
        variant: 'success',
        title: 'Connected!',
      })
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Failed to connect',
        description: `Failed to connect to OBS WebSocket: ${wsEndpoint}`,
      })

      throw err
    },
  })

  const { mutate: disconnect } = useMutation({
    mutationFn: async () => {
      return await obs.disconnect()
    },
    onSuccess() {
      setIsConnected(false)
      setIdentified(undefined)

      toast({
        variant: 'destructive',
        title: 'Disconnected!',
      })
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: 'Failed to disconnect'
      })

      throw err
    },
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

const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className='space-x-4 rounded-b-2xl bg-gray-800 p-4'>
      <ConnectButton />

      <SectionButton intent='outline' href='/info'>
        <InfoIcon />
        Info
      </SectionButton>

      <SectionButton intent='outline' href='/scenes'>
        <MonitorIcon />
        Scenes
      </SectionButton>

      <SectionButton intent='outline' href='/record'>
        <VideoIcon />
        Record
      </SectionButton>

      <SectionButton intent='outline' href='/stream'>
        <PodcastIcon />
        Stream
      </SectionButton>

      <SectionButton intent='outline' href='/audio'>
        <Volume2Icon />
        Audio
      </SectionButton>
    </div>
  )
}

export default Header
