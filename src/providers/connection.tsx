'use client'
import { useRouter } from "next/navigation"
import OBSWebSocket from 'obs-websocket-js'
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react"

const obs = new OBSWebSocket()

const host = 'ws://localhost:4455'

type State = Awaited<ReturnType<ConnectionContextType['connect']>>

type ConnectionContextType = {
    isConnected: boolean,
    state?: State,
    connect: (host: string) => Promise<{
        obsWebSocketVersion?: string
        rpcVersion?: number
    }>,
    disconnect: () => Promise<void>,
    _obs: OBSWebSocket
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined)

export const useConnection = () => {
    const context = useContext(ConnectionContext)

    if (context === undefined) {
        throw new Error("useConnection must be used within a ConnectionProvider")
    }

    return context
}

const useOsbState = () => {
    const [isConnected, setConnected] = useState(false)
    const [state, setState] = useState<State | undefined>()

    obs.once('ConnectionOpened', () => setConnected(true))
    obs.once('ConnectionClosed', () => {
        setConnected(false)
        setState(undefined)
    })

    obs.once('Hello', data => { setState(data) })

    return { isConnected, state }
}

const originalEmit = obs.emit.bind(obs);
obs.emit = (event, ...args) => {
  console.log(`Event emitted: ${event}`, ...args);
  return originalEmit(event, ...args);
};

export const ConnectionProvider = ({ children }: PropsWithChildren) => {
    const { isConnected, state } = useOsbState()
    const router = useRouter()    

    // useEffect(() => {
    //     router.push(`/dashboard/${isConnected ? 'info' : ''}`)
    // }, [isConnected, router])

    return <ConnectionContext.Provider value={{
        isConnected, state,
        connect: () => obs.connect(host),
        disconnect: () => obs.disconnect(),
        _obs: obs
    }}>
        {children}
    </ConnectionContext.Provider>
}
