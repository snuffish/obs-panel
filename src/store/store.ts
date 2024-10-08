'use client'

import { create } from 'zustand'

type ConnectionState = {
  isConnected: boolean
  setIsConected: (isConnected: boolean) => void
  setIdentified: (identified: unknown) => void
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  isConnected: false,
  identified: {},
  setIsConected: (isConnected: boolean) => set({ isConnected }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setIdentified: (identified: unknown) => set({ identified }),
}))
