'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Separator } from '~/components/ui/separator'
import { Home, Search, Bell, Settings } from 'lucide-react'

const tabs = [
  { value: 'home', label: 'Home', icon: Home },
  { value: 'search', label: 'Search', icon: Search },
  { value: 'notifications', label: 'Notifications', icon: Bell },
  { value: 'settings', label: 'Settings', icon: Settings },
]

export function Navbar() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <header className='sticky top-0 z-10 w-full bg-white shadow-md dark:bg-neutral-950'>
      <div className='mx-auto flex max-w-screen-xl justify-center px-4'>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='relative'
        >
          <TabsList className='h-16 items-center rounded-b-full bg-neutral-100 p-1 dark:bg-neutral-800'>
            {tabs.map((tab, index) => (
              <div key={tab.value} className='flex h-full items-center'>
                <TabsTrigger
                  value={tab.value}
                  className={`relative flex h-full flex-col items-center justify-center rounded-full px-3 transition-all ${
                    activeTab === tab.value
                      ? 'bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50'
                      : 'text-neutral-500 hover:bg-white/50 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-950/50 dark:hover:text-neutral-50'
                  }`}
                >
                  <div
                    className={`flex flex-col items-center ${activeTab === tab.value ? "'transform -translate-y-px'" : "''"}`}
                  >
                    <tab.icon
                      className={`mb-1 h-5 w-5 ${activeTab === tab.value ? "'text-primary'" : "''"}`}
                    />
                    <span
                      className={`text-xs ${activeTab === tab.value ? "'font-medium'" : "''"}`}
                    >
                      {tab.label}
                    </span>
                  </div>
                  {activeTab === tab.value && (
                    <div className='absolute bottom-0 left-0 right-0 h-1 bg-neutral-900 dark:bg-neutral-50' />
                  )}
                </TabsTrigger>
                {index < tabs.length - 1 && (
                  <Separator orientation='vertical' className='mx-1 h-8' />
                )}
              </div>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </header>
  )
}
