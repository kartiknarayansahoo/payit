import { SessionProvider } from "next-auth/react"
import { checkServerIdentity } from "tls"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}