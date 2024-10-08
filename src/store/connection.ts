import OBSWebSocket, {
    type OBSResponseTypes
} from 'obs-websocket-js'
import { create } from 'zustand'

export const obs = new OBSWebSocket()

const originalEmit = obs.emit.bind(obs)
obs.emit = (event, ...args) => {
  console.log(`Event emitted: ${event}`, ...args)
  return originalEmit.apply(this, [event, ...args])
}

const host = 'ws://localhost:4455'

type Session = Awaited<ReturnType<typeof obs.connect>>['authentication']

export const useConnectionStore = create<{
  isConnected?: boolean
  session?: Session
  version?: OBSResponseTypes['GetVersion']
  connect: () => void
  disconnect: () => void
}>((set) => {
  obs
    .on('ConnectionOpened', () => {
      set({ isConnected: true })
    })
    .on('ConnectionClosed', (err) => {
      console.error('Connection closed:', err)
      set({ isConnected: false })
    })
    .on('ConnectionError', (err) => console.error('Connection error:', err))
    .on('Hello', ({ authentication }) => {
      set({ session: authentication })
    })
    .on('Identified', () => {
      const version = obs
        .call('GetVersion')
        .catch((err) => console.error('GetVersion error:', err)
        ) as unknown as OBSResponseTypes['GetVersion']

      set({ version })
    })

  return {
    isConnected: false,
    connect: () => {
      obs.connect(host)
        .then((session) => {
          set({ session: session as unknown as Session })
        })
        .catch((err) => console.error('Connection error:', err))
    },
    disconnect: () => {
      obs.disconnect().catch((err) => console.error('Disconnect error:', err))
    },
  }
})
