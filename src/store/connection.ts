import OBSWebSocket, {
    OBSResponseTypes
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
    .on('ConnectionOpened', async () => {
      set({ isConnected: true })
    })
    .on('ConnectionClosed', (err) => {
      console.error('Connection closed:', err)
      set({ isConnected: false })
    })
    .on('ConnectionError', (err) => console.error('Connection error:', err))
    .on('Hello', async ({ authentication }) => set({ session: authentication }))
    .on('Identified', async () => {
      const version = (await obs
        .call('GetVersion')
        .catch((err) =>
          console.error('GetVersion error:', err),
        )) as OBSResponseTypes['GetVersion']

      set({ version })
    })

  return {
    isConnected: false,
    connect: async () => {
      const session = await obs
        .connect(host)
        .catch((err) => console.error('Connection error:', err)) as Required<Session>
      
        set({ session })
    },
    disconnect: () => {
      obs.disconnect().catch((err) => console.error('Disconnect error:', err))
    },
  }
})
