'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import { type PropsWithChildren } from 'react'
import { getData } from '~/actions'
import { useLocalStorage } from '~/hooks/useLocalStorage'

export default function AudioLayout({ children }: PropsWithChildren) {
  const { mutate, data } = useMutation({
    mutationFn: getData,
    onMutate: async () => {
      console.log('onMutate')
    }
  })

  console.log(data, 'data')

  useEffect(() => {
    return () => mutate()
  }, [])

  return (
    <div className='col-start-2 -col-end-2 bg-white'>
      <button onClick={() => mutate()}>CLICK ME</button>
      {data?.value}
      {children}
    </div>
  )
}
