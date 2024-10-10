'use client'

import {
  OBSWebSocket
} from 'obs-websocket-js'
import { useRecordStore } from '~/store/recordStore'

export const obs = new OBSWebSocket()

const originalEmit = obs.emit.bind(obs)
obs.emit = (event, ...args) => {
  console.log(`Event emitted: ${event}`, ...args)
  return originalEmit.apply(this, [event, ...args])
}
