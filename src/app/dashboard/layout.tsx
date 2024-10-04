import React from "react"
import { type PropsWithChildren } from "react"
import { BottomNavWithSettingsComponent } from "~/components/bottom-nav-with-settings"
import Header from "~/components/header"
import Providers from "~/providers"

export default function DashboardLayout({ children }: PropsWithChildren) {
    return (
        <div className="col-start-2 -col-end-2">
            <Providers>
                <Header />
                <BottomNavWithSettingsComponent />
                {children}
            </Providers>
        </div>
    )
}