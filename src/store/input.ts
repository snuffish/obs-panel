import { create } from "zustand"
import { obs, useConnectionStore } from "./connection"

type SourceProps = {
    inputKind: string
    inputName: string
    inputUuid: string
    unversionedInputKind: string
}


// GetSourceActive
// GetSourceScreenshot
export const useInputStore = create<{
    inputs: SourceProps[]
  }>((set) => {
    useConnectionStore.subscribe(({ isConnected }) => {
      if (!isConnected) return
  
      obs
        .call('GetInputList')
        .then(async ({ inputs }) => {
          inputs = await Promise.all(
            inputs.map(async (input) => {
              const { inputSettings } = await obs.call('GetInputSettings', {
                inputUuid: input.inputUuid as string,
              })
  
              return { inputSettings, ...input }
            }),
          )
  
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          set({ inputs })
        })
        .catch((err) => console.error('ERR=>>>', err))
    })
  
    return {
      inputs: [],
    }
  })
  