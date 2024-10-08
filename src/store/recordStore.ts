import { type OBSResponseTypes } from "obs-websocket-js"
import { create } from "zustand"
import { obs } from "~/services/obs"
import { useConnectionStore } from "./connectionStore"

export const useRecordStore = create<{
    status: OBSResponseTypes['GetRecordStatus']
    setStatus: (version: OBSResponseTypes['GetRecordStatus']) => void
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }>((set) => {
    const setStatus = (status: OBSResponseTypes['GetRecordStatus']) =>
      set({ status })
  
    useConnectionStore.subscribe(({ isConnected }) => {
      if (!isConnected) return
  
    
    })
  
    return {
      status: {},
      setStatus,
    }
  })
  