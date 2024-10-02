'use client'
import { InfoIcon, MonitorIcon, PlugIcon, PodcastIcon, UnplugIcon, VideoIcon, Volume2Icon } from "lucide-react";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import { useConnection } from '../providers/connection';
import { Button, type ButtonProps } from "./ui/button";

const ConnectButton = () => {
    const { isConnected, connect, disconnect } = useConnection()

    return (
        <Button intent={isConnected ? 'destructive' : 'primary'} onClick={!isConnected ? connect : disconnect}>
            {isConnected ? <UnplugIcon /> : <PlugIcon />}
            {isConnected ? 'Disconnect' : 'Connect'}
        </Button>
    )
}

const SectionButton = ({ children, href = '', ...props }: PropsWithChildren<ButtonProps & {
    href?: string
}>) => {
    const { isConnected } = useConnection()

    const disabled = !isConnected

    const button = (
        <Button {...props} disabled={disabled}>
            {children}
        </Button>
    )

    return isConnected ? <Link href={href}>{button}</Link> : button
}

const Header = () => {
    return <div className='bg-gray-800 p-4 rounded-b-2xl space-x-4'>
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
}

export default Header
