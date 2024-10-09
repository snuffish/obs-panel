import { type PropsWithChildren } from 'react'
import { BottomNavWithSettingsComponent } from '~/components/bottom-nav-with-settings'
import Header from '~/components/header'

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className='col-start-2 -col-end-2'>
      <Header />
      <BottomNavWithSettingsComponent />
      {children}
    </div>
  )
}
