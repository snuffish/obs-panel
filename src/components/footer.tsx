"'use client'"

import {
  AudioLinesIcon,
  Info,
  LayoutDashboardIcon,
  Menu,
  MessageCircleIcon,
  MessageCircleOffIcon,
  MonitorIcon,
  Signal,
  VideoIcon,
  WifiIcon,
  WifiOffIcon,
  ZapIcon,
  ZapOffIcon,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { Separator } from '~/components/ui/separator'
import { useConnect } from '~/hooks/useConnect'
import { Badge } from './ui/badge'
import { useToast } from '~/hooks/useToast'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export const menuItems = [
  { path: '/dashboard', icon: LayoutDashboardIcon, label: 'Dashboard' },
  { path: '/scenes', icon: MonitorIcon, label: 'Scenes' },
  { path: '/video', icon: VideoIcon, label: 'Video' },
  { path: '/audio', icon: AudioLinesIcon, label: 'Audio' },
]

const MenuSection = () => {
  const pathname = usePathname()
  const appPath = pathname === '/' ? '/dashboard' : pathname

  return (
    <>
      <div className='md:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm'>
              <Menu className='mr-2 h-4 w-4' />
              {menuItems.find((tab) => tab.path === appPath)?.label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {menuItems.map((tab) => (
              <Link href={tab.path}>
                <DropdownMenuItem key={tab.path}>
                  <tab.icon className='mr-2 h-4 w-4' />
                  {tab.label}
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='hidden items-center space-x-2 md:flex lg:space-x-4'>
        {menuItems.map((tab) => (
          <Link href={tab.path}>
            <Button
              key={tab.path}
              variant={appPath === tab.path ? 'default' : 'ghost'}
              size='sm'
              className='text-xs lg:text-sm'
            >
              <tab.icon className='mr-1 h-4 w-4 lg:mr-2' />
              {tab.label}
            </Button>
          </Link>
        ))}
      </div>
    </>
  )
}

const NetworkStats = () => {
  const { isConnected } = useConnect()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className={`text-xs lg:text-sm ${isConnected === false && 'line-through'}`}
        >
          {isConnected ? (
            <WifiIcon className='mr-1 h-4 w-4 text-green-500' />
          ) : (
            <WifiOffIcon className='mr-1 h-4 w-4 text-red-500' />
          )}
          <span className='hidden sm:inline'>Latency:</span> 23ms
          <Info className='ml-1 h-4 w-4 text-neutral-500 dark:text-neutral-400' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Network Statistics</h4>
            <p className='text-sm text-neutral-500 dark:text-neutral-400'>
              Detailed information about your current network performance.
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid grid-cols-3 items-center gap-4'>
              <span className='text-sm'>Latency</span>
              <span className='col-span-2 text-sm font-semibold'>23ms</span>
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <span className='text-sm'>Download</span>
              <span className='col-span-2 text-sm font-semibold'>
                95.5 Mbps
              </span>
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <span className='text-sm'>Upload</span>
              <span className='col-span-2 text-sm font-semibold'>
                40.2 Mbps
              </span>
            </div>
            <div className='grid grid-cols-3 items-center gap-4'>
              <span className='text-sm'>Packet Loss</span>
              <span className='col-span-2 text-sm font-semibold'>0.01%</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

const MuteToast = () => {
  const { isMuted, invoke } = useToast().mute

  return (
    <Button onClick={invoke} variant='ghost' size='sm'>
      {isMuted ? <MessageCircleOffIcon /> : <MessageCircleIcon />}
    </Button>
  )
}

const StatusSection = () => {
  const { isConnected, invoke } = useConnect()

  return (
    <div className='flex items-center space-x-2 lg:space-x-4'>
      <MuteToast />
      <Divider />
      <NetworkStats />
      <Divider />
      <div className='flex justify-between gap-x-2 text-xs text-neutral-500 md:text-sm'>
        {isConnected ? (
          <Button
            onClick={invoke}
            variant='outline'
            className='border-green-500'
          >
            <ZapIcon /> <span className='hidden md:inline'>Disconnect</span>
          </Button>
        ) : (
          <Button onClick={invoke} variant='outline' className='border-red-500'>
            <ZapOffIcon /> <span className='hidden md:inline'>Connect</span>
          </Button>
        )}
      </div>
    </div>
  )
}

const Divider = () => <Separator orientation='vertical' className='h-6' />

export function Footer() {
  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 border-t bg-white dark:bg-neutral-950'>
      <div className='container mx-auto px-4'>
        <div className='flex h-12 items-center justify-between md:h-14 lg:h-16'>
          <MenuSection />
          <StatusSection />
        </div>
      </div>
    </div>
  )
}
