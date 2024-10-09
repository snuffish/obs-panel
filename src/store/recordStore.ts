import { type OBSResponseTypes } from "obs-websocket-js"
import { create } from "zustand"
import { obs } from "~/services/obs"
import { useConnectionStore } from "./connectionStore"

export const useRecordStore = create<{
    active: boolean
  }>((set) => {  
    useConnectionStore.subscribe(({ isConnected }) => {
      if (!isConnected) return

      obs.call('GetRecordStatus').then(({ outputActive }) => {
        set({ active: outputActive })
      }).catch((err) => console.error('GetRecordStatus error:', err))

      obs.on('RecordStateChanged', ({ outputActive }) => {
        set({ active: outputActive })
      })
    })
  
    return {
      active: false,
    }
  })
  