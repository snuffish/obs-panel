import React from "react";
import { type PropsWithChildren } from "react";

export default function ScenesLayout({ children }: PropsWithChildren) {
    return (
        <div className="col-start-2 -col-end-2">
            SCENES
            {children}
        </div>
    )
}