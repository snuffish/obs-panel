'use client'

import { create } from 'zustand'
import {
  type OBSEventTypes,
  type OBSResponseTypes,
  OBSWebSocket,
} from 'obs-websocket-js'
import { useQuery } from '@tanstack/react-query'

export const obs = new OBSWebSocket()

const originalEmit = obs.emit.bind(obs)
obs.emit = (event, ...args) => {
  console.log(`Event emitted: ${event}`, ...args)
  return originalEmit.apply(this, [event, ...args])
}







