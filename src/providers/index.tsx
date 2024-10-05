import { type PropsWithChildren } from 'react'
import { ConnectionProvider } from './connection'
import { ScenesProvider } from './scene'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ConnectionProvider>
      <ScenesProvider>{children}</ScenesProvider>
    </ConnectionProvider>
  )
}
