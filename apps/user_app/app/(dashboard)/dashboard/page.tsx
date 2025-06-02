"use client"
import { Dashboard } from "@/components/ui_self/dashboardComponent";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const session = useSession();

    if (session.status == "unauthenticated") {
        redirect('/auth/signin');
    }

    return (
        <>
            {/* {JSON.stringify(session.data)}; */}
            <Dashboard></Dashboard>
        </>
    );
}
