'use client'
import { useRouter } from "next/navigation"
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react"

const ConnectionContext = createContext<{ isConnected: boolean, connect: () => void, disconnect: () => void } | undefined>(undefined)

export const useConnection = () => {
    const context = useContext(ConnectionContext)

    if (context === undefined) {
        throw new Error("useConnection must be used within a ConnectionProvider")
    }

    return context
}

export const ConnectionProvider = ({ children }: PropsWithChildren) => {
    const [isConnected, setConnected] = useState(false)
    const router = useRouter()

    useEffect(() => {
        router.push(`/dashboard/${isConnected ? 'info' : ''}`)
    }, [isConnected, router])

    const connect = () => {
        console.log("CONNECTION...")
        setConnected(true)
    }

    const disconnect = () => {
        console.log("DISCONNECTING...")
        setConnected(false)
    }

    return <ConnectionContext.Provider value={{
        isConnected,
        connect,
        disconnect
    }}>
        {children}
    </ConnectionContext.Provider>
}
