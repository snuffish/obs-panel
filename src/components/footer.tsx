"'use client'"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Wifi, Zap, HardDrive, Cloud, Signal, Info, Menu } from "lucide-react"

type Tab = "network" | "performance" | "storage" | "cloud"

export function Footer() {
  const [activeTab, setActiveTab] = useState<Tab>("network")

  const tabs = [
    { id: "network" as Tab, icon: Wifi, label: "Network" },
    { id: "performance" as Tab, icon: Zap, label: "Performance" },
    { id: "storage" as Tab, icon: HardDrive, label: "Storage" },
    { id: "cloud" as Tab, icon: Cloud, label: "Cloud" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white z-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12 md:h-14 lg:h-16">
          {/* Mobile view: Dropdown menu for tabs */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4 mr-2" />
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {tabs.map((tab) => (
                  <DropdownMenuItem key={tab.id} onSelect={() => setActiveTab(tab.id)}>
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tablet and Desktop view: Horizontal tabs */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                className="text-xs lg:text-sm"
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-4 w-4 mr-1 lg:mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Status information */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs lg:text-sm">
                  <Signal className="h-4 w-4 mr-1 text-green-500" />
                  <span className="hidden sm:inline">Latency:</span> 23ms
                  <Info className="h-4 w-4 ml-1 text-neutral-500 dark:text-neutral-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Network Statistics</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Detailed information about your current network performance.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm">Latency</span>
                      <span className="text-sm font-semibold col-span-2">23ms</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm">Download</span>
                      <span className="text-sm font-semibold col-span-2">95.5 Mbps</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm">Upload</span>
                      <span className="text-sm font-semibold col-span-2">40.2 Mbps</span>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <span className="text-sm">Packet Loss</span>
                      <span className="text-sm font-semibold col-span-2">0.01%</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-xs lg:text-sm text-neutral-500 dark:text-neutral-400">
              <span className="hidden sm:inline">Status:</span> Online
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}