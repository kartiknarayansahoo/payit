"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai"
import { SessionProvider } from "next-auth/react"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();


    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <Provider>
                    {children}
                </Provider>
            </SessionProvider>
        </QueryClientProvider>
    )
}