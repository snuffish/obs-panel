import React from "react";
import { type PropsWithChildren } from "react";
import { ObsRecordingDashboard } from "~/components/obs-recording-dashboard";

export default function RecordLayout({ children }: PropsWithChildren) {
    return (
        <div className="col-start-2 -col-end-2">
            <ObsRecordingDashboard />
            {children}
        </div>
    )
}