'use client'

import { type PropsWithChildren } from 'react'
import { ObsRecordingDashboard } from '~/components/obs-recording-dashboard'

// GetRecordStatus
// ToggleRecord
// StartRecord
// StopRecord
// ToggleRecordPause
// PauseRecord
// ResumeRecord
// RecordStateChanged
export default function RecordLayout({ children }: PropsWithChildren) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
 

  return (
    <div className='col-start-2 -col-end-2'>
      <ObsRecordingDashboard />
      {children}
    </div>
  )
}
