"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
    const session = useSession();

    if (session.status == "unauthenticated") {
        redirect('/auth/signin');
    }

    return (
        <div>
            {JSON.stringify(session.data)};
            <div className="bg-red-200 flex">
                <div className="flex h-max">
                    adf
                </div>
            </div>
        </div>
    );
}
