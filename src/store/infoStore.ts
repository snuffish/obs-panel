import { type OBSResponseTypes } from "obs-websocket-js"
import { create } from "zustand"
import { useConnectionStore } from "./connectionStore"
import { obs } from "~/services/obs"

export const useInfoStore = create<{
    version: OBSResponseTypes['GetVersion']
    setVersion: (version: OBSResponseTypes['GetVersion']) => void
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }>((set) => {
    const setVersion = (version: OBSResponseTypes['GetVersion']) =>
      set({ version })
  
    useConnectionStore.subscribe(({ isConnected }) => {
      if (!isConnected) return
  
      
    })
  
    return {
      version: {},
      setVersion,
    }
  })
  