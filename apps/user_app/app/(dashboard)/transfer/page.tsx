"use client"
import { Transfer } from "@/components/ui_self/transferComponent";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function () {
    const session = useSession();

    if (session.status == "unauthenticated") {
        redirect('/auth/signin');
    }

    return (
        <>
            <Transfer></Transfer>
        </>
    )
}