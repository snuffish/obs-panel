import React from "react";
import { type PropsWithChildren } from "react";

export default function InfoLayout({ children }: PropsWithChildren) {
    return (
        <div className="col-start-2 -col-end-2">
            INFO
            {children}
        </div>
    )
}