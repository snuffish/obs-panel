'use client'

import React, { useRef } from 'react'
import { type PropsWithChildren } from 'react'
import { useLocalStorage } from '~/hooks/useLocalStorage'

export default function AudioLayout({ children }: PropsWithChildren) {
  const value = useRef<HTMLInputElement>(null)

  const [item, setItem] = useLocalStorage('testValue')

  const setValue = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setItem(value.current?.value)
  }

  return (
    <div className='col-start-2 -col-end-2 bg-white'>
      <div>
        <input ref={value} type='text' />
        <button onClick={setValue}>TEST</button>
      </div>
      <div>VALUE: {item}</div>
    </div>
  )
}
