import { create } from "zustand"
import { obs } from "~/services/obs"

type Identified = Awaited<ReturnType<typeof obs.connect>>

type ConnectionState = {
  isConnected: boolean
  identified: Identified | undefined
  setIsConnected: (isConnected: boolean) => void
  setIdentified: (identified: Identified | undefined) => void
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  isConnected: false,
  identified: undefined,
  setIsConnected: (isConnected: boolean) => set({ isConnected }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setIdentified: (identified: Identified) => set({ identified }),
}))