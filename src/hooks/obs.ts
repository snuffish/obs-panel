'use client'

import { useQueryClient } from '@tanstack/react-query'
import {
    type OBSEventTypes,
    OBSWebSocket
} from 'obs-websocket-js'
import { useEffect } from 'react'
import { useConnectionStore } from '~/store/store'

// const host = 'ws://localhost:4455'

// export const obs = new OBSWebSocket()

// type CallMethods = keyof OBSRequestTypes
// type Params<T extends CallMethods> = OBSRequestTypes[T] extends never ? never : OBSRequestTypes[T]

// async function safeAwait<T , E = Error>(
//     promise: Promise<T>
// ): Promise<[null, T] | [E, null]> {
//     try {
//         const result = await promise
//         return [null, result]
//     } catch (error) {
//         return [error as E, null]
//     }
// }

// export const useObs = <T extends CallMethods>(method: T, params?: Params<T>) => {
//     return useQuery({
//         queryKey: ['obs', method, params],
//         queryFn: async () => {
//             await obs.connect(host)
//             return obs.call(method, params)
//         },
//         // refetchInterval: 5000
//     })
// }

// type EventNames = keyof OBSEventTypes

// export const useObsWatch = <T extends EventNames>(event: T, callback: T) => {
//     return useQuery({
//         queryKey: ['obs', event],
//         queryFn: async () => {
//             if (!obs.identified) await obs.connect(host)
//             // obs.on(event)
//         }
//     })
// }

type EventNames = keyof OBSEventTypes
type EventHandler<T extends EventNames> = OBSEventTypes[T]

export const useObs = <T extends EventNames>(
  event: T,
  handler: EventHandler<T>,
) => {
  const { setIsConected, setIdentified } = useConnectionStore()
  const queryClient = useQueryClient()

  //   const connectMutation = useMutation(async () => {
  //     await obs.connect(host)
  //   }, {
  //     onMutate: async () => {
  //         // console.log
  //     },
  //     onError: (error) => {
  //         console.error('Error connecting to OBS WebSocket:', error)
  //     }
  //   })

  useEffect(() => {
    const connectOBS = () => {
      try {
       
      } catch (error) {
        console.error('Error connecting to OBS WebSocket:', error)
      }
    }


    // return () => {
    //   obs.disconnect().catch((error) => {
    //     throw error
    //   })
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   obs.off(event, handler)
    // }
  }, [event, handler, setIdentified, setIsConected])

  return {
    queryClient,
  }
}
