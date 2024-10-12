'use client'

import { type PropsWithChildren } from 'react'
import { ObsStreamingDashboard } from '~/components/obs-streaming-dashboard'

// GetRecordStatus
// ToggleRecord
// StartRecord
// StopRecord
// ToggleRecordPause
// PauseRecord
// ResumeRecord
// RecordStateChanged
export default function RecordLayout({ children }: PropsWithChildren) {
  return (
    <div className='col-start-2 -col-end-2'>
      <ObsStreamingDashboard />
      {children}
    </div>
  )
}
