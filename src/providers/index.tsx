import { type PropsWithChildren } from "react";
import { ConnectionProvider } from "./connection";

export default function Providers({ children }: PropsWithChildren) {
    return (
        <ConnectionProvider>
            {children}
        </ConnectionProvider>
    )
}