"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Separator } from "~/components/ui/separator"
import { Button } from "~/components/ui/button"
import { Home, Search, Bell, Settings, MessageCircle, User, Menu } from "lucide-react"

const tabs = [
  { value: "home", label: "Home", icon: Home },
  { value: "search", label: "Search", icon: Search },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "settings", label: "Settings", icon: Settings },
]

const iconButtons = [
  { icon: MessageCircle, label: "Messages" },
  { icon: Bell, label: "Notifications" },
  { icon: User, label: "Profile" },
]

export function NavbarWithTabsAndIcons() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 w-full bg-white shadow-md z-10 dark:bg-neutral-950">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <div className="flex-1 flex justify-center">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="relative">
              <TabsList className="h-16 items-center bg-neutral-100 p-1 rounded-b-full dark:bg-neutral-800">
                {tabs.map((tab, index) => (
                  <div key={tab.value} className="flex items-center h-full">
                    <TabsTrigger
                      value={tab.value}
                      className={`relative flex flex-col items-center justify-center h-full px-3 rounded-full transition-all ${
                        activeTab === tab.value
                          ? "bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50"
                          : "text-neutral-500 hover:bg-white/50 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-950/50 dark:hover:text-neutral-50"
                      }`}
                    >
                      <div className={`flex flex-col items-center ${activeTab === tab.value ? "'transform -translate-y-px'" : "''"}`}>
                        <tab.icon className={`h-5 w-5 mb-1 ${activeTab === tab.value ? "'text-primary'" : "''"}`} />
                        <span className={`text-xs ${activeTab === tab.value ? "'font-medium'" : "''"}`}>{tab.label}</span>
                      </div>
                      {activeTab === tab.value && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900 dark:bg-neutral-50" />
                      )}
                    </TabsTrigger>
                    {index < tabs.length - 1 && (
                      <Separator orientation="vertical" className="h-8 mx-1" />
                    )}
                  </div>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center space-x-2">
            {iconButtons.map((button, index) => (
              <Button key={index} variant="ghost" size="icon" className="hidden md:inline-flex">
                <button.icon className="h-5 w-5" />
                <span className="sr-only">{button.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </header>
      <main className="flex-grow bg-white dark:bg-neutral-950">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="bg-neutral-100 rounded-lg p-4 dark:bg-neutral-800">
            <h2 className="text-lg font-semibold mb-2">Content for {activeTab}</h2>
            <p className="text-neutral-500 dark:text-neutral-400">
              This is where the content for the {activeTab} tab would be displayed. The content changes based on the selected tab.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}