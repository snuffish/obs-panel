"use client"

import { useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export function CountdownTimerComponent() {
  const [time, setTime] = useState(60)
  const [initialTime, setInitialTime] = useState(60)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsActive(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const handleStart = () => setIsActive(true)
  const handlePause = () => setIsActive(false)
  const handleReset = () => {
    setIsActive(false)
    setTime(initialTime)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10)
    if (!isNaN(newTime) && newTime >= 0) {
      setInitialTime(newTime)
      setTime(newTime)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "'0'")}:${secs.toString().padStart(2, "'0'")}`
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Countdown Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-6xl font-bold text-center" aria-live="polite">
          {formatTime(time)}
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="time-input" className="w-20">Set Time:</Label>
          <Input
            id="time-input"
            type="number"
            min="0"
            value={initialTime}
            onChange={handleTimeChange}
            className="w-24"
            disabled={isActive}
          />
          <span className="text-sm text-neutral-500 dark:text-neutral-400">seconds</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
        {!isActive ? (
          <Button onClick={handleStart}>Start</Button>
        ) : (
          <Button onClick={handlePause}>Pause</Button>
        )}
        <Button onClick={handleReset} variant="outline">Reset</Button>
      </CardFooter>
    </Card>
  )
}