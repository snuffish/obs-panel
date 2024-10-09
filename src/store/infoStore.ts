import { type OBSResponseTypes } from "obs-websocket-js"
import { create } from "zustand"
import { useConnectionStore } from "./connectionStore"

export const useInfoStore = create<{
    version: OBSResponseTypes['GetVersion'] | undefined
  }>((set) => {  
    useConnectionStore.subscribe(({ isConnected }) => {
      if (!isConnected) return
  
      
    })
  
    return {
      version: undefined
    }
  })
  