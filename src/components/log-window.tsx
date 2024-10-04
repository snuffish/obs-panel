'use client'

import { useState, useCallback, useEffect } from 'react'
import { ScrollArea } from '~/components/ui/scroll-area'
import { X, AlertTriangle, Info, AlertCircle, Eye } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Badge } from './ui/badge'

type LogLevel = "'info'" | "'warn'" | "'error'"

interface LogMessage {
  id: number
  timestamp: Date
  level: LogLevel
  message: string
  read: boolean
}

export function LogWindowComponent() {
  const [logs, setLogs] = useState<LogMessage[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const addLog = useCallback((level: LogLevel, message: string) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      { id: Date.now(), timestamp: new Date(), level, message, read: false },
    ])
    setUnreadCount((prevCount) => prevCount + 1)
  }, [])

  const clearLogs = useCallback(() => {
    setLogs([])
    setUnreadCount(0)
  }, [])

  const markAllAsRead = useCallback(() => {
    setLogs((prevLogs) => prevLogs.map((log) => ({ ...log, read: true })))
    setUnreadCount(0)
  }, [])

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
    if (!isOpen) {
      markAllAsRead()
    }
  }, [isOpen, markAllAsRead])

  useEffect(() => {
    if (isOpen) {
      markAllAsRead()
    }
  }, [isOpen, markAllAsRead])

  const getIcon = (level: LogLevel) => {
    switch (level) {
      case "'info'":
        return <Info className='h-4 w-4 text-blue-500' />
      case "'warn'":
        return <AlertTriangle className='h-4 w-4 text-yellow-500' />
      case "'error'":
        return <AlertCircle className='h-4 w-4 text-red-500' />
    }
  }

  return (
    <div className='relative mx-auto w-full max-w-2xl rounded-lg border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-950'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-lg font-semibold'>Log Messages</h2>
        <div className='flex items-center space-x-2'>
          <Button intent='outlineClean' size='sm' onClick={markAllAsRead}>
            <Eye className='mr-2 h-4 w-4' />
            Mark All as Read
          </Button>
          <Button intent='outlineClean' size='sm' onClick={clearLogs}>
            <X className='mr-2 h-4 w-4' />
            Clear Logs
          </Button>
          <Button intent='outlineClean' size='sm' onClick={toggleOpen}>
            {isOpen ? 'Close' : 'Open'}
          </Button>
        </div>
      </div>
      {isOpen && (
        <ScrollArea className='h-[400px] w-full rounded border border-neutral-200 p-4 dark:border-neutral-800'>
          {logs.map((log) => (
            <div key={log.id} className='mb-2 flex items-start'>
              <span className='mr-2'>{getIcon(log.level)}</span>
              <div>
                <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                  {log.timestamp.toISOString()}
                </span>
                <p className='text-sm'>{log.message}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      )}
      <div className='mt-4 space-x-2'>
        <Button
          size='sm'
          intent='dark'
          onClick={() => addLog("'info'", "'This is an info message'")}
        >
          Add Info Log
        </Button>
        <Button
          size='sm'
          intent='dark'
          onClick={() => addLog("'warn'", "'This is a warning message'")}
        >
          Add Warning Log
        </Button>
        <Button
          size='sm'
          onClick={() => addLog("'error'", "'This is an error message'")}
        >
          Add Error Log
        </Button>
      </div>
      {unreadCount > 0 && (
        <Badge
          variant='destructive'
          className='absolute right-0 top-0 -mr-2 -mt-2 rounded-full'
        >
          {unreadCount}
        </Badge>
      )}
    </div>
  )
}

{
  /* <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-red text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"></div> */
}
