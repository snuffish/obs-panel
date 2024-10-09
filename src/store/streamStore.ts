import { type OBSResponseTypes } from "obs-websocket-js"
import { create } from "zustand"
import { obs } from "~/services/obs"
import { useConnectionStore } from "./connectionStore"

export const useStreamStore = create<{
    active: boolean
  }>((set) => {  
    useConnectionStore.subscribe(({ isConnected }) => {
      if (!isConnected) return

      obs.call('GetStreamStatus').then(({ outputActive }) => {
        set({ active: outputActive })
      }).catch((err) => console.error('GetStreamStatus error:', err))

      obs.on('StreamStateChanged', ({ outputActive }) => {
        set({ active: outputActive })
      })
    })
  
    return {
      active: false,
    }
  })
  