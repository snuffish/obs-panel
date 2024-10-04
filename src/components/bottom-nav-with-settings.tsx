'use client'

import { useState } from 'react'
import { Home, Settings, User, Wifi } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'

export function BottomNavWithSettingsComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-950'>
      <div className='flex items-center justify-around'>
        <Button intent='ghost' className='flex flex-col items-center'>
          <Home className='h-6 w-6' />
          <span className='mt-1 text-xs'>Home</span>
        </Button>
        <Button intent='ghost' className='flex flex-col items-center'>
          <User className='h-6 w-6' />
          <span className='mt-1 text-xs'>Profile</span>
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button intent='ghost' className='flex flex-col items-center'>
              <Settings className='h-6 w-6' />
              <span className='mt-1 text-xs'>Settings</span>
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Adjust your connection and profile settings here.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input
                  id='name'
                  defaultValue='John Doe'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Username
                </Label>
                <Input
                  id='username'
                  defaultValue='johndoe'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='server' className='text-right'>
                  Server
                </Label>
                <Input
                  id='server'
                  defaultValue='obs-websocket.local'
                  className='col-span-3'
                />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='port' className='text-right'>
                  Port
                </Label>
                <Input id='port' defaultValue='4455' className='col-span-3' />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='auto-connect' className='text-right'>
                  Auto Connect
                </Label>
                <Switch
                  id='auto-connect'
                  defaultChecked
                  className='col-span-3'
                />
              </div>
            </div>
            <div className='flex justify-between'>
              <Button intent='outline' onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
