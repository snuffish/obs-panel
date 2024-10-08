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
import { host, obs } from '~/hooks/obs'
import { useConnectionStore } from '~/store/store'

const ConnectButton = () => {
  const { isConnected, setIsConected, setIdentified } = useConnectionStore()

  const connect = () => {
    obs
      .connect(host)
      .then((session) => {
        setIsConected(true)
        setIdentified(session)
      })
      .catch((error) => {
        throw error
      })
  }

  const disconnect = () => {
    obs
      .disconnect()
      .then(() => {
        setIsConected(false)
        setIdentified({})
      })
      .catch((error) => {
        throw error
      })
  }

  return (
    <Button
      intent={isConnected ? 'destructive' : 'primary'}
      onClick={!isConnected ? connect : disconnect}
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
