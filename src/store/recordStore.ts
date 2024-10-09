import { type OBSResponseTypes } from "obs-websocket-js"
import { create } from "zustand"
import { obs } from "~/services/obs"
import { useConnectionStore } from "./connectionStore"

export const useRecordStore = create<{
    active: boolean
    setStatus: (version: OBSResponseTypes['GetRecordStatus']) => void
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  }>((set) => {  
    useConnectionStore.subscribe(({ isConnected }) => {
      if (!isConnected) return

      obs.call('GetRecordStatus').then(({ outputActive }) => {
        set({ active: outputActive })
      })

      obs.on('RecordStateChanged', ({ outputActive, outputPath, outputState }) => {
        set({ active: outputActive })
      })
    })
  
    return {
      active: false,
    }
  })
  