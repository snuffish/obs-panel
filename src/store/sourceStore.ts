import { create } from "zustand"
import { useConnectionStore } from "./connectionStore"
import { obs } from "~/services/obs"

export type SourceProps = {
    inputKind: string
    inputName: string
    inputUuid: string
    unversionedInputKind: string
  }
  
  // GetSourceActive
  // GetSourceScreenshot
  export const useInputStore = create<{
    inputs: SourceProps[]
    setInputs: (inputs: SourceProps[]) => void
  }>((set) => {
    const setInputs = (inputs: SourceProps[]) => set({ inputs })
  
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
  
          setInputs(inputs as SourceProps[])
        })
        .catch((err) => console.error('ERR=>>>', err))
    })
  
    return {
      inputs: [],
      setInputs,
    }
  })