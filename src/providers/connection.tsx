'use client'
import { useRouter } from 'next/navigation'
import { OBSWebSocket } from 'obs-websocket-js'
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react'

export const $obs = new OBSWebSocket()

const originalEmit = $obs.emit.bind($obs)
$obs.emit = (event, ...args) => {
  console.log(`Event emitted: ${event}`, ...args)
  return originalEmit(event, ...args)
}

// @TODO: Fix settings for this
const host = 'ws://localhost:4455'

type ConnectResponse = Awaited<ReturnType<typeof $obs.connect>>
type State = Omit<Awaited<ConnectResponse>, 'negotiatedRpcVersion'>

type ConnectionContextType = {
  isConnected: boolean
  state?: State
  connect: () => Promise<ConnectResponse>
  disconnect: () => Promise<void>
  $obs: OBSWebSocket
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(
  undefined,
)

export const useConnection = () => {
  const context = useContext(ConnectionContext)

  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider')
  }

  return context
}

const useOsbState = () => {
  const [isConnected, setConnected] = useState(false)
  const [state, setState] = useState<State | undefined>()

  $obs.once('ConnectionOpened', () => setConnected(true))
  $obs.once('ConnectionClosed', () => {
    setConnected(false)
    setState(undefined)
  })

  $obs.once('Hello', (data) => {
    setState(data)

    $obs.once('Identified', data => {
      $obs.call('GetSceneList').then(res => console.log("GetSceneList====>",res)).catch(err => console.log("ERR=>",err))
    })
  })

  return { isConnected, state }
}

export const ConnectionProvider = ({ children }: PropsWithChildren) => {
  const { isConnected, state } = useOsbState()
  const router = useRouter()

  // useEffect(() => {
  //     router.push(`/dashboard/${isConnected ? 'info' : ''}`)
  // }, [isConnected, router])

  return (
    <ConnectionContext.Provider
      value={{
        $obs,
        isConnected,
        state,
        connect: () => $obs.connect(host),
        disconnect: () => $obs.disconnect(),
      }}
    >
      {children}
    </ConnectionContext.Provider>
  )
}


// $obs.call('GetSceneList').then(res => console.log(res))
// $obs.call('SetSceneName', {
//   sceneName: 'Min Dator',
//   newSceneName: 'Monitor Scene'
// })

