'use client'
import { useRouter } from "next/navigation"
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react"
import OBSWebSocket, { EventSubscription, EventTypes } from 'obs-websocket-js'

const obs = new OBSWebSocket()

const host = 'ws://localhost:4455'

const ConnectionContext = createContext<{
    isConnected: boolean,
    connect: () => Promise<void>,
    disconnect: () => Promise<void>,
    obs: OBSWebSocket
} | undefined>(undefined)

export const useConnection = () => {
    const context = useContext(ConnectionContext)

    if (context === undefined) {
        throw new Error("useConnection must be used within a ConnectionProvider")
    }

    return context
}

const useOsbState = () => {
    const [isConnected, setConnected] = useState(false)
    const [meta, setMeta] = useState<{
        obsWebSocketVersion?: string
        rpcVersion?: number
    } | undefined>()

    obs.once('ConnectionOpened', () => setConnected(true))
    obs.once('ConnectionClosed', () => setConnected(false))
    obs.once('Hello', data => { setMeta(data) })

    return { isConnected, meta }
}

const originalEmit = obs.emit.bind(obs);
obs.emit = (event, ...args) => {
  console.log(`Event emitted: ${event}`, ...args);
  return originalEmit(event, ...args);
};

export const ConnectionProvider = ({ children }: PropsWithChildren) => {
    const { isConnected } = useOsbState()
    const router = useRouter()    

    useEffect(() => {
        router.push(`/dashboard/${isConnected ? 'info' : ''}`)
    }, [isConnected, router])

    const connect = async () => {
        await obs.connect(host).then(conn => {
            // setConnected(true)
        }).catch(err => {
             // @TODO: Fix Toast error messages
             console.error("ERR=>",err)
        })
    }

    const disconnect = async () => {
        await obs.disconnect()
        // setConnected(false)
    }

    return <ConnectionContext.Provider value={{
        isConnected, connect, disconnect, obs
    }}>
        {children}
    </ConnectionContext.Provider>
}
