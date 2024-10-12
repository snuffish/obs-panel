import { create } from "zustand"
import { type obs } from "~/services/obs"

type Socket = ReturnType<typeof obs.connect>
type Identified = Awaited<ReturnType<typeof obs.connect>> | undefined

type ConnectionState = {
  isConnected: boolean
  identified: Identified
  setIsConnected: (isConnected: boolean) => void
  setIdentified: (identified: Identified) => void
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  isConnected: false,
  identified: undefined,
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  setIdentified: (identified: Identified) => set({ identified }),
}))

